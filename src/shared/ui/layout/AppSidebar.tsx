import { Box, Icon, Text, VStack } from '@chakra-ui/react';
import * as React from 'react';
import { radii } from '@synapse/theme';
import type { AppNavItem } from './types';

export interface AppSidebarProps {
  brand?: React.ReactNode;
  items: AppNavItem[];
  activeId?: string;
  onNavigate?: (id: string) => void;
  footer?: React.ReactNode;
  /** Ширина панели, например `260px` или `16rem` */
  width?: string;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({
  brand,
  items,
  activeId,
  onNavigate,
  footer,
  width = '260px',
}) => {
  const handleSelect = React.useCallback(
    (item: AppNavItem) => {
      if (item.isDisabled) {
        return;
      }
      onNavigate?.(item.id);
    },
    [onNavigate],
  );

  return (
    <VStack
      as="aside"
      align="stretch"
      spacing={0}
      w={width}
      minW={width}
      minH="100vh"
      flexShrink={0}
      bg="brand.700"
      color="fg.onBrand"
      py={4}
    >
      {brand ? (
        <Box px={4} pb={6} borderBottomWidth="1px" borderColor="whiteAlpha.200">
          {brand}
        </Box>
      ) : null}

      <VStack align="stretch" spacing={1} px={3} pt={6} flex="1" overflowY="auto">
        {items.map((item) => {
          const active = item.id === activeId;
          const IconComponent = item.icon;
          const row = (
            <HStackNavRow
              active={active}
              disabled={Boolean(item.isDisabled)}
              label={item.label}
              icon={IconComponent}
            />
          );

          if (item.href && !item.isDisabled) {
            return (
              <Box
                key={item.id}
                as="a"
                href={item.href}
                display="block"
                borderRadius={radii.lg}
                cursor="pointer"
                textDecoration="none"
                outline="none"
                _focusVisible={{ boxShadow: 'outline' }}
              >
                {row}
              </Box>
            );
          }

          return (
            <Box
              key={item.id}
              as="button"
              type="button"
              display="block"
              w="full"
              border="none"
              cursor={item.isDisabled ? 'not-allowed' : 'pointer'}
              bg="transparent"
              p={0}
              textAlign="left"
              borderRadius={radii.lg}
              onClick={() => {
                handleSelect(item);
              }}
              disabled={item.isDisabled}
              opacity={item.isDisabled ? 0.45 : 1}
              _focusVisible={{ boxShadow: 'outline' }}
            >
              {row}
            </Box>
          );
        })}
      </VStack>

      {footer ? (
        <Box px={3} pt={4} mt="auto" borderTopWidth="1px" borderColor="whiteAlpha.200">
          {footer}
        </Box>
      ) : null}
    </VStack>
  );
};

interface HStackNavRowProps {
  active: boolean;
  disabled: boolean;
  label: string;
  icon?: React.ElementType;
}

const HStackNavRow: React.FC<HStackNavRowProps> = ({
  active,
  disabled,
  label,
  icon: IconComponent,
}) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      gap={3}
      w="full"
      px={3}
      py={2.5}
      borderRadius={radii.lg}
      bg={active ? 'whiteAlpha.200' : 'transparent'}
      color="inherit"
      transition="background 0.15s ease"
      _hover={
        disabled
          ? undefined
          : {
              bg: active ? 'whiteAlpha.200' : 'whiteAlpha.100',
            }
      }
    >
      {IconComponent ? (
        <Icon as={IconComponent} boxSize={5} flexShrink={0} opacity={0.95} />
      ) : null}
      <Text fontSize="sm" fontWeight="semibold" noOfLines={1}>
        {label}
      </Text>
    </Box>
  );
};
