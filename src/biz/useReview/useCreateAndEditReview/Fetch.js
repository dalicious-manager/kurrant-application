import mSleep from '../../../helpers/mSleep';
import {fetchJson} from '../../../utils/fetch';

export async function createReview(formData) {
  // const req = {
  //   id: formData.id,
  // };

  const fetchRes = await fetchJson(`/users/me/reviews`, 'POST', formData);

  return fetchRes;
}
