import * as React from 'react';

import {
  IconButton as ChakraIconButton,
  type IconButtonProps as ChakraIconButtonProps,
} from '@chakra-ui/react';

/** Варианты темы `button` для полосы сайдбара: `shellLavender`, `shellMuted`. */
export type IconButtonVariant = 'shellLavender' | 'shellMuted';

export interface IconButtonProps extends Omit<ChakraIconButtonProps, 'variant'> {
  variant?: IconButtonVariant;
  /** При `href` и `!isDisabled` рендерится как ссылка */
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
      variant={variant as ChakraIconButtonProps['variant']}
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
