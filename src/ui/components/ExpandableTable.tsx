import * as React from 'react';

import { radii } from 'ui/tokens';

import type { AppTableColumn } from './AppTable';

import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import {
  Box,
  Collapse,
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
}

export function ExpandableTable<Row>({
  columns,
  rows,
  getRowKey,
  renderExpanded,
  variant = 'soft',
  size = 'md',
  ...rest
}: ExpandableTableProps<Row>): React.ReactElement {
  const [openKeys, setOpenKeys] = React.useState<ReadonlySet<string>>(() => new Set());

  const toggle = React.useCallback((key: string) => {
    setOpenKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }, []);

  const colCount = columns.length + 1;

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
            <Th w='48px' px={3} />
            {columns.map((col) => (
              <Th key={col.id} isNumeric={col.meta?.isNumeric}>
                {col.header}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {rows.map((row, index) => {
            const key = getRowKey(row, index);
            const expanded = openKeys.has(key);
            return (
              <React.Fragment key={key}>
                <Tr>
                  <Td px={3} verticalAlign='middle'>
                    <IconButton
                      aria-label={expanded ? 'Свернуть' : 'Развернуть'}
                      size='sm'
                      variant='ghost'
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
                      <Box bg='bg.tableNested' px={4} py={4}>
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
    </TableContainer>
  );
}
