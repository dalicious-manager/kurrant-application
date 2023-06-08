import {useQuery} from 'react-query';
import {fetchJson} from '../../../../utils/fetch';

const useGetDietRepo = (mainDate, addMealDate, addMealDiningType) => {
  useQuery(
    ['dietRepo', 'main'],
    async ({queryKey}) => {
      const response = await fetchJson(
        `/users/me/daily/report?date=${mainDate}`,
        'GET',
      );
    },
    {
      enabled: !!mainDate,
    },
  );

  useQuery(
    ['dietRepo', 'addMeal'],
    async ({queryKey}) => {
      const response = await fetchJson(
        `/users/me/daily/report/order?date=${addMealDate}&diningType=${addMealDiningType}`,
        //   `/users/me/daily/report/order?date=2023-05-30&diningType=2`,
        'GET',
      );

      console.log(response.data);
    },
    {
      enabled: !!addMealDate && !!addMealDiningType,
    },
  );

  return {};
};

export default useGetDietRepo;
