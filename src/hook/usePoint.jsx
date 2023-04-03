import {useQuery} from 'react-query';
import {pointApis} from '../api/point';

export function useGetPointList() {
  return useQuery('pointList', () => {
    return pointApis.pointList();
  });
}
