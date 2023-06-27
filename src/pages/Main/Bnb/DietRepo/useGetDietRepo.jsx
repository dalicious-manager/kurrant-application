import {useQuery} from 'react-query';
import {fetchJson} from '../../../../utils/fetch';
import {useEffect, useState} from 'react';

const useGetDietRepo = (
  mainDate,
  addMealDate,
  addMealDiningType,
  historyStartDate,
  historyEndDate,
) => {
  const [dietRepoMainList, setDietRepoMainList] = useState([]);
  const [totalNutrition, setTotalList] = useState({});

  const [dietRepoAddMealList, setDietRepoAddMealList] = useState([]);

  const [historyDataList, setHistoryDataList] = useState([]);

  const {
    refetch: dietRepoMainRefetch,
    // isLoading: isDietRepoMainRefetchLoading,
    isFetching: isDietRepoMainRefetchLoading,
  } = useQuery(
    ['dietRepo', 'main', mainDate],
    async ({queryKey}) => {
      const response = await fetchJson(
        `/users/me/daily/report?date=${queryKey[2]}`,
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

  const {isFetching: isDietRepoAddRefetchLoading} = useQuery(
    ['dietRepo', 'addMeal'],
    async ({queryKey}) => {
      const response = await fetchJson(
        `/users/me/daily/report/order?date=${addMealDate}&diningType=${addMealDiningType}`,

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

  const {isFetching: isDietRepoHistoryRefetchLoading} = useQuery(
    ['dietRepo', 'history', historyStartDate, historyEndDate],
    async ({queryKey}) => {
      const response = await fetchJson(
        // `/users/me/daily/report/history?startDate=${historyStartDate}&endDate=${historyEndDate}`,
        `/users/me/daily/report/history?startDate=${queryKey[2]}&endDate=${queryKey[3]}`,
        'GET',
      );
      console.log('로로로ㅗㄹ로로ㅗ');
      console.log(!!historyStartDate && !!historyEndDate);
      console.log(response.data?.dailyReportList);

      setHistoryDataList(
        response.data?.dailyReportList ? response.data?.dailyReportList : [],
      );
    },
    {
      // enabled: !!historyStartDate && !!historyEndDate,
      enabled: true,
    },
  );

  return {
    dietRepoMainRefetch,
    isDietRepoMainRefetchLoading,
    isDietRepoAddRefetchLoading,
    isDietRepoHistoryRefetchLoading,
    historyDataList,
    totalNutrition,
    dietRepoMainList,
    dietRepoAddMealList,
  };
};

export default useGetDietRepo;
