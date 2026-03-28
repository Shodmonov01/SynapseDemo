import * as React from 'react';

import { AvatarPanel } from './AvatarPanel';
import { InfoItem } from './InfoItem';
import { StatusBadge } from './StatusBadge';
import { colors } from '../tokens/colors';
import { radii } from '../tokens/radii';
import type { EmkPatientSummary } from '../types/emkPatientSummary';

import {
  CalendarIcon,
  EditIcon,
  InfoOutlineIcon,
  PhoneIcon,
  ViewIcon,
} from '@chakra-ui/icons';
import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  HStack,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';

export interface EmkPatientSummaryCardProps {
  patient: EmkPatientSummary;
  /** Фон верхней полосы (библиотека / декор). Без значения — градиент из токенов бренда */
  headerImageUrl?: string;
  onEdit?: () => void;
}

export const EmkPatientSummaryCard: React.FC<EmkPatientSummaryCardProps> = ({
  patient,
  headerImageUrl,
  onEdit,
}) => {
  const headerBg = React.useMemo(() => {
    if (headerImageUrl) {
      return {
        bg: 'bg.surface',
        backgroundImage: `url(${headerImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };
    }
    return {
      bgGradient: 'linear(to-br, brand.50, brand.200, brand.100)',
    };
  }, [headerImageUrl]);

  const careTone = patient.careCategoryTone ?? 'info';

  const handleEdit = React.useCallback(() => {
    onEdit?.();
  }, [onEdit]);

  return (
    <Card variant='summary' overflow='hidden'>
      <Box position='relative'>
        <Box
          h={{ base: '4.5rem', md: '5.5rem' }}
          position='relative'
          borderTopRadius={radii['2xl']}
          overflow='hidden'
          {...headerBg}
        >
          {headerImageUrl ? (
            <Box
              position='absolute'
              inset={0}
              bg='whiteAlpha.700'
              backdropFilter='blur(6px)'
            />
          ) : null}
        </Box>

        <CardBody position='relative' zIndex={1} pt={0} px={{ base: 4, md: 6 }} pb={6}>
          <Flex
            flexDir={{ base: 'column', lg: 'row' }}
            gap={{ base: 5, lg: 6 }}
            align={{ lg: 'flex-start' }}
            justify='space-between'
          >
            <VStack align='flex-start' spacing={3} flex='1' minW={0} pt={3}>
              <HStack align='flex-start' spacing={3} flexWrap='wrap'>
                <Text
                  as='h2'
                  fontSize={{ base: 'xl', md: '2xl' }}
                  fontWeight='bold'
                  color='brand.500'
                >
                  {patient.fullName}
                </Text>
                {patient.isVip ? (
                  <Box
                    as='span'
                    px={2}
                    py={0.5}
                    borderRadius='md'
                    borderWidth='1px'
                    borderColor={colors.app.shellStripIconHover}
                    fontSize='xs'
                    fontWeight='bold'
                    color={colors.app.shellPillBorder}
                    lineHeight='short'
                  >
                    VIP
                  </Box>
                ) : null}
              </HStack>

              <StatusBadge tone={careTone}>{patient.careCategoryLabel}</StatusBadge>

              <SimpleGrid
                columns={{ base: 1, sm: 2, xl: 4 }}
                spacingX={8}
                spacingY={4}
                w='full'
              >
                <InfoItem icon={InfoOutlineIcon} label='PINFL' value={patient.pinfl} />
                <InfoItem
                  icon={CalendarIcon}
                  label='Дата рождения'
                  value={patient.dateOfBirth}
                />
                <InfoItem icon={PhoneIcon} label='Контакт' value={patient.contactPhone} />
                <InfoItem
                  icon={ViewIcon}
                  label='Место жительство'
                  value={patient.residence}
                />
              </SimpleGrid>
            </VStack>

            <VStack
              align='center'
              spacing={3}
              flexShrink={0}
              w={{ base: 'full', lg: 'auto' }}
              mt={{ base: 0, lg: '-3.25rem' }}
            >
              <VStack spacing={0} align={{ base: 'center', lg: 'flex-end' }} w='full'>
                <Text
                  fontSize='sm'
                  color='fg.muted'
                  textAlign={{ base: 'center', lg: 'right' }}
                >
                  {patient.patientIdLabel}
                </Text>
                <Text
                  fontSize='sm'
                  color='fg.muted'
                  textAlign={{ base: 'center', lg: 'right' }}
                >
                  {patient.ageAndGender}
                </Text>
              </VStack>
              <AvatarPanel
                size='xl'
                src={patient.avatarSrc}
                name={patient.avatarName ?? patient.fullName}
                borderRadius={radii['2xl']}
                boxSize='120px'
              />
              <Button
                type='button'
                size='sm'
                leftIcon={<EditIcon />}
                variant='solid'
                bg='brand.500'
                color='white'
                _hover={{ bg: 'brand.600' }}
                onClick={handleEdit}
              >
                Редактировать
              </Button>
            </VStack>
          </Flex>
        </CardBody>
      </Box>
    </Card>
  );
};
