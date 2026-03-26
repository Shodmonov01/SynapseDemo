import type * as React from 'react';

import { radii } from '../tokens';
import { colors } from '../tokens/colors';

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
      <Avatar
        borderRadius={borderRadius}
        borderWidth='3px'
        borderColor={colors.app.surface}
        boxShadow='0 2px 8px rgba(26, 54, 93, 0.12)'
        {...rest}
      />
    </Box>
  );
};
