import {useAtom} from 'jotai';

import * as Fetch from './Fetch';
import { isLoadMealCartAtom, isQuantityAtom } from './store';

const useShoppingBasket = () => {

    const [isLoadMeal,setLoadMeal] = useAtom(isLoadMealCartAtom);
    const [isquantity,setQuantity] = useAtom(isQuantityAtom)
    
    const loadMeal = async () => {
        try {
            const res = await Fetch.loadMealCart();
            setLoadMeal(res.data);
            setQuantity(res.data.length);
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
            setQuantity(v => v + 1)
           return res

        }catch(err){
            throw err
        }
    };

    const allDeleteMeal = async () => {
        try {
            const res = await Fetch.allDeleteMealCart();
            return res;

        }catch(err){
            throw err
        }
    };

    const deleteMeal = async (foodId) => {
        console.log(foodId)
        try {
            const res = await Fetch.deleteMealCart(foodId);
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
        isquantity
        
    };

   
};

export default useShoppingBasket;