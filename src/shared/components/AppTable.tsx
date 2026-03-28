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
  Tfoot,
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
  selectAllAriaLabel?: string;
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
  sort?: AppTableSortState;
  selection?: AppTableSelectionState<Row>;
  /** Убрать обводку контейнера — для вложенных таблиц */
  noBorder?: boolean;
  /** Содержимое <Tfoot>: один или несколько <Tr> */
  tfoot?: React.ReactNode;
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
    sort.onChange(
      columnId,
      sort.columnId === columnId && sort.direction === 'asc' ? 'desc' : 'asc',
    );
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
      fontWeight='inherit'
      textAlign='left'
      align='center'
      w='full'
      _hover={{ opacity: 0.92 }}
      _focusVisible={{
        outline: '2px solid',
        outlineColor: 'whiteAlpha.800',
        outlineOffset: 2,
      }}
      aria-sort={active ? (direction === 'asc' ? 'ascending' : 'descending') : 'none'}
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
};

export function AppTable<Row>({
  columns,
  rows,
  getRowKey,
  variant = 'soft',
  rowProps,
  size = 'md',
  sort,
  selection,
  noBorder = false,
  tfoot,
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
    if (!sort || !col.meta?.sortable) return col.header;
    return (
      <SortableHeader columnId={col.id} sort={sort} isLightOnBrand={isSoftOnBrand}>
        {col.header}
      </SortableHeader>
    );
  };

  const toggleAll = React.useCallback(() => {
    if (!selection) return;
    selection.onChange(allSelected ? new Set() : new Set(rowKeys));
  }, [selection, allSelected, rowKeys]);

  return (
    <TableContainer
      bg={noBorder ? 'bg.nestedTableSurface' : 'white'}
      borderWidth='1px'
      borderColor={noBorder ? 'border.nestedTable' : 'border.subtle'}
      borderTopWidth={noBorder ? undefined : 0}
      borderRadius={noBorder ? radii.xl : undefined}
      borderBottomRadius={noBorder ? undefined : radii.xl}
      ml={noBorder ? '84px' : undefined}
      mr={noBorder ? '59px' : undefined}
      overflow='hidden'
    >
      <Table variant={variant} size={size} {...rest}>
        <Thead sx={noBorder ? { height: '46px' } : undefined}>
          <Tr>
            {selection ? (
              <Th w='48px' px={3} verticalAlign='middle'>
                <Checkbox
                  isChecked={allSelected}
                  isIndeterminate={someSelected}
                  onChange={toggleAll}
                  aria-label={selection.selectAllAriaLabel ?? 'Выбрать все строки'}
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
              if (next.has(key)) next.delete(key);
              else next.add(key);
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
        {tfoot ? (
          <Tfoot sx={noBorder ? { height: '46px' } : undefined}>{tfoot}</Tfoot>
        ) : null}
      </Table>
    </TableContainer>
  );
}
