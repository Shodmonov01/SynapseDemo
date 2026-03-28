import type * as React from 'react';

import { spacing } from '../tokens/spacing';

import { Box, HStack, Icon, Text, VStack } from '@chakra-ui/react';

export type InfoItemLayout = 'vertical' | 'horizontal';

export interface InfoItemProps {
  label: React.ReactNode;
  value: React.ReactNode;
  icon?: React.ElementType;
  layout?: InfoItemLayout;
  /** Макет карточки ЭМК (Figma): 12/14px, метки #7C94D3 */
  variant?: 'default' | 'emk';
}

const EMK_LABEL = '#7C94D3';
const EMK_VALUE = '#000000';
const EMK_FONT = "'Montserrat', 'Inter', system-ui, sans-serif";

export const InfoItem: React.FC<InfoItemProps> = ({
  label,
  value,
  icon: IconComponent,
  layout = 'vertical',
  variant = 'default',
}) => {
  const labelNode =
    variant === 'emk' ? (
      <Text
        fontSize='12px'
        fontWeight={400}
        lineHeight='1.22'
        color={EMK_LABEL}
        fontFamily={EMK_FONT}
      >
        {label}
      </Text>
    ) : (
      <Text fontSize='xs' fontWeight='medium' color='fg.muted'>
        {label}
      </Text>
    );
  const valueNode =
    variant === 'emk' ? (
      <Text
        fontSize='14px'
        fontWeight={400}
        lineHeight='1.22'
        color={EMK_VALUE}
        fontFamily={EMK_FONT}
      >
        {value}
      </Text>
    ) : (
      <Text fontSize='sm' color='fg.default' fontWeight='normal'>
        {value}
      </Text>
    );

  if (variant === 'emk' && layout === 'vertical') {
    return (
      <VStack align='flex-start' spacing={0.5} w='100%' minW={0}>
        <HStack align='flex-start' spacing={1}>
          {IconComponent ? (
            <Icon as={IconComponent} boxSize='14px' color={EMK_LABEL} mt='2px' flexShrink={0} />
          ) : null}
          {labelNode}
        </HStack>
        <Box w='100%' pl={0}>
          {valueNode}
        </Box>
      </VStack>
    );
  }

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
