import * as React from 'react';

import { radii } from '../tokens/radii';

import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Box,
  Checkbox,
  HStack,
  Icon,
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

export type AppTableSortDirection = 'asc' | 'desc';

export interface AppTableSortState {
  columnId: string | null;
  direction: AppTableSortDirection;
  onChange: (columnId: string, direction: AppTableSortDirection) => void;
}

export interface AppTableSelectionState<Row> {
  /** Ключи выбранных строк (как у `getRowKey`) */
  selectedKeys: ReadonlySet<string>;
  onChange: (next: Set<string>) => void;
  /** Подпись чекбокса «выбрать все» в шапке */
  selectAllAriaLabel?: string;
  /** Подпись чекбокса строки */
  getRowCheckboxAriaLabel?: (row: Row, index: number) => string;
}

export interface AppTableColumn<Row> {
  id: string;
  header: React.ReactNode;
  cell: (row: Row) => React.ReactNode;
  meta?: { isNumeric?: boolean; sortable?: boolean };
}

export interface AppTableProps<Row> extends TableProps {
  columns: AppTableColumn<Row>[];
  rows: Row[];
  getRowKey: (row: Row, index: number) => string;
  variant?: TableProps['variant'];
  rowProps?: (row: Row, index: number) => TableRowProps | undefined;
  /** Сортировка по клику на шапку колонок с `meta.sortable` */
  sort?: AppTableSortState;
  /** Чекбоксы выбора строк */
  selection?: AppTableSelectionState<Row>;
}

interface SortableHeaderProps {
  columnId: string;
  sort: AppTableSortState;
  children: React.ReactNode;
  isLightOnBrand?: boolean;
}

const SortableHeader: React.FC<SortableHeaderProps> = ({
  columnId,
  sort,
  children,
  isLightOnBrand,
}) => {
  const active = sort.columnId === columnId;
  const direction = active ? sort.direction : null;

  const handleActivate = React.useCallback(() => {
    if (sort.columnId === columnId) {
      sort.onChange(columnId, sort.direction === 'asc' ? 'desc' : 'asc');
    } else {
      sort.onChange(columnId, 'asc');
    }
  }, [columnId, sort]);

  const inactiveIconColor = isLightOnBrand ? 'whiteAlpha.500' : 'blackAlpha.400';

  return (
    <HStack
      as='button'
      type='button'
      spacing={2}
      onClick={handleActivate}
      cursor='pointer'
      bg='transparent'
      border='none'
      p={0}
      m={0}
      color='inherit'
      font='inherit'
      fontWeight='inherit'
      textAlign='left'
      align='center'
      w='full'
      _hover={{ opacity: 0.92 }}
      _focusVisible={{ outline: '2px solid', outlineColor: 'whiteAlpha.800', outlineOffset: 2 }}
      aria-sort={
        active ? (direction === 'asc' ? 'ascending' : 'descending') : 'none'
      }
    >
      <Box as='span' flex='1' minW={0}>
        {children}
      </Box>
      <HStack spacing={0} aria-hidden flexShrink={0}>
        <Icon
          as={ChevronDownIcon}
          boxSize={3.5}
          transform='rotate(180deg)'
          opacity={direction === 'asc' ? 1 : 0.35}
          color={direction === 'asc' ? 'inherit' : inactiveIconColor}
        />
        <Icon
          as={ChevronDownIcon}
          boxSize={3.5}
          opacity={direction === 'desc' ? 1 : 0.35}
          color={direction === 'desc' ? 'inherit' : inactiveIconColor}
        />
      </HStack>
    </HStack>
  );
}

export function AppTable<Row>({
  columns,
  rows,
  getRowKey,
  variant = 'soft',
  rowProps,
  size = 'md',
  sort,
  selection,
  ...rest
}: AppTableProps<Row>): React.ReactElement {
  const rowKeys = React.useMemo(
    () => rows.map((row, index) => getRowKey(row, index)),
    [rows, getRowKey],
  );

  const selectedSet = React.useMemo(() => {
    if (!selection) return null;
    return new Set(selection.selectedKeys);
  }, [selection]);

  const allSelected =
    selection !== undefined &&
    rowKeys.length > 0 &&
    rowKeys.every((key) => selectedSet?.has(key));

  const someSelected =
    selection !== undefined &&
    rowKeys.some((key) => selectedSet?.has(key)) &&
    !allSelected;

  const isSoftOnBrand = variant === 'soft';

  const renderHeaderCell = (col: AppTableColumn<Row>) => {
    const sortable = Boolean(sort && col.meta?.sortable);
    if (!sortable || !sort) {
      return col.header;
    }
    return (
      <SortableHeader columnId={col.id} sort={sort} isLightOnBrand={isSoftOnBrand}>
        {col.header}
      </SortableHeader>
    );
  };

  const toggleAll = React.useCallback(() => {
    if (!selection) return;
    if (allSelected) {
      selection.onChange(new Set());
    } else {
      selection.onChange(new Set(rowKeys));
    }
  }, [selection, allSelected, rowKeys]);

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
            {selection ? (
              <Th w='48px' px={3} verticalAlign='middle'>
                <Checkbox
                  isChecked={allSelected}
                  isIndeterminate={someSelected}
                  onChange={toggleAll}
                  aria-label={
                    selection.selectAllAriaLabel ?? 'Выбрать все строки'
                  }
                  colorScheme={isSoftOnBrand ? 'whiteAlpha' : 'brand'}
                  size='md'
                />
              </Th>
            ) : null}
            {columns.map((col) => (
              <Th key={col.id} isNumeric={col.meta?.isNumeric}>
                {renderHeaderCell(col)}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {rows.map((row, index) => {
            const key = getRowKey(row, index);
            const rowSelected = selectedSet?.has(key) ?? false;

            const toggleRow = () => {
              if (!selection) return;
              const next = new Set(selection.selectedKeys);
              if (next.has(key)) {
                next.delete(key);
              } else {
                next.add(key);
              }
              selection.onChange(next);
            };

            return (
              <Tr key={key} {...rowProps?.(row, index)}>
                {selection ? (
                  <Td w='48px' px={3} verticalAlign='middle'>
                    <Checkbox
                      isChecked={rowSelected}
                      onChange={toggleRow}
                      aria-label={
                        selection.getRowCheckboxAriaLabel?.(row, index) ??
                        `Выбрать строку ${key}`
                      }
                      colorScheme='brand'
                      size='md'
                    />
                  </Td>
                ) : null}
                {columns.map((col) => (
                  <Td key={col.id} isNumeric={col.meta?.isNumeric}>
                    {col.cell(row)}
                  </Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
