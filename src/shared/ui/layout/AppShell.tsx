import { Box, Flex } from '@chakra-ui/react';
import * as React from 'react';

export interface AppShellProps {
  sidebar: React.ReactNode;
  header: React.ReactNode;
  children: React.ReactNode;
  /** Фон основной области */
  mainBg?: string;
}

/**
 * Каркас приложения: фиксированная боковая колонка + колонка с шапкой и прокручиваемым main.
 */
export const AppShell: React.FC<AppShellProps> = ({
  sidebar,
  header,
  children,
  mainBg = 'bg.app',
}) => {
  return (
    <Flex align="stretch" minH="100vh" w="full">
      {sidebar}
      <Flex direction="column" flex="1" minW={0} minH="100vh">
        {header}
        <Box as="main" flex="1" overflow="auto" bg={mainBg}>
          {children}
        </Box>
      </Flex>
    </Flex>
  );
};
