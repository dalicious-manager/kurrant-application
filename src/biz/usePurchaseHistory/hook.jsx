import {useAtom} from 'jotai';

import * as Fetch from './Fetch';
import { isPurchaseLoadingAtom ,purchaseAtom,purchaseMealAtom,
  purchaseMarketAtom,
  purchaseCatorAtom,
  isMarketPurchaseLoadingAtom,
  isCatorPurchaseLoadingAtom,
  isMealPurchaseLoadingAtom,
  isPurchaseDetailLoadingAtom,
  purchaseDetailAtom
} from './store';

const usePurchaseHistory = () => {
    const [isAllPurchaseLoading,setAllPurchaseLoading] = useAtom(isPurchaseLoadingAtom);
    const [isMarketPurchaseLoading,setMarketPurchaseLoading] = useAtom(isMarketPurchaseLoadingAtom);
    const [isCatorPurchaseLoading,setCatorPurchaseLoading] = useAtom(isCatorPurchaseLoadingAtom);
    const [isMealPurchaseLoading,setMealPurchaseLoading] = useAtom(isMealPurchaseLoadingAtom);
    const [isPurchaseDetailLoading,setPurchaseDetailLoading] = useAtom(isPurchaseDetailLoadingAtom);
    const [mealPurchase,setMealPurchase] = useAtom(purchaseMealAtom);
    const [marketPurchase,setMarketPurchase] = useAtom(purchaseMarketAtom);
    const [catorPurchase,setCatorPurchase] = useAtom(purchaseCatorAtom);
    const [allPurchase,setAllPurchase] = useAtom(purchaseAtom);
    const [purchaseDetail,setPurchaseDetail] = useAtom(purchaseDetailAtom);
    const getPurchaseHistory = async (body,option = {}) => {
        try {
          setAllPurchaseLoading(true);
          const res = await Fetch.getPurchaseHistory(     
            {
              ...body
            },
            option
          );        
          setAllPurchase(res.data);
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
          const res = await Fetch.getPurchaseHistoryMeal(     
            {
              ...body
            },
            option
          );        
          setMealPurchase(res.data);
          return res;
        } catch (err) {
          throw err
        } finally {
          setMealPurchaseLoading(false);
        }
      };
      const getPurchaseDetail = async (body,option = {}) => {
        try {
          setPurchaseDetail({});
          setPurchaseDetailLoading(true);
          const res = await Fetch.getPurchaseDetail(     
            {
              ...body
            },
            option
          );        
          setPurchaseDetail(res.data);
          return res;
        } catch (err) {
          throw err
        } finally {
          setPurchaseDetailLoading(false);
        }
      };
    return {
        getPurchaseHistory,
        getPurchaseHistoryMeal,
        getPurchaseDetail,
        setMealPurchase,
        setAllPurchase,
        setPurchaseDetail,
        readAbleAtom:{
            isAllPurchaseLoading,
            isMarketPurchaseLoading,
            isCatorPurchaseLoading,
            isMealPurchaseLoading,
            isPurchaseDetailLoading,
            allPurchase,
            mealPurchase,
            marketPurchase,
            catorPurchase,
            purchaseDetail
        }
        
        
    }
};




export default usePurchaseHistory;