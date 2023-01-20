import {useAtom} from 'jotai';

import * as Fetch from './Fetch';
import { isDailyFoodAtom, isDailyFoodLoadingAtom, isDinnerFoodAtom, isDinnerFoodLoadingAtom, isLunchFoodAtom, isLunchFoodLoadingAtom, isMorningFoodAtom, isMorningFoodLoadingAtom } from './store';

const useFoodDaily = () => {

    const [isDiningTypes,setDiningTypes] = useAtom(isDailyFoodAtom);
    const [isMorningFood,setMorning] = useAtom(isMorningFoodAtom);
    const [isLunchFood,setLunch] = useAtom(isLunchFoodAtom);
    const [isDinnerFood,setDinner] = useAtom(isDinnerFoodAtom);
    const [isDailyFoodLoading,setDailyFoodLoading] = useAtom(isDailyFoodLoadingAtom);
    // const [isMorningFoodLoading,setMorningFoodLoading] = useAtom(isMorningFoodLoadingAtom);
    // const [isLunchFoodLoading,setLunchFoodLoading] = useAtom(isLunchFoodLoadingAtom);
    // const [isDinnerFoodLoading,setDinnerFoodLoading] = useAtom(isDinnerFoodLoadingAtom);
    //console.log(isDinnerFood,'ddddd')
    
    const dailyFood = async (spotId,seletedDate) => {
        
        try {
            setDailyFoodLoading(true)
            const res = await Fetch.DailyFood(spotId,seletedDate);
            
            if(res.data === null){
                setMorning([]);
                setLunch([]);
                setDinner([]);
                throw new Error('없음');
            }
            
            setDiningTypes(res.data.diningTypes);
            setMorning(res.data.dailyFoodDtos.filter(x => x.serviceDate === seletedDate && x.diningType === 1));
            setLunch(res.data.dailyFoodDtos.filter(x => x.serviceDate === seletedDate && x.diningType === 2));
            setDinner(res.data.dailyFoodDtos.filter(x => x.serviceDate === seletedDate && x.diningType === 3));
            
        } catch (err) {
            console.log(err,'err');
            setDailyFood([]);
            setMorning([]);
            setLunch([]);
            setDinner([]);
        } finally {
            setDailyFoodLoading(false)
        }
    }
    return {
        dailyFood,
        isDiningTypes,
        isMorningFood,
        isLunchFood,
        isDinnerFood,
        isDailyFoodLoading
    }
};

export default useFoodDaily;