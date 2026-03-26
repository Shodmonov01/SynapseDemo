import type * as React from 'react';

import { AppThemeProvider } from 'shared/AppThemeProvider';

export interface ShellProvidersProps {
  children: React.ReactNode;
}

export const ShellProviders: React.FC<ShellProvidersProps> = ({ children }) => {
  return <AppThemeProvider>{children}</AppThemeProvider>;
};
