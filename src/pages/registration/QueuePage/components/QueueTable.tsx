import { useState } from 'react';

import type { DoctorRow } from '../queue.types';
import { STATUS_COLORS } from '../queue.utils';

import { AddIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Badge,
  Box,
  Button,
  Checkbox,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';

interface Props {
  doctors: DoctorRow[];
  onOpenQueue: (doctorId: string) => void;
  onCloseQueue: (doctorId: string) => void;
  onAddRecord: () => void;
}

export const QueueTable: React.FC<Props> = ({
  doctors,
  onOpenQueue,
  onCloseQueue,
  onAddRecord,
}) => {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string[]>([]);

  const filtered = doctors.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.role.toLowerCase().includes(search.toLowerCase()),
  );

  const toggleSelect = (id: string) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  const toggleAll = () =>
    setSelected(selected.length === filtered.length ? [] : filtered.map((d) => d.id));

  const cols = [
    { label: 'Врач', w: '180px' },
    { label: 'Время прихода', w: '130px' },
    { label: 'Время ухода', w: '120px' },
    { label: 'Кол-во записей', w: '120px' },
    { label: 'Кол-во очередей', w: '130px' },
    { label: 'Завершённые', w: '120px' },
    { label: 'Статус врача', w: '160px' },
  ];

  return (
    <Box bg='#1E3A5F' borderRadius='16px' overflow='hidden'>
      {/* Header */}
      <Flex align='center' justify='space-between' px={5} py={4}>
        <Text fontSize='15px' fontWeight='600' color='white'>
          Таблица очередей
        </Text>
        <Flex gap={3} align='center'>
          <InputGroup size='sm' w='220px'>
            <Input
              placeholder='Поиск'
              bg='white'
              borderRadius='20px'
              border='none'
              fontSize='13px'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              _focus={{ boxShadow: 'none' }}
            />
            <InputRightElement>
              <SearchIcon color='gray.400' boxSize='12px' />
            </InputRightElement>
          </InputGroup>
          <IconButton
            aria-label='filter'
            icon={<Text fontSize='16px'>⊟</Text>}
            size='sm'
            borderRadius='full'
            bg='whiteAlpha.200'
            color='white'
            _hover={{ bg: 'whiteAlpha.300' }}
          />
          <IconButton
            aria-label='add'
            icon={<AddIcon />}
            size='sm'
            borderRadius='full'
            bg='whiteAlpha.200'
            color='white'
            _hover={{ bg: 'whiteAlpha.300' }}
            onClick={onAddRecord}
          />
        </Flex>
      </Flex>

      {/* Column headers */}
      <Box bg='#1E3A5F' px={5} pb={2}>
        <Flex align='center' gap={2}>
          <Checkbox
            isChecked={selected.length === filtered.length && filtered.length > 0}
            isIndeterminate={selected.length > 0 && selected.length < filtered.length}
            onChange={toggleAll}
            colorScheme='blue'
            borderColor='whiteAlpha.500'
            mr={2}
          />
          {cols.map((c) => (
            <Flex key={c.label} w={c.w} minW={c.w} align='center' gap={1}>
              <Text fontSize='12px' color='whiteAlpha.700' fontWeight='500'>
                {c.label}
              </Text>
            </Flex>
          ))}
        </Flex>
      </Box>

      {/* Rows */}
      <Box bg='white' borderRadius='0 0 16px 16px'>
        {filtered.map((doc, i) => (
          <Flex
            key={doc.id}
            align='center'
            px={5}
            py={3}
            gap={2}
            borderBottom={i < filtered.length - 1 ? '1px solid #F0F4F8' : 'none'}
            _hover={{ bg: '#FAFBFF' }}
          >
            <Checkbox
              isChecked={selected.includes(doc.id)}
              onChange={() => toggleSelect(doc.id)}
              colorScheme='blue'
              mr={2}
            />
            {/* Врач */}
            <Box w='180px' minW='180px'>
              <Text fontSize='13px' fontWeight='600' color='#1A365D'>
                {doc.name}
              </Text>
              <Text fontSize='11px' color='gray.400'>
                {doc.role}
              </Text>
            </Box>
            {/* Время прихода */}
            <Box w='130px' minW='130px'>
              <Text fontSize='13px' color='#2D3748'>
                {doc.arrivalTime}
              </Text>
            </Box>
            {/* Время ухода */}
            <Box w='120px' minW='120px'>
              <Text fontSize='13px' color='#2D3748'>
                {doc.departureTime}
              </Text>
            </Box>
            {/* Кол-во записей */}
            <Box w='120px' minW='120px'>
              <Text fontSize='13px' color='#2D3748'>
                {doc.recordsCount}
              </Text>
            </Box>
            {/* Кол-во очередей */}
            <Box w='130px' minW='130px'>
              <Text fontSize='13px' color='#2D3748'>
                {doc.queueCount}
              </Text>
            </Box>
            {/* Завершённые */}
            <Box w='120px' minW='120px'>
              <Text fontSize='13px' color='#2D3748'>
                {doc.completedCount}
              </Text>
            </Box>
            {/* Статус + меню */}
            <Flex w='160px' minW='160px' align='center' gap={2}>
              <Badge
                px={3}
                py={1}
                borderRadius='20px'
                fontSize='11px'
                fontWeight='500'
                bg={STATUS_COLORS[doc.status]?.bg ?? '#F3F4F6'}
                color={STATUS_COLORS[doc.status]?.color ?? '#374151'}
              >
                {doc.status}
              </Badge>
              <Menu>
                <MenuButton as={Button} size='xs' variant='ghost' color='gray.400' px={1}>
                  ···
                </MenuButton>
                <MenuList minW='160px' fontSize='13px'>
                  <MenuItem onClick={() => onOpenQueue(doc.id)}>Открыть очередь</MenuItem>
                  <MenuItem onClick={() => onCloseQueue(doc.id)} color='red.500'>
                    Закрыть очередь
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Flex>
        ))}
      </Box>
    </Box>
  );
};
