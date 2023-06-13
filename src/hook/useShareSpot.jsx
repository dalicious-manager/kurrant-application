import {useInfiniteQuery, useMutation, useQuery} from 'react-query';

import {shareSpotApis} from '../api/shareSpot';

export function useGetShareSpotList(lat, long, mealTouch, touchInfo) {
  return useInfiniteQuery(
    'shareSpotList',
    ({pageParam = 1}) =>
      shareSpotApis.loadSpotList(lat, long, pageParam, mealTouch, touchInfo),
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

export function useGetShareSpotDetail(id) {
  return useQuery('shareSpotDetail', () => {
    return shareSpotApis.loadSpotDetail(id);
  });
}

export function useSelectShareSpot() {
  return useMutation(id => shareSpotApis.selectSpot(id));
}

export function useApplyShareSpot() {
  return useMutation(data => shareSpotApis.applicationShareSpot(data), {
    onSuccess(res) {
      console.log(res);
    },
  });
}
