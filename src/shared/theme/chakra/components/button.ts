import type { ComponentStyleConfig } from '@chakra-ui/react';
import { radii } from '../../tokens/radii';

export const Button: ComponentStyleConfig = {
  baseStyle: {
    fontWeight: 'semibold',
    borderRadius: radii.xl,
  },
  defaultProps: {
    colorScheme: 'brand',
    variant: 'solid',
  },
};
