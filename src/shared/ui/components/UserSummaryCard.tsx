import {
  Box,
  Card,
  CardBody,
  HStack,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react';
import * as React from 'react';
import { radii } from '@synapse/theme';
import type { StatusTone } from '../types/status';
import { AvatarPanel } from './AvatarPanel';
import { InfoItem } from './InfoItem';
import { StatusBadge } from './StatusBadge';

export interface UserSummaryMetaItem {
  id: string;
  label: string;
  value: React.ReactNode;
}

export interface UserSummaryCardProps {
  name: React.ReactNode;
  badgeLabel?: string;
  badgeTone?: StatusTone;
  meta: UserSummaryMetaItem[];
  avatarSrc?: string;
  avatarName?: string;
  /** URL фонового изображения (blur overlay) */
  backgroundImageUrl?: string;
  primaryAction?: React.ReactNode;
  secondaryActions?: React.ReactNode;
}

export const UserSummaryCard: React.FC<UserSummaryCardProps> = ({
  name,
  badgeLabel,
  badgeTone = 'info',
  meta,
  avatarSrc,
  avatarName,
  backgroundImageUrl,
  primaryAction,
  secondaryActions,
}) => {
  const bgStyles = React.useMemo(() => {
    if (!backgroundImageUrl) {
      return { bg: 'bg.surface' };
    }
    return {
      bg: 'bg.surface',
      backgroundImage: `url(${backgroundImageUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };
  }, [backgroundImageUrl]);

  return (
    <Card variant="summary" overflow="hidden">
      <Box position="relative" {...bgStyles}>
        {backgroundImageUrl ? (
          <Box
            position="absolute"
            inset={0}
            bg="whiteAlpha.800"
            backdropFilter="blur(6px)"
          />
        ) : null}
        <CardBody position="relative" zIndex={1}>
          <HStack align="flex-start" spacing={6} flexWrap="wrap">
            <VStack align="flex-start" spacing={4} flex="1" minW="240px">
              <HStack spacing={3} flexWrap="wrap">
                <Box
                  as="h2"
                  fontSize="2xl"
                  fontWeight="bold"
                  color="brand.700"
                >
                  {name}
                </Box>
                {badgeLabel ? (
                  <StatusBadge tone={badgeTone}>{badgeLabel}</StatusBadge>
                ) : null}
              </HStack>
              <SimpleGrid
                columns={{ base: 1, md: 2 }}
                spacingX={8}
                spacingY={4}
                w="full"
              >
                {meta.map((item) => (
                  <InfoItem
                    key={item.id}
                    label={item.label}
                    value={item.value}
                  />
                ))}
              </SimpleGrid>
              <HStack spacing={3} flexWrap="wrap">
                {primaryAction}
                {secondaryActions}
              </HStack>
            </VStack>
            <Box flexShrink={0}>
              <AvatarPanel
                size="xl"
                src={avatarSrc}
                name={avatarName}
                borderRadius={radii['2xl']}
                boxSize="120px"
              />
            </Box>
          </HStack>
        </CardBody>
      </Box>
    </Card>
  );
};
