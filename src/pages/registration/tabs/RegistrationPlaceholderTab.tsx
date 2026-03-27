import type * as React from 'react';

import { Box } from '@chakra-ui/react';
import { EmptyState } from 'shared';

/**
 * Заглушка для вкладок, контент которых ещё не реализован (консультации, лаборатория и т.д.).
 */
export const RegistrationPlaceholderTab: React.FC = () => (
  <Box py={12}>
    <EmptyState title='Раздел в разработке' description='Скоро появится контент' />
  </Box>
);
