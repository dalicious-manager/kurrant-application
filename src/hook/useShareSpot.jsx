import {useInfiniteQuery, useQuery} from 'react-query';

import {shareSpotApis} from '../api/shareSpot';

export function useGetShareSpotList(lat, long) {
  return useInfiniteQuery(
    'shareSpotList',
    ({pageParam = 1}) => shareSpotApis.loadSpotList(lat, long, pageParam),
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
