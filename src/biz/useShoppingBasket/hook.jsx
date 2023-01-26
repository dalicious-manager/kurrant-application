import {useAtom} from 'jotai';
import react from 'react';

import * as Fetch from './Fetch';
import { deliveryFeeAtom, isLoadMealCartAtom, isQuantityAtom, mealCartSpotAtom, userPointAtom } from './store';

const useShoppingBasket = () => {

    const [isLoadMeal,setLoadMeal] = useAtom(isLoadMealCartAtom);
    const [isquantity,setQuantity] = useAtom(isQuantityAtom)
    const [deliveryFee,setDeliveryFee] = useAtom(deliveryFeeAtom);
    const [userPoint,setUserPoint] = useAtom(userPointAtom);
    const [mealCartSpot,setMealCartSpot] = useAtom(mealCartSpotAtom);
    
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
            setDeliveryFee(res.data.deliveryFee);
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

    return {
        loadMeal,
        addMeal,
        allDeleteMeal,
        deleteMeal,
        setQuantity,
        updateMeal,
        setLoadMeal,
        isLoadMeal,
        deliveryFee,
        userPoint,
        isquantity,
        mealCartSpot
        
    };

   
};

export default useShoppingBasket;