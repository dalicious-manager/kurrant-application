import {useAtom} from 'jotai';
import react from 'react';

import * as Fetch from './Fetch';
import { isLoadMealCartAtom, isQuantityAtom, mealCartSpotAtom, userPointAtom,loadSoldOutMealAtom, soldOutChangeAtom, clientStatusAtom } from './store';

const useShoppingBasket = () => {

    const [isLoadMeal,setLoadMeal] = useAtom(isLoadMealCartAtom);
    const [isquantity,setQuantity] = useAtom(isQuantityAtom)
    const [userPoint,setUserPoint] = useAtom(userPointAtom);
    const [mealCartSpot,setMealCartSpot] = useAtom(mealCartSpotAtom);
    const [soldOutMeal,setSoldOutMeal] = useAtom(loadSoldOutMealAtom);
    const [soldOutChange,setSoldOutChange] = useAtom(soldOutChangeAtom);
    const [clientStatus,setClientStatus] = useAtom(clientStatusAtom);

    const loadMeal = async () => {
        try {
            const res = await Fetch.loadMealCart();
            
            const clientType = res.data.spotCarts.map(el => {
                
                return {
                    spotId:el.spotId,
                    clientStatus:el.clientStatus
                }
            });
            
            const spot = res.data.spotCarts.map(m => {
                return {
                    id:m.spotId,
                    text: m.groupName + "\u00a0" + m.spotName
                }
            });
            
            const qty = res.data.spotCarts.map(m => m.cartDailyFoodDtoList.length)
            const badgeQty = qty.reduce((acc,cur) => {
                return acc + cur
            },0)
           
            setClientStatus(clientType)
            setMealCartSpot(spot)
            setLoadMeal(res.data.spotCarts);
            setUserPoint(res.data.userPoint)
            setQuantity(badgeQty);
        } catch (err) {
            throw err;
        }
    }

    const addMeal = async (body) => {
        
        try {
            const res = await Fetch.addMealCart([
                ...body
        ]);
           return res

        }catch(err){
            throw err
        }
    };

    const allDeleteMeal = async (spotId) => {
        try {
            const res = await Fetch.allDeleteMealCart(spotId);
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
           
            const data = res.data.dailyFoodDtos.map(el => {
                return {...el, count:0}
            });
            const list = data.map(el => {
                return {
                    id:el.id,
                    count:el.count
                }
            })

            
            setSoldOutChange(list)
            setSoldOutMeal(data)
        } catch(err){
            console.log(err)
        }
    }

    const orderMeal = async (spotId,body) => {

        try {
            const res = await Fetch.ordrMealCart(spotId,{
                ...body
            });
            return res
        } catch(err){
            console.log(err)
        }
    }

    return {
        loadMeal,
        addMeal,
        allDeleteMeal,
        deleteMeal,
        orderMeal,
        setQuantity,
        updateMeal,
        setLoadMeal,
        loadSoldOutMeal,
        setSoldOutMeal,
        setSoldOutChange,
        isLoadMeal,
        userPoint,
        isquantity,
        mealCartSpot,
        soldOutMeal,
        soldOutChange,
        clientStatus
        
    };

   
};

export default useShoppingBasket;