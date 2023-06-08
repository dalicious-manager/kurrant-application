import {useEffect, useState} from 'react';
import {useInfiniteQuery, useQuery} from 'react-query';
import {fetchJson} from '../../../../../../../utils/fetch';
import {useAtom} from 'jotai';

const useGetDietRepo = (mainDate, addMealDate, addMealDiningType) => {
  useQuery(['dietRepo', 'main'], async ({queryKey}) => {
    const response = await fetchJson(
      `/users/me/daily/report?date=${mainDate}`,
      'GET',
    );
  });
  useQuery(['dietRepo', 'addMeal'], async ({queryKey}) => {
    const response = await fetchJson(
      `/users/me/daily/report/order?date=${addMealDate}&diningType=${addMealDiningType}`,
      //   `/users/me/daily/report/order?date=2023-05-30&diningType=2`,
      'GET',
    );
  });

  return {};
};

export default useGetDietRepo;
