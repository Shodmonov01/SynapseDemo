import type { DoctorRow, QueuePatient } from './queue.types';

export function formatElapsed(since: string): string {
  const diff = Math.floor((Date.now() - new Date(since).getTime()) / 1000);
  const h = Math.floor(diff / 3600)
    .toString()
    .padStart(2, '0');
  const m = Math.floor((diff % 3600) / 60)
    .toString()
    .padStart(2, '0');
  const s = (diff % 60).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
}

let _pid = 1;
export function makePatient(doctor: string): QueuePatient {
  return {
    id: `p${_pid++}`,
    name: ['Рахимов Д.Н.', 'Петров С.К.', 'Иванов А.П.', 'Козлов Д.Р.', 'Смирнов Л.Р.'][
      Math.floor(Math.random() * 5)
    ],
    doctor,
    time: '12:00',
    waitingSince: new Date().toISOString(),
  };
}

export const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  'На операции': { bg: '#EEF2FF', color: '#4F46E5' },
  Обед: { bg: '#FEF9C3', color: '#854D0E' },
  'Не пришел': { bg: '#FEE2E2', color: '#991B1B' },
  Принимает: { bg: '#DCFCE7', color: '#166534' },
  Отпуск: { bg: '#F3F4F6', color: '#374151' },
  Завершил: { bg: '#F0FDF4', color: '#15803D' },
};

export function seedDoctors(): DoctorRow[] {
  const statuses: DoctorRow['status'][] = [
    'На операции',
    'Обед',
    'Не пришел',
    'Принимает',
    'Отпуск',
    'Завершил',
  ];
  return Array.from({ length: 6 }, (_, i) => {
    const name = `Омонов С.В. ${i + 1}`;
    const queue = Array.from({ length: 3 }, () => makePatient(name));
    return {
      id: `doc${i}`,
      name: 'Омонов С.В.',
      role: 'врач, гтотолог',
      arrivalTime: ['09:05', '09:03', '08:50', '09:00', '09:00', '09:00'][i],
      departureTime: '18:23',
      recordsCount: 15,
      queueCount: 5,
      completedCount: 3,
      status: statuses[i],
      queue,
      active: null,
      completed: [],
    };
  });
}
