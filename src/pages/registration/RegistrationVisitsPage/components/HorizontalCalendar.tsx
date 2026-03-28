import * as React from 'react';

import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Button, Circle, Flex, HStack, IconButton, Text } from '@chakra-ui/react';

const WEEKDAY_LABELS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'] as const;

function getWeekdayLabel(date: Date): string {
  return WEEKDAY_LABELS[(date.getDay() + 6) % 7];
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()
  );
}

function generateDays(startDate: Date, count: number): Date[] {
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    return d;
  });
}

function getMonthName(date: Date): string {
  return date.toLocaleString('ru', { month: 'long' });
}

interface HorizontalCalendarProps {
  startDate?: Date;
  daysCount?: number;
  selectedDate?: Date | null;
  defaultSelected?: Date;
  onDateSelect?: (date: Date) => void;
  highlightToday?: boolean;
  markedDates?: Date[];
  accentColor?: string;
}

export default function HorizontalCalendar({
  startDate = new Date(),
  daysCount = 31,
  selectedDate,
  defaultSelected,
  onDateSelect,
  highlightToday = true,
  markedDates = [],
  accentColor = '#243F82',
}: HorizontalCalendarProps) {
  const today = new Date();
  const days = generateDays(startDate, daysCount);

  const [internalSelected, setInternalSelected] = React.useState<Date | null>(
    defaultSelected ?? null,
  );
  const [offset, setOffset] = React.useState(0);

  const controlled = selectedDate !== undefined;
  const active = controlled ? selectedDate : internalSelected;
  const displayDate = active ?? today;

  const containerRef = React.useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = React.useState(10);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const DAY_WIDTH = 44;
    const update = () => setVisibleCount(Math.floor(el.offsetWidth / DAY_WIDTH));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const maxOffset = Math.max(0, daysCount - visibleCount);
  const visibleDays = days.slice(offset, offset + visibleCount);

  function handleSelect(date: Date) {
    if (!controlled) setInternalSelected(date);
    onDateSelect?.(date);
  }

  function scrollBy(direction: 'left' | 'right') {
    setOffset((prev) =>
      direction === 'left'
        ? Math.max(0, prev - visibleCount)
        : Math.min(maxOffset, prev + visibleCount),
    );
  }

  return (
    <Flex align='stretch' gap={4}>
      <Box
        flex={1}
        bg='white'
        borderRadius='24px'
        borderWidth='1px'
        borderColor='#E2E8F0'
        px={3}
        py={3}
        minW={0}
      >
        <Flex align='center' gap={1}>
          <HStack ref={containerRef} spacing={0} flex={1} overflow='hidden'>
            {visibleDays.map((date) => {
              const isActive = !!active && isSameDay(date, active);
              const isToday = highlightToday && isSameDay(date, today);
              const hasMarker = markedDates.some((d) => isSameDay(d, date));

              return (
                <Button
                  key={date.toISOString()}
                  onClick={() => handleSelect(date)}
                  h='auto'
                  flex={1}
                  minW='40px'
                  px={1}
                  py={2}
                  borderRadius='14px'
                  variant='ghost'
                  bg={isActive ? accentColor : 'transparent'}
                  color={isActive ? 'white' : '#4A5568'}
                  _hover={{ bg: isActive ? accentColor : '#F7FAFC' }}
                  flexDirection='column'
                  gap={0.5}
                >
                  <Text
                    fontSize='10px'
                    fontWeight='500'
                    color={isActive ? 'whiteAlpha.800' : '#A0AEC0'}
                    lineHeight={1}
                  >
                    {getWeekdayLabel(date)}
                  </Text>
                  <Text
                    fontSize='sm'
                    fontWeight='700'
                    color={isActive ? 'white' : isToday ? accentColor : '#1A365D'}
                    lineHeight={1}
                  >
                    {date.getDate()}
                  </Text>
                  <Circle
                    size='5px'
                    bg={hasMarker ? (isActive ? 'white' : accentColor) : 'transparent'}
                  />
                </Button>
              );
            })}
          </HStack>
        </Flex>
      </Box>

      {/* Плашка с датой */}
      <Box
        bg='white'
        borderRadius='24px'
        borderWidth='1px'
        borderColor='#E2E8F0'
        px={4}
        py={3}
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        textAlign='center'
        flexShrink={0}
        minW='72px'
      >
        <Text fontSize='28px' fontWeight='700' color='#1A365D' lineHeight={1}>
          {displayDate.getDate()}
        </Text>
        <Text fontSize='xs' color='#718096' mt={1} textTransform='capitalize'>
          {getMonthName(displayDate)}
        </Text>
      </Box>
    </Flex>
  );
}
