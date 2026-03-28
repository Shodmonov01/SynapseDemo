import { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import type { VisitStatus } from '../visits.types';

interface VisitFormData {
  search: string;
  patient: string;
  phone: string;
  patientId: string;
  location: string;
  status: VisitStatus | '';
  doctor: string;
  date: string;
  time: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: VisitFormData) => void;
}

const EMPTY: VisitFormData = {
  search: '',
  patient: '',
  phone: '',
  patientId: '',
  location: '',
  status: '',
  doctor: '',
  date: '',
  time: '',
};

export const AddVisitModal: React.FC<Props> = ({ isOpen, onClose, onSubmit }) => {
  const [form, setForm] = useState<VisitFormData>(EMPTY);

  const set =
    (key: keyof VisitFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = () => {
    onSubmit(form);
    setForm(EMPTY);
    onClose();
  };

  const inputStyle = {
    size: 'sm' as const,
    borderRadius: 'md',
    borderColor: 'gray.200',
    fontSize: '13px',
    _placeholder: { color: 'gray.400', fontSize: '12px' },
    _focus: { borderColor: 'blue.400', boxShadow: '0 0 0 1px #63b3ed' },
  };

  const labelStyle = { fontSize: '12px', color: 'gray.500', mb: '4px' };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size='md'>
      <ModalOverlay bg='blackAlpha.400' backdropFilter='blur(4px)' />
      <ModalContent borderRadius='16px' mx={4}>
        <ModalHeader fontSize='15px' fontWeight='600' pb={2}>
          Добавить новый выезд
        </ModalHeader>

        <ModalBody>
          <FormControl mb={4}>
            <FormLabel {...labelStyle}>Поиск по базе данных</FormLabel>
            <InputGroup size='sm'>
              <InputLeftElement pointerEvents='none'>
                <SearchIcon color='gray.400' boxSize='12px' />
              </InputLeftElement>
              <Input
                {...inputStyle}
                pl={8}
                placeholder='Ф.И.О. пациента'
                value={form.search}
                onChange={set('search')}
              />
            </InputGroup>
          </FormControl>

          <Grid templateColumns='1fr 1fr' gap={4}>
            <GridItem>
              <FormControl>
                <FormLabel {...labelStyle}>Пациент</FormLabel>
                <Input
                  {...inputStyle}
                  placeholder='Ф.И.О.'
                  value={form.patient}
                  onChange={set('patient')}
                />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl>
                <FormLabel {...labelStyle}>Номер телефона</FormLabel>
                <Input
                  {...inputStyle}
                  placeholder='+998'
                  value={form.phone}
                  onChange={set('phone')}
                />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl>
                <FormLabel {...labelStyle}>ID пациента</FormLabel>
                <Input
                  {...inputStyle}
                  placeholder='Напишите ID пациента'
                  value={form.patientId}
                  onChange={set('patientId')}
                />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl>
                <FormLabel {...labelStyle}>Локация</FormLabel>
                <Input
                  {...inputStyle}
                  placeholder='Напишите локацию'
                  value={form.location}
                  onChange={set('location')}
                />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl>
                <FormLabel {...labelStyle}>Статус</FormLabel>
                <Select
                  {...inputStyle}
                  placeholder='Выберите статус'
                  value={form.status}
                  onChange={set('status')}
                >
                  {[
                    'Оплачен',
                    'Отказ',
                    'В процессе',
                    'Предварительный',
                    'Выполнен',
                    'Ожидание',
                  ].map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl>
                <FormLabel {...labelStyle}>Врач</FormLabel>
                <Input
                  {...inputStyle}
                  placeholder='Укажите врача'
                  value={form.doctor}
                  onChange={set('doctor')}
                />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl>
                <FormLabel {...labelStyle}>Дата</FormLabel>
                <Input
                  {...inputStyle}
                  type='date'
                  placeholder='Укажите дату выезда'
                  value={form.date}
                  onChange={set('date')}
                />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl>
                <FormLabel {...labelStyle}>Время</FormLabel>
                <Select
                  {...inputStyle}
                  placeholder='Укажите время выезда'
                  value={form.time}
                  onChange={set('time')}
                >
                  {Array.from({ length: 27 }, (_, i) => {
                    const h = Math.floor(i / 2) + 7;
                    const m = i % 2 === 0 ? '00' : '30';
                    return `${String(h).padStart(2, '0')}:${m}`;
                  }).map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </GridItem>
          </Grid>
        </ModalBody>

        <ModalFooter gap={3} pt={2}>
          <Button size='sm' variant='outline' borderRadius='md' px={6} onClick={onClose}>
            Отмена
          </Button>
          <Button
            size='sm'
            bg='#243F82'
            color='white'
            borderRadius='md'
            px={6}
            _hover={{ bg: '#1a2f6b' }}
            onClick={handleSubmit}
          >
            Добавить
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
