import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import {PAGE_NAME as LoginPageName} from '~pages/Main/Login/Login';
import {formattedWeekDate} from '../../utils/dateFormatter';
import * as Fetch from './Fetch';
import {isOrderMealAtom, todayMealAtom, isOrderMealLoadingAtom} from './store';

const useOrderMeal = () => {
  const [isOrderMeal, setOrderMeal] = useAtom(isOrderMealAtom);
  const [todayMeal, setTodayMeal] = useAtom(todayMealAtom);
  const [isOrderMealLoading, setOrderMealLoading] = useAtom(
    isOrderMealLoadingAtom,
  );
  const navigation = useNavigation();

  const orderMeal = async (startdate, enddate) => {
    try {
      const res = await Fetch.OrderMeal(startdate, enddate);
      setOrderMeal(res.data);
      return res;
    } catch (err) {
      if (err.toString().replace('Error:', '').trim() === '403') {
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
      const res = await Fetch.order(
        {
          ...body,
        },
        option,
      );
      return res;
    } catch (err) {
      if (err.toString().replace('Error:', '').trim() === '403') {
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

  const refundItem = async (body, option = {}) => {
    try {
      const res = await Fetch.refundItem(
        {
          ...body,
        },
        option,
      );
      return res;
    } catch (err) {
      if (err.toString().replace('Error:', '').trim() === '403') {
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
      return res;
    } catch (err) {
      if (err.toString().replace('Error:', '').trim() === '403') {
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

      console.log('라ㄹ랄라');

      console.log(`startdate: ${startdate}, enddate: ${enddate}`);

      console.log(res.data);
      console.log(todayMeal);

      setTodayMeal(todayMeal);
      return res;
    } catch (err) {
      if (err.toString().replace('Error:', '').trim() === '403') {
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
    order,
    isOrderMeal,
    todayMeal,
    isOrderMealLoading,
  };
};

export default useOrderMeal;
