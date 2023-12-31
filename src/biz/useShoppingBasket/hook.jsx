import {useAtom} from 'jotai';
import react from 'react';
import {Alert} from 'react-native';
import {useQueryClient} from 'react-query';

import * as Fetch from './Fetch';
import {
  isLoadMealCartAtom,
  isQuantityAtom,
  mealCartSpotAtom,
  userPointAtom,
  loadSoldOutMealAtom,
  soldOutChangeAtom,
  clientStatusAtom,
  isLoadMealLoadingAtom,
  isAddMealCartAtom,
} from './store';

const useShoppingBasket = () => {
  const [isLoadMealLoading, setLoadMealLoading] = useAtom(
    isLoadMealLoadingAtom,
  );
  const [isLoadMeal, setLoadMeal] = useAtom(isLoadMealCartAtom);
  const [isAddMeal, setAddMeal] = useAtom(isAddMealCartAtom);
  const [isquantity, setQuantity] = useAtom(isQuantityAtom);
  const [userPoint, setUserPoint] = useAtom(userPointAtom);
  const [mealCartSpot, setMealCartSpot] = useAtom(mealCartSpotAtom);
  const [soldOutMeal, setSoldOutMeal] = useAtom(loadSoldOutMealAtom);
  const [soldOutChange, setSoldOutChange] = useAtom(soldOutChangeAtom);
  const [clientStatus, setClientStatus] = useAtom(clientStatusAtom);
  const queryClient = useQueryClient();
  const loadMeal = async () => {
    try {
      setLoadMealLoading(true);

      const res = await Fetch.loadMealCart();
      setLoadMeal(res.data && res.data?.spotCarts ? res.data.spotCarts : []);
      setQuantity(0);
      const clientType = res.data?.spotCarts.map(el => {
        return {
          spotId: el.spotId,
          clientStatus: el.clientStatus,
        };
      });

      const spot = res.data?.spotCarts.map(m => {
        return {
          id: m.spotId,
          text: m.groupName + '\u00a0' + m.spotName,
        };
      });

      const qty = res.data?.spotCarts.map(m =>
        m.cartDailyFoodDtoList.map(v => v.cartDailyFoods.length),
      );
      const badgeQty = qty?.flat().reduce((acc, cur) => {
        return acc + cur;
      }, 0);

      setClientStatus(clientType);
      setMealCartSpot(spot);
      setUserPoint(res.data && res.data?.userPoint && res.data.userPoint);
      setQuantity(badgeQty);
      return res.data.spotCarts;
    } catch (err) {
      throw err;
    } finally {
      setLoadMealLoading(false);
    }
  };

  const addMeal = async body => {
    try {
      setAddMeal(true);
      const res = await Fetch.addMealCart([...body]);
      setQuantity(res.data.cartCount);
      loadMeal();
      return res.data;
    } catch (err) {
      throw err;
    } finally {
      setAddMeal(false);
    }
  };

  const allDeleteMeal = async spotId => {
    try {
      const res = await Fetch.allDeleteMealCart(spotId);
      queryClient.invalidateQueries('shopping-basket');
      return res;
    } catch (err) {
      throw err;
    }
  };

  const deleteMeal = async foodId => {
    try {
      const res = await Fetch.deleteMealCart(foodId);
      queryClient.invalidateQueries('shopping-basket');
      return res;
    } catch (err) {
      throw err;
    }
  };

  const updateMeal = async body => {
    try {
      const res = await Fetch.updateMealCart({
        ...body,
      });
      // console.log(res.message ,body.updateCartList.map((v)=>v.count))
      // queryClient.invalidateQueries('shopping-basket');
      return res;
    } catch (err) {
      throw err;
    }
  };

  const loadSoldOutMeal = async (spotId, date, type) => {
    try {
      const res = await Fetch.loadSoldOutMealCart(spotId, date, type);

      const data = res.data.dailyFoodDtos.map(el => {
        return {...el, count: 0};
      });
      const list = data.map(el => {
        return {
          id: el.id,
          count: el.count,
        };
      });

      setSoldOutChange(list);
      setSoldOutMeal(data);
    } catch (err) {
      Alert.alert('매진 상품', err?.toString()?.replace('error: ', ''));
    }
  };

  const orderMeal = async (spotId, body) => {
    try {
      const res = await Fetch.ordrMealCart(spotId, {
        ...body,
      });
      return res;
    } catch (err) {
      Alert.alert('주문 상품', err?.toString()?.replace('error: ', ''));
    }
  };

  return {
    loadMeal,
    addMeal,
    allDeleteMeal,
    deleteMeal,
    orderMeal,
    setQuantity,
    updateMeal,
    setLoadMeal,
    loadSoldOutMeal,
    setSoldOutMeal,
    setSoldOutChange,
    isLoadMeal,
    userPoint,
    isquantity,
    isAddMeal,
    mealCartSpot,
    soldOutMeal,
    soldOutChange,
    clientStatus,
    isLoadMealLoading,
  };
};

export default useShoppingBasket;
