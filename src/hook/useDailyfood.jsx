import {useEffect, useState} from 'react';
import {useMutation, useQuery, useQueryClient} from 'react-query';

import {dailyfoodApis} from '../api/dailyfood';
import {orderApis} from '../api/order';
import {getStorage} from '../utils/asyncStorage';
import {formattedWeekDate} from '../utils/dateFormatter';
import jwtUtils from '../utils/fetch/jwtUtill';

export function useGetDailyfood(spotId, selectedDate, userRole) {
  const [isTokenValid, setIsTokenValid] = useState(false);

  useEffect(() => {
    const getTokenData = async () => {
      const storage = JSON.parse(await getStorage('token'));
      return jwtUtils.isAuth(storage?.accessToken);
    };

    getTokenData().then(result => {
      setIsTokenValid(result);
    });
  }, []);
  return useQuery(
    'dailyfood',
    () => {
      return dailyfoodApis.dailyfood(spotId, selectedDate, userRole);
    },
    {
      enabled: !!spotId && isTokenValid,
      retry: false,
    },
  );
}
export function useGetDailyfoodList(spotId, startDate, endDate, userRole) {
  return useQuery(
    'dailyfood',
    () => {
      return dailyfoodApis.dailyfoodList(spotId, startDate, endDate, userRole);
    },
    {
      enabled: !!spotId,
      retry: false,
    },
  );
}
export function useGetDailyfoodDateList(spotId, startDate, endDate, userRole) {
  return useQuery(
    'dailyfooddate',
    () => {
      return dailyfoodApis.dailyfoodDateList(
        spotId,
        startDate,
        endDate,
        userRole,
      );
    },
    {
      enabled: !!spotId,
      retry: false,
    },
  );
}

export function useGetDailyfoodDetail(foodId, userRole) {
  const [isTokenValid, setIsTokenValid] = useState(false);

  useEffect(() => {
    const getTokenData = async () => {
      const storage = JSON.parse(await getStorage('token'));
      return jwtUtils.isAuth(storage?.accessToken);
    };

    getTokenData().then(result => {
      setIsTokenValid(result);
    });
  }, []);
  return useQuery(
    'dailyfoodDetail',
    () => {
      return dailyfoodApis.dailyfoodDetail(foodId, userRole);
    },
    {
      enabled: !!foodId && isTokenValid,
      retry: false,
    },
  );
}
export function useGetDailyfoodDetailNow(foodId, userRole) {
  const [isTokenValid, setIsTokenValid] = useState(false);

  useEffect(() => {
    const getTokenData = async () => {
      const storage = JSON.parse(await getStorage('token'));
      return jwtUtils.isAuth(storage?.accessToken);
    };

    getTokenData().then(result => {
      setIsTokenValid(result);
    });
  }, []);
  return useQuery(
    'dailyfoodDetail',
    () => {
      return dailyfoodApis.dailyfoodDetail(foodId, userRole);
    },
    {
      enabled: false,
      retry: false,
    },
  );
}
