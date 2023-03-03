import {useAtom} from 'jotai';
import useAuth from '../useAuth';

import * as Fetch from './Fetch';
import {
  isFoodDetailAtom,
  isFoodDetailDiscountAtom,
  isFoodDetailLoadingAtom,
} from './store';

const useFoodDetail = () => {
  const [isFoodDetail, setFoodDetail] = useAtom(isFoodDetailAtom);
  const [isFoodDetailLoading, setFoodDetailLoading] = useAtom(
    isFoodDetailLoadingAtom,
  );
  const {
    readableAtom: {userRole},
  } = useAuth();
  const [isfoodDetailDiscount, setFoodDetailDiscount] = useAtom(
    isFoodDetailDiscountAtom,
  );

  const foodDetail = async foodId => {
    try {
      setFoodDetailLoading(true);
      console.log(userRole);
      const res = await Fetch.FoodDetail(foodId, userRole);

      setFoodDetail(res.data);
      return res.data;
    } catch (err) {
      throw err;
    } finally {
      setFoodDetailLoading(false);
    }
  };

  const foodDetailDiscount = async foodId => {
    try {
      const res = await Fetch.FoodDetailDiscount(foodId);
      setFoodDetailDiscount(res.data);
    } catch (err) {
      throw err;
    }
  };
  return {
    foodDetail,
    foodDetailDiscount,
    isFoodDetail,
    isfoodDetailDiscount,
    isFoodDetailLoading,
  };
};

export default useFoodDetail;
