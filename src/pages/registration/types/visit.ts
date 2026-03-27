export type VisitUrgency = 'urgent' | 'deferred' | 'normal';

export type VisitStatus = 'on_reception' | 'waiting' | 'completed' | 'cancelled';

export type VisitType = 'inpatient' | 'outpatient' | 'home';

export type ServiceStatus = 'preliminary' | 'paid' | 'refused' | 'reserved' | 'done';

export interface VisitService {
  id: string;
  date: string;
  time: string;
  doctorName: string;
  doctorRole: string;
  direction: string;
  cabinet: string;
  serviceLabel: string;
  servicePrice: string;
  status: ServiceStatus;
}

export interface Visit {
  id: string;
  date: string;
  time: string;
  clinic: string;
  direction: string;
  urgency: VisitUrgency;
  status: VisitStatus;
  visitType: VisitType;
  totalCost: string;
  totalStatus: ServiceStatus;
  services: VisitService[];
}
