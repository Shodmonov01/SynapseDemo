import { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Select,
  Input,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Tabs,
  TabList,
  Tab,
  HStack,
  Text,
} from '@chakra-ui/react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    direction: string;
    doctor: string;
    service: string;
    date: string;
    type: 'current' | 'new';
  }) => void;
}

export const AddRecordQueueModal: React.FC<Props> = ({ isOpen, onClose, onSubmit }) => {
  const [tab, setTab] = useState<0 | 1>(0); // 0 = клиника, 1 = врач
  const [recordType, setRecordType] = useState<'current' | 'new'>('current');
  const [direction, setDirection] = useState('');
  const [doctor, setDoctor] = useState('');
  const [service, setService] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = () => {
    onSubmit({ direction, doctor, service, date, type: recordType });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size='md'>
      <ModalOverlay bg='blackAlpha.400' backdropFilter='blur(4px)' />
      <ModalContent borderRadius='16px' mx={4}>
        <ModalHeader fontSize='15px' fontWeight='600' pb={2}>
          Добавить запись
        </ModalHeader>

        {/* Tabs: Запись в клинику / Запись к врачу */}
        <Tabs index={tab} onChange={(i) => setTab(i as 0 | 1)} px={6} mb={2}>
          <TabList borderBottom='2px solid #E2E8F0'>
            <Tab
              fontSize='13px'
              fontWeight='500'
              _selected={{ color: '#243F82', borderColor: '#243F82' }}
            >
              <Text mr={2}>👤</Text> Запись в клинику
            </Tab>
            <Tab
              fontSize='13px'
              fontWeight='500'
              _selected={{ color: '#243F82', borderColor: '#243F82' }}
            >
              <Text mr={2}>➕</Text> Запись к врачу
            </Tab>
          </TabList>
        </Tabs>

        {/* Текущая / Новая запись */}
        <HStack px={6} mb={4} spacing={2}>
          <Button
            size='sm'
            borderRadius='8px'
            fontWeight='500'
            fontSize='13px'
            bg={recordType === 'current' ? '#243F82' : 'transparent'}
            color={recordType === 'current' ? 'white' : 'gray.600'}
            border='1px solid'
            borderColor={recordType === 'current' ? '#243F82' : '#E2E8F0'}
            onClick={() => setRecordType('current')}
            _hover={{}}
          >
            Текущая запись
          </Button>
          <Button
            size='sm'
            borderRadius='8px'
            fontWeight='500'
            fontSize='13px'
            bg={recordType === 'new' ? '#243F82' : 'transparent'}
            color={recordType === 'new' ? 'white' : 'gray.600'}
            border='1px solid'
            borderColor={recordType === 'new' ? '#243F82' : '#E2E8F0'}
            onClick={() => setRecordType('new')}
            _hover={{}}
          >
            Новая запись
          </Button>
        </HStack>

        <ModalBody pt={0}>
          <Grid templateColumns='1fr 1fr' gap={4}>
            <GridItem>
              <FormControl isRequired>
                <FormLabel fontSize='12px' color='gray.500' mb={1}>
                  Направление
                </FormLabel>
                <Select
                  size='sm'
                  borderRadius='20px'
                  fontSize='13px'
                  placeholder='Выберите направление'
                  value={direction}
                  onChange={(e) => setDirection(e.target.value)}
                >
                  <option value='cardio'>Кардиология</option>
                  <option value='neuro'>Неврология</option>
                  <option value='ortho'>Ортопедия</option>
                </Select>
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl isRequired>
                <FormLabel fontSize='12px' color='gray.500' mb={1}>
                  Врач
                </FormLabel>
                <Select
                  size='sm'
                  borderRadius='20px'
                  fontSize='13px'
                  placeholder='Укажите врача'
                  value={doctor}
                  onChange={(e) => setDoctor(e.target.value)}
                >
                  <option value='d1'>Омонов С.В.</option>
                  <option value='d2'>Рахимов Д.Н.</option>
                </Select>
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl isRequired>
                <FormLabel fontSize='12px' color='gray.500' mb={1}>
                  Услуга
                </FormLabel>
                <Select
                  size='sm'
                  borderRadius='20px'
                  fontSize='13px'
                  placeholder='Выберите услугу'
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                >
                  <option value='consult'>Консультация</option>
                  <option value='ecg'>ЭКГ</option>
                  <option value='uzi'>УЗИ</option>
                </Select>
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl isRequired>
                <FormLabel fontSize='12px' color='gray.500' mb={1}>
                  Дата
                </FormLabel>
                <Input
                  size='sm'
                  borderRadius='20px'
                  fontSize='13px'
                  type='date'
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </FormControl>
            </GridItem>
          </Grid>
        </ModalBody>

        <ModalFooter gap={3} pt={4}>
          <Button
            size='sm'
            variant='outline'
            borderRadius='20px'
            px={6}
            onClick={onClose}
          >
            Отмена
          </Button>
          <Button
            size='sm'
            bg='#243F82'
            color='white'
            borderRadius='20px'
            px={6}
            _hover={{ bg: '#1a2f6b' }}
            onClick={handleSubmit}
          >
            Готово
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
