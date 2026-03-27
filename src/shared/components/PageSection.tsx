import * as React from 'react';

import { spacing } from '../tokens/spacing';

import { Box, type BoxProps, Heading, VStack } from '@chakra-ui/react';

export interface PageSectionProps extends BoxProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}

export const PageSection: React.FC<PageSectionProps> = ({
  title,
  description,
  action,
  children,
  ...rest
}) => {
  const header = React.useMemo(() => {
    if (!title && !description && !action) {
      return null;
    }
    return (
      <Box
        display='flex'
        flexWrap='wrap'
        alignItems='flex-start'
        justifyContent='space-between'
        gap={3}
        mb={spacing.stackGap}
      >
        <Box>
          {title ? (
            <Heading size='md' color='brand.500' mb={description ? 1 : 0}>
              {title}
            </Heading>
          ) : null}
          {description ? (
            <Box fontSize='sm' color='fg.muted'>
              {description}
            </Box>
          ) : null}
        </Box>
        {action ? <Box flexShrink={0}>{action}</Box> : null}
      </Box>
    );
  }, [action, description, title]);

  return (
    <Box mb={spacing.sectionGap} {...rest}>
      <VStack align='stretch' spacing={0}>
        {header}
        {children}
      </VStack>
    </Box>
  );
};
