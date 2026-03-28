import * as React from 'react';

import {
  SERVICE_STATUS_MAP,
  URGENCY_MAP,
  VISIT_STATUS_MAP,
  VISIT_TYPE_MAP,
} from '../mappers/visitStatus';
import { MOCK_VISITS } from '../mocks/visits.mock';
import type { Visit, VisitService } from '../types/visit';

import { SettingsIcon } from '@chakra-ui/icons';
import { Box, HStack, Td, Text, Tr, VStack } from '@chakra-ui/react';
import {
  ActionIconButton,
  AppTable,
  type AppTableColumn,
  type AppTableSortDirection,
  type AppTableSortState,
  EmptyState,
  ExpandableTable,
  LoadingState,
  SearchInput,
  StatusBadge,
  TableToolbar,
} from 'shared';
import { radii } from 'shared/tokens';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function parseDateMs(date: string, time: string): number {
  const [d, m, y] = date.split('.').map(Number);
  const [hh, mm] = time.split(':').map(Number);
  return new Date(y, m - 1, d, hh, mm).getTime();
}

const URGENCY_ORDER: Record<Visit['urgency'], number> = {
  urgent: 0,
  normal: 1,
  deferred: 2,
};

const VISIT_STATUS_ORDER: Record<Visit['status'], number> = {
  on_reception: 0,
  waiting: 1,
  completed: 2,
  cancelled: 3,
};

function compareVisits(
  a: Visit,
  b: Visit,
  columnId: string,
  direction: AppTableSortDirection,
): number {
  const sign = direction === 'asc' ? 1 : -1;
  switch (columnId) {
    case 'date':
      return (parseDateMs(a.date, a.time) - parseDateMs(b.date, b.time)) * sign;
    case 'urgency':
      return (URGENCY_ORDER[a.urgency] - URGENCY_ORDER[b.urgency]) * sign;
    case 'status':
      return (VISIT_STATUS_ORDER[a.status] - VISIT_STATUS_ORDER[b.status]) * sign;
    case 'visitType':
      return a.visitType.localeCompare(b.visitType, 'ru') * sign;
    default:
      return 0;
  }
}

function matchesSearch(visit: Visit, query: string): boolean {
  const q = query.toLowerCase();
  return (
    visit.clinic.toLowerCase().includes(q) ||
    visit.direction.toLowerCase().includes(q) ||
    visit.services.some(
      (s) =>
        s.doctorName.toLowerCase().includes(q) ||
        s.serviceLabel.toLowerCase().includes(q) ||
        s.direction.toLowerCase().includes(q),
    )
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export interface AllVisitsTabProps {
  /**
   * Передавать isPending мутации / useQuery при подключении к API.
   * Пока используются моки — props не нужен, компонент сам управляет.
   */
  loading?: boolean;
}

export const AllVisitsTab: React.FC<AllVisitsTabProps> = ({ loading = false }) => {
  const [search, setSearch] = React.useState('');
  const [sortColumnId, setSortColumnId] = React.useState<string | null>('date');
  const [sortDirection, setSortDirection] = React.useState<AppTableSortDirection>('desc');
  const [selectedKeys, setSelectedKeys] = React.useState<Set<string>>(() => new Set());

  // ── Search + Sort ────────────────────────────────────────────────────────────
  const filteredRows = React.useMemo(() => {
    const q = search.trim();
    if (!q) return MOCK_VISITS;
    return MOCK_VISITS.filter((v) => matchesSearch(v, q));
  }, [search]);

  const displayRows = React.useMemo(() => {
    if (!sortColumnId) return filteredRows;
    return [...filteredRows].sort((a, b) =>
      compareVisits(a, b, sortColumnId, sortDirection),
    );
  }, [filteredRows, sortColumnId, sortDirection]);

  const sortConfig = React.useMemo<AppTableSortState>(
    () => ({
      columnId: sortColumnId,
      direction: sortDirection,
      onChange: (id, dir) => {
        setSortColumnId(id);
        setSortDirection(dir);
      },
    }),
    [sortColumnId, sortDirection],
  );

  // ── Outer columns ────────────────────────────────────────────────────────────
  const outerColumns = React.useMemo<AppTableColumn<Visit>[]>(
    () => [
      {
        id: 'date',
        header: 'Дата',
        meta: { sortable: true },
        cell: (v) => (
          <VStack align='flex-start' spacing={0}>
            <Text fontSize='sm' fontWeight='medium' color='fg.default'>
              {v.date}
            </Text>
            <Text fontSize='xs' color='fg.muted'>
              {v.time}
            </Text>
          </VStack>
        ),
      },
      {
        id: 'clinic',
        header: 'Клиника',
        cell: (v) => <Text fontSize='sm'>{v.clinic}</Text>,
      },
      {
        id: 'direction',
        header: 'Направление',
        cell: (v) => <Text fontSize='sm'>{v.direction}</Text>,
      },
      {
        id: 'urgency',
        header: 'Степень срочности',
        meta: { sortable: true },
        cell: (v) => {
          const { label, tone } = URGENCY_MAP[v.urgency];
          return <StatusBadge tone={tone}>{label}</StatusBadge>;
        },
      },
      {
        id: 'status',
        header: 'Статус',
        meta: { sortable: true },
        cell: (v) => {
          const { label, tone } = VISIT_STATUS_MAP[v.status];
          return <StatusBadge tone={tone}>{label}</StatusBadge>;
        },
      },
      {
        id: 'visitType',
        header: 'Тип визита',
        meta: { sortable: true },
        cell: (v) => {
          const { label, tone } = VISIT_TYPE_MAP[v.visitType];
          return <StatusBadge tone={tone}>{label}</StatusBadge>;
        },
      },
    ],
    [],
  );

  // ── Inner (service) columns ──────────────────────────────────────────────────
  const serviceColumns = React.useMemo<AppTableColumn<VisitService>[]>(
    () => [
      {
        id: 'date',
        header: 'Дата',
        cell: (s) => (
          <VStack align='flex-start' spacing={0}>
            <Text fontSize='sm'>{s.date}</Text>
            <Text fontSize='xs' color='fg.muted'>
              {s.time}
            </Text>
          </VStack>
        ),
      },
      {
        id: 'doctor',
        header: 'Врач',
        cell: (s) => (
          <VStack align='flex-start' spacing={0}>
            <Text fontSize='sm' fontWeight='medium'>
              {s.doctorName}
            </Text>
            <Text fontSize='xs' color='fg.muted'>
              {s.doctorRole}
            </Text>
          </VStack>
        ),
      },
      {
        id: 'direction',
        header: 'Направление',
        cell: (s) => <Text fontSize='sm'>{s.direction}</Text>,
      },
      {
        id: 'cabinet',
        header: 'Кабинет',
        cell: (s) => <Text fontSize='sm'>{s.cabinet}</Text>,
      },
      {
        id: 'service',
        header: 'Услуга',
        cell: (s) => (
          <VStack align='flex-start' spacing={0}>
            <Text fontSize='sm'>{s.serviceLabel}</Text>
            <Text fontSize='xs' color='fg.muted'>
              {s.servicePrice}
            </Text>
          </VStack>
        ),
      },
      {
        id: 'status',
        header: 'Статус',
        cell: (s) => {
          const { label, tone } = SERVICE_STATUS_MAP[s.status];
          return <StatusBadge tone={tone}>{label}</StatusBadge>;
        },
      },
    ],
    [],
  );

  // ── Expanded row renderer ────────────────────────────────────────────────────
  const renderExpanded = React.useCallback(
    (visit: Visit) => {
      const totalMap = SERVICE_STATUS_MAP[visit.totalStatus];
      return (
        <AppTable<VisitService>
          variant='simple'
          size='sm'
          noBorder
          columns={serviceColumns}
          rows={visit.services}
          getRowKey={(s) => s.id}
          tfoot={
            <Tr fontWeight='semibold'>
              <Td colSpan={4} fontSize='sm'>
                Общая стоимость
              </Td>
              <Td>
                <Text fontSize='sm' fontWeight='semibold'>
                  {visit.totalCost}
                </Text>
              </Td>
              <Td>
                <StatusBadge tone={totalMap.tone}>{totalMap.label}</StatusBadge>
              </Td>
            </Tr>
          }
        />
      );
    },
    [serviceColumns],
  );

  // ── Toolbar ──────────────────────────────────────────────────────────────────
  const handleSearchChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    },
    [],
  );

  const toolbarActions = React.useMemo(
    () => (
      <HStack spacing={3}>
        <SearchInput
          value={search}
          onChange={handleSearchChange}
          placeholder='Поиск'
          maxW='400px'
          aria-label='Поиск по визитам'
        />
        <ActionIconButton toolbar aria-label='Фильтры' icon={<SettingsIcon />} />
      </HStack>
    ),
    [search, handleSearchChange],
  );

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <Box
      display='flex'
      flexDirection='column'
      flex='1'
      minH={0}
      minW={0}
      overflow='hidden'
    >
      <Box flexShrink={0}>
        <TableToolbar
          title='Список пациентов'
          actions={toolbarActions}
          borderTopRadius={radii.xl}
        />
      </Box>
      {loading ? (
        <Box flex='1' minH={0}>
          <LoadingState label='Загрузка визитов…' />
        </Box>
      ) : displayRows.length === 0 ? (
        <Box flex='1' minH={0}>
          <EmptyState
            title={search ? 'Ничего не найдено' : 'Нет визитов'}
            description={
              search ? `По запросу «${search}» ничего не найдено` : 'Список визитов пуст'
            }
          />
        </Box>
      ) : (
        <ExpandableTable<Visit>
          fillAvailableHeight
          columns={outerColumns}
          rows={displayRows}
          getRowKey={(v) => v.id}
          renderExpanded={renderExpanded}
          sort={sortConfig}
          selection={{
            selectedKeys,
            onChange: setSelectedKeys,
            selectAllAriaLabel: 'Выбрать все визиты',
            getRowCheckboxAriaLabel: (v) =>
              `Выбрать визит: ${v.date} ${v.time}, ${v.clinic}`,
          }}
        />
      )}
    </Box>
  );
};
