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
  // console.log('useGetDietRepo 아예 새로 리렌더링 되고 있어요');

  const [dietRepoMainList, setDietRepoMainList] = useState([]);
  const [totalNutrition, setTotalList] = useState({});

  const [dietRepoAddMealList, setDietRepoAddMealList] = useState([]);

  const [historyDataList, setHistoryDataList] = useState([]);

  // const [, updateState] = useState({});
  // const forceUpdate = useCallback(() => updateState({}), []);

  useEffect(() => {
    console.log('메인데이트값 확인하기 ');
    console.log(mainDate);
  }, [mainDate]);

  // const {
  //   refetch: dietRepoMainRefetch,
  //   // isLoading: isDietRepoMainRefetchLoading,
  //   isFetching: isDietRepoMainRefetchLoading,
  // } = useQuery(
  //   ['dietRepo', 'main', mainDate],
  //   async ({queryKey}) => {
  //     console.log('리펫치 시작이요. 쿼리 키 값이에요 ' + queryKey[2]);

  //     const response = await fetchJson(
  //       `/users/me/daily/report?date=${queryKey[2]}`,
  //       'GET',
  //     );

  //     console.log('데이터 받아왔어요');
  //     console.log(response?.data);
  //     setDietRepoMainList([...response?.data?.dailyReportResDtoList]);
  //     setTotalList({
  //       totalCalorie: response?.data?.totalCalorie,
  //       totalCarbohydrate: response?.data?.totalCarbohydrate,
  //       totalFat: response?.data?.totalFat,
  //       totalProtein: response?.data?.totalProtein,
  //     });
  //   },
  //   {
  //     enabled: !!mainDate,
  //   },
  // );

  // useQuery 테스트용

  const {
    refetch: dietRepoMainRefetch,

    isFetching: isDietRepoMainRefetchLoading,
    data,
  } = useQuery(
    ['dietRepo', 'main', mainDate],
    async ({queryKey}) => {
      console.log('리펫치 시작이요. 쿼리 키 값이에요 ' + queryKey[2]);

      const response = await fetchJson(
        `/users/me/daily/report?date=${queryKey[2]}`,
        'GET',
      );

      // console.log('데이터 받아왔어요');
      // console.log(response?.data);
      // setDietRepoMainList([...response?.data?.dailyReportResDtoList]);
      // setTotalList({
      //   totalCalorie: response?.data?.totalCalorie,
      //   totalCarbohydrate: response?.data?.totalCarbohydrate,
      //   totalFat: response?.data?.totalFat,
      //   totalProtein: response?.data?.totalProtein,
      // });
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
    console.log('데이터 ㅌㅌ');
    console.log(data);
    if (data) {
      setDietRepoMainList([...data.dietRepoMainList]);
      setTotalList({...data.totalNutrition});
    }
  }, [data]);

  // useEffect(() => {
  //   console.log('확인하세~~');
  //   console.log(dailyReportResDtoList);
  //   console.log(totalCalorie);
  // }, [dailyReportResDtoList, totalCalorie]);

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
  useEffect(() => {
    console.log('지금 dietRepoMainList가 어디서 자꾸 [] 되었다가 데이터가 ');
    console.log(dietRepoMainList);
  }, [dietRepoMainList]);

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
