import type * as React from 'react';

export interface ShellTopBarProps {
  clinicLabel?: string;
  versionLabel?: string;
}

const SynapseLogoMark: React.FC = () => (
  <svg
    className='size-12 shrink-0 text-on-brand'
    viewBox='0 0 48 48'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    aria-hidden
  >
    <circle cx='24' cy='24' r='22' stroke='currentColor' strokeWidth='1.5' fill='none' />
    <path
      d='M24 8c-2 4-6 6-10 6m10 0c2 4 6 6 10 6M24 40c-2-4-6-6-10-6m10 0c2-4 6-6 10-6'
      stroke='currentColor'
      strokeWidth='1'
      strokeLinecap='round'
      opacity={0.85}
    />
    <text
      x='24'
      y='27'
      textAnchor='middle'
      fill='currentColor'
      fontSize='7'
      fontWeight='700'
      letterSpacing='0.08em'
      fontFamily='system-ui, sans-serif'
    >
      SYNAPSE
    </text>
  </svg>
);

export const ShellTopBar: React.FC<ShellTopBarProps> = ({
  clinicLabel = 'Клиника',
  versionLabel = 'v. 1.0.0',
}) => {
  return (
    <header className='flex min-h-[4.5rem] shrink-0 items-center gap-4 bg-brand-700 px-5 py-3 text-on-brand'>
      <SynapseLogoMark />
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
    </header>
  );
};
