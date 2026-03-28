/**
 * Скругления: карточки, инпуты, кнопки, бейджи (12–16px из дизайна).
 */
export const radii = {
  none: '0',
  sm: '6px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '20px',
  pill: '9999px',
} as const;

export type Radii = typeof radii;
