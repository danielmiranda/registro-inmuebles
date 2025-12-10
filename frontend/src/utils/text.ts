// Utilidades de texto compartidas en el frontend

/**
 * Normaliza un texto para permitir búsquedas insensibles a acentos y mayúsculas.
 * - Convierte a minúsculas
 * - Descompone y elimina diacríticos (acentos)
 */
export function normalizeText(s?: string | null): string {
  return (s ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}
