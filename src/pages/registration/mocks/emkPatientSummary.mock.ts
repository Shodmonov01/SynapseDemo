import type { EmkPatientSummary } from 'shared/types/emkPatientSummary';

/** Демо-данные карточки пациента ЭМК до подключения API */
export const MOCK_EMK_PATIENT: EmkPatientSummary = {
  fullName: 'Рахимов Диёр Нуруллаевич',
  patientIdLabel: 'P0000001/27',
  ageAndGender: '24 года, муж.',
  pinfl: '213248723987482749',
  dateOfBirth: '04.07.2002 г.',
  contactPhone: '+998 (90) 355-39-26',
  residence: 'г. Ташкент, Алмазарский район',
  careCategoryLabel: 'Амбулаторный',
  careCategoryTone: 'info',
  isVip: true,
  avatarName: 'РДН',
};
