import * as React from 'react';

import { IconButton } from 'shared';

import { useShellStripAction } from './useShellStripAction';
import type { ShellStripAction } from '../../types';



export const SidebarStripTopIconButton: React.FC<{
  action: ShellStripAction;
  onActivate?: (id: string) => void;
}> = ({ action, onActivate }) => {
  const IconComponent = action.icon;
  const handleClick = useShellStripAction(action, onActivate);

  return (
    <IconButton
      aria-label={action.label}
      title={action.label}
      icon={<IconComponent />}
      href={action.href && !action.isDisabled ? action.href : undefined}
      isDisabled={Boolean(action.isDisabled)}
      onClick={handleClick}
    />
  );
};
