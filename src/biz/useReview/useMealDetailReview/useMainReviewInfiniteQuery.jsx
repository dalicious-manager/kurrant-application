import {useAtom} from 'jotai';
import {useEffect, useState} from 'react';
import {useInfiniteQuery, useQuery} from 'react-query';
import {fetchJson} from '~utils/fetch';

const getMealDetailReview = async (pageParam, url) => {
  const res = await fetchJson(`${url}&limit=5&page=${pageParam}`);
  // const res = await fetchJson(`${url}&limit=1&page=${page}`);
  // console.log(res);
  const {items, starAverage, isLast, foodId, totalReview, reviewWrite} =
    res.data;

  return {
    items,
    currentPage: pageParam,
    isLast,
    starAverage,
    foodId,
    totalReview,
    reviewWrite,
  };
};

export function useMainReviewInfiniteQuery(url, dailyFoodId) {
  const getPageBoard = async ({pageParam = 1}) => {
    const res = await getMealDetailReview(pageParam, url);
    return {
      items: res.items,
      currentPage: pageParam,
      isLast: res.isLast,
    };
  };

  const {
    data: getBoard,
    fetchNextPage: getNextPage,
    isSuccess: getBoardIsSuccess,
    isLoading: getBoardIsLoading,
    isFetching: getBoardIsFetching,
    hasNextPage: getNextPageIsPossible,
    refetch: getBoardRefetch,
  } = useInfiniteQuery(['review', 'detail', 'getBoard'], getPageBoard, {
    getNextPageParam: lastPage => {
      // lastPage와 pages는 콜백함수에서 리턴한 값을 의미한다!!
      // lastPage: 직전에 반환된 리턴값, pages: 여태 받아온 전체 페이지
      if (!lastPage.isLast) {
        return lastPage.currentPage + 1;
      }
      // 마지막 페이지면 undefined가 리턴되어서 hasNextPage는 false가 됨!
      return undefined;
    },
  });
  //
  return {
    getBoard,
    getNextPage,
    getBoardIsSuccess,
    getBoardIsFetching,
    getBoardIsLoading,
    getNextPageIsPossible,
    getBoardRefetch,
  };
}
