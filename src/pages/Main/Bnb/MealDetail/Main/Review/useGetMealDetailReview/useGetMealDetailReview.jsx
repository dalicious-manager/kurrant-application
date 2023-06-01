import {useEffect, useState} from 'react';
import {useInfiniteQuery, useQuery} from 'react-query';
import {fetchJson} from '../../../../../../../utils/fetch';
import {useAtom} from 'jotai';
import {infiniteQueryRefetchStatusAtom} from '../MealDetailReview/store';

const useGetMealDetailReview = (url, dailyFoodId) => {
  const [mealDetailReview, setMealDetailReview] = useState([]);
  const [starAverage, setStarAverage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [isLast, setIsLast] = useState(false);

  const [isError, setIsError] = useState(false);

  // useEffect(() => {
  //   console.log('url 확인');
  //   console.log(url);
  // }, [url]);

  // 리뷰 별점 갯수 조회
  const [starRatingCounts, setStarRatingCounts] = useState({});

  // const {refetch: getMealDetailReviewQueryRefetch} = useQuery(
  //   ['review', 'GetMealDetailReview'],

  //   async ({queryKey}) => {
  //     const response = await fetchJson(url, 'GET');

  //     console.log(response.data);

  //     setMealDetailReview(response.data.items);
  //     setStarAverage(response.data.starEverage);
  //     setTotalCount(response.data.total);

  //     return response.data;
  //   },
  //   {
  //     onError: () => {
  //       setIsError(true);
  //     },

  //     enabled: false,
  //     retry: 1,
  //     retryDelay: 800,
  //   },
  // );

  // pageParam이 작동을 안해서 걍 내가 만든다

  // const [refetchStatus, setRefetchStatus] = useAtom(
  //   infiniteQueryRefetchStatusAtom,
  // );

  const getInfiniteQuery = useInfiniteQuery(
    ['review', 'GetMealDetailReviewInfinite'],

    // condition, pageParam=1

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
    isLast,
    starAverage,
    totalCount,
    isError,
    mealDetailReview,
    starRatingCounts,
  };
};

export default useGetMealDetailReview;

const getMealDetailReview = async (pageParam, url) => {
  const res = await fetchJson(`${url}&limit=5&page=${pageParam}`);
  // const res = await fetchJson(`${url}&limit=1&page=${page}`);

  const {items, isLast} = res.data;

  return {items, currentPage: pageParam, isLast};
};
