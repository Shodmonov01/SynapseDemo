import type * as React from 'react';

import { radii } from '../tokens/radii';

import { Flex, Heading, HStack } from '@chakra-ui/react';

export interface TableToolbarProps {
  title: React.ReactNode;
  actions?: React.ReactNode;
}

export const TableToolbar: React.FC<TableToolbarProps> = ({ title, actions }) => {
  return (
    <Flex
      align='center'
      justify='space-between'
      flexWrap='wrap'
      gap={3}
      bg='bg.toolbar'
      color='fg.onBrand'
      px={5}
      py={3}
      borderTopRadius={radii.xl}
    >
      <Heading as='h3' size='sm' fontWeight='semibold' color='inherit'>
        {title}
      </Heading>
      {actions ? (
        <HStack spacing={2} flexShrink={0}>
          {actions}
        </HStack>
      ) : null}
    </Flex>
  );
};
