/**
 * Соответствие расширения файла цветовой схеме Chakra `Badge` (outline).
 * Расширяйте при появлении новых типов вложений.
 */
export function extensionBadgeProps(ext: string): { colorScheme: string } {
  if (ext === '.dcm') return { colorScheme: 'blue' };
  if (ext === '.exe') return { colorScheme: 'purple' };
  return { colorScheme: 'green' };
}
