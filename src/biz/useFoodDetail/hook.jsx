import {useAtom} from 'jotai';

import * as Fetch from './Fetch';
import { isFoodDetailAtom, isFoodDetailLoadingAtom } from './store';

const useFoodDetail = () => {

    const [isFoodDetail,setFoodDetail] = useAtom(isFoodDetailAtom);
    const [isFoodDetailLoading,setFoodDetailLoading] = useAtom(isFoodDetailLoadingAtom);

    const foodDetail = async (foodId) => {
        try {
            setFoodDetailLoading(true)
            const res = await Fetch.FoodDetail(foodId);
            setFoodDetail(res.data);
        } catch (err) {
            throw err;
        } finally {
            setFoodDetailLoading(false);
        }
    }
    return {
        foodDetail,
        isFoodDetail,
        isFoodDetailLoading
    }
};

export default useFoodDetail;