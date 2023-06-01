import {useEffect, useState} from 'react';
import {useInfiniteQuery, useQuery} from 'react-query';
import {fetchJson} from '../../../../../../../utils/fetch';
import {useAtom} from 'jotai';

const useGetMealDetailReview = (url, dailyFoodId) => {
  const [isError, setIsError] = useState(false);

  // 리뷰 별점 갯수 조회
  const [starRatingCounts, setStarRatingCounts] = useState({});

  const getInfiniteQuery = useInfiniteQuery(
    ['review', 'GetMealDetailReviewInfinite'],

    ({pageParam = 1}) => getMealDetailReview(pageParam, url),

    {
      getNextPageParam: lastPage => {
        if (!lastPage.isLast) {
          return lastPage.currentPage + 1;
        }
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

  return {
    getInfiniteQuery,
    isError,
    starRatingCounts,
  };
};

export default useGetMealDetailReview;

const getMealDetailReview = async (pageParam, url) => {
  const res = await fetchJson(`${url}&limit=5&page=${pageParam}`);
  // const res = await fetchJson(`${url}&limit=1&page=${page}`);

  const {items, starAverage, isLast, foodId, totalReview, reviewWrite} =
    res.data;
  // console.log('아이텤 확인');
  // console.log(res);
  // console.log(res.data);
  // console.log(res.data.items);

  // console.log(items);
  // setMealDetailReview(items);
  // setIsLast(isLast);
  // setStarAverage(starAverage);
  // setFoodId(foodId);
  // setTotalCount(totalReview);
  // setReviewWrite(reviewWrite);

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
