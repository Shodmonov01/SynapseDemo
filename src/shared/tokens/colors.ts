/**
 * Базовая палитра Synapse medical system (из дизайна).
 */
export const colors = {
  brand: {
    50: '#E8EEF5',
    100: '#C7D4E5',
    200: '#9BB0CD',
    300: '#6F8CB5',
    400: '#43689D',
    500: '#1A365D',
    600: '#152E50',
    700: '#112643',
    800: '#0D1E36',
    900: '#091629',
  },
  neutral: {
    50: '#F7F9FC',
    100: '#EDF2F7',
    200: '#E2E8F0',
    300: '#CBD5E0',
    400: '#A0AEC0',
    500: '#718096',
    600: '#4A5568',
    700: '#2D3748',
    800: '#1A202C',
    900: '#171923',
  },
  app: {
    background: '#F0F4F8',
    surface: '#FFFFFF',
    borderSubtle: '#E2E8F0',
    /** Верхние иконки в pill-сайдбара (Figma) */
    shellStripIconBg: '#AEB8D5',
    /** Иконка на лавандовом фоне полосы (Button variant shellLavender), шапка сайдбара, pill */
    shellStripIconFg: '#223B77',
    /** Hover активного пункта навигации сайдбара */
    shellNavActiveHover: '#2a4688',
    /** Обводка pill-колонки иконок */
    shellPillBorder: '#374A76',
    /** Focus ring (outline) для ссылок навигации — 50% от shellStripIconFg */
    shellStripIconFgFocusRing: 'rgba(34, 59, 119, 0.5)',
    shellStripIconHover: '#9DACC8',
    shellStripIconActive: '#8A9BB8',
    /** Полупрозрачный серо-голубой (hover нижней полосы / альт. фон иконки) */
    shellStripMutedBg: 'rgba(174, 184, 213, 0.37)',
    shellStripMutedHover: 'rgba(174, 184, 213, 0.5)',
    shellStripMutedActive: 'rgba(174, 184, 213, 0.6)',
    test: 'rgba(255, 0, 0, 0.6)',
  },
  status: {
    urgent: {
      bg: '#FDE8EC',
      fg: '#9B1C31',
    },
    success: {
      bg: '#E6F7EF',
      fg: '#1B5E3B',
    },
    info: {
      bg: '#E5F0FF',
      fg: '#223B77',
    },
    warning: {
      bg: '#FFF0E5',
      fg: '#B45309',
    },
    neutral: {
      bg: '#EDF2F7',
      fg: '#4A5568',
    },
  },
} as const;

export type Colors = typeof colors;
