import {useEffect, useState} from 'react';
import {useInfiniteQuery, useQuery} from 'react-query';
import {fetchJson} from '../../../../../../../utils/fetch';

const useGetMealDetailReview = url => {
  const [mealDetailReview, setMealDetailReview] = useState([]);
  const [starAverage, setStarAverage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [isError, setIsError] = useState(false);

  // 리뷰 별점 갯수 조회
  const [starRatingCounts, setStarRatingCounts] = useState({});

  const {
    data,
    status,
    isLoading,
    refetch: getMealDetailReviewQueryRefetch,
  } = useQuery(
    ['review', 'GetMealDetailReview'],

    async ({queryKey}) => {
      console.log(url);

      const response = await fetchJson(url, 'GET');
      // console.log('리뷰 받아왔다 확인해라');
      // console.log(response.data.items);

      console.log(response.data);

      // setMealDetailReview(
      //   Array.isArray(response.data.items) ? response.data.items.reverse() : [],
      // );
      setMealDetailReview(response.data.items);
      setStarAverage(response.data.starEverage);
      setTotalCount(response.data.total);

      return response.data;
    },
    {
      onError: () => {
        setIsError(true);
      },

      enabled: false,
      retry: 1,
      retryDelay: 800,
    },
  );

  const {} = useQuery(
    ['review', 'stars'],
    async ({queryKey}) => {
      const response = await fetchJson(
        `/users/me/reviews/satisfaction?dailyFoodId=${4395}`,
        'GET',
      );

      setStarRatingCounts(response.data);
    },
    {},
  );

  // const {} = useInfiniteQuery(['review', 'GetMealDetailReviewInfinite'],

  // // condition, pageParam=1

  // async ({queryKey}) => {
  //   const res = await fetchJson(
  //     `/users/me/point?condition=${condition}&limit=20&page=${pageParam}`,
  //   );

  //   const {items, isLast} = res.data;
  //   return {items, currentPage: pageParam, isLast};
  // },

  // {
  //   getNextPageParam: lastPage => {
  //     if (!lastPage.isLast) {
  //       return lastPage.currentPage + 1;
  //     }
  //     return undefined;
  //   },
  // },

  // )

  return {
    starAverage,
    starRatingCounts,
    totalCount,
    isError,
    mealDetailReview,
    getMealDetailReviewQueryRefetch,
  };
};

export default useGetMealDetailReview;
