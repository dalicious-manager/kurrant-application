import {useAtom} from 'jotai';

import * as Fetch from './Fetch';
import { isDailyFoodAtom, isDailyFoodLoadingAtom, isDinnerFoodAtom, isDinnerFoodLoadingAtom, isLunchFoodAtom, isLunchFoodLoadingAtom, isMorningFoodAtom, isMorningFoodLoadingAtom } from './store';

const useFoodDaily = () => {

    const [isDailyFood,setDailyFood] = useAtom(isDailyFoodAtom);
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
    
            setDailyFood(res.data);
            setMorning(res.data.filter(x => x.serviceDate === seletedDate && x.diningType === '아침'));
            setLunch(res.data.filter(x => x.serviceDate === seletedDate && x.diningType === '점심'));
            setDinner(res.data.filter(x => x.serviceDate === seletedDate && x.diningType === '저녁'));
            
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
        isDailyFood,
        isMorningFood,
        isLunchFood,
        isDinnerFood,
        isDailyFoodLoading
    }
};

export default useFoodDaily;