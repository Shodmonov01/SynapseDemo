import type * as React from 'react';

import { MEDICAL_DOCUMENTS_COLUMNS } from '../columns/medicalDocumentsColumns';
import { useMedicalDocumentsTableState } from '../hooks/useMedicalDocumentsTableState';
import type { MedicalDocumentRow } from '../types/medicalDocumentRow';

import { AppTable, TableToolbar } from 'shared';

/**
 * Вкладка «Медицинские документы»: тулбар с заголовком и таблица с чекбоксами и сортировкой.
 * Состояние таблицы — в хуке `useMedicalDocumentsTableState`.
 */
export const MedicalDocumentsTab: React.FC = () => {
  const { sortConfig, displayRows, selectedKeys, setSelectedKeys, toolbarActions } =
    useMedicalDocumentsTableState();

  return (
    <>
      <TableToolbar
        title='Медицинские документы'
        actions={toolbarActions}
        borderTopRadius='0'
      />
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
