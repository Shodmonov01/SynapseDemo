import { REGISTRATION_MEDICAL_TAB_IDS } from './registrationMedicalTabIds';

import type { TabbedTableSectionTab } from 'shared';

/**
 * Конфигурация ряда табов (см. макет «ЭМК»): порядок и подписи.
 * Данные статичны до подключения API справочника вкладок.
 */
export const REGISTRATION_MEDICAL_TABS: TabbedTableSectionTab[] = [
  { id: REGISTRATION_MEDICAL_TAB_IDS.visits, label: 'Все визиты' },
  { id: REGISTRATION_MEDICAL_TAB_IDS.consultation, label: 'Консультация врача' },
  {
    id: REGISTRATION_MEDICAL_TAB_IDS.instrumental,
    label: 'Инструментальные иследования',
  },
  { id: REGISTRATION_MEDICAL_TAB_IDS.lab, label: 'Лабороторные иследования' },
  { id: REGISTRATION_MEDICAL_TAB_IDS.medicalDocs, label: 'Медицинские документы' },
  { id: REGISTRATION_MEDICAL_TAB_IDS.files, label: 'Файлы' },
];
