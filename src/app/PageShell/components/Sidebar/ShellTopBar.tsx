import type * as React from 'react';

import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { IconButton } from 'shared';
import { IconLogo } from 'shared/icons';
import { colors } from 'shared/tokens/colors';

export interface ShellTopBarProps {
  clinicLabel?: string;
  versionLabel?: string;
  /** Узкая полоса: только лого и кнопка разворота (текст скрыт). */
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const ShellTopBar: React.FC<ShellTopBarProps> = ({
  clinicLabel = 'Клиника',
  versionLabel = 'v. 1.0.0',
  collapsed = false,
  onToggleCollapse,
}) => {
  return (
    <div
      className={
        'flex h-[90px] min-h-[90px] shrink-0 items-center gap-2 text-on-brand ' +
        (collapsed ? 'justify-between pl-[10px] pr-2' : 'pl-[10px] pr-[20px]')
      }
      style={{ backgroundColor: colors.app.shellStripIconFg }}
      aria-label='Synapse medical system'
    >
      <div className='flex size-[90px] shrink-0 items-center justify-center overflow-hidden'>
        <span className='flex size-full items-center justify-center text-on-brand [&_svg]:max-h-full [&_svg]:max-w-full [&_svg]:h-auto [&_svg]:w-auto'>
          <IconLogo />
        </span>
      </div>
      {!collapsed ? (
        <>
          <div className='flex min-w-0 flex-1 flex-col gap-[5px] pt-0.5'>
            <div className='flex max-w-[291px] flex-wrap items-baseline gap-x-[5px] gap-y-1'>
              <h1 className='m-0 text-xl font-normal leading-[1.22] tracking-tight'>
                Synapse medical system
              </h1>
              <span className='text-[9px] font-normal leading-[1.22] text-[#969CC0]'>
                {versionLabel}
              </span>
            </div>
            <p className='m-0 text-sm font-normal leading-[1.22] text-[#969CC0]'>
              {clinicLabel}
            </p>
          </div>
          {onToggleCollapse ? (
            <IconButton
              type='button'
              aria-label='Свернуть боковую панель'
              variant='shellLavender'
              size='strip'
              className='shrink-0'
              icon={<ChevronLeftIcon />}
              onClick={onToggleCollapse}
            />
          ) : null}
        </>
      ) : (
        <>
          {onToggleCollapse ? (
            <IconButton
              type='button'
              aria-label='Развернуть боковую панель'
              variant='shellLavender'
              size='strip'
              className='shrink-0'
              icon={<ChevronRightIcon />}
              onClick={onToggleCollapse}
            />
          ) : null}
        </>
      )}
    </div>
  );
};
