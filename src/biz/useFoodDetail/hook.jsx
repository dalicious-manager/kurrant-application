import {useAtom} from 'jotai';

import * as Fetch from './Fetch';
import { isFoodDetailAtom } from './store';

const useFoodDetail = () => {

    const [isFoodDetail,setFoodDetail] = useAtom(isFoodDetailAtom);

    const foodDetail = async () => {
        try {
            const res = await Fetch.FoodDetail();
            setFoodDetail(res.foodDetail);
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