import {useMutation, useQuery, useQueryClient} from 'react-query';

import {purchaseApis} from '../api/purchaseHistory';

export function useGetAllPurchaseHistory(data) {
  return useQuery('allPurchaseHistory', () => {
    return purchaseApis.getAllPurchaseHistory(data);
  });
}
export function useGetPurchaseDetail(data) {
  return useQuery('purchaseDetail', () => {
    return purchaseApis.getPurchaseDetail(data);
  });
}
export function useGetMealPurchaseHistory(data) {
  return useQuery('mealPurchaseHistory', () => {
    return purchaseApis.getMealPurchaseHistory(data);
  });
}
