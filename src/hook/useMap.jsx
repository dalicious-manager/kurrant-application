import {useQuery} from 'react-query';
import {mapApis} from '../api/map';

export function useGetRoadAddress(longitude, latitude) {
  console.log(longitude,latitude,"좌표")
  return useQuery('roadAddress', () => {
    return mapApis.getRoadAddress(longitude, latitude);
  });
}

export function useGetAddress(roadAddress) {
  return useQuery('address', () => {
    return mapApis.getAddress(roadAddress);
  });
}
