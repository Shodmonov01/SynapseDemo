import type * as React from 'react';

import { TableToolbar } from './TableToolbar';
import { colors } from '../tokens/colors';
import { radii } from '../tokens/radii';

import { Box, Button, HStack, VStack } from '@chakra-ui/react';

export interface TabbedTableSectionTab {
  id: string;
  label: React.ReactNode;
  isDisabled?: boolean;
}

export interface TabbedTableSectionProps {
  /** Ряд табов (как Frame 790 в макете ЭМК) */
  tabs: TabbedTableSectionTab[];
  activeTabId: string;
  onTabChange: (tabId: string) => void;
  /** Заголовок блока таблицы (шапка как «Медицинские документы»); если не нужен — не передавайте */
  toolbarTitle?: React.ReactNode;
  /** Поиск, фильтр, иконки справа от заголовка */
  toolbarActions?: React.ReactNode;
  /** Таблица или любой контент под шапкой */
  children: React.ReactNode;
  /** Скругление внешней карточки (макет ~24–30px) */
  cardBorderRadius?: string;
}

export const TabbedTableSection: React.FC<TabbedTableSectionProps> = ({
  tabs,
  activeTabId,
  onTabChange,
  toolbarTitle,
  toolbarActions,
  children,
  cardBorderRadius = '1.875rem',
}) => {
  const showToolbar =
    toolbarTitle !== undefined && toolbarTitle !== null && toolbarTitle !== '';

  return (
    <VStack
      align='stretch'
      spacing={0}
      bg='bg.surface'
      borderRadius={cardBorderRadius}
      overflow='hidden'
      boxShadow='card'
    >
      <Box
        px={{ base: 3, md: 5 }}
        py={4}
        bg='bg.surface'
        borderBottomWidth='1px'
        borderColor='border.subtle'
      >
        <HStack
          as='div'
          role='tablist'
          aria-orientation='horizontal'
          spacing={2}
          flexWrap='wrap'
          rowGap={2}
        >
          {tabs.map((tab) => {
            const selected = tab.id === activeTabId;
            return (
              <Button
                key={tab.id}
                type='button'
                role='tab'
                aria-selected={selected}
                isDisabled={tab.isDisabled}
                onClick={() => {
                  if (!tab.isDisabled) onTabChange(tab.id);
                }}
                variant='unstyled'
                borderRadius={radii.pill}
                px={5}
                py={2}
                fontWeight='medium'
                fontSize='sm'
                flexShrink={0}
                transition='background 0.15s ease, color 0.15s ease, box-shadow 0.15s ease'
                bg={selected ? colors.app.surface : colors.brand[500]}
                color={selected ? colors.brand[700] : colors.app.surface}
                boxShadow={selected ? 'sm' : 'none'}
                borderWidth={selected ? '1px' : '0'}
                borderColor='border.subtle'
                _hover={{
                  bg: selected ? colors.app.surface : colors.brand[600],
                  color: selected ? colors.brand[800] : colors.app.surface,
                }}
                _disabled={{ opacity: 0.5, cursor: 'not-allowed' }}
              >
                {tab.label}
              </Button>
            );
          })}
        </HStack>
      </Box>

      {showToolbar ? (
        <TableToolbar
          title={toolbarTitle}
          actions={toolbarActions}
          borderTopRadius={radii.none}
        />
      ) : null}

      <Box>{children}</Box>
    </VStack>
  );
};
