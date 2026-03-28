import type { MedicalDocumentRow } from '../types/medicalDocumentRow';

/**
 * Тестовые строки таблицы «Медицинские документы».
 * Заменить на `useQuery` / пагинацию при появлении бэкенда.
 */
export const MOCK_MEDICAL_DOCUMENT_ROWS: MedicalDocumentRow[] = [
  {
    id: '1',
    date: '16.02.2026',
    time: '16:15',
    clinic: 'Akfa Medline',
    doctorName: 'Рахимов Д.Н.',
    doctorRole: 'Врач-стоматолог',
    directionLabel: 'Поставить капельницу',
    directionPrice: '24,000 UZS',
    service: 'Замечательная услуга',
    fileExtension: '.dcm',
  },
  {
    id: '2',
    date: '16.02.2026',
    time: '16:15',
    clinic: 'Akfa Medline',
    doctorName: 'Рахимов Д.Н.',
    doctorRole: 'Врач-стоматолог',
    directionLabel: 'Поставить капельницу',
    directionPrice: '24,000 UZS',
    service: 'Замечательная услуга',
    fileExtension: '.exe',
  },
  {
    id: '3',
    date: '16.02.2026',
    time: '16:15',
    clinic: 'Akfa Medline',
    doctorName: 'Рахимов Д.Н.',
    doctorRole: 'Врач-стоматолог',
    directionLabel: 'Поставить капельницу',
    directionPrice: '24,000 UZS',
    service: 'Замечательная услуга',
    fileExtension: '.docx',
  },
  {
    id: '4',
    date: '15.02.2026',
    time: '10:00',
    clinic: 'Akfa Medline',
    doctorName: 'Рахимов Д.Н.',
    doctorRole: 'Врач-стоматолог',
    directionLabel: 'Поставить капельницу',
    directionPrice: '24,000 UZS',
    service: 'Замечательная услуга',
    fileExtension: '.dcm',
  },
  {
    id: '5',
    date: '14.02.2026',
    time: '09:30',
    clinic: 'Akfa Medline',
    doctorName: 'Рахимов Д.Н.',
    doctorRole: 'Врач-стоматолог',
    directionLabel: 'Поставить капельницу',
    directionPrice: '24,000 UZS',
    service: 'Замечательная услуга',
    fileExtension: '.docx',
  },
];
