import type * as React from 'react';

import { MEDICAL_DOCUMENTS_COLUMNS } from '../columns/medicalDocumentsColumns';
import { useMedicalDocumentsTableState } from '../hooks/useMedicalDocumentsTableState';
import type { MedicalDocumentRow } from '../types/medicalDocumentRow';

import { AppTable, TableToolbar } from 'shared';
import { radii } from 'shared/tokens';

export interface MedicalDocumentsTabProps {
  /** Заголовок в `TableToolbar` (подпись раздела под табами). */
  title?: string;
}

/**
 * Таблица меддокументов (мок): тулбар и `AppTable` с чекбоксами и сортировкой.
 * Тот же UI переиспользуется на нескольких вкладках ЭМК с разным `title`.
 * Состояние — в `useMedicalDocumentsTableState`.
 */
export const MedicalDocumentsTab: React.FC<MedicalDocumentsTabProps> = ({
  title = 'Медицинские документы',
}) => {
  const { sortConfig, displayRows, selectedKeys, setSelectedKeys, toolbarActions } =
    useMedicalDocumentsTableState();

  return (
    <>
      <TableToolbar title={title} actions={toolbarActions} borderTopRadius={radii.xl} />
      <AppTable<MedicalDocumentRow>
        columns={MEDICAL_DOCUMENTS_COLUMNS}
        rows={displayRows}
        getRowKey={(row) => row.id}
        variant='soft'
        sort={sortConfig}
        selection={{
          selectedKeys,
          onChange: setSelectedKeys,
          selectAllAriaLabel: 'Выбрать все документы',
          getRowCheckboxAriaLabel: (row) => `Выбрать документ от ${row.date} ${row.time}`,
        }}
      />
    </>
  );
};
