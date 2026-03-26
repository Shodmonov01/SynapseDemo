import { colors } from 'shared/tokens/colors';

export const stripIconClassName =
  'flex size-9 shrink-0 items-center justify-center rounded-full border-0 bg-transparent p-0 ' +
  'cursor-pointer text-white no-underline transition-[background-color,transform] duration-150 ease-out ' +
  `hover:enabled:bg-[${colors.app.shellStripMutedBg}] active:enabled:scale-[0.97] ` +
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40 ' +
  'disabled:cursor-not-allowed disabled:opacity-45';

export const pillBaseClassName =
  `flex w-full max-w-[3.25rem] flex-col items-center rounded-[25px] bg-[${colors.app.shellStripIconFg}] border-t-2 border-r-2 border-[${colors.app.shellPillBorder}] border-l-0 border-b-0 ` +
  'max-md:max-w-none max-md:w-auto max-md:flex-none max-md:flex-row';
