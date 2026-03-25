import type { ElementType } from 'react';

export interface AppNavItem {
  id: string;
  label: string;
  icon?: ElementType;
  href?: string;
  isDisabled?: boolean;
}
