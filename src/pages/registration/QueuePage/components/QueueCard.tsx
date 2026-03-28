import { Box, Button, Flex, Text } from '@chakra-ui/react';

interface Props {
  patient: QueuePatient;
  variant: 'queue' | 'active' | 'done';
  onCall?: () => void;
  onComplete?: () => void;
  elapsed?: string;
  isDragging?: boolean;
  dragHandleProps?: React.HTMLAttributes<HTMLDivElement>;
}

export const QueueCard: React.FC<Props> = ({
  patient,
  variant,
  onCall,
  onComplete,
  elapsed,
  isDragging,
  dragHandleProps,
}) => {
  const bgMap = { queue: '#FFF0F0', active: '#E6FAF5', done: '#E6FAF5' };
  const borderMap = { queue: '#FFC5C5', active: '#81E6D9', done: '#81E6D9' };

  return (
    <Box
      bg={bgMap[variant]}
      border='1px solid'
      borderColor={isDragging ? '#243F82' : borderMap[variant]}
      borderRadius='12px'
      p='10px 12px'
      mb={2}
      opacity={isDragging ? 0.85 : 1}
      boxShadow={isDragging ? 'lg' : 'none'}
      cursor={variant === 'queue' ? 'grab' : 'default'}
      {...dragHandleProps}
    >
      <Flex justify='space-between' align='flex-start'>
        <Box>
          <Text fontSize='13px' fontWeight='600' color='#1A365D'>
            {patient.name}
          </Text>
          <Text fontSize='11px' color='gray.500'>
            {patient.doctor}
          </Text>
          <Text fontSize='11px' color='gray.500'>
            {patient.time}
          </Text>
          {elapsed && (
            <Text fontSize='11px' color='gray.400' mt='2px'>
              {variant === 'active' ? `Длительность: ${elapsed}` : `Ожидает: ${elapsed}`}
            </Text>
          )}
        </Box>
        {variant === 'queue' && onCall && (
          <Button
            size='xs'
            bg='#243F82'
            color='white'
            borderRadius='8px'
            _hover={{ bg: '#1a2f6b' }}
            onClick={onCall}
            flexShrink={0}
            ml={2}
          >
            Вызвать
          </Button>
        )}
        {variant === 'active' && onComplete && (
          <Button
            size='xs'
            bg='teal.400'
            color='white'
            borderRadius='8px'
            _hover={{ bg: 'teal.500' }}
            onClick={onComplete}
            flexShrink={0}
            ml={2}
          >
            Завершить
          </Button>
        )}
      </Flex>
    </Box>
  );
};
