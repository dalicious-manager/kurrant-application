import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import {useQueryClient} from 'react-query';
import {PAGE_NAME as LoginPageName} from '~pages/Main/Login/Login';

import * as Fetch from './Fetch';
import {
  isOrderMealAtom,
  todayMealAtom,
  isOrderMealLoadingAtom,
  isOrderLoadingAtom,
} from './store';
import {formattedWeekDate} from '../../utils/dateFormatter';

const useOrderMeal = () => {
  const [isOrderMeal, setOrderMeal] = useAtom(isOrderMealAtom);
  const [todayMeal, setTodayMeal] = useAtom(todayMealAtom);
  const [isOrderMealLoading, setOrderMealLoading] = useAtom(
    isOrderMealLoadingAtom,
  );
  const [orderLoading, setOrderLoading] = useAtom(isOrderLoadingAtom);
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const orderMeal = async (startdate, enddate) => {
    try {
      const res = await Fetch.OrderMeal(startdate, enddate);
      setOrderMeal(res.data);
      // console.log(res.data, '123231');
      return res;
    } catch (err) {
      if (err.toString()?.replace('Error:', '').trim() === '403') {
        AsyncStorage.clear();
        navigation.reset({
          index: 0,
          routes: [
            {
              name: LoginPageName,
              params: {
                token: 'end',
              },
            },
          ],
        });
      }
    }
  };
  const orderNice = async (body, option = {}) => {
    try {
      const res = await Fetch.orderNice(
        {
          ...body,
        },
        option,
      );
      queryClient.invalidateQueries('orderMeal');
      return res;
    } catch (err) {
      if (err.toString()?.replace('Error:', '').trim() === '403') {
        AsyncStorage.clear();
        navigation.reset({
          index: 0,
          routes: [
            {
              name: LoginPageName,
              params: {
                token: 'end',
              },
            },
          ],
        });
      }
    }
  };
  const order = async (body, option = {}) => {
    try {
      setOrderLoading(true);
      const res = await Fetch.order(
        {
          ...body,
        },
        option,
      );
      queryClient.invalidateQueries('orderMeal');
      return res;
    } catch (err) {
      if (err.toString()?.replace('Error:', '').trim() === '403') {
        AsyncStorage.clear();
        navigation.reset({
          index: 0,
          routes: [
            {
              name: LoginPageName,
              params: {
                token: 'end',
              },
            },
          ],
        });
      }
    } finally {
      setOrderLoading(false);
    }
  };

  const refundItem = async (body, option = {}) => {
    try {
      const res = await Fetch.refundItem(
        {
          ...body,
        },
        option,
      );

      queryClient.invalidateQueries('orderMeal');
      queryClient.invalidateQueries('allPurchaseHistory');
      queryClient.invalidateQueries('purchaseDetail');
      queryClient.invalidateQueries('mealPurchaseHistory');
      return res;
    } catch (err) {
      if (err.toString()?.replace('Error:', '').trim() === '403') {
        AsyncStorage.clear();
        navigation.reset({
          index: 0,
          routes: [
            {
              name: LoginPageName,
              params: {
                token: 'end',
              },
            },
          ],
        });
      }
      throw err;
    }
  };
  const refundAll = async (body, option = {}) => {
    try {
      const res = await Fetch.refundAll(
        {
          ...body,
        },
        option,
      );
      queryClient.invalidateQueries('orderMeal');
      queryClient.invalidateQueries('allPurchaseHistory');
      queryClient.invalidateQueries('purchaseDetail');
      queryClient.invalidateQueries('mealPurchaseHistory');
      return res;
    } catch (err) {
      if (err.toString()?.replace('Error:', '').trim() === '403') {
        AsyncStorage.clear();
        navigation.reset({
          index: 0,
          routes: [
            {
              name: LoginPageName,
              params: {
                token: 'end',
              },
            },
          ],
        });
      }
    }
  };

  const todayOrderMeal = async (startdate, enddate) => {
    const date = formattedWeekDate(new Date());

    try {
      setOrderMealLoading(true);
      const res = await Fetch.OrderMeal(startdate, enddate);

      const todayMeal = res.data?.filter(m => m.serviceDate === date);

      // console.log(`startdate: ${startdate}, enddate: ${enddate}`);

      // console.log(res.data);
      // console.log(todayMeal);

      setTodayMeal(todayMeal);
      return res;
    } catch (err) {
      if (err.toString()?.replace('Error:', '').trim() === '403') {
        AsyncStorage.clear();
        navigation.reset({
          index: 0,
          routes: [
            {
              name: LoginPageName,
              params: {
                token: 'end',
              },
            },
          ],
        });
      }
    } finally {
      setOrderMealLoading(false);
    }
  };

  return {
    orderMeal,
    todayOrderMeal,
    refundItem,
    refundAll,
    setOrderMeal,
    orderNice,
    isOrderMeal,
    todayMeal,
    orderLoading,
    isOrderMealLoading,
  };
};

export default useOrderMeal;
