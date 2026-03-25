import type { ComponentStyleConfig } from '@chakra-ui/react';
import { colors } from '../../tokens/colors';

export const Avatar: ComponentStyleConfig = {
  baseStyle: {
    container: {
      borderWidth: '3px',
      borderColor: colors.app.surface,
      boxShadow: '0 2px 8px rgba(26, 54, 93, 0.12)',
    },
  },
};
