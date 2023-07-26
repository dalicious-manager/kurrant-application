import {useAtom} from 'jotai';
import {useEffect, useState} from 'react';
import {useInfiniteQuery, useQuery} from 'react-query';
import {fetchJson} from '~utils/fetch';

const useGetMealDetailReview = dailyFoodId => {
  const [reviewKeyword, setReviewKeyword] = useState([]);
  const [starRatingCounts, setStarRatingCounts] = useState({});

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
    starRatingCounts,
    reviewKeyword,
  };
};

export default useGetMealDetailReview;
