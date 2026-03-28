import { useState, useCallback } from 'react';
import { Box, Flex, Text, Button, useDisclosure, useToast } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { Appointment, AppointmentStatus, COLUMN_ORDER } from './queue.types.ts';
import { COLUMNS, initialAppointments } from './queue.utils.ts';
import HorizontalCalendar from '../RegistrationVisitsPage/components/HorizontalCalendar.tsx';
import { QueueTable } from './components/QueueTable.tsx';
import { KanbanColumn } from './components/KanbanColumn.tsx';

/** Returns true if moving from `from` to `to` is a forward (or same) move */
function isForwardMove(from: AppointmentStatus, to: AppointmentStatus): boolean {
  return COLUMN_ORDER.indexOf(to) >= COLUMN_ORDER.indexOf(from);
}

export const QueuePage = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  const activeAppointment = appointments.find((a) => a.id === activeId) ?? null;

  // Filter appointments by selected date
  const selectedDateStr = selectedDate.toISOString().slice(0, 10);
  const filteredAppointments = appointments.filter((a) => a.date === selectedDateStr);

  // Dates that have appointments (for calendar markers)
  const markedDates = Array.from(new Set(appointments.map((a) => a.date))).map(
    (d) => new Date(d),
  );

  const getAppointmentsByColumn = useCallback(
    (colId: AppointmentStatus) => filteredAppointments.filter((a) => a.status === colId),
    [filteredAppointments],
  );

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveId(active.id as string);
  };

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    if (!over) return;

    const activeAppt = appointments.find((a) => a.id === active.id);
    if (!activeAppt) return;

    const overIsColumn = COLUMNS.some((c) => c.id === over.id);
    const targetColumnId = overIsColumn
      ? (over.id as AppointmentStatus)
      : appointments.find((a) => a.id === over.id)?.status;

    if (!targetColumnId || activeAppt.status === targetColumnId) return;

    // Block backward moves
    if (!isForwardMove(activeAppt.status, targetColumnId)) return;

    setAppointments((prev) =>
      prev.map((a) => (a.id === active.id ? { ...a, status: targetColumnId } : a)),
    );
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    setActiveId(null);
    if (!over) return;

    const activeAppt = appointments.find((a) => a.id === active.id);
    const overAppt = appointments.find((a) => a.id === over.id);

    if (!activeAppt || !overAppt) return;
    if (activeAppt.status !== overAppt.status) return;
    if (active.id === over.id) return;

    setAppointments((prev) => {
      const colItems = prev.filter((a) => a.status === activeAppt.status);
      const others = prev.filter((a) => a.status !== activeAppt.status);
      const oldIdx = colItems.findIndex((a) => a.id === active.id);
      const newIdx = colItems.findIndex((a) => a.id === over.id);
      const reordered = arrayMove(colItems, oldIdx, newIdx);
      return [...others, ...reordered];
    });
  };

  const handleAddAppointment = (appt: Appointment) => {
    setAppointments((prev) => [...prev, appt]);
    setSelectedDate(new Date(appt.date + 'T12:00:00'));
    toast({
      title: 'Запись добавлена',
      description: `${appt.patientName} — ${appt.time}`,
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top-right',
    });
  };

  return (
    <Box
      minH='100vh'
      bg='gray.50'
      fontFamily="'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
    >
      <Box maxW='1400px' mx='auto' px={{ base: 3, md: 6 }} py={5}>
        {/* Calendar */}
        <HorizontalCalendar
          selectedDate={selectedDate}
          onDateSelect={(d) => setSelectedDate(d)}
          markedDates={markedDates}
          highlightToday
        />

        {/* Kanban Board */}
        <Box
          bg='white'
          borderRadius='14px'
          border='1px solid'
          borderColor='gray.100'
          boxShadow='0 1px 6px rgba(0,0,0,0.05)'
          p='18px'
        >
          {/* Board header */}
          <Flex justify='space-between' align='center' mb='16px'>
            <Box>
              <Text fontWeight='600' fontSize='15px' color='gray.800'>
                Очередь на{' '}
                {selectedDate.toLocaleDateString('ru', { day: 'numeric', month: 'long' })}
              </Text>
              <Text fontSize='12px' color='gray.400' mt='1px'>
                {filteredAppointments.length} записей · карточки можно перемещать только
                вперёд
              </Text>
            </Box>
            <Button
              leftIcon={<AddIcon boxSize='11px' />}
              size='sm'
              bg='#243F82'
              color='white'
              borderRadius='10px'
              px={4}
              h='36px'
              fontSize='13px'
              fontWeight='500'
              _hover={{ bg: '#1a2f63' }}
              onClick={onOpen}
            >
              Добавить запись
            </Button>
          </Flex>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
          >
            <Flex gap='16px' align='flex-start' overflowX='auto'>
              {COLUMNS.map((col) => (
                <KanbanColumn
                  key={col.id}
                  column={col}
                  appointments={getAppointmentsByColumn(col.id)}
                />
              ))}
            </Flex>

            <DragOverlay>
              {activeAppointment ? (
                <Box
                  bg='white'
                  borderRadius='10px'
                  border='1.5px solid'
                  borderColor='blue.300'
                  boxShadow='0 12px 32px rgba(59,130,246,0.2)'
                  p='12px 14px'
                  w='220px'
                  transform='rotate(2deg)'
                >
                  <Text fontWeight='600' fontSize='13px' color='gray.800' noOfLines={1}>
                    {activeAppointment.patientName}
                  </Text>
                  <Text fontSize='11px' color='gray.500' mt='2px'>
                    {activeAppointment.doctor}
                  </Text>
                  <Text fontSize='11px' color='gray.400'>
                    {activeAppointment.cabinet}
                  </Text>
                  {activeAppointment.time && (
                    <Text fontSize='11px' color='blue.500' mt='4px' fontWeight='500'>
                      {activeAppointment.time}
                    </Text>
                  )}
                </Box>
              ) : null}
            </DragOverlay>
          </DndContext>
        </Box>

        {/* Doctors Table */}
        <QueueTable />
      </Box>

      {/* Add Appointment Modal */}
      {/*<AddAppointmentModal*/}
      {/*  isOpen={isOpen}*/}
      {/*  onClose={onClose}*/}
      {/*  onAdd={handleAddAppointment}*/}
      {/*/>*/}
    </Box>
  );
};
