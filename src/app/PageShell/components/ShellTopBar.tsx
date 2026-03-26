import type * as React from 'react';
import { colors } from 'shared/tokens/colors';
import { IconLogo } from 'shared/icons';

export interface ShellTopBarProps {
  clinicLabel?: string;
  versionLabel?: string;
}

export const ShellTopBar: React.FC<ShellTopBarProps> = ({
  clinicLabel = 'Клиника',
  versionLabel = 'v. 1.0.0',
}) => {
  return (
    <div
      className='flex h-[5.625rem] min-h-[5.625rem] shrink-0 items-center gap-2 pl-[10px] pr-5 text-on-brand'
      style={{ backgroundColor: colors.app.shellStripIconFg }}
      aria-label='Synapse medical system'
    >
      <div className='flex size-[5.625rem] shrink-0 items-center justify-center overflow-hidden'>
        <span className='flex size-full items-center justify-center text-on-brand [&_svg]:max-h-full [&_svg]:max-w-full [&_svg]:h-auto [&_svg]:w-auto'>
          <IconLogo />
        </span>
      </div>
      <div className='flex min-w-0 flex-col gap-[5px] pt-0.5'>
        <div className='flex max-w-[18.1875rem] flex-wrap items-baseline gap-x-[5px] gap-y-1'>
          <h1 className='m-0 text-xl font-normal leading-[1.22] tracking-tight'>
            Synapse medical system
          </h1>
          <span className='text-[9px] font-normal leading-[1.22] text-[#969CC0]'>{versionLabel}</span>
        </div>
        <p className='m-0 text-sm font-normal leading-[1.22] text-[#969CC0]'>{clinicLabel}</p>
      </div>
    </div>
  );
};
