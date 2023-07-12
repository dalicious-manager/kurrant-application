import {fetchJson} from '../utils/fetch';

export const purchaseApis = {
  getAllPurchaseHistory: async data =>
    await fetchJson(
      `/users/me/orders/histories?startDate=${data.startDate}&endDate=${data.endDate}&orderType=1`,
      'GET',
    ),
  getMealPurchaseHistory: async data =>
    await fetchJson(
      `/users/me/orders/histories?startDate=${data.startDate}&endDate=${data.endDate}&orderType=${data.orderType}`,
      'GET',
    ),
  getPurchaseDetail: async body =>
    await fetchJson(`/users/me/orders/${body.purchaseId}`, 'GET'),
};
