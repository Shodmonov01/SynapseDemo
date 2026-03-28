/**
 * Литералы hex/rgba в классах Tailwind — обязательны для JIT (см. shared/tokens/colors.ts app.shell*).
 * Шаблоны вида `bg-[${colors...}]` в билд не попадают, фон в рантайме прозрачный.
 */
export const stripIconClassName =
  'flex size-9 shrink-0 items-center justify-center rounded-full border-0 bg-transparent p-0 ' +
  'cursor-pointer text-white no-underline transition-[background-color,transform] duration-150 ease-out ' +
  'hover:enabled:bg-[rgba(174,184,213,0.37)] active:enabled:scale-[0.97] ' +
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40 ' +
  'disabled:cursor-not-allowed disabled:opacity-45';

export const pillBaseClassName =
  'flex w-full max-w-[52px] flex-col items-center rounded-[25px] bg-[#223B77] border-t-2 border-r-2 border-[#374A76] border-l-0 border-b-0 ' +
  'max-md:max-w-none max-md:w-auto max-md:flex-none max-md:flex-row';
