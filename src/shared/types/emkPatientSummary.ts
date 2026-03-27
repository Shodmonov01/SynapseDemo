import type { StatusTone } from './status';

/**
 * Краткие данные пациента для шапки ЭМК (карточка над таблицей).
 */
export interface EmkPatientSummary {
  fullName: string;
  /** Например P0000001/27 */
  patientIdLabel: string;
  /** Например «24 года, муж.» */
  ageAndGender: string;
  pinfl: string;
  dateOfBirth: string;
  contactPhone: string;
  residence: string;
  /** Категория обслуживания, напр. «Амбулаторный» */
  careCategoryLabel: string;
  careCategoryTone?: StatusTone;
  isVip?: boolean;
  avatarSrc?: string;
  avatarName?: string;
}
