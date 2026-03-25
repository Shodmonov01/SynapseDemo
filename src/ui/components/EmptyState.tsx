import type * as React from 'react';

import { Box, Text, VStack } from '@chakra-ui/react';

export interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  action,
}) => {
  return (
    <VStack spacing={4} py={12} px={4} textAlign='center' maxW='md' mx='auto'>
      {icon ? (
        <Box color='fg.muted' fontSize='4xl'>
          {icon}
        </Box>
      ) : null}
      <VStack spacing={1}>
        <Text fontWeight='semibold' color='fg.default'>
          {title}
        </Text>
        {description ? (
          <Text fontSize='sm' color='fg.muted'>
            {description}
          </Text>
        ) : null}
      </VStack>
      {action ? <Box>{action}</Box> : null}
    </VStack>
  );
};
