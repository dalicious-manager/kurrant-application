import {useQuery} from 'react-query';

import {mapApis} from '../api/map';

export function useGetRoadAddress(longitude, latitude) {
  return useQuery(
    'roadAddress',
    () => {
      return mapApis.getRoadAddress(longitude, latitude);
    },
    {
      enabled: !!longitude,
    },
  );
}

export function useGetAddress(roadAddress) {
  return useQuery(
    'address',
    () => {
      return mapApis.getAddress(roadAddress);
    },
    {
      enabled: !!roadAddress,
    },
  );
}
