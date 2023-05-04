import {useState} from 'react';
import {useQuery} from 'react-query';
import {fetchJson} from '../../../../../../../utils/fetch';

const useGetMealDetailReview = dailyFoodId => {
  const [mealDetailReview, setMealDetailReview] = useState([]);

  const {
    data,
    status,
    isLoading,
    refetch: getMealDetailReviewQueryRefetch,
  } = useQuery(
    ['review', 'GetMealDetailReview'],

    async ({queryKey}) => {
      const response = await fetchJson(
        `/dailyfoods/${dailyFoodId}/review`,
        'GET',
      );
      console.log('리뷰 받아왔다 확인해라');
      console.log(response.data.items);

      setMealDetailReview(response.data.items);
      return response.data;
    },
    {
      enabled: false,
      retry: 1,
      retryDelay: 800,
    },
  );

  return {mealDetailReview, getMealDetailReviewQueryRefetch};
};

export default useGetMealDetailReview;
