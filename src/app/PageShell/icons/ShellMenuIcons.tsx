import type * as React from 'react';

export interface ShellIconProps {
  className?: string;
}

const stroke = (props: ShellIconProps) => ({
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
  className: props.className,
});

export const IconProfile: React.FC<ShellIconProps> = (props) => (
  <svg {...stroke(props)}>
    <circle cx='12' cy='9' r='3.5' stroke='currentColor' strokeWidth='1.5' fill='none' />
    <path
      d='M6 20v-1a6 6 0 0 1 12 0v1'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
    />
  </svg>
);

export const IconChatBubble: React.FC<ShellIconProps> = (props) => (
  <svg {...stroke(props)}>
    <path
      d='M6 8a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v5a4 4 0 0 1-4 4h-2l-4 3v-3H10a4 4 0 0 1-4-4V8Z'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinejoin='round'
    />
  </svg>
);

export const IconGear: React.FC<ShellIconProps> = (props) => (
  <svg {...stroke(props)}>
    <path
      d='M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z'
      stroke='currentColor'
      strokeWidth='1.5'
    />
    <path
      d='M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V22a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H2a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V2a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c0 .69.28 1.32.74 1.78l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82.33Z'
      stroke='currentColor'
      strokeWidth='1.2'
      strokeLinejoin='round'
    />
  </svg>
);

export const IconHeadset: React.FC<ShellIconProps> = (props) => (
  <svg {...stroke(props)}>
    <path
      d='M5 16v-3a7 7 0 0 1 14 0v3'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
    />
    <path
      d='M5 16a2 2 0 0 0 2 2h1v-6H7a2 2 0 0 0-2 2Zm14 0a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 2Z'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinejoin='round'
    />
  </svg>
);

export const IconShieldPin: React.FC<ShellIconProps> = (props) => (
  <svg {...stroke(props)}>
    <path
      d='M12 3 5 6v6c0 4 3.5 7 7 8 3.5-1 7-4 7-8V6l-7-3Z'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinejoin='round'
    />
    <path
      d='M12 11v4m0-4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
    />
  </svg>
);

export const IconBook: React.FC<ShellIconProps> = (props) => (
  <svg {...stroke(props)}>
    <path
      d='M6 4h10a2 2 0 0 1 2 2v14l-7-3-7 3V6a2 2 0 0 1 2-2Z'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinejoin='round'
    />
  </svg>
);

export const IconDocumentArrow: React.FC<ShellIconProps> = (props) => (
  <svg {...stroke(props)}>
    <path
      d='M8 4h6l4 4v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinejoin='round'
    />
    <path
      d='M14 4v4h4M10 14h6M10 18h4'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
    />
    <path
      d='m12 11 2 2-2 2'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

export const IconPeopleQueue: React.FC<ShellIconProps> = (props) => (
  <svg {...stroke(props)}>
    <path
      d='M8 11a3 3 0 1 0-3-3 3 3 0 0 0 3 3Zm8 0a3 3 0 1 0-3-3 3 3 0 0 0 3 3Z'
      stroke='currentColor'
      strokeWidth='1.5'
    />
    <path
      d='M2 20v-1a5 5 0 0 1 5-5h2m6 6v-1a5 5 0 0 0-5-5h-1'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
    />
    <path
      d='M18 8h4M20 6v4'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
    />
  </svg>
);

export const IconEmrCard: React.FC<ShellIconProps> = (props) => (
  <svg {...stroke(props)}>
    <rect
      x='4'
      y='5'
      width='16'
      height='14'
      rx='2'
      stroke='currentColor'
      strokeWidth='1.5'
    />
    <path
      d='M8 9h8M8 13h5'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
    />
    <circle cx='16' cy='15' r='2' stroke='currentColor' strokeWidth='1.5' />
  </svg>
);

export const IconAmbulance: React.FC<ShellIconProps> = (props) => (
  <svg {...stroke(props)}>
    <path
      d='M4 16h-1a1 1 0 0 1-1-1v-4l2-4h4l2 4h6v4a1 1 0 0 1-1 1h-1'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinejoin='round'
    />
    <circle cx='8' cy='17' r='2' stroke='currentColor' strokeWidth='1.5' />
    <circle cx='17' cy='17' r='2' stroke='currentColor' strokeWidth='1.5' />
    <path
      d='M10 8h4M12 6v4'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
    />
  </svg>
);

export const IconMegaphone: React.FC<ShellIconProps> = (props) => (
  <svg {...stroke(props)}>
    <path
      d='M4 11v4l4 2V9L4 11Zm4-2 8-3v10l-8-3V9Z'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinejoin='round'
    />
    <path d='M16 8v8' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
  </svg>
);
