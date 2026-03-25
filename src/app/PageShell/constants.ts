import {
  IconAmbulance,
  IconBook,
  IconChatBubble,
  IconDocumentArrow,
  IconEmrCard,
  IconGear,
  IconHeadset,
  IconMegaphone,
  IconPeopleQueue,
  IconProfile,
  IconShieldPin,
} from './icons/ShellMenuIcons';
import type { ShellNavSection, ShellStripAction } from './types';

export const SHELL_NAV_DEFAULT_ID = 'emk';

export const SHELL_NAV_SECTIONS: ShellNavSection[] = [
  {
    id: 'registry-ambulatory',
    title: 'Регистратура амбулатория',
    items: [
      { id: 'visits', label: 'Визиты', icon: IconDocumentArrow },
      { id: 'e-queue', label: 'Электронная очередь', icon: IconPeopleQueue },
      { id: 'emk-base', label: 'База ЭМК', icon: IconEmrCard },
      { id: 'doctor-outings', label: 'Выезды врачей', icon: IconAmbulance },
      { id: 'lab-outings', label: 'Выезды лабораторий', icon: IconAmbulance },
    ],
  },
  {
    id: 'workspace',
    title: 'Текущая рабочая область',
    items: [{ id: 'emk', label: 'ЭМК', icon: IconMegaphone }],
  },
];

export const SHELL_STRIP_TOP: ShellStripAction[] = [
  { id: 'profile', label: 'Профиль', icon: IconProfile },
];

export const SHELL_STRIP_BOTTOM: ShellStripAction[] = [
  { id: 'chat', label: 'Сообщения', icon: IconChatBubble },
  { id: 'settings', label: 'Настройки', icon: IconGear },
  { id: 'support', label: 'Поддержка', icon: IconHeadset },
  { id: 'security', label: 'Безопасность и доступ', icon: IconShieldPin },
  { id: 'manuals', label: 'Справочники и инструкции', icon: IconBook },
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
