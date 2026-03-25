/**
 * Шаг сетки и ключевые отступы секций/карточек.
 */
export const spacing = {
  sectionGap: 6,
  cardPadding: 6,
  inlineGap: 3,
  stackGap: 4,
} as const;

export type SpacingTokens = typeof spacing;
