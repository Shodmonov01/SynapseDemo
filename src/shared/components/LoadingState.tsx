import type * as React from 'react';

import { Center, Spinner, Text, VStack } from '@chakra-ui/react';

export interface LoadingStateProps {
  label?: string;
  spinnerSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  label,
  spinnerSize = 'lg',
}) => {
  return (
    <Center py={16} px={4}>
      <VStack spacing={4}>
        <Spinner
          size={spinnerSize}
          thickness='3px'
          speed='0.7s'
          color='brand.500'
          emptyColor='gray.200'
        />
        {label ? (
          <Text fontSize='sm' color='fg.muted'>
            {label}
          </Text>
        ) : null}
      </VStack>
    </Center>
  );
};
