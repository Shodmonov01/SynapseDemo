import * as React from 'react';

import { SearchInput } from 'ui';

import { Header, Sidebar } from './components';
import { SHELL_NAV_DEFAULT_ID, SHELL_NAV_TITLE } from './constants';

import { Box, Flex, Text } from '@chakra-ui/react';

export const PageShell: React.FC = () => {
  const [activeId, setActiveId] = React.useState(SHELL_NAV_DEFAULT_ID);

  return (
    <Flex align='stretch' minH='100vh' w='full'>
      <Sidebar activeId={activeId} onNavigate={setActiveId} />
      <Flex direction='column' flex='1' minW={0} minH='100vh'>
        <Header
          title={SHELL_NAV_TITLE[activeId] ?? 'Раздел'}
          description='Шапка и сайдбар — компоненты приложения, не из ui.'
          trailing={<SearchInput placeholder='Поиск по системе…' maxW='280px' />}
        />
        <Box as='main' flex='1' overflow='auto' bg='bg.app'>
          <Box p={{ base: 4, md: 8 }} maxW='1200px'>
            <Text color='fg.muted' fontSize='sm'>
              Контент страницы «{SHELL_NAV_TITLE[activeId]}» — сюда remote-модули или{' '}
              <code>Outlet</code>.
            </Text>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};
