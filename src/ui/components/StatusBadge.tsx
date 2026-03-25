import type * as React from 'react';

import type { StatusTone } from '../types/status';

import { Badge, type BadgeProps } from '@chakra-ui/react';

const toneToVariant: Record<StatusTone, NonNullable<BadgeProps['variant']> | string> = {
  urgent: 'statusUrgent',
  success: 'statusSuccess',
  info: 'statusInfo',
  warning: 'statusWarning',
  neutral: 'statusNeutral',
};

export interface StatusBadgeProps extends Omit<BadgeProps, 'variant'> {
  tone: StatusTone;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ tone, children, ...rest }) => {
  const variant = toneToVariant[tone] as BadgeProps['variant'];

  return (
    <Badge variant={variant} {...rest}>
      {children}
    </Badge>
  );
};
