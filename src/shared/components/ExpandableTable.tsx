import * as React from 'react';

import type {
  AppTableColumn,
  AppTableSelectionState,
  AppTableSortState,
} from './AppTable';
import { radii } from '../tokens/radii';

import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import {
  Box,
  Checkbox,
  Collapse,
  HStack,
  Icon,
  IconButton,
  Table,
  TableContainer,
  type TableProps,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

export interface ExpandableTableProps<Row> extends TableProps {
  columns: AppTableColumn<Row>[];
  rows: Row[];
  getRowKey: (row: Row, index: number) => string;
  renderExpanded: (row: Row) => React.ReactNode;
  variant?: TableProps['variant'];
  sort?: AppTableSortState;
  selection?: AppTableSelectionState<Row>;
  /**
   * В колонке flex с `flex={1} minH={0}`: таблица занимает оставшуюся высоту,
   * тело прокручивается внутри контейнера, шапка остаётся видимой (sticky).
   */
  fillAvailableHeight?: boolean;
}

interface ExpandSortableHeaderProps {
  columnId: string;
  sort: AppTableSortState;
  children: React.ReactNode;
}

const ExpandSortableHeader: React.FC<ExpandSortableHeaderProps> = ({
  columnId,
  sort,
  children,
}) => {
  const active = sort.columnId === columnId;
  const direction = active ? sort.direction : null;

  const handleClick = React.useCallback(() => {
    sort.onChange(
      columnId,
      sort.columnId === columnId && sort.direction === 'asc' ? 'desc' : 'asc',
    );
  }, [columnId, sort]);

  return (
    <HStack
      as='button'
      type='button'
      spacing={2}
      onClick={handleClick}
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
          color={direction === 'asc' ? 'inherit' : 'whiteAlpha.500'}
        />
        <Icon
          as={ChevronDownIcon}
          boxSize={3.5}
          opacity={direction === 'desc' ? 1 : 0.35}
          color={direction === 'desc' ? 'inherit' : 'whiteAlpha.500'}
        />
      </HStack>
    </HStack>
  );
};

export function ExpandableTable<Row>({
  columns,
  rows,
  getRowKey,
  renderExpanded,
  variant = 'soft',
  size = 'md',
  sort,
  selection,
  fillAvailableHeight = false,
  ...rest
}: ExpandableTableProps<Row>): React.ReactElement {
  const [openKeys, setOpenKeys] = React.useState<ReadonlySet<string>>(() => new Set());

  const toggle = React.useCallback((key: string) => {
    setOpenKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

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

  const toggleAll = React.useCallback(() => {
    if (!selection) return;
    selection.onChange(allSelected ? new Set() : new Set(rowKeys));
  }, [selection, allSelected, rowKeys]);

  // checkbox col (if enabled) + expand col + data cols
  const colCount = columns.length + 1 + (selection ? 1 : 0);

  const renderHeaderCell = (col: AppTableColumn<Row>) => {
    if (!sort || !col.meta?.sortable) return col.header;
    return (
      <ExpandSortableHeader columnId={col.id} sort={sort}>
        {col.header}
      </ExpandSortableHeader>
    );
  };

  const tableTree = (
    <Table variant={variant} size={size} {...rest}>
      <Thead
        bg={
          fillAvailableHeight ? (variant === 'soft' ? '#DADADA' : 'bg.surface') : undefined
        }
        sx={
          fillAvailableHeight
            ? {
                position: 'sticky',
                top: 0,
                zIndex: 1,
                boxShadow: '0 1px 0 0 rgba(0, 0, 0, 0.06)',
              }
            : undefined
        }
      >
        <Tr>
          {selection ? (
            <Th w='48px' px={3} verticalAlign='middle'>
              <Checkbox
                isChecked={allSelected}
                isIndeterminate={someSelected}
                onChange={toggleAll}
                aria-label={selection.selectAllAriaLabel ?? 'Выбрать все строки'}
                colorScheme='whiteAlpha'
                size='md'
              />
            </Th>
          ) : null}
          <Th w='48px' px={3} />
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
          const expanded = openKeys.has(key);
          const rowSelected = selectedSet?.has(key) ?? false;

          const toggleRow = () => {
            if (!selection) return;
            const next = new Set(selection.selectedKeys);
            if (next.has(key)) next.delete(key);
            else next.add(key);
            selection.onChange(next);
          };

          return (
            <React.Fragment key={key}>
              <Tr>
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
                <Td px={3} verticalAlign='middle'>
                  <IconButton
                    aria-label={expanded ? 'Свернуть' : 'Развернуть'}
                    size='sm'
                    variant='ghost'
                    colorScheme='gray'
                    icon={expanded ? <ChevronDownIcon /> : <ChevronRightIcon />}
                    onClick={() => {
                      toggle(key);
                    }}
                  />
                </Td>
                {columns.map((col) => (
                  <Td key={col.id} isNumeric={col.meta?.isNumeric}>
                    {col.cell(row)}
                  </Td>
                ))}
              </Tr>
              <Tr>
                <Td colSpan={colCount} p={0} border='none'>
                  <Collapse in={expanded} animateOpacity>
                    <Box bg='white' px={4} py={4}>
                      {renderExpanded(row)}
                    </Box>
                  </Collapse>
                </Td>
              </Tr>
            </React.Fragment>
          );
        })}
      </Tbody>
    </Table>
  );

  const container = (
    <TableContainer
      bg='bg.surface'
      borderBottomWidth='1px'
      borderColor='border.subtle'
      borderBottomRadius={radii.xl}
      overflow={fillAvailableHeight ? 'visible' : 'hidden'}
    >
      {tableTree}
    </TableContainer>
  );

  if (fillAvailableHeight) {
    return (
      <Box flex={1} minH={0} minW={0} w='full' overflow='auto'>
        {container}
      </Box>
    );
  }

  return container;
}
