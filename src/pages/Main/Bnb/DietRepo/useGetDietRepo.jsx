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

  useEffect(() => {
    console.log('메인데이트값 확인하기 ');
    console.log(mainDate);
  }, [mainDate]);

  const {
    refetch: dietRepoMainRefetch,
    // isLoading: isDietRepoMainRefetchLoading,
    isFetching: isDietRepoMainRefetchLoading,
  } = useQuery(
    ['dietRepo', 'main', mainDate],
    async ({queryKey}) => {
      console.log('쿼리 키 값이에요 ' + queryKey[2]);

      const response = await fetchJson(
        `/users/me/daily/report?date=${queryKey[2]}`,
        'GET',
      );

      console.log('데이터는 잘 받고 있어요');
      console.log(response?.data);
      setDietRepoMainList(response?.data?.dailyReportResDtoList);
      setTotalList({
        totalCalorie: response?.data?.totalCalorie,
        totalCarbohydrate: response?.data?.totalCarbohydrate,
        totalFat: response?.data?.totalFat,
        totalProtein: response?.data?.totalProtein,
      });
    },
    // {
    //   enabled: !!mainDate,
    // },
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

      setHistoryDataList(
        response.data?.dailyReportList ? response.data?.dailyReportList : [],
      );
    },
    {
      enabled: !!historyStartDate && !!historyEndDate,
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
