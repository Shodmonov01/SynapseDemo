import { SHELL_NAV_DEFAULT_ID } from '../PageShell/constants';

import { URLS } from './urls.tsx';

/** Путь в приложении для каждого пункта бокового меню (синхронно с `SHELL_NAV_SECTIONS`). */
export const SHELL_NAV_PATH_BY_ITEM_ID: Record<string, string> = {
  visits: '/registry/visits',
  'e-queue': '/registry/e-queue',
  'emk-base': '/registry/emk-base',
  'doctor-outings': '/registry/doctor-outings',
  'lab-outings': '/registry/lab-outings',
  emk: URLS.WORKSPACE_EMK,
};

export function shellNavIdFromPath(pathname: string): string {
  const sorted = Object.entries(SHELL_NAV_PATH_BY_ITEM_ID).sort(
    (a, b) => b[1].length - a[1].length,
  );
  for (const [id, path] of sorted) {
    if (pathname === path) {
      return id;
    }
  }
  return SHELL_NAV_DEFAULT_ID;
}
