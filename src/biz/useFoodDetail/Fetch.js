import { fetchJson } from '../../utils/fetch';

export async function FoodDetail(foodId) {
    const fetchRes = await fetchJson(`/dailyfoods/${foodId}`,'GET');

    return fetchRes;
}

export async function FoodDetailDiscount(foodId){
    const fetchRes = await fetchJson(`/dailyfoods/${foodId}/discount`,'GET');
    return fetchRes;
}