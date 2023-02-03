import { fetchJson } from "../../utils/fetch";

export async function OrderMeal(startdate, enddate) {
    const fetchRes = await fetchJson(`/users/me/orders?startDate=${startdate}&endDate=${enddate}`, 'GET');


    return fetchRes;

}
export async function refundItem(body, option) {
    const req = {
        id: body.id
    }
    const fetchRes = await fetchJson(`/users/me/orders/${body.orderId}/dailyFoods/refund`, 'POST', {
        ...option,
        body: JSON.stringify(req)
    });


    return fetchRes;

}
