import type * as React from 'react';

import { synapseTheme } from './chakra/theme';

import { ChakraProvider } from '@chakra-ui/react';

export interface AppThemeProviderProps {
  children: React.ReactNode;
}

export const AppThemeProvider: React.FC<AppThemeProviderProps> = ({ children }) => {
  return <ChakraProvider theme={synapseTheme}>{children}</ChakraProvider>;
};
