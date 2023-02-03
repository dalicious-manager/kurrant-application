import { fetchJson } from "../../utils/fetch";

export async function OrderMeal(startdate, enddate) {
    const fetchRes = await fetchJson(`/users/me/orders?startDate=${startdate}&endDate=${enddate}`, 'GET');


    return fetchRes;
   
}
