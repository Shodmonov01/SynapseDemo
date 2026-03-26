import { radii } from '../tokens/radii';

import type { ComponentStyleConfig } from '@chakra-ui/react';

export const buttonTheme: ComponentStyleConfig = {
  baseStyle: {
    fontWeight: 'semibold',
    borderRadius: radii.xl,
  },
  defaultProps: {
    colorScheme: 'brand',
    variant: 'solid',
  },
};
