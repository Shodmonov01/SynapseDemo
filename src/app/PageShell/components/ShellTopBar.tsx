import { Icon } from '@chakra-ui/react';
import type * as React from 'react';
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
      className='flex min-h-[4.5rem] shrink-0 items-center gap-4 bg-brand-700 px-5  text-on-brand'
      aria-label='Synapse medical system'
    >
      <Icon as={IconLogo} boxSize='14px'/>
      <div className='flex min-w-0 flex-col gap-0.5'>
        <div className='flex flex-wrap items-baseline gap-x-3 gap-y-2'>
          <h1 className='m-0 text-lg font-semibold tracking-tight'>
            Synapse medical system
          </h1>
          <span className='text-[0.8125rem] font-medium text-fg-section'>
            {versionLabel}
          </span>
        </div>
        <p className='m-0 text-[0.8125rem] font-medium text-fg-subtitle'>{clinicLabel}</p>
      </div>
    </div>
  );
};
