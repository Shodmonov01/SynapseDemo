import type * as React from 'react';

import { radii } from 'ui/tokens';

import { Avatar, type AvatarProps, Box } from '@chakra-ui/react';

export interface AvatarPanelProps extends AvatarProps {
  /** Обводка «рамка» как в дизайне */
  framed?: boolean;
}

export const AvatarPanel: React.FC<AvatarPanelProps> = ({
  framed = true,
  borderRadius = radii.xl,
  ...rest
}) => {
  return (
    <Box
      borderRadius={borderRadius}
      p={framed ? 1 : 0}
      bg={framed ? 'bg.surface' : 'transparent'}
      boxShadow={framed ? 'md' : undefined}
    >
      <Avatar borderRadius={borderRadius} {...rest} />
    </Box>
  );
};
