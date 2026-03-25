import * as React from 'react';

import { SHELL_NAV_ITEMS } from '../constants';
import type { ShellNavItem } from '../types';

import { Avatar, Box, Icon, Text, VStack } from '@chakra-ui/react';
import { radii } from 'lib/theme';

export interface SidebarProps {
  activeId: string;
  onNavigate: (id: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeId, onNavigate }) => {
  const handleSelect = React.useCallback(
    (item: ShellNavItem) => {
      if (item.isDisabled) {
        return;
      }
      onNavigate(item.id);
    },
    [onNavigate],
  );

  const width = '260px';

  return (
    <VStack
      as='aside'
      align='stretch'
      spacing={0}
      w={width}
      minW={width}
      minH='100vh'
      flexShrink={0}
      bg='brand.700'
      color='fg.onBrand'
      py={4}
    >
      <Box px={4} pb={6} borderBottomWidth='1px' borderColor='whiteAlpha.200'>
        <Text fontSize='lg' fontWeight='bold' letterSpacing='tight'>
          Synapse
        </Text>
      </Box>

      <VStack align='stretch' spacing={1} px={3} pt={6} flex='1' overflowY='auto'>
        {SHELL_NAV_ITEMS.map((item) => {
          const active = item.id === activeId;
          const IconComponent = item.icon;
          const row = (
            <NavRow
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
                as='a'
                href={item.href}
                display='block'
                borderRadius={radii.lg}
                cursor='pointer'
                textDecoration='none'
                outline='none'
                _focusVisible={{ boxShadow: 'outline' }}
              >
                {row}
              </Box>
            );
          }

          return (
            <Box
              key={item.id}
              as='button'
              type='button'
              display='block'
              w='full'
              border='none'
              cursor={item.isDisabled ? 'not-allowed' : 'pointer'}
              bg='transparent'
              p={0}
              textAlign='left'
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

      <Box px={3} pt={4} mt='auto' borderTopWidth='1px' borderColor='whiteAlpha.200'>
        <Box display='flex' alignItems='center' gap={3} px={2} py={1}>
          <Avatar size='sm' name='Пользователь' />
          <Box minW={0}>
            <Text fontSize='sm' fontWeight='semibold' noOfLines={1}>
              Иванов И.И.
            </Text>
            <Text fontSize='xs' opacity={0.8} noOfLines={1}>
              Врач
            </Text>
          </Box>
        </Box>
      </Box>
    </VStack>
  );
};

interface NavRowProps {
  active: boolean;
  disabled: boolean;
  label: string;
  icon?: React.ElementType;
}

const NavRow: React.FC<NavRowProps> = ({
  active,
  disabled,
  label,
  icon: IconComponent,
}) => {
  return (
    <Box
      display='flex'
      alignItems='center'
      gap={3}
      w='full'
      px={3}
      py={2.5}
      borderRadius={radii.lg}
      bg={active ? 'whiteAlpha.200' : 'transparent'}
      color='inherit'
      transition='background 0.15s ease'
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
      <Text fontSize='sm' fontWeight='semibold' noOfLines={1}>
        {label}
      </Text>
    </Box>
  );
};
