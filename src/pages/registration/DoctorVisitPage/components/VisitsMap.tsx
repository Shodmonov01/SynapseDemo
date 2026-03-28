import type { Visit } from '../visits.types';

import { Box, Text } from '@chakra-ui/react';
import { Map, Placemark, YMaps } from '@iminside/react-yandex-maps';

interface Props {
  visits: Visit[];
  apiKey?: string;
}

export const VisitsMap: React.FC<Props> = ({ visits, apiKey }) => {
  return (
    <Box
      bg='white'
      borderRadius='16px'
      border='1px solid #E2E8F0'
      overflow='hidden'
      mb={5}
    >
      <Text fontSize='14px' fontWeight='600' color='#1A365D' px={4} pt={4} pb={2}>
        Карта вызовов
      </Text>
      <YMaps query={{ apikey: apiKey ?? '', lang: 'ru_RU' }}>
        <Map
          defaultState={{ center: [41.305, 69.265], zoom: 12 }}
          style={{ width: '100%', height: '300px' }}
        >
          {visits.map((v) => (
            <Placemark
              key={v.id}
              geometry={[v.lat, v.lng]}
              properties={{
                hintContent: v.patientName,
                balloonContent: `${v.patientName} — ${v.doctor}`,
              }}
              options={{
                preset: 'islands#circleDotIcon',
                iconColor: '#243F82',
              }}
            />
          ))}
        </Map>
      </YMaps>
    </Box>
  );
};
