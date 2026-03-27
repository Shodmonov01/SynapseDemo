import type { StatusTone } from 'shared';

import type { ServiceStatus, VisitStatus, VisitType, VisitUrgency } from '../types/visit';

export interface StatusMapping {
  label: string;
  tone: StatusTone;
}

export const URGENCY_MAP: Record<VisitUrgency, StatusMapping> = {
  urgent: { label: 'Срочно', tone: 'urgent' },
  deferred: { label: 'Отсрочено', tone: 'info' },
  normal: { label: 'Обычный', tone: 'neutral' },
};

export const VISIT_STATUS_MAP: Record<VisitStatus, StatusMapping> = {
  on_reception: { label: 'На приёме', tone: 'success' },
  waiting: { label: 'Ожидание', tone: 'neutral' },
  completed: { label: 'Завершён', tone: 'info' },
  cancelled: { label: 'Отменён', tone: 'urgent' },
};

export const VISIT_TYPE_MAP: Record<VisitType, StatusMapping> = {
  inpatient: { label: 'Стационарный', tone: 'info' },
  outpatient: { label: 'Амбулаторный', tone: 'warning' },
  home: { label: 'Домашний', tone: 'neutral' },
};

export const SERVICE_STATUS_MAP: Record<ServiceStatus, StatusMapping> = {
  preliminary: { label: 'Предварительный', tone: 'neutral' },
  paid: { label: 'Оплачен', tone: 'success' },
  refused: { label: 'Отказ', tone: 'urgent' },
  reserved: { label: 'Забронирован', tone: 'warning' },
  done: { label: 'Выполнен', tone: 'success' },
};
