import * as React from 'react';
import { useLocation, useNavigate, useOutlet } from 'react-router-dom';

import { SHELL_NAV_PATH_BY_ITEM_ID, shellNavIdFromPath } from 'app/router/shellNavPaths';

import { Header, HEADER_PAGE_BG, PageShellHeaderTrailing, Sidebar } from './components';
import { SIDEBAR_COLLAPSED_STORAGE_KEY, SHELL_NAV_TITLE } from './constants';

import { Box, Flex, Text } from '@chakra-ui/react';

const MD_MIN_WIDTH = '(min-width: 768px)';

function useMediaMinMd(): boolean {
  const [matches, setMatches] = React.useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia(MD_MIN_WIDTH).matches
      : false,
  );

  React.useEffect(() => {
    const mq = window.matchMedia(MD_MIN_WIDTH);
    const handler = () => setMatches(mq.matches);
    handler();
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return matches;
}

export const PageShell: React.FC = () => {
  const outlet = useOutlet();
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }
    try {
      return window.localStorage.getItem(SIDEBAR_COLLAPSED_STORAGE_KEY) === '1';
    } catch {
      return false;
    }
  });

  const isMdUp = useMediaMinMd();

  React.useEffect(() => {
    try {
      window.localStorage.setItem(
        SIDEBAR_COLLAPSED_STORAGE_KEY,
        sidebarCollapsed ? '1' : '0',
      );
    } catch {
      // ignore quota / private mode
    }
  }, [sidebarCollapsed]);

  const effectiveSidebarCollapsed = sidebarCollapsed && isMdUp;

  const handleToggleSidebarCollapsed = React.useCallback(() => {
    setSidebarCollapsed((v) => !v);
  }, []);

  const activeId = React.useMemo(
    () => shellNavIdFromPath(location.pathname),
    [location.pathname],
  );

  const handleNavigate = React.useCallback(
    (id: string) => {
      const path = SHELL_NAV_PATH_BY_ITEM_ID[id];
      if (path) {
        navigate(path);
      }
    },
    [navigate],
  );

  return (
    <Flex align='stretch' minH='100vh' w='full'>
      <Sidebar
        activeId={activeId}
        collapsed={effectiveSidebarCollapsed}
        onNavigate={handleNavigate}
        onToggleCollapse={handleToggleSidebarCollapsed}
      />
      <Flex
        direction='column'
        flex='1'
        bg={HEADER_PAGE_BG}
        pt={3}
        px={{ base: 4, md: 10 }}
        gap={4}
      >
        <Header
          title={SHELL_NAV_TITLE[activeId] ?? 'Раздел'}
          trailing={<PageShellHeaderTrailing />}
        />
        <Box as='main' flex='1' overflow='auto' minH={0}>
          <Box>{outlet ?? <Text fontSize='sm'>Контент</Text>}</Box>
        </Box>
      </Flex>
    </Flex>
  );
};
