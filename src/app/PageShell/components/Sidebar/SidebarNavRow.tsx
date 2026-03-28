import * as React from 'react';

import type { ShellNavItem } from '../../types';

import { colors } from 'shared/tokens/colors';

export interface SidebarNavRowProps {
  item: ShellNavItem;
  active: boolean;
  collapsed?: boolean;
  onSelect: (item: ShellNavItem) => void;
}

export const SidebarNavRow: React.FC<SidebarNavRowProps> = ({
  item,
  active,
  collapsed = false,
  onSelect,
}) => {
  const IconComponent = item.icon;
  const handleClick = React.useCallback(() => {
    onSelect(item);
  }, [item, onSelect]);

  const linkClassName = React.useMemo(() => {
    const base = [
      'flex h-10 w-full cursor-pointer border-0 text-sm no-underline transition-colors duration-150',
      `focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[${colors.app.shellStripIconFgFocusRing}]`,
      'disabled:cursor-not-allowed disabled:opacity-45',
    ];
    if (collapsed) {
      base.push(
        'items-center justify-center gap-0 px-2 py-2.5',
        active
          ? `rounded-xl bg-[${colors.app.shellStripIconFg}] font-semibold text-white hover:enabled:bg-[${colors.app.shellNavActiveHover}]`
          : 'rounded-2xl bg-transparent font-normal text-black hover:enabled:bg-nav-hover',
      );
    } else {
      base.push(
        'items-center gap-2 py-2.5 pl-3 pr-2.5 text-left',
        active
          ? `rounded-l-[20px] rounded-r-none bg-[${colors.app.shellStripIconFg}] font-semibold text-white hover:enabled:bg-[${colors.app.shellNavActiveHover}] max-md:rounded-xl`
          : 'rounded-2xl bg-transparent font-normal text-black hover:enabled:bg-nav-hover max-md:rounded-xl',
      );
    }
    return base.join(' ');
  }, [active, collapsed]);

  const a11yLabel = collapsed ? item.label : undefined;

  const inner = (
    <>
      {IconComponent ? (
        <span className='flex h-7 w-7 shrink-0 items-center justify-center rounded-[10px] p-1 text-inherit'>
          <IconComponent />
        </span>
      ) : null}
      {collapsed ? null : <span className='min-w-0 truncate text-sm'>{item.label}</span>}
    </>
  );

  if (item.href && !item.isDisabled) {
    return (
      <li className='m-0 p-0'>
        <a
          className={linkClassName}
          href={item.href}
          aria-label={a11yLabel}
          title={collapsed ? item.label : undefined}
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
        aria-label={a11yLabel}
        title={collapsed ? item.label : undefined}
        aria-current={active ? 'page' : undefined}
        onClick={handleClick}
      >
        {inner}
      </button>
    </li>
  );
};
