import {useEffect, useState} from 'react';
import {useMutation, useQuery, useQueryClient} from 'react-query';

import {basketApis} from '../api/shoppingbasket';
import {getStorage} from '../utils/asyncStorage';
import jwtUtils from '../utils/fetch/jwtUtill';

export function useGetShoppingBasket() {
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
    'shopping-basket',
    () => {
      return basketApis.basket();
    },
    {
      enabled: isTokenValid,
    },
  );
}
export function useAddShoppingBasket() {
  const queryClient = useQueryClient();
  return useMutation(data => basketApis.addBasket(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('shopping-basket');
    },
  });
}
