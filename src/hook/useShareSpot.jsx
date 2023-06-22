import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';

import {shareSpotApis} from '../api/shareSpot';

// 공유스팟 지도,목록 데이터
export function useGetShareSpotList(limit, lat, long, mealTouch, touchInfo) {
  return useInfiniteQuery(
    'shareSpotList',
    ({pageParam = 1}) =>
      shareSpotApis.loadSpotList(
        limit,
        lat,
        long,
        pageParam,
        mealTouch,
        touchInfo,
      ),
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

// 공유스팟 디테일 조회 데이터
export function useGetShareSpotDetail(id) {
  return useQuery('shareSpotDetail', () => {
    if (id !== undefined) {
      return shareSpotApis.loadSpotDetail(id);
    }
  });
}

// 공유스팟 사용하기
export function useSelectShareSpot() {
  const queryClient = useQueryClient();
  return useMutation(id => shareSpotApis.selectSpot(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('userInfo');
    },
  });
}

// 공유 스팟 / 시간 신청
export function useApplyShareSpot() {
  const queryClient = useQueryClient();
  return useMutation(data => shareSpotApis.applicationShareSpot(data), {
    onSuccess(res) {
      queryClient.invalidateQueries('userInfo');
      console.log(res);
    },
  });
}

// 공유스팟 검색 데이터 리스트 조회
export function useGetSearchShareSpotData() {
  return useQuery('searchData', () => {
    return shareSpotApis.searchShareSpot();
  });
}
