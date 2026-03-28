import * as React from 'react';

import { InfoItem } from './InfoItem';
import { radii } from '../tokens/radii';
import type { EmkPatientSummary } from '../types/emkPatientSummary';

import { CalendarIcon, EditIcon, PhoneIcon, ViewIcon } from '@chakra-ui/icons';
import { Avatar, Box, Button, Card, Flex, HStack, Text, VStack } from '@chakra-ui/react';

/** Цвета шапки и карточки ЭМК (Figma node 681:14568) */
const EMK = {
  headerDefaultFill: '#223B77',
  headerPillBg: 'rgba(255, 255, 255, 0.23)',
  fieldLabel: '#7C94D3',
  patientId: '#425484',
  careBg: 'rgba(49, 109, 245, 0.13)',
  careFg: '#316DF5',
  vipBg: 'rgba(198, 149, 27, 0.13)',
  vipBorder: '#C6951B',
  vipFg: '#C6951B',
  divider: '#57637D',
  avatarFrameBg: '#EBEFF9',
  editBg: '#223B77',
  sheetBg: '#FFFFFF',
} as const;

const FONT_HEADING = "'Kodchasan', 'Inter', system-ui, sans-serif";
const FONT_BODY = "'Montserrat', 'Inter', system-ui, sans-serif";

export interface EmkPatientSummaryCardProps {
  patient: EmkPatientSummary;
  /** Сплошной фон шапки, если нет `headerImageUrl` */
  headerFill?: string;
  /** Фон-изображение шапки; если задано — имеет приоритет над `headerFill` */
  headerImageUrl?: string;
  /** Плашка на шапке */
  headerCaption?: string;
  onEdit?: () => void;
}

const FieldDivider: React.FC = () => (
  <Box
    display={{ base: 'none', lg: 'block' }}
    alignSelf='center'
    w='1px'
    h='12px'
    bg={EMK.divider}
    flexShrink={0}
    mx={{ lg: 3 }}
    aria-hidden
  />
);

export const EmkPatientSummaryCard: React.FC<EmkPatientSummaryCardProps> = ({
  patient,
  headerFill = EMK.headerDefaultFill,
  headerImageUrl,
  headerCaption = 'Медицинская карточка',
  onEdit,
}) => {
  const headerBg = React.useMemo(() => {
    if (headerImageUrl) {
      return {
        bg: 'bg.surface',
        backgroundImage: `url(${headerImageUrl})`,
        backgroundSize: 'cover' as const,
        backgroundPosition: 'center' as const,
      };
    }
    return { bg: headerFill };
  }, [headerFill, headerImageUrl]);

  const handleEdit = React.useCallback(() => {
    onEdit?.();
  }, [onEdit]);

  return (
    <Card variant='summary' overflow='visible'>
      <Box position='relative' overflow='visible' bg='unset'>
        <Box
          h={{ base: '156px', md: '197px' }}
          position='relative'
          borderTopLeftRadius='30px'
          borderTopRightRadius='30px'
          overflow='hidden'
          opacity={0.8}
          sx={headerBg}
        >
          {headerImageUrl ? (
            <Box
              position='absolute'
              inset={0}
              bg='rgba(50, 98, 229, 0.41)'
              backdropFilter='blur(2px)'
            />
          ) : null}
          <Box
            position='absolute'
            left={{ base: '12px', md: '20px' }}
            top={{ base: '56px', md: '84px' }}
            px='14px'
            py='7px'
            borderRadius='30px'
            bg={EMK.headerPillBg}
          >
            <Text
              as='span'
              fontFamily={FONT_HEADING}
              fontWeight={600}
              fontSize='12px'
              lineHeight='1.3'
              color='white'
            >
              {headerCaption}
            </Text>
          </Box>
        </Box>

        <VStack
          position='absolute'
          right={{ base: '12px', md: '20px' }}
          top={{ base: '16px', md: '26px' }}
          zIndex={3}
          w={{ base: '120px', sm: '146px' }}
          spacing={2}
          align='stretch'
        >
          <Box bg={EMK.avatarFrameBg} borderRadius='20px' p='10px' flexShrink={0}>
            <Box
              bg={EMK.sheetBg}
              borderRadius='15px'
              overflow='hidden'
              position='relative'
              h={{ base: '136px', md: '170px' }}
            >
              <Avatar
                src={patient.avatarSrc}
                name={patient.avatarName ?? patient.fullName}
                w='100%'
                h='100%'
                borderRadius='15px'
              />
            </Box>
          </Box>
          <Button
            type='button'
            h='auto'
            py={2}
            px={3}
            gap={1}
            borderRadius='18px'
            bg={EMK.editBg}
            color='white'
            fontFamily={FONT_BODY}
            fontSize='12px'
            fontWeight={400}
            lineHeight='1.22'
            leftIcon={<EditIcon boxSize='14px' />}
            _hover={{ bg: '#1a2f5c' }}
            _active={{ bg: '#152850' }}
            w='100%'
            onClick={handleEdit}
          >
            Редактировать
          </Button>
        </VStack>

        <Box
          position='relative'
          zIndex={1}
          bg={EMK.sheetBg}
          borderRadius={radii['2xl']}
          mt={{ base: '-48px', md: '-67px' }}
          minH={{ base: 'auto', md: '144px' }}
          pt='20px'
          pb='20px'
          pl={{ base: '16px', md: '20px' }}
          pr={{ base: '132px', sm: '148px', md: '200px' }}
          boxShadow='sm'
        >
          <Flex
            flexDir={{ base: 'column', sm: 'row' }}
            justify={{ sm: 'space-between' }}
            align='flex-start'
            gap={{ base: 2, sm: 4 }}
            mb={{ base: 3, lg: 4 }}
            w='full'
            minW={0}
          >
            <VStack align='flex-start' spacing={2} flex='1' minW={0}>
              <HStack align='flex-start' spacing={3} flexWrap='wrap'>
                <Text
                  as='h2'
                  fontFamily={FONT_HEADING}
                  fontWeight={600}
                  fontSize='16px'
                  lineHeight='1.3'
                  color='#000000'
                >
                  {patient.fullName}
                </Text>
                {patient.isVip ? (
                  <Box
                    as='span'
                    px='12px'
                    py='2px'
                    borderRadius='30px'
                    borderWidth='1px'
                    borderColor={EMK.vipBorder}
                    bg={EMK.vipBg}
                    fontFamily={FONT_HEADING}
                    fontSize='12px'
                    fontWeight={400}
                    lineHeight='1.3'
                    color={EMK.vipFg}
                  >
                    VIP
                  </Box>
                ) : null}
              </HStack>
              <Box
                as='span'
                display='inline-flex'
                alignItems='center'
                px='20px'
                py='2px'
                borderRadius='30px'
                bg={EMK.careBg}
                fontFamily={FONT_HEADING}
                fontSize='12px'
                fontWeight={400}
                lineHeight='1.3'
                color={EMK.careFg}
              >
                {patient.careCategoryLabel}
              </Box>
            </VStack>

            <VStack
              align='flex-end'
              spacing={0.5}
              flexShrink={0}
              alignSelf={{ base: 'flex-end', sm: 'auto' }}
              pt={{ base: 0, lg: '2px' }}
              lineHeight='1.22'
            >
              <Text
                fontFamily={FONT_HEADING}
                fontWeight={400}
                fontSize='12px'
                lineHeight='1.3'
                color={EMK.patientId}
                textAlign='right'
              >
                {patient.patientIdLabel}
              </Text>
              <Text
                fontFamily={FONT_BODY}
                fontWeight={400}
                fontSize='12px'
                lineHeight='1.22'
                color={EMK.fieldLabel}
                textAlign='right'
              >
                {patient.ageAndGender}
              </Text>
            </VStack>
          </Flex>

          <Flex
            flexWrap={{ base: 'wrap', lg: 'nowrap' }}
            align='flex-start'
            justify='flex-start'
            gap={{ base: 3, lg: 0 }}
            w='full'
            minW={0}
          >
            <Box flexShrink={0} minW={{ base: '140px', lg: 'unset' }}>
              <InfoItem
                variant='emk'
                icon={CalendarIcon}
                label='PINFL'
                value={patient.pinfl}
              />
            </Box>
            <FieldDivider />
            <Box flexShrink={0} minW={{ base: '140px', lg: 'unset' }}>
              <InfoItem
                variant='emk'
                icon={CalendarIcon}
                label='Дата рождения'
                value={patient.dateOfBirth}
              />
            </Box>
            <FieldDivider />
            <Box flexShrink={0} minW={{ base: '140px', lg: 'unset' }}>
              <InfoItem
                variant='emk'
                icon={PhoneIcon}
                label='Контакт'
                value={patient.contactPhone}
              />
            </Box>
            <FieldDivider />
            <Box
              flexShrink={0}
              flexGrow={{ lg: 1 }}
              minW={{ base: '200px', lg: 0 }}
              maxW={{ lg: '100%' }}
            >
              <InfoItem
                variant='emk'
                icon={ViewIcon}
                label='Место жительство'
                value={patient.residence}
              />
            </Box>
          </Flex>
        </Box>
      </Box>
    </Card>
  );
};
