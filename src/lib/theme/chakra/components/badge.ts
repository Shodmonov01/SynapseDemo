import { colors } from '../../tokens/colors';
import { radii } from '../../tokens/radii';

import type { ComponentStyleConfig } from '@chakra-ui/react';

export const Badge: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: radii.pill,
    fontWeight: 'semibold',
    textTransform: 'none',
    px: 2.5,
    py: 0.5,
    fontSize: 'xs',
  },
  variants: {
    subtle: {},
    statusUrgent: {
      bg: colors.status.urgent.bg,
      color: colors.status.urgent.fg,
    },
    statusSuccess: {
      bg: colors.status.success.bg,
      color: colors.status.success.fg,
    },
    statusInfo: {
      bg: colors.status.info.bg,
      color: colors.status.info.fg,
    },
    statusWarning: {
      bg: colors.status.warning.bg,
      color: colors.status.warning.fg,
    },
    statusNeutral: {
      bg: colors.status.neutral.bg,
      color: colors.status.neutral.fg,
    },
  },
  defaultProps: {
    variant: 'subtle',
  },
};
