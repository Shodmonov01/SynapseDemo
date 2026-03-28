export type AppointmentStatus = 'waiting' | 'queue' | 'reception' | 'done';

// Column order for forward-only drag validation
export const COLUMN_ORDER: AppointmentStatus[] = [
  'waiting',
  'queue',
  'reception',
  'done',
];

export interface Appointment {
  id: string;
  patientName: string;
  doctor: string;
  cabinet: string;
  time: string;
  date: string; // ISO date string YYYY-MM-DD
  discount?: string;
  status: AppointmentStatus;
  direction?: string;
  service?: string;
}

export interface NewAppointmentForm {
  direction: string;
  doctor: string;
  service: string;
  date: string;
  patientName: string;
  cabinet: string;
  time: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  arrivalTime: string;
  departureTime: string;
  recordsCount: number;
  queueCount: number;
  completedCount: number;
  doctorStatus:
    | 'На операции'
    | 'Обед'
    | 'На приёме'
    | 'Закрыть очередь'
    | 'Отпуск'
    | 'Не пришел'
    | 'Приём';
}

export interface KanbanColumn {
  id: AppointmentStatus;
  title: string;
  color: string;
  bgColor: string;
}
