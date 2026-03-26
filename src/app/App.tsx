import type * as React from 'react';

import { RouterProvider } from 'react-router-dom';

import { ShellProviders } from 'app/providers/ShellProviders';
import { appRouter } from 'app/router/AppRouter';

export const App: React.FC = () => {
  return (
    <ShellProviders>
      <RouterProvider router={appRouter} />
    </ShellProviders>
  );
};
