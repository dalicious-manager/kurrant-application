import {useAtom} from 'jotai';

import * as Fetch from './Fetch';
import { isDailyFoodAtom, isDinnerFoodAtom, isLunchFoodAtom, isMorningFoodAtom } from './store';

const useFoodDaily = () => {

    const [isDailyFood,setDailyFood] = useAtom(isDailyFoodAtom);
    const [isMorningFood,setMorning] = useAtom(isMorningFoodAtom);
    const [isLunchFood,setLunch] = useAtom(isLunchFoodAtom);
    const [isDinnerFood,setDinner] = useAtom(isDinnerFoodAtom);
    
    const dailyFood = async (spotId,seletedDate) => {
        
        try {
            const res = await Fetch.DailyFood(spotId,seletedDate);
            setDailyFood(res.data);
            setMorning(res.data.filter(x => x.diningType === 'MORNING'));
            setLunch(res.data.filter(x => x.diningType === 'LUNCH'));
            setDinner(res.data.filter(x => x.diningType === 'DINNER'));
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