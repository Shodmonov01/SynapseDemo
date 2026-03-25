import { CalendarIcon, SettingsIcon, ViewIcon } from '@chakra-ui/icons';
import { Avatar, Box, Text } from '@chakra-ui/react';
import * as React from 'react';
import {
  AppHeader,
  AppShell,
  AppSidebar,
  type AppNavItem,
  SearchInput,
} from '@synapse/ui';

const NAV_ITEMS: AppNavItem[] = [
  { id: 'dashboard', label: 'Обзор', icon: ViewIcon },
  { id: 'schedule', label: 'Расписание', icon: CalendarIcon },
  { id: 'settings', label: 'Настройки', icon: SettingsIcon },
];

const NAV_TITLE: Record<string, string> = {
  dashboard: 'Обзор',
  schedule: 'Расписание',
  settings: 'Настройки',
};

export const App: React.FC = () => {
  const [activeId, setActiveId] = React.useState('dashboard');

  const sidebar = (
    <AppSidebar
      brand={
        <Text fontSize="lg" fontWeight="bold" letterSpacing="tight">
          Synapse
        </Text>
      }
      items={NAV_ITEMS}
      activeId={activeId}
      onNavigate={setActiveId}
      footer={
        <Box display="flex" alignItems="center" gap={3} px={2} py={1}>
          <Avatar size="sm" name="Пользователь" />
          <Box minW={0}>
            <Text fontSize="sm" fontWeight="semibold" noOfLines={1}>
              Иванов И.И.
            </Text>
            <Text fontSize="xs" opacity={0.8} noOfLines={1}>
              Врач
            </Text>
          </Box>
        </Box>
      }
    />
  );

  const header = (
    <AppHeader
      title={NAV_TITLE[activeId] ?? 'Раздел'}
      description="Демо каркаса shell — сайдбар и шапка из общего UI-кита."
      trailing={<SearchInput placeholder="Поиск по системе…" maxW="280px" />}
    />
  );

  return (
    <AppShell sidebar={sidebar} header={header}>
      <Box p={{ base: 4, md: 8 }} maxW="1200px">
        <Text color="fg.muted" fontSize="sm">
          Контент страницы «{NAV_TITLE[activeId]}» — сюда подключаются remote-модули или
          локальные маршруты.
        </Text>
      </Box>
    </AppShell>
  );
};
