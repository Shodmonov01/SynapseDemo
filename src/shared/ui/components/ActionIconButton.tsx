import { IconButton, type IconButtonProps } from '@chakra-ui/react';
import * as React from 'react';

export interface ActionIconButtonProps extends IconButtonProps {
  /** Пресет для иконок на тёмном toolbar */
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
