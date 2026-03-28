import type { ShellNavSection, ShellStripAction } from './types';

import {
  IconArchiveBook,
  IconCards,
  IconDocumentForward,
  IconMessages,
  IconPin,
  IconSecurity,
  IconSetting,
  IconSupport,
  IconTruck,
  IconUsers,
} from 'shared/icons';

export const SHELL_NAV_DEFAULT_ID = 'emk';

/** localStorage: свёрнута ли боковая панель на десктопе (≥md). */
export const SIDEBAR_COLLAPSED_STORAGE_KEY = 'synapse.sidebarCollapsed';

export const SHELL_NAV_SECTIONS: ShellNavSection[] = [
  {
    id: 'registry-ambulatory',
    title: 'Регистратура амбулатория',
    items: [
      { id: 'visits', label: 'Визиты', icon: IconDocumentForward },
      { id: 'e-queue', label: 'Электронная очередь', icon: IconCards },
      { id: 'emk-base', label: 'База ЭМК', icon: IconArchiveBook },
      { id: 'doctor-outings', label: 'Выезды врачей', icon: IconTruck },
      { id: 'lab-outings', label: 'Выезды лабороторий', icon: IconTruck },
    ],
  },
  {
    id: 'workspace',
    title: 'Текущая рабочая область',
    items: [{ id: 'emk', label: 'ЭМК', icon: IconPin }],
  },
];

export const SHELL_STRIP_TOP: ShellStripAction[] = [
  { id: 'profile', label: 'Профиль', icon: IconUsers },
];

export const SHELL_STRIP_BOTTOM: ShellStripAction[] = [
  { id: 'chat', label: 'Сообщения', icon: IconMessages },
  { id: 'settings', label: 'Настройки', icon: IconSetting },
  { id: 'support', label: 'Поддержка', icon: IconSupport },
  { id: 'security', label: 'Безопасность и доступ', icon: IconSecurity },
  { id: 'manuals', label: 'Справочники и инструкции', icon: IconArchiveBook },
];

const titleFromSections = (): Record<string, string> => {
  const map: Record<string, string> = {};
  for (const section of SHELL_NAV_SECTIONS) {
    for (const item of section.items) {
      map[item.id] = item.label;
    }
  }
  return map;
};

export const SHELL_NAV_TITLE: Record<string, string> = titleFromSections();
