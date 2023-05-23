import {useMutation, useQuery, useQueryClient} from 'react-query';

import {orderApis} from '../api/order';
import {formattedWeekDate} from '../utils/dateFormatter';

export function useGetOrderMeal(startDate, enddate) {
  return useQuery('orderMeal', () => {
    return orderApis.orderMeal(startDate, enddate);
  });
}

export function useConfirmOrderState() {
  const queryClient = useQueryClient();
  return useMutation(data => orderApis.confirmOrder(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('orderMeal');
    },
  });
}
