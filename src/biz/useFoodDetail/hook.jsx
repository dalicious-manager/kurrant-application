import {useAtom} from 'jotai';

import * as Fetch from './Fetch';
import { isFoodDetailAtom, isFoodDetailDiscountAtom, isFoodDetailLoadingAtom } from './store';

const useFoodDetail = () => {

    const [isFoodDetail,setFoodDetail] = useAtom(isFoodDetailAtom);
    const [isFoodDetailLoading,setFoodDetailLoading] = useAtom(isFoodDetailLoadingAtom);
    const [isfoodDetailDiscount,setFoodDetailDiscount] = useAtom(isFoodDetailDiscountAtom);

    const foodDetail = async (foodId) => {
        try {
            setFoodDetailLoading(true)
            const res = await Fetch.FoodDetail(foodId);
            setFoodDetail(res.data);
            return res.data;
        } catch (err) {
            throw err;
        } finally {
            setFoodDetailLoading(false);
        }
    }

    const foodDetailDiscount = async (foodId) => {
        try {
            const res = await Fetch.FoodDetailDiscount(foodId);
            setFoodDetailDiscount(res.data);
        }catch(err){
            throw err;
        }
    }
    return {
        foodDetail,
        foodDetailDiscount,
        isFoodDetail,
        isfoodDetailDiscount,
        isFoodDetailLoading
    }
};

export default useFoodDetail;