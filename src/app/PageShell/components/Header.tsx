import * as React from 'react';

import { Box, Flex, Heading, Spacer, Text } from '@chakra-ui/react';

export interface HeaderProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  /** Высота полосы по макету Header (Figma): 70px */
  height?: string;
}

/**
 * Верхняя панель по макету Figma (Header, узел 681:17265): белая карточка 70px, radius 24px,
 * заголовок слева (x=32), справа через Spacer — кнопка «Добавить пациента», поиск 218px, действия.
 */
export const Header: React.FC<HeaderProps> = ({
  title,
  description,
  leading,
  trailing,
  height = '70px',
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
          <Heading
            as='h1'
            fontSize='lg'
            fontWeight='semibold'
            lineHeight='1.22'
            color='#1C2B53'
            noOfLines={1}
          >
            {title}
          </Heading>
        ) : null}
        {description ? (
          <Text fontSize='sm' color='fg.muted' mt={title ? 0.5 : 0} noOfLines={2}>
            {description}
          </Text>
        ) : null}
      </Box>
    );
  }, [description, leading, title]);

  return (
    <Flex
      as='header'
      align='center'
      flexWrap='wrap'
      rowGap={3}
      columnGap={4}
      minH={height}
      px={8}
      py={0}
      borderRadius='24px'
      bg='white'
      boxShadow='none'
    >
      <Box flexShrink={0} minW={0} pt={0.5}>
        {left}
      </Box>
      <Spacer flex={1} minW={0} />
      {trailing ? (
        <Box flexShrink={0} minW={0}>
          {trailing}
        </Box>
      ) : null}
    </Flex>
  );
};
