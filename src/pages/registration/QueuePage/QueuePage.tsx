import { useCallback, useEffect, useState } from 'react';

import { AddRecordQueueModal } from './components/AddRecordQueueModal.tsx';
import { QueueColumns } from './components/QueueColumn.tsx';
import { QueueTable } from './components/QueueTable.tsx';
import type { DoctorRow } from './queue.types.ts';
import { makePatient, seedDoctors } from './queue.utils.ts';
import HorizontalCalendar from '../RegistrationVisitsPage/components/HorizontalCalendar.tsx';

import { Box, useDisclosure } from '@chakra-ui/react';

export default function QueuePage() {
  const [doctors, setDoctors] = useState<DoctorRow[]>(seedDoctors);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [elapsed, setElapsed] = useState<Record<string, string>>({});
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Тикаем каждую секунду для отображения времени ожидания
  useEffect(() => {
    const id = setInterval(() => {
      const next: Record<string, string> = {};
      doctors.forEach((d) => {
        [...d.queue, ...(d.active ? [d.active] : []), ...d.completed].forEach((p) => {
          const diff = Math.floor(
            (Date.now() - new Date(p.waitingSince).getTime()) / 1000,
          );
          const h = Math.floor(diff / 3600)
            .toString()
            .padStart(2, '0');
          const m = Math.floor((diff % 3600) / 60)
            .toString()
            .padStart(2, '0');
          const s = (diff % 60).toString().padStart(2, '0');
          next[p.id] = `${h}:${m}:${s}`;
        });
      });
      setElapsed(next);
    }, 1000);
    return () => clearInterval(id);
  }, [doctors]);

  // Вызвать первого из очереди → переместить в active
  const handleCall = useCallback((doctorId: string) => {
    setDoctors((prev) =>
      prev.map((d) => {
        if (d.id !== doctorId) return d;
        if (d.queue.length === 0) return d;
        // Если уже кто-то на приёме — возвращаем его в конец очереди (нельзя прервать)
        const [next, ...rest] = d.queue;
        return {
          ...d,
          queue: d.active ? [...rest, d.active] : rest,
          active: { ...next, waitingSince: new Date().toISOString() },
        };
      }),
    );
  }, []);

  // Завершить приём → переместить в completed
  const handleComplete = useCallback((doctorId: string) => {
    setDoctors((prev) =>
      prev.map((d) => {
        if (d.id !== doctorId || !d.active) return d;
        return {
          ...d,
          active: null,
          completed: [...d.completed, d.active],
          completedCount: d.completedCount + 1,
        };
      }),
    );
  }, []);

  // Drag & drop: переставить пациента в очереди (только вперёд — нельзя вернуть назад)
  const handleReorder = useCallback((doctorId: string, from: number, to: number) => {
    if (to <= from) return; // Нельзя двигать назад
    setDoctors((prev) =>
      prev.map((d) => {
        if (d.id !== doctorId) return d;
        const q = [...d.queue];
        const [item] = q.splice(from, 1);
        q.splice(to, 0, item);
        return { ...d, queue: q };
      }),
    );
  }, []);

  const handleOpenQueue = useCallback((doctorId: string) => {
    // логика открытия очереди (можно роутить или показать детали)
    console.log('Open queue for', doctorId);
  }, []);

  const handleCloseQueue = useCallback((doctorId: string) => {
    setDoctors((prev) =>
      prev.map((d) => (d.id === doctorId ? { ...d, queue: [], active: null } : d)),
    );
  }, []);

  const handleAddRecord = (data: {
    direction: string;
    doctor: string;
    service: string;
    date: string;
  }) => {
    setDoctors((prev) =>
      prev.map((d) => {
        if (d.id !== data.doctor) return d;
        const newP = makePatient(d.name);
        return { ...d, queue: [...d.queue, newP], queueCount: d.queueCount + 1 };
      }),
    );
  };

  return (
    <Box p={5} bg='#F5F7FB' minH='100vh'>
      {/* Календарь */}
      <Box mb={5}>
        <HorizontalCalendar
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
          highlightToday
        />
      </Box>

      {/* Колонки очереди */}
      <QueueColumns
        doctors={doctors}
        onCall={handleCall}
        onComplete={handleComplete}
        onReorder={handleReorder}
        elapsed={elapsed}
      />

      {/* Таблица */}
      <QueueTable
        doctors={doctors}
        onOpenQueue={handleOpenQueue}
        onCloseQueue={handleCloseQueue}
        onAddRecord={onOpen}
      />

      {/* Модалка */}
      <AddRecordQueueModal isOpen={isOpen} onClose={onClose} onSubmit={handleAddRecord} />
    </Box>
  );
}
