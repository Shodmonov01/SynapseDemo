import * as React from 'react';

import { SearchIcon, SettingsIcon } from '@chakra-ui/icons';
import { Avatar, Box, Button, Flex, IconButton, Text } from '@chakra-ui/react';
import { SearchInput } from 'shared';
import { IconAddPerson, IconNotification } from 'shared/icons';
import { colors } from 'shared/tokens/colors';

import { HEADER_PAGE_BG } from './pageShellHeader.constants';

const headerSearchIcon = <SearchIcon color='#969696' boxSize='17px' />;

const addPatientIcon = (
  <Box
    as='span'
    display='inline-flex'
    w='16px'
    h='16px'
    flexShrink={0}
    alignItems='center'
    justifyContent='center'
    color='#171717'
  >
    <IconAddPerson />
  </Box>
);

export const PageShellHeaderTrailing: React.FC = () => (
  <Flex align='center' rowGap={3}>
    <Button
      type='button'
      h='40px'
      w={{ base: '100%', sm: '218px' }}
      minW={{ sm: '218px' }}
      maxW='100%'
      mr='17px'
      px='20px'
      py='9px'
      borderRadius='36px'
      bg={HEADER_PAGE_BG}
      color='#000000'
      fontWeight='normal'
      fontSize='sm'
      lineHeight='1.22'
      rightIcon={addPatientIcon}
      variant='unstyled'
      display='flex'
      alignItems='center'
      justifyContent='center'
      gap='10px'
      _hover={{ bg: '#E2E8F0' }}
      _active={{ bg: '#CBD5E0' }}
    >
      Добавить пациента
    </Button>
    <SearchInput
      placeholder='Поиск'
      w={{ base: '100%', sm: '218px' }}
      maxW='100%'
      mr='20px'
      h='40px'
      pl={6}
      pr={10}
      fontSize='sm'
      fontWeight='medium'
      color='#060A14'
      bg={HEADER_PAGE_BG}
      borderWidth='0'
      borderRadius='36px'
      _placeholder={{ color: '#969696', fontWeight: '500' }}
      _hover={{ borderWidth: '0' }}
      _focusVisible={{
        borderWidth: '0',
        boxShadow: '0 0 0 1px #43689d',
      }}
      rightElement={headerSearchIcon}
    />
    <Flex align='center' gap={3} flexShrink={0} flexWrap='wrap'>
      <IconButton
        type='button'
        aria-label='Уведомления'
        variant='ghost'
        icon={<IconNotification />}
        w='40px'
        minW='40px'
        h='40px'
        borderRadius='26px'
        bg={HEADER_PAGE_BG}
        _hover={{ bg: '#E2E8F0' }}
      />
      <IconButton
        type='button'
        aria-label='Настройки'
        variant='ghost'
        icon={<SettingsIcon boxSize={5} color='#060A14' />}
        w='40px'
        minW='40px'
        h='40px'
        borderRadius='26px'
      />
      <Flex align='center' gap={2} minW={0}>
        <Avatar name='Регистратор 1' boxSize='40px' flexShrink={0} />
        <Flex
          direction='column'
          justify='center'
          gap={1}
          h='40px'
          px='18px'
          py={1}
          borderRadius='20px'
          bg={HEADER_PAGE_BG}
          minW={0}
        >
          <Text
            fontSize='xs'
            fontWeight='medium'
            lineHeight='1.22'
            color='#060A14'
            noOfLines={1}
          >
            Регистратор 1
          </Text>
          <Text
            fontSize='8px'
            fontWeight='normal'
            lineHeight='1.22'
            color={colors.app.shellStripIconFg}
            noOfLines={1}
          >
            Регистратор
          </Text>
        </Flex>
      </Flex>
    </Flex>
  </Flex>
);
