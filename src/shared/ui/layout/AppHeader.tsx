import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import * as React from 'react';

export interface AppHeaderProps {
  /** Заголовок текущей страницы */
  title?: React.ReactNode;
  /** Подзаголовок или подсказка */
  description?: React.ReactNode;
  /** Полностью заменяет левый блок (крошки, кастом) */
  leading?: React.ReactNode;
  /** Правая зона: поиск, уведомления, меню пользователя */
  trailing?: React.ReactNode;
  /** Высота полосы */
  height?: string;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  description,
  leading,
  trailing,
  height = '64px',
}) => {
  const left = React.useMemo(() => {
    if (leading) {
      return leading;
    }
    if (!title && !description) {
      return null;
    }
    return (
      <Box minW={0}>
        {title ? (
          <Heading as="h1" size="md" color="brand.700" noOfLines={1}>
            {title}
          </Heading>
        ) : null}
        {description ? (
          <Text fontSize="sm" color="fg.muted" mt={title ? 0.5 : 0} noOfLines={2}>
            {description}
          </Text>
        ) : null}
      </Box>
    );
  }, [description, leading, title]);

  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      gap={4}
      flexWrap="wrap"
      minH={height}
      px={{ base: 4, md: 8 }}
      py={3}
      borderBottomWidth="1px"
      borderColor="border.subtle"
      bg="bg.surface"
      position="sticky"
      top={0}
      zIndex={10}
    >
      <Box flex="1" minW={0}>
        {left}
      </Box>
      {trailing ? (
        <Flex align="center" gap={2} flexShrink={0}>
          {trailing}
        </Flex>
      ) : null}
    </Flex>
  );
};
