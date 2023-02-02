import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import {useAtom} from 'jotai';
import { PAGE_NAME as LoginPageName} from '~pages/Main/Login/Login';
import { formattedWeekDate } from '../../utils/dateFormatter';
import * as Fetch from './Fetch';
import { isOrderMealAtom , todayMealAtom} from './store';

const useOrderMeal = () => {
    const [isOrderMeal,setOrderMeal] = useAtom(isOrderMealAtom);
    const [todayMeal,setTodayMeal] = useAtom(todayMealAtom);

    const navigation = useNavigation();

    const orderMeal = async (startdate,enddate) => {
      
      
        try {
            const res = await Fetch.OrderMeal(startdate,enddate);
            setOrderMeal(res.data);
            
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

    const todayOrderMeal = async (startdate,enddate) => {
      const date = formattedWeekDate(new Date());
      
        try {
            const res = await Fetch.OrderMeal(startdate,enddate);
            
            const todayMeal = res.data?.filter((m) => m.serviceDate === date);
            setTodayMeal(todayMeal)

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
        todayOrderMeal,
        isOrderMeal,
        todayMeal
      
    }
    
}

export default useOrderMeal;