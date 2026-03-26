import * as React from 'react';

import type { ShellStripAction } from '../../types';

export function useShellStripAction(
  action: ShellStripAction,
  onActivate?: (id: string) => void,
): () => void {
  return React.useCallback(() => {
    if (action.isDisabled) {
      return;
    }
    onActivate?.(action.id);
  }, [action.id, action.isDisabled, onActivate]);
}
