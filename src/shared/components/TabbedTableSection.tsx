import * as React from 'react';

import { TableToolbar } from './TableToolbar';
import { radii } from '../tokens/radii';

import { Box, Tab, TabList, Tabs } from '@chakra-ui/react';

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
}

export const TabbedTableSection: React.FC<TabbedTableSectionProps> = ({
  tabs,

  activeTabId,

  onTabChange,

  toolbarTitle,

  toolbarActions,

  children,
}) => {
  const showToolbar =
    toolbarTitle !== undefined && toolbarTitle !== null && toolbarTitle !== '';

  const tabIndex = React.useMemo(() => {
    const i = tabs.findIndex((t) => t.id === activeTabId);

    if (i >= 0) {
      return i;
    }

    const firstEnabled = tabs.findIndex((t) => !t.isDisabled);

    return firstEnabled >= 0 ? firstEnabled : 0;
  }, [tabs, activeTabId]);

  const handleTabsChange = React.useCallback(
    (index: number) => {
      const tab = tabs[index];

      if (tab && !tab.isDisabled) {
        onTabChange(tab.id);
      }
    },

    [tabs, onTabChange],
  );

  return (
    <>
      <Tabs index={tabIndex} onChange={handleTabsChange} variant='pill'>
        <TabList flexWrap='wrap' rowGap={2}>
          {tabs.map((tab) => (
            <Tab key={tab.id} isDisabled={tab.isDisabled}>
              {tab.label}
            </Tab>
          ))}
        </TabList>
      </Tabs>

      <Box pt={4}>
        {showToolbar ? (
          <TableToolbar
            title={toolbarTitle}
            actions={toolbarActions}
            borderTopRadius={radii.none}
          />
        ) : null}

        {children}
      </Box>
    </>
  );
};
