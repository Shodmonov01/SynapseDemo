import { colors } from '../tokens/colors';
import { semantic } from '../tokens/semantic';

import type { ComponentStyleConfig } from '@chakra-ui/react';

export const tableTheme: ComponentStyleConfig = {
  variants: {
    soft: {
      th: {
        bg: colors.brand[500],
        color: 'white',
        fontSize: 'xs',
        fontWeight: 'semibold',
        textTransform: 'none',
        letterSpacing: 'normal',
        borderBottom: 'none',
        py: 3,
        px: 4,
        _first: { borderTopLeftRadius: 'xl' },
        _last: { borderTopRightRadius: 'xl' },
      },
      td: {
        borderBottom: `1px solid ${semantic.border.subtle}`,
        fontSize: 'sm',
        py: 3,
        px: 4,
        verticalAlign: 'middle',
      },
      tr: {
        _last: {
          td: { borderBottom: 'none' },
        },
      },
    },
    simple: {
      th: {
        borderBottom: `1px solid ${semantic.border.subtle}`,
        color: colors.neutral[600],
        fontSize: 'xs',
        fontWeight: 'semibold',
      },
      td: {
        borderBottom: `1px solid ${semantic.border.subtle}`,
        fontSize: 'sm',
      },
    },
  },
  defaultProps: {
    variant: 'soft',
  },
};
