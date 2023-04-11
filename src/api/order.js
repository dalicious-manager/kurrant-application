import {fetchJson} from '../utils/fetch';

export const orderApis = {
  confirmOrder: async data =>
    await fetchJson('/users/me/orders/update/status', 'PATCH', {
      body: JSON.stringify(data),
    }),
  todayMeal: async (startDate, endDate) =>
    await fetchJson(
      `/users/me/orders?startDate=${startDate}&endDate=${startDate}`,
      'GET',
    ),
};
