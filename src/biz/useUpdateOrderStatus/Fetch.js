import {fetchJson} from '../../utils/fetch';

export async function OrderMeal(startdate, enddate) {
  const fetchRes = await fetchJson(
    `/users/me/orders?startDate=${startdate}&endDate=${enddate}`,
    'GET',
  );

  return fetchRes;
}
export async function refundItem(body, option) {
  const req = {
    id: body.id,
  };
  const fetchRes = await fetchJson(
    `/users/me/orders/dailyFoods/refund`,
    'POST',
    {
      ...option,
      body: JSON.stringify(req),
    },
  );

  return fetchRes;
}

export async function refundAll(body, option) {
  const fetchRes = await fetchJson(`/users/me/orders/refund`, 'POST', {
    ...option,
    body: JSON.stringify(body),
  });

  return fetchRes;
}
export async function order(body, option) {
  const fetchRes = await fetchJson(`/users/me/orders`, 'POST', {
    ...option,
    body: JSON.stringify(body),
  });

  return fetchRes;
}
