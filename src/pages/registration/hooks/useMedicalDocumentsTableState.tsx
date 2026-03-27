import * as React from 'react';

import { SettingsIcon } from '@chakra-ui/icons';
import { HStack } from '@chakra-ui/react';

import type { AppTableSortDirection } from 'shared';
import { ActionIconButton, SearchInput } from 'shared';

import { MOCK_MEDICAL_DOCUMENT_ROWS } from '../mocks/medicalDocuments.mock';
import type { MedicalDocumentRow } from '../types/medicalDocumentRow';
import { compareMedicalDocumentRows } from '../utils/medicalDocumentSort';

interface MedicalDocumentsTableState {
  /** Конфиг для `AppTable`: колонка, направление, колбэк смены сортировки. */
  sortConfig: {
    columnId: string | null;
    direction: AppTableSortDirection;
    onChange: (id: string, dir: AppTableSortDirection) => void;
  };
  /** Строки с учётом текущей сортировки (мок на клиенте). */
  displayRows: MedicalDocumentRow[];
  selectedKeys: Set<string>;
  setSelectedKeys: React.Dispatch<React.SetStateAction<Set<string>>>;
  /** Правая часть `TableToolbar`: поиск и доп. действия. */
  toolbarActions: React.ReactNode;
}

/**
 * Локальное состояние таблицы меддокументов: сортировка, мультивыбор, производные строки.
 * При подключении API: заменить `displayRows` на данные из `useQuery`, сортировку — query params + инвалидация.
 */
export function useMedicalDocumentsTableState(): MedicalDocumentsTableState {
  const [sortColumnId, setSortColumnId] = React.useState<string | null>('date');
  const [sortDirection, setSortDirection] =
    React.useState<AppTableSortDirection>('desc');
  const [selectedKeys, setSelectedKeys] = React.useState<Set<string>>(() => new Set());

  const sortConfig = React.useMemo(
    () => ({
      columnId: sortColumnId,
      direction: sortDirection,
      onChange: (id: string, dir: AppTableSortDirection) => {
        setSortColumnId(id);
        setSortDirection(dir);
      },
    }),
    [sortColumnId, sortDirection],
  );

  const displayRows = React.useMemo(() => {
    if (!sortColumnId) return MOCK_MEDICAL_DOCUMENT_ROWS;
    return [...MOCK_MEDICAL_DOCUMENT_ROWS].sort((a, b) =>
      compareMedicalDocumentRows(a, b, sortColumnId, sortDirection),
    );
  }, [sortColumnId, sortDirection]);

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

  return {
    sortConfig,
    displayRows,
    selectedKeys,
    setSelectedKeys,
    toolbarActions,
  };
}
