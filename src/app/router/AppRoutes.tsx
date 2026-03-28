import type { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import { PageShell } from 'app/PageShell';
import { URLS } from 'app/router/urls.tsx';

import { DoctorVisitPage } from '../../pages/registration/DoctorVisitPage/DoctorVisitPage.tsx';
import { QueuePage } from '../../pages/registration/QueuePage/QueuePage.tsx';
import { RegistrationMedicalDocumentsPage } from '../../pages/registration/RegistrationMedicalDocumentsPage.tsx';
import { RegistrationVisitsPage } from '../../pages/registration/RegistrationVisitsPage/RegistrationVisitsPage.tsx';

import { Text } from '@chakra-ui/react';

const ShellSectionPlaceholder = () => (
  <Text fontSize='sm' color='fg.muted'>
    Раздел в разработке
  </Text>
);

export const appRoutes: RouteObject[] = [
  {
    path: URLS.REGISTRATION_MEDICAL_DOCUMENTS,
    element: <RegistrationMedicalDocumentsPage />,
  },
  {
    path: '/',
    element: <PageShell />,
    children: [
      { index: true, element: <Navigate to={URLS.WORKSPACE_EMK} replace /> },
      {
        path: 'workspace/emk',
        element: <RegistrationMedicalDocumentsPage />,
      },
      { path: '*', element: <ShellSectionPlaceholder /> },
      {
        path: URLS.REGISTRATION_VISITS,
        element: <RegistrationVisitsPage />,
      },
      {
        path: URLS.REGISTRATION_QUEUE,
        element: <QueuePage />,
      },
      {
        path: URLS.REGISTRATION_DOCTOR_VISIT,
        element: <DoctorVisitPage />,
      },
    ],
  },
];
