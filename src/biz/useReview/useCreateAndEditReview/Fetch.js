import mSleep from '../../../helpers/mSleep';
import {fetchJson} from '../../../utils/fetch';

export async function createReview(body, option) {
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
