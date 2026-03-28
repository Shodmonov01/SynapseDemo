import { useRef, useState } from 'react';

import { QueueCard } from './QueueCard';
import type { DoctorRow } from '../queue.types.ts';
import { formatElapsed } from '../queue.utils.ts';

import { Box, Flex, Text } from '@chakra-ui/react';

interface Props {
  doctors: DoctorRow[];
  onCall: (doctorId: string) => void;
  onComplete: (doctorId: string) => void;
  onReorder: (doctorId: string, fromIndex: number, toIndex: number) => void;
  elapsed: Record<string, string>;
}

export const QueueColumns: React.FC<Props> = ({
  doctors,
  onCall,
  onComplete,
  onReorder,
  elapsed,
}) => {
  const dragInfo = useRef<{ doctorId: string; fromIndex: number } | null>(null);
  const [dragOver, setDragOver] = useState<{ doctorId: string; index: number } | null>(
    null,
  );

  const handleDragStart = (doctorId: string, index: number) => {
    dragInfo.current = { doctorId, fromIndex: index };
  };

  const handleDrop = (doctorId: string, toIndex: number) => {
    if (!dragInfo.current) return;
    // Нельзя перетащить назад (только вперёд в очереди запрещено — позиция не может уменьшиться)
    // Логика: нельзя поставить пациента раньше его текущей позиции
    const { fromIndex } = dragInfo.current;
    if (toIndex < fromIndex) {
      dragInfo.current = null;
      setDragOver(null);
      return;
    }
    onReorder(doctorId, fromIndex, toIndex);
    dragInfo.current = null;
    setDragOver(null);
  };

  // const cols = [
  //   { key: 'queue', label: 'Живая очередь' },
  //   { key: 'active', label: 'Сейчас на приёме' },
  //   { key: 'done', label: 'Закончили' },
  // ] as const;

  return (
    <Flex gap={4} mb={5}>
      {/* Записи */}
      <Box flex={1} bg='white' borderRadius='16px' border='1px solid #E2E8F0' p={4}>
        <Text fontSize='14px' fontWeight='600' color='#1A365D' mb={3}>
          Записи
        </Text>
        {doctors
          .flatMap((d) => d.queue)
          .slice(0, 6)
          .map((p) => (
            <Box key={p.id} borderBottom='1px solid #F0F4F8' pb={2} mb={2}>
              <Text fontSize='12px' fontWeight='600' color='#1A365D'>
                {p.name}
              </Text>
              <Text fontSize='11px' color='gray.400'>
                {p.doctor}
              </Text>
              <Text fontSize='11px' color='gray.400'>
                {p.time}
              </Text>
            </Box>
          ))}
      </Box>

      {/* Живая очередь */}
      <Box flex={1} bg='white' borderRadius='16px' border='1px solid #E2E8F0' p={4}>
        <Text fontSize='14px' fontWeight='600' color='#1A365D' mb={3}>
          Живая очередь
        </Text>
        {doctors.map((doc) =>
          doc.queue.map((p, i) => (
            <div
              key={p.id}
              draggable
              onDragStart={() => handleDragStart(doc.id, i)}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver({ doctorId: doc.id, index: i });
              }}
              onDrop={() => handleDrop(doc.id, i)}
              onDragLeave={() => setDragOver(null)}
            >
              {dragOver?.doctorId === doc.id &&
                dragOver.index === i &&
                dragInfo.current && (
                  <Box h='4px' bg='#243F82' borderRadius='4px' mb={1} />
                )}
              <QueueCard
                patient={p}
                variant='queue'
                onCall={() => onCall(doc.id)}
                elapsed={elapsed[p.id] ?? formatElapsed(p.waitingSince)}
              />
            </div>
          )),
        )}
      </Box>

      {/* Сейчас на приёме */}
      <Box flex={1} bg='white' borderRadius='16px' border='1px solid #E2E8F0' p={4}>
        <Text fontSize='14px' fontWeight='600' color='#1A365D' mb={3}>
          Сейчас на приёме
        </Text>
        {doctors.map((doc) =>
          doc.active ? (
            <QueueCard
              key={doc.active.id}
              patient={doc.active}
              variant='active'
              onComplete={() => onComplete(doc.id)}
              elapsed={elapsed[doc.active.id] ?? '00:00:00'}
            />
          ) : null,
        )}
      </Box>

      {/* Закончили */}
      <Box flex={1} bg='white' borderRadius='16px' border='1px solid #E2E8F0' p={4}>
        <Text fontSize='14px' fontWeight='600' color='#1A365D' mb={3}>
          Закончили
        </Text>
        {doctors
          .flatMap((d) => d.completed)
          .map((p) => (
            <Box
              key={p.id}
              bg='#E6FAF5'
              border='1px solid #81E6D9'
              borderRadius='12px'
              p='10px 12px'
              mb={2}
            >
              <Text fontSize='12px' fontWeight='600' color='#1A365D'>
                {p.name}
              </Text>
              <Text fontSize='11px' color='gray.500'>
                {p.doctor}
              </Text>
              <Text fontSize='11px' color='teal.600'>
                {p.time}–{p.time}
              </Text>
            </Box>
          ))}
      </Box>
    </Flex>
  );
};
