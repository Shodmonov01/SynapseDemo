export type DoctorStatus =
  | 'На операции'
  | 'Обед'
  | 'Не пришел'
  | 'Принимает'
  | 'Отпуск'
  | 'Завершил';

export interface QueuePatient {
  id: string;
  name: string;
  doctor: string;
  time: string;
  waitingSince: string; // ISO string
}

export interface DoctorRow {
  id: string;
  name: string;
  role: string;
  arrivalTime: string;
  departureTime: string;
  recordsCount: number;
  queueCount: number;
  completedCount: number;
  status: DoctorStatus;
  queue: QueuePatient[];
  active: QueuePatient | null;
  completed: QueuePatient[];
}
