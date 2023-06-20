import {useMutation, useQuery, useQueryClient} from 'react-query';

import {dailyfoodApis} from '../api/dailyfood';
import {orderApis} from '../api/order';
import {formattedWeekDate} from '../utils/dateFormatter';

export function useGetDailyfood(spotId, selectedDate, userRole) {
  return useQuery(
    'dailyfood',
    () => {
      return dailyfoodApis.dailyfood(spotId, selectedDate, userRole);
    },
    {
      enabled: false,
      retry: false,
    },
  );
}
