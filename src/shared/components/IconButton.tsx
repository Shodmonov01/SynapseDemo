import type * as React from 'react';

import {
  IconButton as ChakraIconButton,
  type IconButtonProps as ChakraIconButtonProps,
} from '@chakra-ui/react';

export type IconButtonVariant = NonNullable<ChakraIconButtonProps['variant']>;

export interface IconButtonProps extends ChakraIconButtonProps {
  href?: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  variant = 'shellLavender',
  size = 'strip',
  href,
  isDisabled,
  onClick,
  sx,
  ...rest
}) => {
  const isLink = Boolean(href) && !isDisabled;

  return (
    <ChakraIconButton
      variant={variant}
      size={size}
      {...rest}
      sx={sx}
      as={isLink ? 'a' : undefined}
      href={isLink ? href : undefined}
      type={isLink ? undefined : 'button'}
      isDisabled={isLink ? false : isDisabled}
      onClick={isLink ? undefined : onClick}
    />
  );
};
