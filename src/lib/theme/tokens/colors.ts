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
      fg: '#1A365D',
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
