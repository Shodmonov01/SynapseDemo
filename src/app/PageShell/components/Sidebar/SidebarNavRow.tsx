import * as React from 'react';

import type { ShellNavItem } from '../../types';

import { colors } from 'shared/tokens/colors';

export interface SidebarNavRowProps {
  item: ShellNavItem;
  active: boolean;
  onSelect: (item: ShellNavItem) => void;
}

export const SidebarNavRow: React.FC<SidebarNavRowProps> = ({
  item,
  active,
  onSelect,
}) => {
  const IconComponent = item.icon;
  const handleClick = React.useCallback(() => {
    onSelect(item);
  }, [item, onSelect]);

  const linkClassName = [
    'flex h-10 w-full cursor-pointer items-center gap-2 border-0 py-2.5 pl-3 pr-2.5 text-left text-sm no-underline transition-colors duration-150',
    `focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[${colors.app.shellStripIconFgFocusRing}]`,
    'disabled:cursor-not-allowed disabled:opacity-45',
    active
      ? `rounded-l-[1.25rem] rounded-r-none bg-[${colors.app.shellStripIconFg}] font-semibold text-white hover:enabled:bg-[${colors.app.shellNavActiveHover}] max-md:rounded-xl`
      : 'rounded-2xl bg-transparent font-normal text-black hover:enabled:bg-nav-hover max-md:rounded-xl',
  ].join(' ');

  const inner = (
    <>
      {IconComponent ? (
        <span className='flex h-7 w-7 shrink-0 items-center justify-center rounded-[10px] p-1 text-inherit'>
          <IconComponent />
        </span>
      ) : null}
      <span className='min-w-0 truncate'>{item.label}</span>
    </>
  );

  if (item.href && !item.isDisabled) {
    return (
      <li className='m-0 p-0'>
        <a
          className={linkClassName}
          href={item.href}
          aria-current={active ? 'page' : undefined}
        >
          {inner}
        </a>
      </li>
    );
  }

  return (
    <li className='m-0 p-0'>
      <button
        type='button'
        className={linkClassName}
        disabled={Boolean(item.isDisabled)}
        aria-current={active ? 'page' : undefined}
        onClick={handleClick}
      >
        {inner}
      </button>
    </li>
  );
};
