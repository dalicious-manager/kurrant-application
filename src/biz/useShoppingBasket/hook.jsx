import {useAtom} from 'jotai';
import react from 'react';

import * as Fetch from './Fetch';
import { isLoadMealCartAtom, isQuantityAtom, mealCartSpotAtom, userPointAtom,loadSoldOutMealAtom } from './store';

const useShoppingBasket = () => {

    const [isLoadMeal,setLoadMeal] = useAtom(isLoadMealCartAtom);
    const [isquantity,setQuantity] = useAtom(isQuantityAtom)
    const [userPoint,setUserPoint] = useAtom(userPointAtom);
    const [mealCartSpot,setMealCartSpot] = useAtom(mealCartSpotAtom);
    const [soldOutMeal,setSoldOutMeal] = useAtom(loadSoldOutMealAtom);
    
    const loadMeal = async () => {
        try {
            const res = await Fetch.loadMealCart();
            
            const spot = res.data.spotCarts.map(m => {
                return {
                    id:m.spotId,
                    text: m.groupName + m.spotName
                }
            });
            
            const qty = res.data.spotCarts.map(m => m.cartDailyFoodDtoList.length)
            const badgeQty = qty.reduce((acc,cur) => {
                return acc + cur
            },0)
            
            setMealCartSpot(spot)
            setLoadMeal(res.data.spotCarts);
            setUserPoint(res.data.userPoint)
            setQuantity(badgeQty);
        } catch (err) {
            throw err;
        }
    }

    const addMeal = async (body,option ={}) => {
        try {
            const res = await Fetch.addMealCart({
                ...body
            },
            option
            );
           return res

        }catch(err){
            throw err
        }
    };

    const allDeleteMeal = async () => {
        try {
            const res = await Fetch.allDeleteMealCart();
            setQuantity(0)
            return res;

        }catch(err){
            throw err
        }
    };

    const deleteMeal = async (foodId) => {
        
        try {
            const res = await Fetch.deleteMealCart(foodId);
            setQuantity(v => v - 1)
            return res;
            
        }catch(err){
            throw err
        }
    };

    const updateMeal = async (body) => {

        try {
            const res = await Fetch.updateMealCart({
                ...body
            });
            console.log(res.message)
            return res;

        }catch(err){
            throw err
        }
    };

    const loadSoldOutMeal = async (spotId,date,type) => {
        try {
            const res = await Fetch.loadSoldOutMealCart(spotId,date,type);
            
            setSoldOutMeal(res.data.dailyFoodDtos)
        } catch(err){
            console.log(err,'444')
        }
    }

    return {
        loadMeal,
        addMeal,
        allDeleteMeal,
        deleteMeal,
        setQuantity,
        updateMeal,
        setLoadMeal,
        loadSoldOutMeal,
        isLoadMeal,
        userPoint,
        isquantity,
        mealCartSpot,
        soldOutMeal
        
    };

   
};

export default useShoppingBasket;