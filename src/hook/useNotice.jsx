import {useInfiniteQuery, useQuery} from 'react-query';

import {noticeApis} from '../api/notice';

export function useGetNoticeList() {
  return useInfiniteQuery(
    'noticeList',
    ({pageParam = 1}) => noticeApis.noticeList(pageParam),
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
export function useGetSpotNoticeList() {
  return useInfiniteQuery(
    'spotNoticeList',
    ({pageParam = 1}) => noticeApis.spotNoticeList(pageParam),
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

export function useGetNoticeDetail(id) {
  return useQuery(
    'noticeDetail',
    () => {
      if (id) {
        return noticeApis.noticeDetail(id);
      }
    },
    {
      cacheTime: 0,
    },
  );
}
