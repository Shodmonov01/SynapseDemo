export type VisitStatus =
  | 'Оплачен'
  | 'Отказ'
  | 'В процессе'
  | 'Предварительный'
  | 'Выполнен'
  | 'Ожидание';

export interface Visit {
  id: string;
  patientName: string;
  patientPhone: string;
  patientId: string;
  doctor: string;
  doctorRole: string;
  location: string;
  address: string;
  status: VisitStatus;
  date: string;
  time: string;
  lat: number;
  lng: number;
}
