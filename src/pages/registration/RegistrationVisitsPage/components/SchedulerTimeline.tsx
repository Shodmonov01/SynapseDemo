import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import {
  Box,
  Flex,
  Text,
  Avatar,
  IconButton,
  Button,
  HStack,
  Tooltip,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Select,
  useDisclosure,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  SearchIcon,
  ArrowDownIcon,
  ArrowUpIcon,
} from '@chakra-ui/icons';

const START_HOUR = 7;
const END_HOUR = 20;
const TOTAL_MIN = (END_HOUR - START_HOUR) * 60;
const ROW_HEIGHT = 72;
const DOCTOR_COL_WIDTH = 160;
const SNAP_MIN = 15;

export interface Doctor {
  id: string;
  name: string;
  role: string;
  color: string;
  textColor: string;
  borderColor: string;
  category: number;
}

export interface Appointment {
  id: string;
  doctorId: string;
  patientName: string;
  service: string;
  startMin: number;
  endMin: number;
}

type DragState =
  | { type: 'idle' }
  | { type: 'creating'; doctorId: string; anchorMin: number; currentMin: number }
  | {
      type: 'moving';
      apptId: string;
      offsetMin: number;
      currentStartMin: number;
      currentDoctorId: string;
    }
  | {
      type: 'resizing';
      apptId: string;
      side: 'l' | 'r';
      startMin: number;
      endMin: number;
    };

interface ModalState {
  mode: 'create' | 'edit';
  apptId?: string;
  doctorId: string;
  patientName: string;
  service: string;
  startTime: string;
  endTime: string;
}

function snap(m: number) {
  return Math.round(m / SNAP_MIN) * SNAP_MIN;
}
function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}
function minToTime(m: number): string {
  const abs = START_HOUR * 60 + m;
  return `${String(Math.floor(abs / 60)).padStart(2, '0')}:${String(abs % 60).padStart(2, '0')}`;
}
function timeToMin(t: string): number {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m - START_HOUR * 60;
}
function pct(m: number) {
  return `${(m / TOTAL_MIN) * 100}%`;
}
function formatDate(d: Date) {
  return d.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}
function clientXToMin(x: number, rect: DOMRect) {
  return clamp(snap(((x - rect.left) / rect.width) * TOTAL_MIN), 0, TOTAL_MIN);
}
function dateKey(d: Date) {
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}
function isSameDayLocal(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

const TIME_OPTIONS: string[] = [];
for (let m = 0; m <= TOTAL_MIN; m += SNAP_MIN) TIME_OPTIONS.push(minToTime(m));

export const DEFAULT_DOCTORS: Doctor[] = [
  {
    id: 'd1',
    name: 'Рахимов Д.Н.',
    role: 'хирург',
    color: '#EBF4FF',
    textColor: '#1A5276',
    borderColor: '#AED6F1',
    category: 0,
  },
  {
    id: 'd2',
    name: 'Азимова С.Р.',
    role: 'терапевт',
    color: '#FDF2F8',
    textColor: '#76448A',
    borderColor: '#D7BDE2',
    category: 0,
  },
  {
    id: 'd3',
    name: 'Каримов Б.О.',
    role: 'невролог',
    color: '#E8F8F5',
    textColor: '#0E6655',
    borderColor: '#A2D9CE',
    category: 0,
  },
  {
    id: 'd4',
    name: 'Юсупов Т.А.',
    role: 'кардиолог',
    color: '#FEF9E7',
    textColor: '#7D6608',
    borderColor: '#F9E79F',
    category: 1,
  },
  {
    id: 'd5',
    name: 'Назарова М.К.',
    role: 'радиолог',
    color: '#F9EBEA',
    textColor: '#922B21',
    borderColor: '#F1948A',
    category: 1,
  },
  {
    id: 'd6',
    name: 'Берков Е.С.',
    role: 'лаборант',
    color: '#EAFAF1',
    textColor: '#1E8449',
    borderColor: '#82E0AA',
    category: 2,
  },
  {
    id: 'd7',
    name: 'Холова Д.Р.',
    role: 'биохимик',
    color: '#EAF2FF',
    textColor: '#1A4B8C',
    borderColor: '#93BBEF',
    category: 2,
  },
];

const SERVICES_BY_CAT: Record<number, string[]> = {
  0: ['Осмотр', 'Консультация'],
  1: ['ЭКГ', 'УЗИ', 'МРТ', 'Эндоскопия'],
  2: ['Анализы', 'Биохимия', 'ОАК'],
};
const ALL_SERVICES = [
  'Осмотр',
  'ЭКГ',
  'УЗИ',
  'МРТ',
  'Анализы',
  'Консультация',
  'Эндоскопия',
  'Биохимия',
  'ОАК',
  'Другое',
];

const PATIENT_NAMES = [
  'Иванов А.П.',
  'Петров С.К.',
  'Смирнов Л.Р.',
  'Козлов Д.Р.',
  'Новиков В.Н.',
  'Ли В.Н.',
  'Орлов А.С.',
  'Федоров И.М.',
  'Попов Р.Д.',
  'Сидоров Е.П.',
  'Кузнецов Ю.Т.',
  'Морозов Б.Н.',
];

let _idCounter = 200;

function seedAppointments(dateOffset: number): Appointment[] {
  const rng = (n: number) => ((n * 1103515245 + 12345) & 0x7fffffff) % 100;
  const appts: Appointment[] = [];
  DEFAULT_DOCTORS.forEach((doc, di) => {
    const count = 2 + (rng(di * 7 + dateOffset * 13) % 3);
    let cursor = 60 + (rng(di + dateOffset) % 30);
    for (let i = 0; i < count; i++) {
      const dur = 30 + (rng(di * 3 + i + dateOffset * 17) % 5) * 15;
      const patIdx = rng(di * 11 + i * 7 + dateOffset * 5) % PATIENT_NAMES.length;
      const services = SERVICES_BY_CAT[doc.category];
      const svcIdx = rng(di * 5 + i * 3 + dateOffset * 9) % services.length;
      appts.push({
        id: `seed-${dateOffset}-${doc.id}-${i}`,
        doctorId: doc.id,
        patientName: PATIENT_NAMES[patIdx],
        service: services[svcIdx],
        startMin: cursor,
        endMin: cursor + dur,
      });
      cursor += dur + 15 + (rng(di * 9 + i + dateOffset * 3) % 4) * 15;
      if (cursor >= TOTAL_MIN - 60) break;
    }
  });
  return appts;
}

// ── Modal ─────────────────────────────────────────────────────────────────────

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  state: ModalState;
  doctors: Doctor[];
  onChange: (s: ModalState) => void;
  onSave: () => void;
  onDelete?: () => void;
}
function AppointmentModal({
  isOpen,
  onClose,
  state,
  doctors,
  onChange,
  onSave,
  onDelete,
}: AppointmentModalProps) {
  const isCreate = state.mode === 'create';
  const isValid =
    state.patientName.trim().length > 0 &&
    timeToMin(state.startTime) < timeToMin(state.endTime);
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size='sm'>
      <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(2px)' />
      <ModalContent borderRadius='16px' mx='4'>
        <ModalHeader fontSize='15px' fontWeight='600' pb='0'>
          {isCreate ? 'Новая запись' : 'Редактировать запись'}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pt='16px' display='flex' flexDir='column' gap='14px'>
          <FormControl>
            <FormLabel fontSize='12px' color='gray.500' mb='4px'>
              Врач
            </FormLabel>
            <Select
              size='sm'
              borderRadius='8px'
              fontSize='13px'
              value={state.doctorId}
              onChange={(e) => onChange({ ...state, doctorId: e.target.value })}
            >
              {doctors.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} — {d.role}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl isRequired>
            <FormLabel fontSize='12px' color='gray.500' mb='4px'>
              Пациент
            </FormLabel>
            <Input
              size='sm'
              borderRadius='8px'
              fontSize='13px'
              placeholder='Фамилия И.О.'
              value={state.patientName}
              autoFocus
              onChange={(e) => onChange({ ...state, patientName: e.target.value })}
            />
          </FormControl>
          <FormControl>
            <FormLabel fontSize='12px' color='gray.500' mb='4px'>
              Услуга
            </FormLabel>
            <Select
              size='sm'
              borderRadius='8px'
              fontSize='13px'
              value={state.service}
              onChange={(e) => onChange({ ...state, service: e.target.value })}
            >
              {ALL_SERVICES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Select>
          </FormControl>
          <Flex gap='12px'>
            <FormControl>
              <FormLabel fontSize='12px' color='gray.500' mb='4px'>
                Начало
              </FormLabel>
              <Select
                size='sm'
                borderRadius='8px'
                fontSize='13px'
                value={state.startTime}
                onChange={(e) => onChange({ ...state, startTime: e.target.value })}
              >
                {TIME_OPTIONS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel fontSize='12px' color='gray.500' mb='4px'>
                Конец
              </FormLabel>
              <Select
                size='sm'
                borderRadius='8px'
                fontSize='13px'
                value={state.endTime}
                onChange={(e) => onChange({ ...state, endTime: e.target.value })}
              >
                {TIME_OPTIONS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Flex>
          {!isValid && state.patientName.trim() && (
            <Text fontSize='11px' color='red.400'>
              Время окончания должно быть позже начала
            </Text>
          )}
        </ModalBody>
        <ModalFooter pt='8px' gap='8px'>
          {!isCreate && onDelete && (
            <Button
              size='sm'
              colorScheme='red'
              variant='ghost'
              mr='auto'
              onClick={onDelete}
            >
              Удалить
            </Button>
          )}
          <Button size='sm' variant='ghost' onClick={onClose}>
            Отмена
          </Button>
          <Button
            size='sm'
            colorScheme='blue'
            borderRadius='8px'
            isDisabled={!isValid}
            onClick={onSave}
          >
            {isCreate ? 'Создать' : 'Сохранить'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

// ── GridLines & TimeHeader ────────────────────────────────────────────────────

function GridLines() {
  const bc = useColorModeValue('#F0F4F8', 'gray.700');
  return (
    <>
      {Array.from({ length: TOTAL_MIN / 60 + 1 }, (_, i) => (
        <Box
          key={i}
          position='absolute'
          top={0}
          bottom={0}
          left={pct(i * 60)}
          borderLeft='1px solid'
          borderColor={bc}
          pointerEvents='none'
        />
      ))}
    </>
  );
}

function TimeHeader() {
  const bc = useColorModeValue('#E8EDF2', 'gray.700');
  const bg = useColorModeValue('white', 'gray.900');
  return (
    <Flex h='32px' bg={bg} borderBottom='1px solid' borderColor={bc}>
      <Box
        w={`${DOCTOR_COL_WIDTH}px`}
        minW={`${DOCTOR_COL_WIDTH}px`}
        bg={bg}
        position='sticky'
        left={0}
        zIndex={3}
      />
      <Box position='relative' flex={1} minW={0}>
        {Array.from({ length: TOTAL_MIN / 60 + 1 }, (_, i) => (
          <Box
            key={i}
            position='absolute'
            left={pct(i * 60)}
            transform='translateX(-50%)'
            fontSize='11px'
            color='gray.400'
            fontWeight='400'
            whiteSpace='nowrap'
            top='8px'
          >
            {String(START_HOUR + i).padStart(2, '0')}:00
          </Box>
        ))}
      </Box>
    </Flex>
  );
}

// ── ApptBlock ─────────────────────────────────────────────────────────────────

interface ApptBlockProps {
  appt: Appointment;
  doctor: Doctor;
  overrideStart?: number;
  overrideEnd?: number;
  isGhost?: boolean;
  onMoveDown: (e: React.MouseEvent, id: string) => void;
  onResizeLDown: (e: React.MouseEvent, id: string) => void;
  onResizeRDown: (e: React.MouseEvent, id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}
function ApptBlock({
  appt,
  doctor,
  overrideStart,
  overrideEnd,
  isGhost,
  onMoveDown,
  onResizeLDown,
  onResizeRDown,
  onDelete,
  onEdit,
}: ApptBlockProps) {
  const s = overrideStart ?? appt.startMin;
  const e = overrideEnd ?? appt.endMin;
  return (
    <Tooltip
      label={`${appt.patientName} · ${appt.service} · ${minToTime(s)}–${minToTime(e)}`}
      placement='top'
      hasArrow
      fontSize='xs'
      isDisabled={isGhost}
    >
      <Box
        position='absolute'
        left={pct(s)}
        width={pct(e - s)}
        top='6px'
        bottom='6px'
        bg={isGhost ? 'transparent' : doctor.color}
        border='1.5px solid'
        borderColor={doctor.borderColor}
        borderRadius='8px'
        overflow='hidden'
        zIndex={isGhost ? 20 : 1}
        opacity={isGhost ? 0.5 : 1}
        borderStyle={isGhost ? 'dashed' : 'solid'}
        transition='box-shadow 0.15s'
        _hover={{ boxShadow: isGhost ? 'none' : 'md' }}
        role='group'
      >
        {!isGhost && (
          <>
            {/* Resize left */}
            <Box
              position='absolute'
              left={0}
              top={0}
              bottom={0}
              w='8px'
              cursor='ew-resize'
              zIndex={3}
              onMouseDown={(e) => {
                e.stopPropagation();
                onResizeLDown(e, appt.id);
              }}
            />
            {/* Drag / double-click to edit */}
            <Box
              position='absolute'
              left='8px'
              right='8px'
              top={0}
              bottom={0}
              cursor='grab'
              _active={{ cursor: 'grabbing' }}
              onMouseDown={(e) => onMoveDown(e, appt.id)}
              px='6px'
              py='5px'
              overflow='hidden'
            >
              <Text
                fontSize='11px'
                fontWeight='600'
                color={doctor.textColor}
                noOfLines={1}
              >
                {appt.patientName}
              </Text>
              <Text fontSize='10px' color={doctor.textColor} opacity={0.7} noOfLines={1}>
                {appt.service}
              </Text>
              <Text fontSize='10px' color={doctor.textColor} opacity={0.55}>
                {minToTime(appt.startMin)}–{minToTime(appt.endMin)}
              </Text>
            </Box>
            {/* Close button — visible on hover */}
            <Box
              as='button'
              position='absolute'
              top='4px'
              right='4px'
              w='16px'
              h='16px'
              borderRadius='full'
              bg={doctor.borderColor}
              display='flex'
              alignItems='center'
              justifyContent='center'
              zIndex={4}
              cursor='pointer'
              opacity={0}
              transition='opacity 0.15s'
              _groupHover={{ opacity: 1 }}
              onMouseDown={(e: React.MouseEvent) => {
                e.stopPropagation();
                onDelete(appt.id);
              }}
            >
              <CloseIcon boxSize='6px' color={doctor.textColor} />
            </Box>
            {/* Resize right */}
            <Box
              position='absolute'
              right={0}
              top={0}
              bottom={0}
              w='8px'
              cursor='ew-resize'
              zIndex={3}
              onMouseDown={(e) => {
                e.stopPropagation();
                onResizeRDown(e, appt.id);
              }}
            />
          </>
        )}
      </Box>
    </Tooltip>
  );
}

// ── DoctorRow ─────────────────────────────────────────────────────────────────

interface DoctorRowProps {
  doctor: Doctor;
  appointments: Appointment[];
  drag: DragState;
  ghostMin: { s: number; e: number } | null;
  onStripMouseDown: (e: React.MouseEvent, doctorId: string, el: HTMLDivElement) => void;
  onMoveDown: (e: React.MouseEvent, id: string) => void;
  onResizeLDown: (e: React.MouseEvent, id: string) => void;
  onResizeRDown: (e: React.MouseEvent, id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}
function DoctorRow({
  doctor,
  appointments,
  drag,
  ghostMin,
  onStripMouseDown,
  onMoveDown,
  onResizeLDown,
  onResizeRDown,
  onDelete,
  onEdit,
}: DoctorRowProps) {
  const bc = useColorModeValue('#EEF2F7', 'gray.700');
  const bg = useColorModeValue('white', 'gray.800');
  const stripRef = useRef<HTMLDivElement>(null);
  const showCreatingGhost =
    ghostMin !== null && drag.type === 'creating' && drag.doctorId === doctor.id;
  return (
    <Flex
      h={`${ROW_HEIGHT}px`}
      borderBottom='1px solid'
      borderColor={bc}
      _last={{ borderBottom: 'none' }}
    >
      <Flex
        w={`${DOCTOR_COL_WIDTH}px`}
        minW={`${DOCTOR_COL_WIDTH}px`}
        align='center'
        gap='10px'
        px='14px'
        h='full'
        bg={bg}
        borderRight='1px solid'
        borderColor={bc}
        position='sticky'
        left={0}
        zIndex={2}
      >
        <Avatar
          size='sm'
          name={doctor.name}
          bg={doctor.borderColor}
          color={doctor.textColor}
          fontSize='11px'
          fontWeight='600'
        />
        <Box overflow='hidden'>
          <Text fontSize='12px' fontWeight='600' color='gray.700' noOfLines={1}>
            {doctor.name}
          </Text>
          <Text fontSize='11px' color='gray.400'>
            {doctor.role}
          </Text>
        </Box>
      </Flex>
      <Box
        ref={stripRef}
        position='relative'
        flex={1}
        h='full'
        cursor='crosshair'
        data-doctorid={doctor.id}
        onMouseDown={(e) => {
          if (stripRef.current) onStripMouseDown(e, doctor.id, stripRef.current);
        }}
      >
        <GridLines />
        {showCreatingGhost && ghostMin && (
          <Box
            position='absolute'
            left={pct(Math.min(ghostMin.s, ghostMin.e))}
            width={pct(Math.abs(ghostMin.e - ghostMin.s))}
            top='6px'
            bottom='6px'
            border='2px dashed'
            borderColor='blue.300'
            bg='blue.50'
            borderRadius='8px'
            pointerEvents='none'
            zIndex={5}
            opacity={0.7}
          />
        )}
        {appointments.map((appt) => {
          const isMoving = drag.type === 'moving' && drag.apptId === appt.id;
          const isResizing = drag.type === 'resizing' && drag.apptId === appt.id;
          const isMovingHere = isMoving && drag.currentDoctorId === doctor.id;
          return (
            <Box key={appt.id}>
              <ApptBlock
                appt={appt}
                doctor={doctor}
                isGhost={isMoving}
                onMoveDown={onMoveDown}
                onResizeLDown={onResizeLDown}
                onResizeRDown={onResizeRDown}
                onDelete={onDelete}
                onEdit={onEdit}
              />
              {isMovingHere && (
                <ApptBlock
                  appt={appt}
                  doctor={doctor}
                  overrideStart={drag.currentStartMin}
                  overrideEnd={drag.currentStartMin + (appt.endMin - appt.startMin)}
                  onMoveDown={onMoveDown}
                  onResizeLDown={onResizeLDown}
                  onResizeRDown={onResizeRDown}
                  onDelete={onDelete}
                  onEdit={onEdit}
                />
              )}
              {isResizing && (
                <ApptBlock
                  appt={appt}
                  doctor={doctor}
                  overrideStart={drag.startMin}
                  overrideEnd={drag.endMin}
                  onMoveDown={onMoveDown}
                  onResizeLDown={onResizeLDown}
                  onResizeRDown={onResizeRDown}
                  onDelete={onDelete}
                  onEdit={onEdit}
                />
              )}
            </Box>
          );
        })}
      </Box>
    </Flex>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

const FILTER_TABS = [
  'Консультация врача',
  'Инструментальные исследования',
  'Лабораторные исследования',
];

interface SchedulerTimelineProps {
  doctors?: Doctor[];
  selectedDate?: Date;
  onChange?: (appointments: Appointment[]) => void;
}

export default function SchedulerTimeline({
  doctors = DEFAULT_DOCTORS,
  selectedDate = new Date(),
  onChange,
}: SchedulerTimelineProps) {
  // ✅ FIX 1: Инициализируем локальное состояние из пропа
  const [currentDate, setCurrentDate] = useState<Date>(selectedDate);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [activeFilter, setActiveFilter] = useState(0);
  const [search, setSearch] = useState('');
  const [drag, setDrag] = useState<DragState>({ type: 'idle' });
  const [ghostMin, setGhostMin] = useState<{ s: number; e: number } | null>(null);
  const [modalState, setModalState] = useState<ModalState | null>(null);
  const { isOpen, onOpen, onClose: closeModal } = useDisclosure();

  const [apptsByDate, setApptsByDate] = useState<Record<string, Appointment[]>>({});

  const bg = useColorModeValue('white', 'gray.800');
  const bc = useColorModeValue('#E8EDF2', 'gray.700');
  const headerBg = useColorModeValue('white', 'gray.900');

  // ✅ FIX 2: Заменяем setState-в-рендере на useEffect для синхронизации пропа
  useEffect(() => {
    setCurrentDate((prev) => {
      if (isSameDayLocal(prev, selectedDate)) return prev;
      return selectedDate;
    });
  }, [selectedDate]);

  // ✅ FIX 3: Сбрасываем поиск при смене таба
  const handleTabChange = useCallback((index: number) => {
    setActiveFilter(index);
    setSearch('');
  }, []);

  const key = dateKey(currentDate);
  const dateOffset = Math.floor(currentDate.getTime() / 86400000);

  const appointments: Appointment[] = useMemo(() => {
    return apptsByDate[key] ?? seedAppointments(dateOffset);
  }, [key, apptsByDate, dateOffset]);

  const apptRef = useRef(appointments);
  apptRef.current = appointments;

  const updateAppts = useCallback(
    (next: Appointment[]) => {
      setApptsByDate((prev) => ({ ...prev, [key]: next }));
      onChange?.(next);
    },
    [key, onChange],
  );

  const visibleDoctors = useMemo(
    () => doctors.filter((d) => d.category === activeFilter),
    [doctors, activeFilter],
  );

  const visibleAppts = useMemo(() => {
    const q = search.trim().toLowerCase();
    return appointments.filter((a) => {
      const doc = doctors.find((d) => d.id === a.doctorId);
      if (!doc || doc.category !== activeFilter) return false;
      if (
        q &&
        !a.patientName.toLowerCase().includes(q) &&
        !a.service.toLowerCase().includes(q)
      )
        return false;
      return true;
    });
  }, [appointments, doctors, activeFilter, search]);

  const openCreateModal = useCallback(
    (doctorId: string, startMin: number, endMin: number) => {
      setModalState({
        mode: 'create',
        doctorId,
        patientName: '',
        service: ALL_SERVICES[0],
        startTime: minToTime(startMin),
        endTime: minToTime(endMin),
      });
      onOpen();
    },
    [onOpen],
  );

  const openEditModal = useCallback(
    (apptId: string) => {
      const appt = apptRef.current.find((a) => a.id === apptId);
      if (!appt) return;
      setModalState({
        mode: 'edit',
        apptId,
        doctorId: appt.doctorId,
        patientName: appt.patientName,
        service: appt.service,
        startTime: minToTime(appt.startMin),
        endTime: minToTime(appt.endMin),
      });
      onOpen();
    },
    [onOpen],
  );

  const handleModalSave = useCallback(() => {
    if (!modalState) return;
    const startMin = timeToMin(modalState.startTime);
    const endMin = timeToMin(modalState.endTime);
    if (endMin <= startMin) return;
    if (modalState.mode === 'create') {
      updateAppts([
        ...apptRef.current,
        {
          id: `a${_idCounter++}`,
          doctorId: modalState.doctorId,
          patientName: modalState.patientName.trim(),
          service: modalState.service,
          startMin,
          endMin,
        },
      ]);
    } else if (modalState.apptId) {
      updateAppts(
        apptRef.current.map((a) =>
          a.id === modalState.apptId
            ? {
                ...a,
                doctorId: modalState.doctorId,
                patientName: modalState.patientName.trim(),
                service: modalState.service,
                startMin,
                endMin,
              }
            : a,
        ),
      );
    }
    closeModal();
  }, [modalState, updateAppts, closeModal]);

  const handleModalDelete = useCallback(() => {
    if (!modalState?.apptId) return;
    updateAppts(apptRef.current.filter((a) => a.id !== modalState.apptId));
    closeModal();
  }, [modalState, updateAppts, closeModal]);

  const handleStripMouseDown = useCallback(
    (e: React.MouseEvent, doctorId: string, stripEl: HTMLDivElement) => {
      if (e.button !== 0) return;
      e.preventDefault();
      const rect = stripEl.getBoundingClientRect();
      const anchor = clientXToMin(e.clientX, rect);
      setDrag({ type: 'creating', doctorId, anchorMin: anchor, currentMin: anchor });
      setGhostMin({ s: anchor, e: anchor });
      const onMove = (ev: MouseEvent) => {
        const cur = clientXToMin(ev.clientX, rect);
        setGhostMin({ s: anchor, e: cur });
      };
      const onUp = (ev: MouseEvent) => {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
        const cur = clientXToMin(ev.clientX, rect);
        const lo = Math.min(anchor, cur),
          hi = Math.max(anchor, cur);
        setDrag({ type: 'idle' });
        setGhostMin(null);
        if (hi - lo >= SNAP_MIN) openCreateModal(doctorId, lo, hi);
      };
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    },
    [openCreateModal],
  );

  const clickCountRef = useRef<{
    apptId: string;
    count: number;
    timer: ReturnType<typeof setTimeout> | null;
  }>({ apptId: '', count: 0, timer: null });

  const handleMoveDown = useCallback(
    (e: React.MouseEvent, apptId: string) => {
      if (e.button !== 0) return;
      e.preventDefault();
      e.stopPropagation();
      const appt = apptRef.current.find((a) => a.id === apptId);
      if (!appt) return;
      const dur = appt.endMin - appt.startMin;
      const stripEl = document.querySelector<HTMLDivElement>(
        `[data-doctorid="${appt.doctorId}"]`,
      );
      if (!stripEl) return;
      const rect = stripEl.getBoundingClientRect();
      const offsetMin =
        ((e.clientX - rect.left) / rect.width) * TOTAL_MIN - appt.startMin;
      const startX = e.clientX,
        startY = e.clientY;
      let didDrag = false;
      const onMove = (ev: MouseEvent) => {
        if (!didDrag) {
          if (Math.abs(ev.clientX - startX) < 5 && Math.abs(ev.clientY - startY) < 5)
            return;
          didDrag = true;
          setDrag({
            type: 'moving',
            apptId,
            offsetMin,
            currentStartMin: appt.startMin,
            currentDoctorId: appt.doctorId,
          });
        }
        let hoveredDoctorId = appt.doctorId;
        document.querySelectorAll<HTMLDivElement>('[data-doctorid]').forEach((el) => {
          const r = el.getBoundingClientRect();
          if (ev.clientY >= r.top && ev.clientY <= r.bottom)
            hoveredDoctorId = el.dataset.doctorid!;
        });
        const targetRect =
          document
            .querySelector<HTMLDivElement>(`[data-doctorid="${hoveredDoctorId}"]`)
            ?.getBoundingClientRect() ?? rect;
        const ns = clamp(
          snap(
            ((ev.clientX - targetRect.left) / targetRect.width) * TOTAL_MIN - offsetMin,
          ),
          0,
          TOTAL_MIN - dur,
        );
        setDrag((d) =>
          d.type === 'moving'
            ? { ...d, currentStartMin: ns, currentDoctorId: hoveredDoctorId }
            : d,
        );
      };
      const onUp = () => {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
        if (!didDrag) {
          setDrag({ type: 'idle' });
          const cc = clickCountRef.current;
          cc.apptId === apptId ? cc.count++ : ((cc.apptId = apptId), (cc.count = 1));
          if (cc.timer) clearTimeout(cc.timer);
          if (cc.count >= 2) {
            cc.count = 0;
            openEditModal(apptId);
          } else
            cc.timer = setTimeout(() => {
              cc.count = 0;
            }, 300);
          return;
        }
        setDrag((d) => {
          if (d.type !== 'moving') return { type: 'idle' };
          updateAppts(
            apptRef.current.map((a) =>
              a.id === apptId
                ? {
                    ...a,
                    doctorId: d.currentDoctorId,
                    startMin: d.currentStartMin,
                    endMin: d.currentStartMin + dur,
                  }
                : a,
            ),
          );
          return { type: 'idle' };
        });
      };
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    },
    [updateAppts, openEditModal],
  );

  const handleResizeLDown = useCallback(
    (e: React.MouseEvent, apptId: string) => {
      if (e.button !== 0) return;
      e.preventDefault();
      e.stopPropagation();
      const appt = apptRef.current.find((a) => a.id === apptId);
      if (!appt) return;
      const rect = document
        .querySelector<HTMLDivElement>(`[data-doctorid="${appt.doctorId}"]`)
        ?.getBoundingClientRect();
      if (!rect) return;
      setDrag({
        type: 'resizing',
        apptId,
        side: 'l',
        startMin: appt.startMin,
        endMin: appt.endMin,
      });
      const onMove = (ev: MouseEvent) => {
        const ns = clamp(clientXToMin(ev.clientX, rect), 0, appt.endMin - SNAP_MIN);
        setDrag((d) => (d.type === 'resizing' ? { ...d, startMin: ns } : d));
      };
      const onUp = () => {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
        setDrag((d) => {
          if (d.type !== 'resizing') return { type: 'idle' };
          updateAppts(
            apptRef.current.map((a) =>
              a.id === apptId ? { ...a, startMin: d.startMin } : a,
            ),
          );
          return { type: 'idle' };
        });
      };
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    },
    [updateAppts],
  );

  const handleResizeRDown = useCallback(
    (e: React.MouseEvent, apptId: string) => {
      if (e.button !== 0) return;
      e.preventDefault();
      e.stopPropagation();
      const appt = apptRef.current.find((a) => a.id === apptId);
      if (!appt) return;
      const rect = document
        .querySelector<HTMLDivElement>(`[data-doctorid="${appt.doctorId}"]`)
        ?.getBoundingClientRect();
      if (!rect) return;
      setDrag({
        type: 'resizing',
        apptId,
        side: 'r',
        startMin: appt.startMin,
        endMin: appt.endMin,
      });
      const onMove = (ev: MouseEvent) => {
        const ne = clamp(
          clientXToMin(ev.clientX, rect),
          appt.startMin + SNAP_MIN,
          TOTAL_MIN,
        );
        setDrag((d) => (d.type === 'resizing' ? { ...d, endMin: ne } : d));
      };
      const onUp = () => {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
        setDrag((d) => {
          if (d.type !== 'resizing') return { type: 'idle' };
          updateAppts(
            apptRef.current.map((a) =>
              a.id === apptId ? { ...a, endMin: d.endMin } : a,
            ),
          );
          return { type: 'idle' };
        });
      };
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    },
    [updateAppts],
  );

  const handleDelete = useCallback(
    (apptId: string) => updateAppts(apptRef.current.filter((a) => a.id !== apptId)),
    [updateAppts],
  );

  return (
    <>
      {/*{isVisible && (*/}
      <>
        <Box
          bg={bg}
          borderRadius='16px'
          border='1px solid'
          borderColor={bc}
          overflow='hidden'
          userSelect='none'
        >
          {/* Toolbar */}
          <Box
            px='20px'
            pt='16px'
            pb='0'
            bg={headerBg}
            borderBottom='1px solid'
            borderColor={bc}
          >
            <Flex align='center' justify='space-between' mb='20px'>
              <Text fontSize='16px' fontWeight='700' color='gray.800'>
                Записи пациентов
              </Text>
              <HStack spacing='6px'>
                <div
                  onClick={() => setIsVisible(false)}
                  style={{
                    background: '#EBEFF9',
                    padding: '8px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <ArrowUpIcon />
                </div>
                <div
                  onClick={() => setIsVisible(true)}
                  style={{
                    background: '#EBEFF9',
                    padding: '8px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <ArrowDownIcon />
                </div>
              </HStack>
            </Flex>

            {isVisible && (
              <>
                {/* ✅ FIX 4: Табы вызывают handleTabChange, который меняет фильтр И сбрасывает поиск */}
                <Flex justify='space-between'>
                  <HStack spacing='8px'>
                    {FILTER_TABS.map((tab, i) => (
                      <Button
                        key={tab}
                        size='sm'
                        onClick={() => handleTabChange(i)}
                        borderRadius='20px'
                        fontWeight='500'
                        fontSize='13px'
                        px='16px'
                        h='34px'
                        bg={activeFilter === i ? '#243F82' : 'transparent'}
                        color={activeFilter === i ? 'white' : 'gray.600'}
                        border='1px solid'
                        borderColor={activeFilter === i ? '#243F82' : 'gray.200'}
                        _hover={{ bg: activeFilter === i ? '#1a2f6b' : 'gray.50' }}
                      >
                        {tab}
                      </Button>
                    ))}
                  </HStack>

                  <InputGroup size='sm' w='300px'>
                    <Input
                      placeholder='Поиск пациента или услуги'
                      borderRadius='20px'
                      fontSize='13px'
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      border='1px solid'
                      borderColor='gray.200'
                      _focus={{
                        borderColor: '#243F82',
                        boxShadow: '0 0 0 1px #243F82',
                      }}
                    />
                    <InputRightElement>
                      {search ? (
                        <CloseIcon
                          boxSize='10px'
                          color='gray.400'
                          cursor='pointer'
                          onClick={() => setSearch('')}
                        />
                      ) : (
                        <SearchIcon color='gray.400' boxSize='12px' />
                      )}
                    </InputRightElement>
                  </InputGroup>
                </Flex>

                {/* Grid */}
                <Box overflowX='auto'>
                  <Box minW='900px' pr='40px'>
                    <TimeHeader />
                    {visibleDoctors.length === 0 ? (
                      <Flex h='80px' align='center' justify='center'>
                        <Text fontSize='13px' color='gray.400'>
                          Нет врачей в этой категории
                        </Text>
                      </Flex>
                    ) : (
                      visibleDoctors.map((doc) => (
                        <DoctorRow
                          key={doc.id}
                          doctor={doc}
                          appointments={visibleAppts.filter((a) => a.doctorId === doc.id)}
                          drag={drag}
                          ghostMin={ghostMin}
                          onStripMouseDown={handleStripMouseDown}
                          onMoveDown={handleMoveDown}
                          onResizeLDown={handleResizeLDown}
                          onResizeRDown={handleResizeRDown}
                          onDelete={handleDelete}
                          onEdit={openEditModal}
                        />
                      ))
                    )}
                  </Box>
                </Box>

                {modalState && (
                  <AppointmentModal
                    isOpen={isOpen}
                    onClose={closeModal}
                    state={modalState}
                    doctors={visibleDoctors.length ? visibleDoctors : doctors}
                    onChange={setModalState}
                    onSave={handleModalSave}
                    onDelete={modalState.mode === 'edit' ? handleModalDelete : undefined}
                  />
                )}
              </>
            )}
          </Box>
        </Box>
      </>
      {/*)}*/}
    </>
  );
}
