import {useState} from 'react';
import {useQuery} from 'react-query';
import {fetchJson} from '../../../../../../../utils/fetch';

const useGetMealDetailReview = url => {
  const [mealDetailReview, setMealDetailReview] = useState([]);
  const [starAverage, setStarAverage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [isError, setIsError] = useState(false);

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

  return {
    starAverage,
    totalCount,
    isError,
    mealDetailReview,
    getMealDetailReviewQueryRefetch,
  };
};

export default useGetMealDetailReview;
