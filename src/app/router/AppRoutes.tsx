import type { RouteObject } from 'react-router-dom';

import { PageShell } from 'app/PageShell';
import { URLS } from 'app/router/urls.tsx';

import { Registration } from '../../pages/registration/Registration.tsx';

export const appRoutes: RouteObject[] = [
  {
    path: URLS.REGISTRATION,
    element: <Registration />,
  },
  {
    path: '/',
    element: <PageShell />,
  },
];
