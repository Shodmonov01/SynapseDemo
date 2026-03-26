import * as React from 'react';

import { IconButton } from '@chakra-ui/react';

import { ShellTopBar } from './ShellTopBar';
import { SHELL_NAV_SECTIONS, SHELL_STRIP_BOTTOM, SHELL_STRIP_TOP } from '../constants';
import type { ShellNavItem, ShellStripAction } from '../types';

export interface SidebarProps {
  activeId: string;
  onNavigate: (id: string) => void;
}

/** Нижняя полоса иконок: 36×36 по макету, подсветка как в Figma (rgba 174,184,213,0.37). */
const stripIconClassName =
  'flex size-9 shrink-0 items-center justify-center rounded-full border-0 bg-transparent p-0 ' +
  'cursor-pointer text-white no-underline transition-[background-color,transform] duration-150 ease-out ' +
  'hover:enabled:bg-[rgba(174,184,213,0.37)] active:enabled:scale-[0.97] ' +
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40 ' +
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

/** Кнопки верхней полосы: стили из `shared/theme/iconButton` (variant toolbar, size md). */
const StripTopIconButton: React.FC<{
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

  const iconButtonProps = {
    'aria-label': action.label,
    title: action.label,
    variant: 'solid',
    icon: <IconComponent />,
    boxSize: '36px',
    minW: '36px',
    h: '36px',
    borderRadius: 'full',
  };

  if (action.href && !action.isDisabled) {
    return (
      <IconButton
        {...iconButtonProps}
        as='a'
        href={action.href}
      />
    );
  }

  return (
    <IconButton
      {...iconButtonProps}
      type='button'
      isDisabled={Boolean(action.isDisabled)}
      onClick={handleClick}
    />
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
    'flex h-10 w-full cursor-pointer items-center gap-2 border-0 py-2.5 pl-3 pr-2.5 text-left text-sm no-underline transition-colors duration-150',
    'focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#223B77]/50',
    'disabled:cursor-not-allowed disabled:opacity-45',
    active
      ? 'rounded-l-[1.25rem] rounded-r-none bg-[#223B77] font-semibold text-white hover:enabled:bg-[#2a4688] max-md:rounded-xl'
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

const pillBaseClassName =
  'flex w-full max-w-[3.25rem] flex-col items-center rounded-[25px] bg-[#223B77] border-t-2 border-r-2 border-[#374A76] border-l-0 border-b-0 ' +
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
        'flex w-full max-w-[25rem] shrink-0 flex-col bg-white min-h-screen ' +
        'max-md:max-w-none max-md:min-h-0 max-md:max-h-none'
      }
      aria-label='Основная навигация'
    >
      <ShellTopBar />
      <div className='flex min-h-0 flex-1 flex-row items-stretch gap-5 max-md:flex-col max-md:gap-0'>
        <div
          className={
            'flex min-h-0 w-[4.5rem] shrink-0 flex-col items-center py-4 pl-5 pr-0 ' +
            'max-md:w-full max-md:flex-none max-md:flex-row max-md:justify-center max-md:gap-4 max-md:px-3 max-md:pl-3'
          }
        >
          <div
            className={
              `${pillBaseClassName} min-h-[5rem] flex-1 justify-start gap-3 px-2 pb-4 pt-3 ` +
              'max-md:min-h-0 max-md:justify-center max-md:mt-0'
            }
          >
            {SHELL_STRIP_TOP.map((action) => (
              <StripTopIconButton key={action.id} action={action} />
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
