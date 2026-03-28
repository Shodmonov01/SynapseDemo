import type { VisitStatus } from './visits.types';

export const STATUS_COLORS: Record<VisitStatus, { bg: string; color: string }> = {
  Оплачен: { bg: '#DCFCE7', color: '#166534' },
  Отказ: { bg: '#FEE2E2', color: '#991B1B' },
  'В процессе': { bg: '#DBEAFE', color: '#1E40AF' },
  Предварительный: { bg: '#FEF9C3', color: '#854D0E' },
  Выполнен: { bg: '#E0F2FE', color: '#0369A1' },
  Ожидание: { bg: '#F3E8FF', color: '#6B21A8' },
};

let _vid = 1;
export function seedVisits(): import('./visits.types').Visit[] {
  const statuses: VisitStatus[] = [
    'Оплачен',
    'Отказ',
    'В процессе',
    'Предварительный',
    'Выполнен',
    'Ожидание',
    'Отказ',
    'В процессе',
  ];
  return statuses.map((status, i) => ({
    id: `PA0000001/${27 + i}`,
    patientName: 'Рахимов Д.Н.',
    patientPhone: '+998 99 258 25 25',
    patientId: `PA0000001/${27 + i}`,
    doctor: 'Омонов С.В.',
    doctorRole: 'врач, гтотолог',
    location: 'Юнусабад',
    address: 'ул. Уваиси 34-46-56',
    status,
    date: '16.02.2026',
    time: '16:15',
    lat: 41.299 + i * 0.012,
    lng: 69.24 + i * 0.015,
  }));
}
