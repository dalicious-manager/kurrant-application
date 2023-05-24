import {useMutation, useQuery, useQueryClient} from 'react-query';

import {basketApis} from '../api/shoppingbasket';

export function useGetShoppingBasket() {
  return useQuery('shopping-basket', () => {
    return basketApis.basket();
  });
}
export function useAddShoppingBasket() {
  const queryClient = useQueryClient();
  return useMutation(data => basketApis.addBasket(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('shopping-basket');
    },
  });
}
