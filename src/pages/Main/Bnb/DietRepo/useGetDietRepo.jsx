import {useEffect, useState} from 'react';
import {useInfiniteQuery, useQuery} from 'react-query';
import {fetchJson} from '../../../../../../../utils/fetch';
import {useAtom} from 'jotai';

const useGetDietRepo = () => {
  useQuery(['dietRepo', 'main'], async ({queryKey}) => {
    const response = await fetchJson(
      `/users/me/daily/report?date=2023-05-30`,
      'GET',
    );
  });
  useQuery(['dietRepo', 'main'], async ({queryKey}) => {
    const response = await fetchJson(
      `/users/me/daily/report?date=2023-05-30`,
      'GET',
    );
  });

  return {};
};

export default useGetDietRepo;
