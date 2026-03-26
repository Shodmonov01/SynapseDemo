import { colors } from '../tokens/colors';
import { radii } from '../tokens/radii';

import type { ComponentStyleConfig } from '@chakra-ui/react';

export const tabsTheme: ComponentStyleConfig = {
  variants: {
    pill: {
      tablist: {
        bg: 'transparent',
        gap: 2,
        p: 1,
      },
      tab: {
        borderRadius: radii.pill,
        fontWeight: 'medium',
        color: colors.neutral[600],
        px: 5,
        py: 2,
        _selected: {
          bg: colors.brand[500],
          color: 'white',
        },
        _hover: {
          color: colors.neutral[800],
          _selected: { color: 'white' },
        },
      },
      tabpanel: {
        pt: 4,
      },
    },
  },
  defaultProps: {
    variant: 'pill',
    colorScheme: 'brand',
  },
};
