import {useQuery} from 'react-query';
import {fetchJson} from '../../../../utils/fetch';
import {useEffect, useState} from 'react';

const useGetDietRepo = (mainDate, addMealDate, addMealDiningType) => {
  const [dietRepoMainList, setDietRepoMainList] = useState([]);
  const [totalNutrition, setTotalList] = useState({});

  const [dietRepoAddMealList, setDietRepoAddMealList] = useState([]);

  const {
    refetch: dietRepoMainRefetch,
    isLoading: isDietRepoMainRefetchLoading,
  } = useQuery(
    ['dietRepo', 'main'],
    async ({queryKey}) => {
      const response = await fetchJson(
        `/users/me/daily/report?date=${mainDate}`,
        'GET',
      );

      setDietRepoMainList(response?.data?.dailyReportResDtoList);
      setTotalList({
        totalCalorie: response?.data?.totalCalorie,
        totalCarbohydrate: response?.data?.totalCarbohydrate,
        totalFat: response?.data?.totalFat,
        totalProtein: response?.data?.totalProtein,
      });
    },
    {
      enabled: !!mainDate,
    },
  );

  useQuery(
    ['dietRepo', 'addMeal'],
    async ({queryKey}) => {
      const response = await fetchJson(
        `/users/me/daily/report/order?date=${addMealDate}&diningType=${addMealDiningType}`,
        //   `/users/me/daily/report/order?date=2023-05-30&diningType=2`,
        'GET',
      );

      setDietRepoAddMealList(
        typeof response.data === 'object' ? response.data : [],
      );
    },
    {
      enabled: !!addMealDate && !!addMealDiningType,
    },
  );

  return {
    dietRepoMainRefetch,
    isDietRepoMainRefetchLoading,

    totalNutrition,
    dietRepoMainList,
    dietRepoAddMealList,
  };
};

export default useGetDietRepo;
