/**
 * Идентификаторы вкладок блока «ЭМК / документы» на странице регистратуры.
 * Должны совпадать с полем `id` в `REGISTRATION_MEDICAL_TABS` (файл `registrationMedicalTabs.ts`).
 */
export const REGISTRATION_MEDICAL_TAB_IDS = {
  /** Сводная таблица визитов пациента. */
  visits: 'visits',
  /** Заглушки / будущие разделы. */
  consultation: 'consultation',
  instrumental: 'instrumental',
  lab: 'lab',
  /** Таблица медицинских документов с файлами. */
  medicalDocs: 'medical-docs',
  files: 'files',
} as const;

export type RegistrationMedicalTabId =
  (typeof REGISTRATION_MEDICAL_TAB_IDS)[keyof typeof REGISTRATION_MEDICAL_TAB_IDS];
