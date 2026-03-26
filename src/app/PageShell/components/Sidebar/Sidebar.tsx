import * as React from 'react';

import { SidebarNav } from './SidebarNav';
import { SidebarStrip } from './SidebarStrip';
import type { ShellNavItem } from '../../types';
import { ShellTopBar } from '../ShellTopBar';

export interface SidebarProps {
  activeId: string;
  onNavigate: (id: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeId, onNavigate }) => {
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
        'flex w-full max-w-[25rem] shrink-0 flex-col bg-white min-h-screen ' +
        'max-md:max-w-none max-md:min-h-0 max-md:max-h-none'
      }
      aria-label='Основная навигация'
    >
      <ShellTopBar />
      <div className='flex min-h-0 flex-1 flex-row items-stretch gap-5 max-md:flex-col max-md:gap-0'>
        <SidebarStrip />
        <SidebarNav activeId={activeId} onSelectItem={handleSelectItem} />
      </div>
    </aside>
  );
};
