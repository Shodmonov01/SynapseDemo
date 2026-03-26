import * as React from 'react';
import { useOutlet } from 'react-router-dom';

import { Header, HEADER_PAGE_BG, PageShellHeaderTrailing, Sidebar } from './components';
import { SHELL_NAV_DEFAULT_ID, SHELL_NAV_TITLE } from './constants';

import { Box, Flex, Text } from '@chakra-ui/react';

export const PageShell: React.FC = () => {
  const [activeId, setActiveId] = React.useState(SHELL_NAV_DEFAULT_ID);
  const outlet = useOutlet();

  return (
    <Flex align='stretch' minH='100vh' w='full'>
      <Sidebar activeId={activeId} onNavigate={setActiveId} />
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
