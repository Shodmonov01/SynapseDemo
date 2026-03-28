import * as React from 'react';

import { ShellTopBar } from './ShellTopBar';
import { SidebarNav } from './SidebarNav';
import { SidebarStrip } from './SidebarStrip';
import type { ShellNavItem } from '../../types';

export interface SidebarProps {
  activeId: string;
  onNavigate: (id: string) => void;
  /** Только для ≥md: узкая колонка, в nav только иконки. */
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeId,
  onNavigate,
  collapsed = false,
  onToggleCollapse,
}) => {
  const handleSelectItem = React.useCallback(
    (item: ShellNavItem) => {
      if (item.isDisabled) {
        return;
      }
      onNavigate(item.id);
    },
    [onNavigate],
  );

  return (
    <aside
      className={
        'flex w-full shrink-0 flex-col bg-white min-h-screen ' +
        (collapsed ? 'md:max-w-[154px] ' : 'md:max-w-[300px] ') +
        'max-md:max-w-none max-md:min-h-0 max-md:max-h-none'
      }
      aria-label='Основная навигация'
    >
      <ShellTopBar collapsed={collapsed} onToggleCollapse={onToggleCollapse} />
      <div className='flex min-h-0 flex-1 flex-row items-stretch gap-1 max-md:flex-col max-md:gap-0'>
        <SidebarStrip />
        <SidebarNav
          activeId={activeId}
          collapsed={collapsed}
          onSelectItem={handleSelectItem}
        />
      </div>
    </aside>
  );
};
