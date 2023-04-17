import {useInfiniteQuery, useQuery} from 'react-query';
import {pointApis} from '../api/point';

export function useGetPointList(condition) {
  return useInfiniteQuery(
    'pointList',
    ({pageParam = 1}) => pointApis.pointList(condition, pageParam),
    {
      getNextPageParam: lastPage => {
        if (!lastPage.isLast) {
          return lastPage.currentPage + 1;
        }
        return undefined;
      },
    },
  );
}
