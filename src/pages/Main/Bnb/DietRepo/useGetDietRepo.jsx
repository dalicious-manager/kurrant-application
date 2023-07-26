import {useQuery} from 'react-query';
import {fetchJson} from '../../../../utils/fetch';
import {useCallback, useEffect, useState} from 'react';

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

  // 유저 식단 리포트 조회

  const {
    refetch: dietRepoMainRefetch,

    isFetching: isDietRepoMainRefetchLoading,
    data,
  } = useQuery(
    ['dietRepo', 'main', mainDate],
    async ({queryKey}) => {
      const response = await fetchJson(
        `/users/me/daily/report?date=${queryKey[2]}`,
        'GET',
      );

      return {
        dietRepoMainList: response?.data?.dailyReportResDtoList,
        totalNutrition: {
          totalCalorie: response?.data?.totalCalorie,
          totalCarbohydrate: response?.data?.totalCarbohydrate,
          totalFat: response?.data?.totalFat,
          totalProtein: response?.data?.totalProtein,
        },
      };
    },
    {
      enabled: !!mainDate,
    },
  );

  useEffect(() => {
    if (data) {
      setDietRepoMainList([...data.dietRepoMainList]);
      setTotalList({...data.totalNutrition});
    }
  }, [data]);

  // 유저 특정일 주문내역
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

  // 식사 히스토리 조회
  const {isFetching: isDietRepoHistoryRefetchLoading} = useQuery(
    ['dietRepo', 'history', historyStartDate, historyEndDate],
    async ({queryKey}) => {
      const response = await fetchJson(
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
