import * as React from 'react';
import { useNavigate, useOutlet, useLocation } from 'react-router-dom';

import { Header, HEADER_PAGE_BG, PageShellHeaderTrailing, Sidebar } from './components';
import { SHELL_NAV_TITLE } from './constants';
import {
  SHELL_NAV_PATH_BY_ITEM_ID,
  shellNavIdFromPath,
} from 'app/router/shellNavPaths';

import { Box, Flex, Text } from '@chakra-ui/react';

export const PageShell: React.FC = () => {
  const outlet = useOutlet();
  const navigate = useNavigate();
  const location = useLocation();

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
      <Sidebar activeId={activeId} onNavigate={handleNavigate} />
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
          <Box p={{ base: 4, md: 8 }}>{outlet ?? <Text fontSize='sm'>Контент</Text>}</Box>
        </Box>
      </Flex>
    </Flex>
  );
};
