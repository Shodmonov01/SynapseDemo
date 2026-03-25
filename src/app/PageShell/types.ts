import type { ElementType } from 'react';

export interface ShellNavItem {
  id: string;
  label: string;
  icon?: ElementType;
  href?: string;
  isDisabled?: boolean;
}
