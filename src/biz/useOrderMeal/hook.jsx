import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import {useAtom} from 'jotai';
import { Alert } from 'react-native';
import { PAGE_NAME as LoginPageName} from '~pages/Main/Login/Login';
import * as Fetch from './Fetch';
import { isOrderDinnerAtom, isOrderLunchAtom, isOrderMealAtom, isOrderMorningAtom } from './store';

const useOrderMeal = () => {
    const [isOrderMeal,setOrderMeal] = useAtom(isOrderMealAtom);
    const [isOrderMorning,setOrderMorning] = useAtom(isOrderMorningAtom);
    const [isOrderLunch,setOrderLunch] = useAtom(isOrderLunchAtom);
    const [isOrderDinner,setOrderDinner] = useAtom(isOrderDinnerAtom);
    const navigation = useNavigation();
    const orderMeal = async (startdate,enddate) => {
        
        try {
            const res = await Fetch.OrderMeal(startdate,enddate);
            setOrderMeal(res.data);
            // setOrderMorning(res.data.map(m => m.orderItemDtoList.filter(f => f.diningType === '아침')));
            // setOrderLunch(res.data.map(m => m.orderItemDtoList.filter(f => f.diningType === '점심')));
            // setOrderDinner(res.data.map(m => m.orderItemDtoList.filter(f => f.diningType === '저녁')));
        } catch(err){
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