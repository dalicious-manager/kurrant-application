import {useQuery} from 'react-query';

import {mapApis} from '../api/map';

// 도로명 주소 변환
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

// 지번 주소 변환
export function useGetAddress(roadAddress) {
  console.log(roadAddress, 'roadAddress');
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

export function useGetMakersAddress(makersCood) {
  return useQuery(
    'makersAddress',
    () => {
      return mapApis.getMakersAddress(
        makersCood.longitude,
        makersCood.latitude,
      );
    },
    {
      enabled: Object.keys(makersCood).length > 0,
      retry: false,
    },
  );
}
