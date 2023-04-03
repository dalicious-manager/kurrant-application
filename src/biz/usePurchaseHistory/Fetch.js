import mSleep from '../../helpers/mSleep';
import {fetchJson} from '../../utils/fetch';

export async function getPurchaseHistory(data, option) {
  const fetchRes = await fetchJson(
    `/users/me/orders/histories?startDate=${data.startDate}&endDate=${data.endDate}&orderType=1`,
    'GET',
  );
  return fetchRes;
}
export async function getPurchaseDetail(body) {
  const fetchRes = await fetchJson(
    `/users/me/orders/${body.purchaseId}`,
    'GET',
  );
  return fetchRes;
}
export async function getPurchaseHistoryMeal(data, option) {
  const fetchRes = await fetchJson(
    `/users/me/orders/histories?startDate=${data.startDate}&endDate=${data.endDate}&orderType=${data.orderType}`,
    'GET',
  );
  return fetchRes;
}
