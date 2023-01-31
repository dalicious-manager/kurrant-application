import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import {useAtom} from 'jotai';
import { Alert } from 'react-native';
import { PAGE_NAME as LoginPageName} from '~pages/Main/Login/Login';
import * as Fetch from './Fetch';
import { isDailyFoodAtom, isDailyFoodLoadingAtom, isDinnerFoodAtom, isDinnerFoodLoadingAtom, isLunchFoodAtom, isLunchFoodLoadingAtom, isMorningFoodAtom, isMorningFoodLoadingAtom } from './store';

const useFoodDaily = () => {

    const [isDiningTypes,setDiningTypes] = useAtom(isDailyFoodAtom);
    const [isMorningFood,setMorning] = useAtom(isMorningFoodAtom);
    const [isLunchFood,setLunch] = useAtom(isLunchFoodAtom);
    const [isDinnerFood,setDinner] = useAtom(isDinnerFoodAtom);
    const [isDailyFoodLoading,setDailyFoodLoading] = useAtom(isDailyFoodLoadingAtom);
    const navigation = useNavigation();
    // const [isMorningFoodLoading,setMorningFoodLoading] = useAtom(isMorningFoodLoadingAtom);
    // const [isLunchFoodLoading,setLunchFoodLoading] = useAtom(isLunchFoodLoadingAtom);
    // const [isDinnerFoodLoading,setDinnerFoodLoading] = useAtom(isDinnerFoodLoadingAtom);
    //console.log(isDinnerFood,'ddddd')
    
    const dailyFood = async (spotId,seletedDate) => {
        
        try {
            setDailyFoodLoading(true)
            const res = await Fetch.DailyFood(spotId,seletedDate);
            
            if(res.data === null){
               
                throw new Error('없음');
            }
            
            setDiningTypes(res.data.diningTypes);
            setMorning(res.data.dailyFoodDtos.filter(x => x.serviceDate === seletedDate && x.diningType === 1));
            setLunch(res.data.dailyFoodDtos.filter(x => x.serviceDate === seletedDate && x.diningType === 2));
            setDinner(res.data.dailyFoodDtos.filter(x => x.serviceDate === seletedDate && x.diningType === 3));
            
        } catch (error) {
            setMorning([]);
            setLunch([]);
            setDinner([]);
            console.log(err.toString().replace("Error:",''),"123456")
            if(err.toString().replace("Error:",'').trim() === '403'){
                AsyncStorage.clear();
                navigation.reset({
                  index: 0,
                  routes: [
                    {
                      name: LoginPageName,
                      params:{
                        token:"end"
                      }
                    },
                  ],
                })
              }
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