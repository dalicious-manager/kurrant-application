import {useAtom} from 'jotai';

import * as Fetch from './Fetch';
import { isOrderDinnerAtom, isOrderLunchAtom, isOrderMealAtom, isOrderMorningAtom } from './store';

const useOrderMeal = () => {
    const [isOrderMeal,setOrderMeal] = useAtom(isOrderMealAtom);
    const [isOrderMorning,setOrderMorning] = useAtom(isOrderMorningAtom);
    const [isOrderLunch,setOrderLunch] = useAtom(isOrderLunchAtom);
    const [isOrderDinner,setOrderDinner] = useAtom(isOrderDinnerAtom);

    const orderMeal = async (startdate,enddate) => {
        
        try {
            const res = await Fetch.OrderMeal(startdate,enddate);
            
            setOrderMeal(res.orderFood);
            setOrderMorning(res.orderFood.map(m => m.orderItemDtoList.filter(f => f.diningType === '아침')));
            setOrderLunch(res.orderFood.map(m => m.orderItemDtoList.filter(f => f.diningType === '점심')));
            setOrderDinner(res.orderFood.map(m => m.orderItemDtoList.filter(f => f.diningType === '저녁')));
        } catch(err){
            console.log(err);
        }
    };

    return {
        orderMeal,
        isOrderMeal,
        isOrderMorning,
        isOrderLunch,
        isOrderDinner
    }
    
}

export default useOrderMeal;