import {useAtom} from 'jotai';

import * as Fetch from './Fetch';
import { isFoodDetailAtom } from './store';

const useFoodDetail = () => {

    const [isFoodDetail,setFoodDetail] = useAtom(isFoodDetailAtom);

    const foodDetail = async (foodId) => {
        try {
            const res = await Fetch.FoodDetail(foodId);
            setFoodDetail(res.data);
        } catch (err) {
            throw err;
        }
    }
    return {
        foodDetail,
        isFoodDetail
    }
};

export default useFoodDetail;