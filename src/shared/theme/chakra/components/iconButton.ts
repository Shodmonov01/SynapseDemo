import type { ComponentStyleConfig } from '@chakra-ui/react';
import { radii } from '../../tokens/radii';

export const IconButton: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: radii.pill,
  },
  variants: {
    solid: {},
    outline: {},
    ghost: {
      _hover: { bg: 'blackAlpha.50' },
    },
    toolbar: {
      color: 'white',
      bg: 'whiteAlpha.200',
      _hover: { bg: 'whiteAlpha.300' },
      _active: { bg: 'whiteAlpha.400' },
    },
  },
  sizes: {
    sm: {
      minW: 8,
      h: 8,
      fontSize: 'md',
    },
    md: {
      minW: 10,
      h: 10,
      fontSize: 'lg',
    },
  },
  defaultProps: {
    variant: 'ghost',
    size: 'md',
  },
};
