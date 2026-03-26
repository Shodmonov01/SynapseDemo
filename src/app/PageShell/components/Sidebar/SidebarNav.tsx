import * as React from 'react';

import { SHELL_NAV_SECTIONS } from '../../constants';
import type { ShellNavItem } from '../../types';

import { SidebarNavRow } from './SidebarNavRow';

export interface SidebarNavProps {
  activeId: string;
  onSelectItem: (item: ShellNavItem) => void;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({ activeId, onSelectItem }) => {
  return (
    <nav
      className={
        'flex min-h-0 w-[19.25rem] min-w-[19.25rem] max-w-[19.25rem] flex-1 flex-col overflow-y-auto ' +
        'border-r border-nav-border bg-white pt-5 pb-6 pl-3 pr-0 ' +
        'max-md:max-w-none max-md:min-w-0 max-md:w-full max-md:border-b max-md:border-r-0'
      }
    >
      {SHELL_NAV_SECTIONS.map((section) => (
        <section
          key={section.id}
          className='mb-6 last:mb-0'
          aria-labelledby={`nav-${section.id}`}
        >
          <h2
            id={`nav-${section.id}`}
            className='mb-4 ml-1 text-xs font-normal text-[#858DA0]'
          >
            {section.title}
          </h2>
          <ul className='m-0 flex list-none flex-col gap-2 p-0'>
            {section.items.map((item) => (
              <SidebarNavRow
                key={item.id}
                item={item}
                active={item.id === activeId}
                onSelect={onSelectItem}
              />
            ))}
          </ul>
        </section>
      ))}
    </nav>
  );
};
