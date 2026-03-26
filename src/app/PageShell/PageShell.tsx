import * as React from 'react';
import { useOutlet } from 'react-router-dom';

import { Header, Sidebar } from './components';
import { SHELL_NAV_DEFAULT_ID, SHELL_NAV_TITLE } from './constants';

import { Box, Flex, Text } from '@chakra-ui/react';
import { SearchInput } from 'shared';

export const PageShell: React.FC = () => {
  const [activeId, setActiveId] = React.useState(SHELL_NAV_DEFAULT_ID);
  const outlet = useOutlet();

  return (
    <Flex align='stretch' minH='100vh' w='full'>
      <Sidebar activeId={activeId} onNavigate={setActiveId} />
      <Flex direction='column' flex='1' minW={0} minH={0}>
        <Header
          title={SHELL_NAV_TITLE[activeId] ?? 'Раздел'}
          trailing={<SearchInput placeholder='Поиск по системе…' maxW='280px' />}
        />
        <Box as='main' flex='1' overflow='auto' bg='bg.app'>
          <Box p={{ base: 4, md: 8 }} maxW='1200px'>
            {outlet ?? (
              <Text color='fg.muted' fontSize='sm'>
                Контент
              </Text>
            )}
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};
