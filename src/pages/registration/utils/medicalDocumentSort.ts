import type { AppTableSortDirection } from 'shared';

import type { MedicalDocumentRow } from '../types/medicalDocumentRow';

/**
 * Собирает timestamp из полей `date` + `time` строки для сортировки по дате/времени.
 */
export function medicalDocumentRowDateTimeValue(row: MedicalDocumentRow): number {
  const [d, m, y] = row.date.split('.').map(Number);
  const [hh, mm] = row.time.split(':').map(Number);
  return new Date(y, m - 1, d, hh, mm).getTime();
}

/**
 * Клиентская сортировка мок-данных по активной колонке (пока нет серверной сортировки).
 */
export function compareMedicalDocumentRows(
  a: MedicalDocumentRow,
  b: MedicalDocumentRow,
  columnId: string,
  direction: AppTableSortDirection,
): number {
  const sign = direction === 'asc' ? 1 : -1;
  const cmpStr = (x: string, y: string) =>
    x.localeCompare(y, 'ru', { sensitivity: 'base' }) * sign;
  switch (columnId) {
    case 'date':
      return (medicalDocumentRowDateTimeValue(a) - medicalDocumentRowDateTimeValue(b)) * sign;
    case 'clinic':
      return cmpStr(a.clinic, b.clinic);
    case 'doctor':
      return cmpStr(a.doctorName, b.doctorName);
    case 'service':
      return cmpStr(a.service, b.service);
    default:
      return 0;
  }
}
