import type * as React from 'react';

import { colors } from '../tokens/colors';
import { radii } from '../tokens/radii';
import type { StatusTone } from '../types/status';

import { Badge, type BadgeProps } from '@chakra-ui/react';
import type { SystemStyleObject } from '@chakra-ui/styled-system';

const baseSx: SystemStyleObject = {
  borderRadius: radii.pill,
  fontWeight: 'semibold',
  textTransform: 'none',
  px: 2.5,
  py: 0.5,
  fontSize: 'xs',
};

const toneSx: Record<StatusTone, SystemStyleObject> = {
  urgent: { bg: colors.status.urgent.bg, color: colors.status.urgent.fg },
  success: { bg: colors.status.success.bg, color: colors.status.success.fg },
  info: { bg: colors.status.info.bg, color: colors.status.info.fg },
  warning: { bg: colors.status.warning.bg, color: colors.status.warning.fg },
  neutral: { bg: colors.status.neutral.bg, color: colors.status.neutral.fg },
};

export interface StatusBadgeProps extends Omit<BadgeProps, 'variant'> {
  tone: StatusTone;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  tone,
  children,
  sx,
  ...rest
}) => {
  return (
    <Badge sx={{ ...baseSx, ...toneSx[tone], ...sx }} {...rest}>
      {children}
    </Badge>
  );
};
