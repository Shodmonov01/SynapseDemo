import type * as React from 'react';

import { spacing } from 'ui/tokens';

import { Box, HStack, Icon, Text, VStack } from '@chakra-ui/react';

export type InfoItemLayout = 'vertical' | 'horizontal';

export interface InfoItemProps {
  label: React.ReactNode;
  value: React.ReactNode;
  icon?: React.ElementType;
  layout?: InfoItemLayout;
}

export const InfoItem: React.FC<InfoItemProps> = ({
  label,
  value,
  icon: IconComponent,
  layout = 'vertical',
}) => {
  const labelNode = (
    <Text fontSize='xs' fontWeight='medium' color='fg.muted'>
      {label}
    </Text>
  );
  const valueNode = (
    <Text fontSize='sm' color='fg.default' fontWeight='normal'>
      {value}
    </Text>
  );

  if (layout === 'horizontal') {
    return (
      <HStack align='flex-start' spacing={spacing.inlineGap}>
        {IconComponent ? (
          <Icon as={IconComponent} boxSize={4} color='fg.muted' mt={0.5} />
        ) : null}
        <Box>
          {labelNode}
          {valueNode}
        </Box>
      </HStack>
    );
  }

  return (
    <VStack align='flex-start' spacing={1}>
      <HStack spacing={2}>
        {IconComponent ? (
          <Icon as={IconComponent} boxSize={3.5} color='fg.muted' />
        ) : null}
        {labelNode}
      </HStack>
      <Box pl={IconComponent ? 5 : 0}>{valueNode}</Box>
    </VStack>
  );
};
