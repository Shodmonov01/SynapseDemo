import * as React from 'react';

import { ShellTopBar } from './ShellTopBar';
import { SHELL_NAV_SECTIONS, SHELL_STRIP_BOTTOM, SHELL_STRIP_TOP } from '../constants';
import type { ShellNavItem, ShellStripAction } from '../types';

export interface SidebarProps {
  activeId: string;
  onNavigate: (id: string) => void;
}

const stripIconClassName =
  'flex size-10 shrink-0 items-center justify-center rounded-full border-0 bg-brand-400 p-0 ' +
  'cursor-pointer text-on-brand no-underline transition-[background-color,transform] duration-150 ease-out ' +
  'hover:enabled:bg-brand-300 active:enabled:scale-[0.97] ' +
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-200 ' +
  'disabled:cursor-not-allowed disabled:opacity-45';

const StripIconButton: React.FC<{
  action: ShellStripAction;
  onActivate?: (id: string) => void;
}> = ({ action, onActivate }) => {
  const IconComponent = action.icon;
  const handleClick = React.useCallback(() => {
    if (action.isDisabled) {
      return;
    }
    onActivate?.(action.id);
  }, [action.id, action.isDisabled, onActivate]);

  if (action.href && !action.isDisabled) {
    return (
      <a
        className={stripIconClassName}
        href={action.href}
        aria-label={action.label}
        title={action.label}
      >
        <IconComponent />
      </a>
    );
  }

  return (
    <button
      type='button'
      className={stripIconClassName}
      aria-label={action.label}
      title={action.label}
      disabled={Boolean(action.isDisabled)}
      onClick={handleClick}
    >
      <IconComponent />
    </button>
  );
};

const NavRow: React.FC<{
  item: ShellNavItem;
  active: boolean;
  onSelect: (item: ShellNavItem) => void;
}> = ({ item, active, onSelect }) => {
  const IconComponent = item.icon;
  const handleClick = React.useCallback(() => {
    onSelect(item);
  }, [item, onSelect]);

  const linkClassName = [
    'flex w-full cursor-pointer items-center gap-3 border-0 py-2.5 pl-3 pr-3 text-left text-sm font-semibold no-underline transition-colors duration-150',
    'rounded-l-xl rounded-r-none max-md:rounded-xl',
    'focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-300',
    'disabled:cursor-not-allowed disabled:opacity-45',
    active
      ? 'bg-brand-700 text-on-brand hover:enabled:bg-brand-600'
      : 'bg-transparent text-fg-default hover:enabled:bg-nav-hover',
  ].join(' ');

  const inner = (
    <>
      {IconComponent ? (
        <span className='flex shrink-0 items-center justify-center text-inherit'>
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

const pillBaseClassName =
  'flex w-full max-w-[3.25rem] flex-col items-center rounded-full bg-brand-700 shadow-[0_0_0_1px_rgba(255,255,255,0.08)] ' +
  'max-md:max-w-none max-md:w-auto max-md:flex-none max-md:flex-row';

export const Sidebar: React.FC<SidebarProps> = ({ activeId, onNavigate }) => {
  const handleSelect = React.useCallback(
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
        'flex min-h-screen shrink-0 flex-col bg-white max-md:min-h-0 max-md:w-full ' +
        'max-md:max-h-none'
      }
      aria-label='Основная навигация'
    >
      <ShellTopBar />
      <div className='flex min-h-0 flex-1 flex-row items-stretch max-md:flex-col'>
        <div
          className={
            'flex min-h-0 w-[4.5rem] shrink-0 flex-col items-center bg-brand-700 py-4 px-2 ' +
            'max-md:w-full max-md:flex-none max-md:flex-row max-md:justify-center max-md:gap-4 max-md:p-3'
          }
        >
          <div
            className={
              `${pillBaseClassName} min-h-[5rem] flex-1 justify-start gap-3 px-2 pb-4 pt-3 ` +
              'max-md:min-h-0 max-md:justify-center max-md:mt-0'
            }
          >
            {SHELL_STRIP_TOP.map((action) => (
              <StripIconButton key={action.id} action={action} />
            ))}
          </div>
          <div
            className={
              `${pillBaseClassName} mt-auto flex-none gap-2.5 px-2 pb-3.5 pt-3 ` +
              'max-md:mt-0 max-md:flex-wrap max-md:justify-center'
            }
          >
            {SHELL_STRIP_BOTTOM.map((action) => (
              <StripIconButton key={action.id} action={action} />
            ))}
          </div>
        </div>

        <nav
          className={
            'flex min-h-0 w-[17.5rem] min-w-[17.5rem] max-w-[17.5rem] flex-1 flex-col overflow-y-auto ' +
            'border-r border-nav-border bg-white py-6 pl-3 pr-0 ' +
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
                className='mb-2.5 ml-2 text-[0.6875rem] font-semibold uppercase tracking-wide text-fg-section'
              >
                {section.title}
              </h2>
              <ul className='m-0 flex list-none flex-col gap-1 p-0'>
                {section.items.map((item) => (
                  <NavRow
                    key={item.id}
                    item={item}
                    active={item.id === activeId}
                    onSelect={handleSelect}
                  />
                ))}
              </ul>
            </section>
          ))}
        </nav>
      </div>
    </aside>
  );
};
