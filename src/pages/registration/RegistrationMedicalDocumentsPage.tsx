import * as React from 'react';
import { useLocation } from 'react-router-dom';

import { URLS } from 'app/router/urls.tsx';

import { REGISTRATION_MEDICAL_TAB_IDS } from './constants/registrationMedicalTabIds';
import { REGISTRATION_MEDICAL_TABS } from './constants/registrationMedicalTabs';
import { MOCK_EMK_PATIENT } from './mocks/emkPatientSummary.mock';
import { AllVisitsTab } from './tabs/AllVisitsTab';
import { MedicalDocumentsTab } from './tabs/MedicalDocumentsTab';
import { RegistrationPlaceholderTab } from './tabs/RegistrationPlaceholderTab';

import { Box, VStack } from '@chakra-ui/react';
import { EmkPatientSummaryCard, TabbedTableSection } from 'shared';

/**
 * Страница медицинских документов / ЭМК в контексте регистратуры.
 *
 * **Два режима рендера:**
 * - `standalone` — полный маршрут (например демо или отдельное окно): оборачиваем в `minH`, фон задаётся снаружи при необходимости.
 * - вложенная в `PageShell` — только контент без внешней оболочки (отступы даёт shell).
 *
 * **Структура:** карточка пациента ЭМК (`EmkPatientSummaryCard`), затем `TabbedTableSection` с рядом вкладок и контентом таблицы по `activeTabId`.
 */
export const RegistrationMedicalDocumentsPage: React.FC = () => {
  const { pathname } = useLocation();

  /** Прямой заход на URL страницы — без сайдбара в демо или с полной вёрсткой, зависит от маршрутизатора. */
  const standalone = pathname === URLS.REGISTRATION_MEDICAL_DOCUMENTS;

  /** Активная вкладка блока табов (локальный UI state до синхронизации с query или store). */
  const [activeTabId, setActiveTabId] = React.useState<string>(
    REGISTRATION_MEDICAL_TAB_IDS.visits,
  );

  /**
   * Контент области под табами: каждая вкладка — отдельный компонент, чтобы не раздувать страницу.
   * Зависимость только от `activeTabId`: внутреннее состояние вкладок живёт внутри соответствующих табов.
   */
  const tabContent = React.useMemo(() => {
    switch (activeTabId) {
      case REGISTRATION_MEDICAL_TAB_IDS.visits:
        return <AllVisitsTab />;

      case REGISTRATION_MEDICAL_TAB_IDS.medicalDocs:
        return <MedicalDocumentsTab />;

      default:
        return <RegistrationPlaceholderTab />;
    }
  }, [activeTabId]);

  const body = (
    <>
      <VStack align='stretch' spacing={4}>
        <EmkPatientSummaryCard patient={MOCK_EMK_PATIENT} />
        <TabbedTableSection
          tabs={REGISTRATION_MEDICAL_TABS}
          activeTabId={activeTabId}
          onTabChange={setActiveTabId}
        >
          {tabContent}
        </TabbedTableSection>
      </VStack>
    </>
  );

  if (standalone) {
    return <Box minH='100vh'>{body}</Box>;
  }

  return body;
};
