import * as React from 'react';
import { useLocation } from 'react-router-dom';

import { URLS } from 'app/router/urls.tsx';

import { SettingsIcon } from '@chakra-ui/icons';
import { Badge, Box, Container, HStack, Text, VStack } from '@chakra-ui/react';
import {
  ActionIconButton,
  AppTable,
  type AppTableColumn,
  AppTableRowMenu,
  type AppTableSortDirection,
  SearchInput,
  TabbedTableSection,
  type TabbedTableSectionTab,
} from 'shared';

interface MedicalDocumentRow {
  id: string;
  date: string;
  time: string;
  clinic: string;
  doctorName: string;
  doctorRole: string;
  directionLabel: string;
  directionPrice: string;
  service: string;
  fileExtension: string;
}

const MOCK_TABS: TabbedTableSectionTab[] = [
  { id: 'visits', label: 'Все визиты' },
  { id: 'consultation', label: 'Консультация врача' },
  { id: 'instrumental', label: 'Инструментальные иследования' },
  { id: 'medical-docs', label: 'Медицинские документы' },
  { id: 'files', label: 'Файлы' },
];

const MOCK_ROWS: MedicalDocumentRow[] = [
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

function extensionBadgeProps(ext: string): { colorScheme: string } {
  if (ext === '.dcm') return { colorScheme: 'blue' };
  if (ext === '.exe') return { colorScheme: 'purple' };
  return { colorScheme: 'green' };
}

function rowDateTimeValue(row: MedicalDocumentRow): number {
  const [d, m, y] = row.date.split('.').map(Number);
  const [hh, mm] = row.time.split(':').map(Number);
  return new Date(y, m - 1, d, hh, mm).getTime();
}

function compareMedicalRows(
  a: MedicalDocumentRow,
  b: MedicalDocumentRow,
  columnId: string,
  direction: AppTableSortDirection,
): number {
  const sign = direction === 'asc' ? 1 : -1;
  const cmpStr = (x: string, y: string) =>
    x.localeCompare(y, 'ru', { sensitivity: 'base' }) * sign;

  switch (columnId) {
    case 'date':
      return (rowDateTimeValue(a) - rowDateTimeValue(b)) * sign;
    case 'clinic':
      return cmpStr(a.clinic, b.clinic);
    case 'doctor':
      return cmpStr(a.doctorName, b.doctorName);
    case 'service':
      return cmpStr(a.service, b.service);
    default:
      return 0;
  }
}

export const RegistrationMedicalDocumentsPage: React.FC = () => {
  const { pathname } = useLocation();
  const standalone = pathname === URLS.REGISTRATION_MEDICAL_DOCUMENTS;

  const [activeTabId, setActiveTabId] = React.useState('medical-docs');
  const [sortColumnId, setSortColumnId] = React.useState<string | null>('date');
  const [sortDirection, setSortDirection] = React.useState<AppTableSortDirection>('desc');
  const [selectedKeys, setSelectedKeys] = React.useState<Set<string>>(() => new Set());

  const sortConfig = React.useMemo(
    () => ({
      columnId: sortColumnId,
      direction: sortDirection,
      onChange: (columnId: string, direction: AppTableSortDirection) => {
        setSortColumnId(columnId);
        setSortDirection(direction);
      },
    }),
    [sortColumnId, sortDirection],
  );

  const displayRows = React.useMemo(() => {
    if (!sortColumnId) {
      return MOCK_ROWS;
    }
    return [...MOCK_ROWS].sort((a, b) =>
      compareMedicalRows(a, b, sortColumnId, sortDirection),
    );
  }, [sortColumnId, sortDirection]);

  const columns = React.useMemo<AppTableColumn<MedicalDocumentRow>[]>(
    () => [
      {
        id: 'date',
        header: 'Дата',
        meta: { sortable: true },
        cell: (row) => (
          <VStack align='flex-start' spacing={0}>
            <Text fontSize='sm' fontWeight='medium' color='fg.default'>
              {row.date}
            </Text>
            <Text fontSize='xs' color='fg.muted'>
              {row.time}
            </Text>
          </VStack>
        ),
      },
      {
        id: 'clinic',
        header: 'Клиника',
        meta: { sortable: true },
        cell: (row) => <Text fontSize='sm'>{row.clinic}</Text>,
      },
      {
        id: 'doctor',
        header: 'Врач',
        meta: { sortable: true },
        cell: (row) => (
          <VStack align='flex-start' spacing={0}>
            <Text fontSize='sm' fontWeight='medium'>
              {row.doctorName}
            </Text>
            <Text fontSize='xs' color='fg.muted'>
              {row.doctorRole}
            </Text>
          </VStack>
        ),
      },
      {
        id: 'direction',
        header: 'Направления',
        cell: (row) => (
          <VStack align='flex-start' spacing={0}>
            <Text fontSize='sm'>{row.directionLabel}</Text>
            <Text fontSize='xs' color='fg.muted'>
              {row.directionPrice}
            </Text>
          </VStack>
        ),
      },
      {
        id: 'service',
        header: 'Услуга',
        meta: { sortable: true },
        cell: (row) => <Text fontSize='sm'>{row.service}</Text>,
      },
      {
        id: 'ext',
        header: 'Тип файла',
        cell: (row) => {
          const { colorScheme } = extensionBadgeProps(row.fileExtension);
          return (
            <Badge
              variant='outline'
              colorScheme={colorScheme}
              borderRadius='full'
              px={2.5}
              py={0.5}
            >
              {row.fileExtension}
            </Badge>
          );
        },
      },
      {
        id: 'rowMenu',
        header: 'Действия',
        cell: (row) => (
          <AppTableRowMenu
            ariaLabel={`Действия: ${row.doctorName}, ${row.date}`}
            actions={[
              {
                id: 'open',
                label: 'Открыть',
                onSelect: () => {
                  // мок: позже replace на навигацию / API
                },
              },
              {
                id: 'download',
                label: 'Скачать',
                onSelect: () => {},
              },
            ]}
          />
        ),
      },
    ],
    [],
  );

  const toolbarActions = React.useMemo(
    () => (
      <HStack spacing={3}>
        <SearchInput placeholder='Поиск' maxW='400px' aria-label='Поиск по таблице' />
        <ActionIconButton
          toolbar
          aria-label='Дополнительные действия'
          icon={<SettingsIcon />}
        />
      </HStack>
    ),
    [],
  );

  const body = (
    <Container maxW='container.xl'>
      <TabbedTableSection
        tabs={MOCK_TABS}
        activeTabId={activeTabId}
        onTabChange={setActiveTabId}
        toolbarTitle='Медицинские документы'
        toolbarActions={toolbarActions}
      >
        <AppTable<MedicalDocumentRow>
          columns={columns}
          rows={displayRows}
          getRowKey={(row) => row.id}
          variant='soft'
          sort={sortConfig}
          selection={{
            selectedKeys,
            onChange: setSelectedKeys,
            selectAllAriaLabel: 'Выбрать все документы в таблице',
            getRowCheckboxAriaLabel: (row) =>
              `Выбрать документ от ${row.date} ${row.time}`,
          }}
        />
      </TabbedTableSection>
    </Container>
  );

  if (standalone) {
    return (
      <Box bg='bg.app' minH='100vh' py={8}>
        {body}
      </Box>
    );
  }

  return body;
};
