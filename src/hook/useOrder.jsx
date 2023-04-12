import {useMutation, useQuery, useQueryClient} from 'react-query';
import {orderApis} from '../api/order';
import {formattedWeekDate} from '../utils/dateFormatter';

export function useGetTodayMeal(date) {
  return useQuery('todayMeal', () => {
    return orderApis.todayMeal(date, date);
  });
}

export function useConfirmOrderState() {
  const queryClient = useQueryClient();
  return useMutation(data => orderApis.confirmOrder(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('todayMeal');
    },
  });
}
