import {
  Box,
  Text,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  Badge,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { SearchIcon, AddIcon, SettingsIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { doctors } from '../queue.utils.ts';

const statusConfig: Record<string, { label: string; bg: string; color: string }> = {
  'На операции': { label: 'На операции', bg: 'orange.50', color: 'orange.600' },
  Обед: { label: 'Обед', bg: 'yellow.50', color: 'yellow.700' },
  'На приёме': { label: 'На приёме', bg: 'green.50', color: 'green.600' },
  'Закрыть очередь': { label: 'Закрыть очередь', bg: 'red.50', color: 'red.500' },
  Отпуск: { label: 'Отпуск', bg: 'purple.50', color: 'purple.600' },
  'Не пришел': { label: 'Не пришел', bg: 'gray.100', color: 'gray.600' },
  Приём: { label: 'Приём', bg: 'blue.50', color: 'blue.600' },
};

export const QueueTable = () => {
  return (
    <Box
      bg='white'
      borderRadius='14px'
      border='1px solid'
      borderColor='gray.100'
      boxShadow='0 1px 6px rgba(0,0,0,0.05)'
      overflow='hidden'
      mt='18px'
    >
      {/* Table Header Bar */}
      <Flex
        bg='gray.700'
        align='center'
        justify='space-between'
        px='20px'
        py='12px'
        gap={3}
      >
        <Text color='white' fontWeight='600' fontSize='15px' whiteSpace='nowrap'>
          Таблица очередей
        </Text>
        <Flex align='center' gap={2} flex={1} justify='flex-end'>
          <InputGroup maxW='260px' size='sm'>
            <InputLeftElement pointerEvents='none'>
              <SearchIcon color='gray.400' boxSize='13px' />
            </InputLeftElement>
            <Input
              placeholder='Поиск'
              bg='white'
              borderRadius='8px'
              border='none'
              fontSize='13px'
              _placeholder={{ color: 'gray.400' }}
              _focus={{ boxShadow: '0 0 0 2px rgba(59,130,246,0.5)' }}
            />
          </InputGroup>
          <IconButton
            aria-label='Settings'
            icon={<SettingsIcon />}
            size='sm'
            bg='gray.600'
            color='white'
            borderRadius='8px'
            _hover={{ bg: 'gray.500' }}
          />
          <IconButton
            aria-label='Add'
            icon={<AddIcon />}
            size='sm'
            bg='blue.500'
            color='white'
            borderRadius='8px'
            _hover={{ bg: 'blue.600' }}
          />
        </Flex>
      </Flex>

      {/* Table */}
      <Box overflowX='auto'>
        <Table variant='simple' size='sm'>
          <Thead bg='gray.50'>
            <Tr>
              <Th w='36px' px='16px' py='12px'>
                <Checkbox size='sm' />
              </Th>
              <Th fontSize='12px' color='gray.500' fontWeight='600' py='12px'>
                <Flex align='center' gap={1}>
                  <Box as='span' color='blue.400'>
                    +
                  </Box>{' '}
                  Врач
                </Flex>
              </Th>
              <Th fontSize='12px' color='gray.500' fontWeight='600'>
                Время прихода
              </Th>
              <Th fontSize='12px' color='gray.500' fontWeight='600'>
                Время ухода
              </Th>
              <Th fontSize='12px' color='gray.500' fontWeight='600'>
                Кол-во записей
              </Th>
              <Th fontSize='12px' color='gray.500' fontWeight='600'>
                Кол-во очередей
              </Th>
              <Th fontSize='12px' color='gray.500' fontWeight='600'>
                Завершённые
              </Th>
              <Th fontSize='12px' color='gray.500' fontWeight='600'>
                Статус врача
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {doctors.map((doc, idx) => {
              const st = statusConfig[doc.doctorStatus] ?? statusConfig['Приём'];
              return (
                <Tr
                  key={doc.id}
                  bg={idx % 2 === 0 ? 'white' : 'gray.50'}
                  _hover={{ bg: 'blue.50', transition: 'background 0.15s' }}
                >
                  <Td px='16px'>
                    <Checkbox size='sm' />
                  </Td>
                  <Td>
                    <Text fontWeight='500' fontSize='13px' color='gray.800'>
                      {doc.name}
                    </Text>
                    <Text fontSize='11px' color='gray.400'>
                      {doc.specialty}
                    </Text>
                  </Td>
                  <Td>
                    <Flex align='center' gap={1}>
                      <Box as='span' color='gray.400' fontSize='12px'>
                        ⏱
                      </Box>
                      <Text fontSize='13px' color='gray.700'>
                        {doc.arrivalTime}
                      </Text>
                    </Flex>
                  </Td>
                  <Td>
                    <Flex align='center' gap={1}>
                      <Box as='span' color='gray.400' fontSize='12px'>
                        ⏱
                      </Box>
                      <Text fontSize='13px' color='gray.700'>
                        {doc.departureTime}
                      </Text>
                    </Flex>
                  </Td>
                  <Td>
                    <Flex align='center' gap={1}>
                      <Box as='span' color='gray.400' fontSize='12px'>
                        ≡
                      </Box>
                      <Text fontSize='13px' color='gray.700'>
                        {doc.recordsCount}
                      </Text>
                    </Flex>
                  </Td>
                  <Td>
                    <Flex align='center' gap={1}>
                      <Box as='span' color='gray.400' fontSize='12px'>
                        ≡
                      </Box>
                      <Text fontSize='13px' color='gray.700'>
                        {doc.queueCount}
                      </Text>
                    </Flex>
                  </Td>
                  <Td>
                    <Flex align='center' gap={1}>
                      <Box as='span' color='gray.400' fontSize='12px'>
                        ≡
                      </Box>
                      <Text fontSize='13px' color='gray.700'>
                        {doc.completedCount}
                      </Text>
                    </Flex>
                  </Td>
                  <Td>
                    <Menu>
                      <MenuButton
                        as={Button}
                        size='xs'
                        bg={st.bg}
                        color={st.color}
                        fontWeight='500'
                        fontSize='11px'
                        borderRadius='6px'
                        px='10px'
                        rightIcon={<ChevronDownIcon />}
                        border='1px solid'
                        borderColor='transparent'
                        _hover={{ borderColor: st.color, opacity: 0.9 }}
                        _active={{ bg: st.bg }}
                      >
                        {st.label}
                      </MenuButton>
                      <MenuList
                        fontSize='13px'
                        minW='160px'
                        borderRadius='10px'
                        boxShadow='lg'
                      >
                        {Object.keys(statusConfig).map((s) => (
                          <MenuItem key={s} borderRadius='6px' _hover={{ bg: 'gray.50' }}>
                            {s}
                          </MenuItem>
                        ))}
                      </MenuList>
                    </Menu>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};
