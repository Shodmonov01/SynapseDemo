import { buttonTheme } from './button';
import { cardTheme } from './card';
import { iconButtonTheme } from './iconButton';
import { tableTheme } from './table';
import { tabsTheme } from './tabs';
import { colors } from '../tokens/colors';
import { radii } from '../tokens/radii';
import { semantic } from '../tokens/semantic';
import { shadows } from '../tokens/shadows';
import { typography } from '../tokens/typography';

import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

export const synapseTheme = extendTheme({
  config,
  colors: {
    brand: colors.brand,
    app: {
      bg: colors.app.background,
      surface: colors.app.surface,
      border: colors.app.borderSubtle,
    },
    status: {
      urgentBg: colors.status.urgent.bg,
      urgentFg: colors.status.urgent.fg,
      successBg: colors.status.success.bg,
      successFg: colors.status.success.fg,
      infoBg: colors.status.info.bg,
      infoFg: colors.status.info.fg,
      warningBg: colors.status.warning.bg,
      warningFg: colors.status.warning.fg,
      neutralBg: colors.status.neutral.bg,
      neutralFg: colors.status.neutral.fg,
    },
  },
  fonts: {
    body: typography.fonts.body,
    heading: typography.fonts.heading,
  },
  fontSizes: {
    ...typography.fontSizes,
  },
  radii: {
    ...radii,
  },
  shadows: {
    card: shadows.card,
    cardHover: shadows.cardHover,
  },
  semanticTokens: {
    colors: {
      'bg.app': semantic.bg.app,
      'bg.surface': semantic.bg.surface,
      'bg.toolbar': semantic.bg.toolbar,
      'bg.tableNested': semantic.bg.tableNested,
      'fg.default': semantic.fg.default,
      'fg.muted': semantic.fg.muted,
      'fg.onBrand': semantic.fg.onBrand,
      'border.subtle': semantic.border.subtle,
    },
  },
  styles: {
    global: {
      body: {
        bg: semantic.bg.app,
        color: semantic.fg.default,
        fontFamily: 'body',
      },
    },
  },
  components: {
    Button: buttonTheme,
    IconButton: iconButtonTheme,
    Tabs: tabsTheme,
    Table: tableTheme,
    Card: cardTheme,
  },
});

export type SynapseTheme = typeof synapseTheme;
