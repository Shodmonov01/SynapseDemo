import type { ShellNavItem } from './types';

import { CalendarIcon, SettingsIcon, ViewIcon } from '@chakra-ui/icons';

export const SHELL_NAV_DEFAULT_ID = 'dashboard';

export const SHELL_NAV_ITEMS: ShellNavItem[] = [
  { id: 'dashboard', label: 'Обзор', icon: ViewIcon },
  { id: 'schedule', label: 'Расписание', icon: CalendarIcon },
  { id: 'settings', label: 'Настройки', icon: SettingsIcon },
];

export const SHELL_NAV_TITLE: Record<string, string> = {
  dashboard: 'Обзор',
  schedule: 'Расписание',
  settings: 'Настройки',
};
