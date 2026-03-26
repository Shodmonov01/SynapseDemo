import * as React from 'react';

import { SHELL_STRIP_BOTTOM, SHELL_STRIP_TOP } from '../../constants';

import { pillBaseClassName } from './sidebarClassNames';
import { SidebarStripTopIconButton } from './SidebarStripButtons';

export const SidebarStrip: React.FC = () => {
  return (
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
          <SidebarStripTopIconButton key={action.id} action={action} />
        ))}
      </div>
      <div
        className={
          `${pillBaseClassName} mt-auto flex-none gap-2.5 px-2 pb-3.5 pt-3 ` +
          'max-md:mt-0 max-md:flex-wrap max-md:justify-center'
        }
      >
        {SHELL_STRIP_BOTTOM.map((action) => (
          <SidebarStripTopIconButton key={action.id} action={action} />
        ))}
      </div>
    </div>
  );
};
