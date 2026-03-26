import { colors } from '../tokens/colors';
import { radii } from '../tokens/radii';

import type { ComponentStyleConfig } from '@chakra-ui/react';

/** IconButton рендерится как Button — варианты должны быть здесь, не в отдельном IconButton-теме. */
const iconChildAlign = {
  '& > *': { display: 'block', lineHeight: 0, flexShrink: 0 },
};

export const buttonTheme: ComponentStyleConfig = {
  baseStyle: {
    fontWeight: 'semibold',
    borderRadius: radii.xl,
  },
  variants: {
    /** Верхняя полоса сайдбара (shared IconButton) */
    shellLavender: {
      bg: colors.app.shellStripIconBg,
      color: colors.app.shellStripIconFg,
      _hover: { bg: colors.app.shellStripIconHover },
      _active: { bg: colors.app.shellStripIconActive },
      borderRadius: 'full',
      ...iconChildAlign,
    },
    shellMuted: {
      bg: colors.app.shellStripMutedBg,
      color: 'white',
      _hover: { bg: colors.app.shellStripMutedHover },
      _active: { bg: colors.app.shellStripMutedActive },
      borderRadius: 'full',
      ...iconChildAlign,
    },
    /** Иконки на тёмном toolbar (ActionIconButton) */
    toolbar: {
      color: 'white',
      bg: 'whiteAlpha.200',
      _hover: { bg: 'whiteAlpha.300' },
      _active: { bg: 'whiteAlpha.400' },
      ...iconChildAlign,
    },
  },
  sizes: {
    /** 36×36 для полосы сайдбара */
    strip: {
      minW: 9,
      h: 9,
      fontSize: 'md',
    },
  },
  defaultProps: {
    colorScheme: 'brand',
    variant: 'solid',
  },
};
