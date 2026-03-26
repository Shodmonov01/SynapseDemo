import type * as React from 'react';

import { radii } from '../tokens/radii';

import {
  Table,
  TableContainer,
  type TableProps,
  type TableRowProps,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

export interface AppTableColumn<Row> {
  id: string;
  header: React.ReactNode;
  cell: (row: Row) => React.ReactNode;
  meta?: { isNumeric?: boolean };
}

export interface AppTableProps<Row> extends TableProps {
  columns: AppTableColumn<Row>[];
  rows: Row[];
  getRowKey: (row: Row, index: number) => string;
  variant?: TableProps['variant'];
  rowProps?: (row: Row, index: number) => TableRowProps | undefined;
}

export function AppTable<Row>({
  columns,
  rows,
  getRowKey,
  variant = 'soft',
  rowProps,
  size = 'md',
  ...rest
}: AppTableProps<Row>): React.ReactElement {
  return (
    <TableContainer
      bg='bg.surface'
      borderWidth='1px'
      borderColor='border.subtle'
      borderTopWidth={0}
      borderBottomRadius={radii.xl}
      overflow='hidden'
    >
      <Table variant={variant} size={size} {...rest}>
        <Thead>
          <Tr>
            {columns.map((col) => (
              <Th key={col.id} isNumeric={col.meta?.isNumeric}>
                {col.header}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {rows.map((row, index) => (
            <Tr key={getRowKey(row, index)} {...rowProps?.(row, index)}>
              {columns.map((col) => (
                <Td key={col.id} isNumeric={col.meta?.isNumeric}>
                  {col.cell(row)}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
