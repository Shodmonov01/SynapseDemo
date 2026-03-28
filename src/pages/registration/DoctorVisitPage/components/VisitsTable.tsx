import { useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  Checkbox,
  Badge,
  IconButton,
} from '@chakra-ui/react';
import { SearchIcon, AddIcon } from '@chakra-ui/icons';
import { STATUS_COLORS } from '../visits.utils';
import type { Visit } from '../visits.types';

interface Props {
  visits: Visit[];
  onAddVisit: () => void;
}

const COLS = [
  { label: 'Дата вызова', w: '130px', icon: '📅' },
  { label: 'Пациент', w: '160px', icon: '👤' },
  { label: 'ID', w: '140px', icon: '🪪' },
  { label: 'Врач', w: '140px', icon: '➕' },
  { label: 'Локация', w: '160px', icon: '📍' },
  { label: 'Статус', w: '140px', icon: '📋' },
];

export const VisitsTable: React.FC<Props> = ({ visits, onAddVisit }) => {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string[]>([]);

  const filtered = visits.filter(
    (v) =>
      v.patientName.toLowerCase().includes(search.toLowerCase()) ||
      v.doctor.toLowerCase().includes(search.toLowerCase()) ||
      v.location.toLowerCase().includes(search.toLowerCase()) ||
      v.id.toLowerCase().includes(search.toLowerCase()),
  );

  const toggleAll = () =>
    setSelected(selected.length === filtered.length ? [] : filtered.map((v) => v.id));

  const toggle = (id: string) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  return (
    <Box bg='#1E3A5F' borderRadius='16px' overflow='hidden'>
      {/* Header */}
      <Flex align='center' justify='space-between' px={5} py={4}>
        <Text fontSize='15px' fontWeight='600' color='white'>
          Таблица выездов
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
            icon={<Text fontSize='14px'>⊟</Text>}
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
            onClick={onAddVisit}
          />
        </Flex>
      </Flex>

      {/* Column headers */}
      <Flex align='center' px={5} pb={3} gap={2}>
        <Checkbox
          isChecked={selected.length === filtered.length && filtered.length > 0}
          isIndeterminate={selected.length > 0 && selected.length < filtered.length}
          onChange={toggleAll}
          borderColor='whiteAlpha.500'
          mr={2}
        />
        {COLS.map((c) => (
          <Flex key={c.label} w={c.w} minW={c.w} align='center' gap={1}>
            <Text fontSize='11px'>{c.icon}</Text>
            <Text fontSize='12px' color='whiteAlpha.700' fontWeight='500'>
              {c.label}
            </Text>
          </Flex>
        ))}
      </Flex>

      {/* Rows */}
      <Box bg='white' borderRadius='0 0 16px 16px' maxH='400px' overflowY='auto'>
        {filtered.map((v, i) => (
          <Flex
            key={v.id}
            align='center'
            px={5}
            py='10px'
            gap={2}
            borderBottom={i < filtered.length - 1 ? '1px solid #F0F4F8' : 'none'}
            _hover={{ bg: '#FAFBFF' }}
          >
            <Checkbox
              isChecked={selected.includes(v.id)}
              onChange={() => toggle(v.id)}
              colorScheme='blue'
              mr={2}
            />
            {/* Дата вызова */}
            <Box w='130px' minW='130px'>
              <Text fontSize='13px' fontWeight='500' color='#1A365D'>
                {v.date}
              </Text>
              <Text fontSize='11px' color='gray.400'>
                {v.time}
              </Text>
            </Box>
            {/* Пациент */}
            <Box w='160px' minW='160px'>
              <Text fontSize='13px' fontWeight='600' color='#1A365D'>
                {v.patientName}
              </Text>
              <Text fontSize='11px' color='gray.400'>
                {v.patientPhone}
              </Text>
            </Box>
            {/* ID */}
            <Box w='140px' minW='140px'>
              <Text fontSize='13px' color='#2D3748'>
                {v.patientId}
              </Text>
            </Box>
            {/* Врач */}
            <Box w='140px' minW='140px'>
              <Text fontSize='13px' fontWeight='500' color='#1A365D'>
                {v.doctor}
              </Text>
              <Text fontSize='11px' color='gray.400'>
                {v.doctorRole}
              </Text>
            </Box>
            {/* Локация */}
            <Box w='160px' minW='160px'>
              <Text fontSize='13px' fontWeight='500' color='#1A365D'>
                {v.location}
              </Text>
              <Text fontSize='11px' color='gray.400'>
                {v.address}
              </Text>
            </Box>
            {/* Статус */}
            <Box w='140px' minW='140px'>
              <Badge
                px={3}
                py={1}
                borderRadius='20px'
                fontSize='11px'
                fontWeight='500'
                bg={STATUS_COLORS[v.status]?.bg}
                color={STATUS_COLORS[v.status]?.color}
              >
                {v.status}
              </Badge>
            </Box>
          </Flex>
        ))}
      </Box>
    </Box>
  );
};
