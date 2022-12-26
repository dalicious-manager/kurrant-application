import {useAtom} from 'jotai';

import * as Fetch from './Fetch';
import { isAddMealCartAtom, isLoadMealCartAtom, isQuantityAtom } from './store';

const useShoppingBasket = () => {

    const [isLoadMeal,setLoadMeal] = useAtom(isLoadMealCartAtom);
    const [isAddMeal,setAddMeal] = useAtom(isAddMealCartAtom);
    
    
    const loadMeal = async () => {
        try {
            const res = await Fetch.loadMealCart();
            setLoadMeal(res.data);
            // const test = res.data.map((x) => x.orderTable);
            // const result = [].concat.apply([],test);
            // const id = result.map((r) => r.id);
            // const count = result.map((r) => r.count);
            // setQuantity(result)
            
            
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
            return res;

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

    const deleteMeal = async (body) => {
        
        try {
            const res = await Fetch.deleteMealCart(body);
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
        updateMeal,
        setLoadMeal,
        isLoadMeal,
        isAddMeal,
        
    };

   
};

export default useShoppingBasket;