import {useAtom} from 'jotai';

import * as Fetch from './Fetch';
import { isPurchaseLoadingAtom ,purchaseAtom,purchaseMealAtom,
  purchaseMarketAtom,
  purchaseCatorAtom,
  isMarketPurchaseLoadingAtom,
  isCatorPurchaseLoadingAtom,
  isMealPurchaseLoadingAtom,} from './store';

const usePurchaseHistory = () => {
  
  
  
    const [isAllPurchaseLoading,setAllPurchaseLoading] = useAtom(isPurchaseLoadingAtom);
    const [isMarketPurchaseLoading,setMarketPurchaseLoading] = useAtom(isMarketPurchaseLoadingAtom);
    const [isCatorPurchaseLoading,setCatorPurchaseLoading] = useAtom(isCatorPurchaseLoadingAtom);
    const [isMealPurchaseLoading,setMealPurchaseLoading] = useAtom(isMealPurchaseLoadingAtom);
    const [mealPurchase,setMealPurchase] = useAtom(purchaseMealAtom);
    const [marketPurchase,setMarketPurchase] = useAtom(purchaseMarketAtom);
    const [catorPurchase,setCatorPurchase] = useAtom(purchaseCatorAtom);
    const [allPurchase,setAllPurchase] = useAtom(purchaseAtom);
    const getPurchaseHistory = async (body,option = {}) => {
        try {
          setAllPurchaseLoading(true);
          setAllPurchase([]);
          const res = await Fetch.getPurchaseHistory(     
            {
              ...body
            },
            option
          );        
          setAllPurchase(res);
          return res;
        } catch (err) {
          throw err
        } finally {
          setAllPurchaseLoading(false);
        }
      };
    
      const getPurchaseHistoryMeal = async (body,option = {}) => {
        try {
          setMealPurchaseLoading(true);
          setAllPurchase([]);
          const res = await Fetch.getPurchaseHistoryMeal(     
            {
              ...body
            },
            option
          );        
          setMealPurchase(res);
          return res;
        } catch (err) {
          throw err
        } finally {
          setMealPurchaseLoading(false);
        }
      };
    return {
        getPurchaseHistory,
        getPurchaseHistoryMeal,
        readAbleAtom:{
            isAllPurchaseLoading,
            isMarketPurchaseLoading,
            isCatorPurchaseLoading,
            isMealPurchaseLoading,
            allPurchase,
            mealPurchase
        }
        
        
    }
};




export default usePurchaseHistory;