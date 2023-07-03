import {useAtom} from 'jotai';
import {useEffect, useState} from 'react';
import {useInfiniteQuery, useQuery} from 'react-query';

import {fetchJson} from '~utils/fetch';

const useGetMealDetailReview = (url, dailyFoodId) => {
  const [isError, setIsError] = useState(false);

  const [starRatingCounts, setStarRatingCounts] = useState({});

  const [reviewKeyword, setReviewKeyword] = useState([]);

  const getInfiniteQuery = useInfiniteQuery(
    ['review', 'GetMealDetailReviewInfinite'],

    ({pageParam = 1}) => getMealDetailReview(pageParam, url),

    {
      getNextPageParam: lastPage => {
        if (!lastPage.isLast) lastPage.currentPage + 1;
        return undefined;
      },
    },
  );

  useQuery(['review', 'stars'], async ({queryKey}) => {
    const response = await fetchJson(
      `/users/me/reviews/satisfaction?dailyFoodId=${dailyFoodId}`,
      'GET',
    );

    setStarRatingCounts(response.data);
  });

  useQuery(['review', 'keyword'], async ({queryKey}) => {
    const response = await fetchJson(
      `/dailyfoods/${dailyFoodId}/review/keyword`,
      'GET',
    );

    setReviewKeyword(response.data.filter(v => v !== ''));
  });

  return {
    getInfiniteQuery,
    isError,
    starRatingCounts,
    reviewKeyword,
  };
};

export default useGetMealDetailReview;

const getMealDetailReview = async (pageParam, url) => {
  const res = await fetchJson(`${url}&limit=5&page=${pageParam}`);
  // const res = await fetchJson(`${url}&limit=1&page=${page}`);
  console.log(res);
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
