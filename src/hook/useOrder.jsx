import {useEffect, useState} from 'react';
import {useMutation, useQuery, useQueryClient} from 'react-query';

import {orderApis} from '../api/order';
import {getStorage} from '../utils/asyncStorage';
import {formattedWeekDate} from '../utils/dateFormatter';
import jwtUtils from '../utils/fetch/jwtUtill';

export function useGetOrderMeal(startDate, enddate) {
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
    'orderMeal',
    () => {
      return orderApis.orderMeal(startDate, enddate);
    },
    {
      enabled: isTokenValid,
    },
  );
}

export function useConfirmOrderState() {
  const queryClient = useQueryClient();
  return useMutation(data => orderApis.confirmOrder(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('orderMeal');
      queryClient.invalidateQueries('allPurchaseHistory');
      queryClient.invalidateQueries('purchaseDetail');
      queryClient.invalidateQueries('mealPurchaseHistory');
    },
  });
}
