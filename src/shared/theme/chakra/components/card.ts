import type { ComponentStyleConfig } from '@chakra-ui/react';
import { colors } from '../../tokens/colors';
import { radii } from '../../tokens/radii';
import { shadows } from '../../tokens/shadows';

export const Card: ComponentStyleConfig = {
  baseStyle: {
    container: {
      borderRadius: radii['2xl'],
      bg: colors.app.surface,
      boxShadow: shadows.card,
      borderWidth: '1px',
      borderColor: colors.app.borderSubtle,
      overflow: 'hidden',
    },
    body: {
      p: 6,
    },
    header: {
      px: 6,
      pt: 6,
      pb: 0,
    },
    footer: {
      px: 6,
      py: 4,
    },
  },
  variants: {
    elevated: {
      container: {
        boxShadow: shadows.card,
      },
    },
    flat: {
      container: {
        boxShadow: 'none',
      },
    },
    summary: {
      container: {
        borderRadius: radii['2xl'],
        boxShadow: shadows.card,
        position: 'relative',
      },
    },
  },
  defaultProps: {
    variant: 'elevated',
  },
};
