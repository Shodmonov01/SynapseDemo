import type { MedicalDocumentRow } from '../types/medicalDocumentRow';
import { extensionBadgeProps } from '../utils/fileExtensionBadge';

import { Badge, Text, VStack } from '@chakra-ui/react';
import type { AppTableColumn } from 'shared';
import { AppTableRowMenu } from 'shared';

/**
 * Описание колонок таблицы «Медицинские документы»: заголовки, сортировка, ячейки.
 * Вынесено из страницы, чтобы страница не разрасталась и колонки можно было переиспользовать в сторибуке.
 */
export const MEDICAL_DOCUMENTS_COLUMNS: AppTableColumn<MedicalDocumentRow>[] = [
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
          { id: 'open', label: 'Открыть', onSelect: () => {} },
          { id: 'download', label: 'Скачать', onSelect: () => {} },
        ]}
      />
    ),
  },
];
