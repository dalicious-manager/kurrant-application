import {useMutation, useQuery, useQueryClient} from 'react-query';
import {orderApis} from '../api/order';
import {formattedWeekDate} from '../utils/dateFormatter';
import { dailyfoodApis } from '../api/dailyfood';

export function useGetDailyfood(spotId,selectedDate, userRole) {
  return useQuery('dailyfood', () => {
    return dailyfoodApis.dailyfood(spotId,selectedDate, userRole)
  });
}
