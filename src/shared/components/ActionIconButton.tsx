import * as React from 'react';

import { IconButton, type IconButtonProps } from '@chakra-ui/react';

export interface ActionIconButtonProps extends IconButtonProps {
  toolbar?: boolean;
}

export const ActionIconButton: React.FC<ActionIconButtonProps> = ({
  toolbar,
  variant,
  size = 'sm',
  ...rest
}) => {
  const resolvedVariant = React.useMemo(() => {
    if (toolbar) {
      return 'toolbar' as IconButtonProps['variant'];
    }
    return variant ?? 'ghost';
  }, [toolbar, variant]);

  return <IconButton variant={resolvedVariant} size={size} {...rest} />;
};
