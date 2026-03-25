import type { ComponentStyleConfig } from '@chakra-ui/react';
import { colors } from '../../tokens/colors';
import { radii } from '../../tokens/radii';

export const Input: ComponentStyleConfig = {
  variants: {
    outline: {
      field: {
        borderColor: colors.neutral[200],
        borderRadius: radii.xl,
        bg: colors.app.surface,
        _hover: { borderColor: colors.neutral[300] },
        _focusVisible: {
          borderColor: colors.brand[400],
          boxShadow: `0 0 0 1px ${colors.brand[400]}`,
        },
      },
    },
    search: {
      field: {
        borderRadius: radii.pill,
        bg: colors.app.surface,
        borderColor: colors.neutral[200],
        h: '40px',
        pl: 4,
        pr: 10,
        _focusVisible: {
          borderColor: colors.brand[400],
          boxShadow: `0 0 0 1px ${colors.brand[400]}`,
        },
      },
    },
  },
  defaultProps: {
    variant: 'outline',
    size: 'md',
  },
};
