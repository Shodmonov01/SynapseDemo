import type { ElementType } from 'react';

export interface ShellNavItem {
  id: string;
  label: string;
  icon?: ElementType;
  href?: string;
  isDisabled?: boolean;
}

export interface ShellNavSection {
  id: string;
  title: string;
  items: ShellNavItem[];
}

export interface ShellStripAction {
  id: string;
  label: string;
  icon: ElementType;
  href?: string;
  isDisabled?: boolean;
}
