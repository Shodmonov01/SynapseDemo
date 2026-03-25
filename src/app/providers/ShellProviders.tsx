import * as React from 'react';
import { AppThemeProvider } from '@synapse/theme';

export interface ShellProvidersProps {
  children: React.ReactNode;
}

/**
 * Корневые провайдеры шелла: тема Chakra и далее (React Query, роутер и т.д.).
 */
export const ShellProviders: React.FC<ShellProvidersProps> = ({ children }) => {
  return <AppThemeProvider>{children}</AppThemeProvider>;
};
