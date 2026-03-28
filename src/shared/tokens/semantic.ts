import { colors } from './colors';

/**
 * Семантические токены для Chakra semanticTokens и прикладного кода.
 */
export const semantic = {
  bg: {
    app: colors.app.background,
    surface: colors.app.surface,
    toolbar: colors.app.shellStripIconFg,
    tableNested: '#EBF4FF',
    /** Фон вложенной таблицы в раскрытой строке (ExpandableTable) */
    nestedTableSurface: '#F7F9FD',
  },
  fg: {
    default: colors.neutral[800],
    muted: colors.neutral[600],
    onBrand: '#FFFFFF',
  },
  border: {
    subtle: colors.app.borderSubtle,
    nestedTable: '#D6D6D6',
  },
  status: colors.status,
} as const;

export type SemanticTokens = typeof semantic;
