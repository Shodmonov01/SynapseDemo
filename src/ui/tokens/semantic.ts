import { colors } from './colors';

/**
 * Семантические токены для Chakra semanticTokens и прикладного кода.
 */
export const semantic = {
  bg: {
    app: colors.app.background,
    surface: colors.app.surface,
    toolbar: colors.brand[500],
    tableNested: '#EBF4FF',
  },
  fg: {
    default: colors.neutral[800],
    muted: colors.neutral[600],
    onBrand: '#FFFFFF',
  },
  border: {
    subtle: colors.app.borderSubtle,
  },
  status: colors.status,
} as const;

export type SemanticTokens = typeof semantic;
