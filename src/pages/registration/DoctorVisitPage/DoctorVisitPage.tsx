import { useState } from 'react';

import { AddVisitModal } from './components/AddVisitModal';
import { VisitsMap } from './components/VisitsMap';
import { VisitsTable } from './components/VisitsTable';
import type { Visit } from './visits.types';
import { seedVisits } from './visits.utils';

import { Box, useDisclosure } from '@chakra-ui/react';

let _vid = 100;

export function DoctorVisitPage() {
  const [visits, setVisits] = useState<Visit[]>(seedVisits());
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddVisit = (data: {
    patient: string;
    phone: string;
    patientId: string;
    location: string;
    status: string;
    doctor: string;
    date: string;
    time: string;
  }) => {
    if (!data.patient.trim()) return;
    const newVisit: Visit = {
      id: `PA${String(_vid++).padStart(7, '0')}`,
      patientName: data.patient,
      patientPhone: data.phone,
      patientId: data.patientId || `PA${String(_vid).padStart(7, '0')}`,
      doctor: data.doctor,
      doctorRole: 'врач',
      location: data.location,
      address: '',
      status: (data.status as Visit['status']) || 'Предварительный',
      date: data.date || new Date().toLocaleDateString('ru-RU'),
      time: data.time || '12:00',
      lat: 41.299 + Math.random() * 0.05,
      lng: 69.24 + Math.random() * 0.05,
    };
    setVisits((prev) => [newVisit, ...prev]);
  };

  return (
    <Box p={5} bg='#F5F7FB' minH='100vh'>
      <VisitsMap visits={visits} />
      <VisitsTable visits={visits} onAddVisit={onOpen} />
      <AddVisitModal isOpen={isOpen} onClose={onClose} onSubmit={handleAddVisit} />
    </Box>
  );
}
