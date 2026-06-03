# agent/tools.py — Herramientas del agente GAMA Departamentos
import os
import re
import yaml
import logging
from datetime import date, datetime

logger = logging.getLogger("agentkit")

ICS_DIR = "."  # Los .ics están en la raíz del proyecto


def cargar_info_negocio() -> dict:
    try:
        with open("config/business.yaml", "r", encoding="utf-8") as f:
            return yaml.safe_load(f)
    except FileNotFoundError:
        logger.error("config/business.yaml no encontrado")
        return {}


def obtener_horario() -> dict:
    info = cargar_info_negocio()
    hora_actual = datetime.now().hour
    esta_abierto = 6 <= hora_actual < 22
    return {
        "horario": info.get("negocio", {}).get("horario", "Lunes a Domingo 6:00 AM a 10:00 PM"),
        "esta_abierto": esta_abierto,
    }


def _parsear_fechas_ics(contenido: str) -> list[tuple[date, date]]:
    """Extrae pares (inicio, fin) de un contenido ICS (puede estar en una sola línea con \\r\\n)."""
    # Normaliza el contenido: soporta \r\n literales o saltos de línea reales
    texto = contenido.replace("\\r\\n", "\n").replace("\r\n", "\n")
    eventos = []
    starts = re.findall(r"DTSTART(?:;VALUE=DATE)?:(\d{8})", texto)
    ends = re.findall(r"DTEND(?:;VALUE=DATE)?:(\d{8})", texto)
    for s, e in zip(starts, ends):
        try:
            inicio = date(int(s[:4]), int(s[4:6]), int(s[6:8]))
            fin = date(int(e[:4]), int(e[4:6]), int(e[6:8]))
            eventos.append((inicio, fin))
        except ValueError:
            continue
    return eventos


def _unidad_ocupada(ruta_ics: str, entrada: date, salida: date) -> bool:
    """Retorna True si la unidad tiene al menos una reserva que se superpone con el rango pedido."""
    try:
        with open(ruta_ics, "r", encoding="utf-8") as f:
            contenido = f.read()
        for inicio, fin in _parsear_fechas_ics(contenido):
            # Hay superposición si la reserva existente empieza antes de que el cliente salga
            # y termina después de que el cliente entra
            if inicio < salida and fin > entrada:
                return True
    except (IOError, OSError):
        pass
    return False


def _nombre_unidad_ics(ruta_ics: str) -> str:
    """Lee el X-WR-CALNAME del archivo ICS."""
    try:
        with open(ruta_ics, "r", encoding="utf-8") as f:
            contenido = f.read()
        texto = contenido.replace("\\r\\n", "\n").replace("\r\n", "\n")
        match = re.search(r"X-WR-CALNAME:(.+)", texto)
        if match:
            return match.group(1).strip()
    except (IOError, OSError):
        pass
    return os.path.basename(ruta_ics)


def consultar_disponibilidad(fecha_entrada: str, fecha_salida: str) -> str:
    """
    Consulta disponibilidad para un rango de fechas leyendo los archivos .ics.

    Args:
        fecha_entrada: formato YYYY-MM-DD
        fecha_salida: formato YYYY-MM-DD

    Returns:
        Texto con unidades disponibles y ocupadas
    """
    try:
        entrada = date.fromisoformat(fecha_entrada)
        salida = date.fromisoformat(fecha_salida)
    except ValueError:
        return "Formato de fecha inválido. Usá YYYY-MM-DD (ej: 2026-06-10)"

    if salida <= entrada:
        return "La fecha de salida debe ser posterior a la de entrada."

    ics_files = [f for f in os.listdir(ICS_DIR) if f.endswith("-booking.ics")]

    if not ics_files:
        return "No se encontraron archivos de calendario. Consultá disponibilidad directamente con nuestro equipo."

    disponibles = []
    ocupadas = []
    vistos = set()

    for archivo in sorted(ics_files):
        ruta = os.path.join(ICS_DIR, archivo)
        nombre = _nombre_unidad_ics(ruta)
        # Deduplicar unidades con el mismo nombre (múltiples calendarios para la misma unidad)
        if nombre.lower() in vistos:
            continue
        vistos.add(nombre.lower())

        if _unidad_ocupada(ruta, entrada, salida):
            ocupadas.append(nombre)
        else:
            disponibles.append(nombre)

    lineas = [f"Disponibilidad del {fecha_entrada} al {fecha_salida}:\n"]
    if disponibles:
        lineas.append("✅ DISPONIBLES:")
        for u in disponibles:
            lineas.append(f"  • {u}")
    else:
        lineas.append("⚠️ No hay unidades disponibles para esas fechas.")

    if ocupadas:
        lineas.append("\n❌ OCUPADAS:")
        for u in ocupadas:
            lineas.append(f"  • {u}")

    return "\n".join(lineas)


def registrar_consulta_reserva(telefono: str, nombre: str, tipo: str, fechas: str, personas: int) -> dict:
    logger.info(f"Consulta reserva — Tel: {telefono}, Nombre: {nombre}, Tipo: {tipo}, Fechas: {fechas}, Personas: {personas}")
    return {
        "estado": "registrado",
        "mensaje": f"Consulta de reserva registrada para {nombre}. El equipo de GAMA confirmará disponibilidad y precio.",
    }


def registrar_lead(telefono: str, nombre: str, interes: str) -> dict:
    logger.info(f"Nuevo lead — Tel: {telefono}, Nombre: {nombre}, Interés: {interes}")
    return {
        "estado": "registrado",
        "mensaje": "Lead registrado. Un asesor de GAMA se contactará a la brevedad.",
    }
