import {useAtom} from 'jotai';

import * as Fetch from './Fetch';
import { isDailyFoodAtom, isDinnerFoodAtom, isLunchFoodAtom, isMorningFoodAtom } from './store';

const useFoodDaily = () => {

    const [isDailyFood,setDailyFood] = useAtom(isDailyFoodAtom);
    const [isMorningFood,setMorning] = useAtom(isMorningFoodAtom);
    const [isLunchFood,setLunch] = useAtom(isLunchFoodAtom);
    const [isDinnerFood,setDinner] = useAtom(isDinnerFoodAtom);
    
    const dailyFood = async () => {
        try {
            const res = await Fetch.DailyFood();
            setDailyFood(res.dailyFood);
            setMorning(res.dailyFood.filter(x => x.diningType === '아침'));
            setLunch(res.dailyFood.filter(x => x.diningType === '점심'));
            setDinner(res.dailyFood.filter(x => x.diningType === '저녁'));
        } catch (err) {
            throw err;
        }
    }
    return {
        dailyFood,
        isDailyFood,
        isMorningFood,
        isLunchFood,
        isDinnerFood
    }
};

export default useFoodDaily;