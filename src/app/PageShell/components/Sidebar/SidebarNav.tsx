import type * as React from 'react';

import { SidebarNavRow } from './SidebarNavRow';
import { SHELL_NAV_SECTIONS } from '../../constants';
import type { ShellNavItem } from '../../types';

import { typography } from 'shared/tokens/typography';

export interface SidebarNavProps {
  activeId: string;
  onSelectItem: (item: ShellNavItem) => void;
  /** Только иконки пунктов, заголовки секций скрыты визуально. */
  collapsed?: boolean;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  activeId,
  onSelectItem,
  collapsed = false,
}) => {
  const navWidthClass = collapsed
    ? 'w-[72px] min-w-[72px] max-w-[72px] pl-2 pr-2'
    : 'w-[308px] min-w-[308px] max-w-[308px] pl-3 pr-0';

  return (
    <nav
      className={
        `flex min-h-0 flex-1 flex-col overflow-y-auto border-r border-nav-border bg-white pt-5 pb-6 ` +
        `${navWidthClass} max-md:max-w-none max-md:min-w-0 max-md:w-full max-md:border-b max-md:border-r-0 max-md:px-3`
      }
      aria-label='Разделы приложения'
    >
      {SHELL_NAV_SECTIONS.map((section) => (
        <section
          key={section.id}
          className={collapsed ? 'mb-4 last:mb-0' : 'mb-6 last:mb-0'}
          aria-labelledby={`nav-${section.id}`}
        >
          <h2
            id={`nav-${section.id}`}
            className={collapsed ? 'sr-only' : 'mb-4 ml-1 font-normal text-[#858DA0]'}
            style={collapsed ? undefined : { fontSize: typography.fontSizes.md }}
          >
            {section.title}
          </h2>
          <ul className='m-0 flex list-none flex-col gap-2 p-0'>
            {section.items.map((item) => (
              <SidebarNavRow
                key={item.id}
                item={item}
                active={item.id === activeId}
                collapsed={collapsed}
                onSelect={onSelectItem}
              />
            ))}
          </ul>
        </section>
      ))}
    </nav>
  );
};
