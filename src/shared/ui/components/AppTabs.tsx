import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  type TabsProps,
} from '@chakra-ui/react';
import * as React from 'react';

export interface AppTabItem {
  id: string;
  label: React.ReactNode;
  panel: React.ReactNode;
  isDisabled?: boolean;
}

export interface AppTabsProps extends Omit<TabsProps, 'children'> {
  items: AppTabItem[];
}

export const AppTabs: React.FC<AppTabsProps> = ({
  items,
  variant = 'pill',
  ...rest
}) => {
  const defaultIndex = React.useMemo(
    () => Math.max(0, items.findIndex((i) => !i.isDisabled)),
    [items],
  );

  return (
    <Tabs variant={variant} defaultIndex={defaultIndex} isLazy {...rest}>
      <TabList>
        {items.map((item) => (
          <Tab key={item.id} isDisabled={item.isDisabled}>
            {item.label}
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        {items.map((item) => (
          <TabPanel key={item.id} px={0}>
            {item.panel}
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};
