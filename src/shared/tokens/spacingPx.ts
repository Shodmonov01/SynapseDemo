/**
 * Шкала отступов и размеров Chakra в px (1 step ≈ 4px, как у дефолтной темы при 16px root).
 */
export const spacePx = {
  px: '1px',
  0.5: '2px',
  1: '4px',
  1.5: '6px',
  2: '8px',
  2.5: '10px',
  3: '12px',
  3.5: '14px',
  4: '16px',
  5: '20px',
  6: '24px',
  7: '28px',
  8: '32px',
  9: '36px',
  10: '40px',
  12: '48px',
  14: '56px',
  16: '64px',
  20: '80px',
  24: '96px',
  28: '112px',
  32: '128px',
  36: '144px',
  40: '160px',
  44: '176px',
  48: '192px',
  52: '208px',
  56: '224px',
  60: '240px',
  64: '256px',
  72: '288px',
  80: '320px',
  96: '384px',
} as const;

const largeSizesPx = {
  max: 'max-content',
  min: 'min-content',
  full: '100%',
  '3xs': '224px',
  '2xs': '256px',
  xs: '320px',
  sm: '384px',
  md: '448px',
  lg: '512px',
  xl: '576px',
  '2xl': '672px',
  '3xl': '768px',
  '4xl': '896px',
  '5xl': '1024px',
  '6xl': '1152px',
  '7xl': '1280px',
  '8xl': '1440px',
  /** Было 60ch — фиксированная ширина для типографики */
  prose: '720px',
} as const;

const containerPx = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
} as const;

export const sizesPx = {
  ...spacePx,
  ...largeSizesPx,
  container: containerPx,
} as const;
