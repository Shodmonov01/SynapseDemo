/**
 * Мягкие тени для белых карточек на светло-сером фоне.
 */
export const shadows = {
  card: '0 1px 3px rgba(26, 54, 93, 0.06), 0 4px 12px rgba(26, 54, 93, 0.04)',
  cardHover: '0 2px 6px rgba(26, 54, 93, 0.08), 0 8px 24px rgba(26, 54, 93, 0.06)',
  insetSoft: 'inset 0 1px 0 rgba(255, 255, 255, 0.6)',
} as const;

export type Shadows = typeof shadows;
