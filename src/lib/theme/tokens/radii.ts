/**
 * Скругления: карточки, инпуты, кнопки, бейджи (12–16px из дизайна).
 */
export const radii = {
  none: '0',
  sm: '0.375rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  '2xl': '1.25rem',
  pill: '9999px',
} as const;

export type Radii = typeof radii;
