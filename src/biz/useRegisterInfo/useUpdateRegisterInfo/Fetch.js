import mSleep from '../../../helpers/mSleep';
import {fetchJson} from '../../../utils/fetch';

export async function updateRegisterInfo(body) {
  // console.log('body 확인');
  // console.log(body);
  const fetchRes = await fetchJson(`/users/me/preference`, 'POST', {
    // ...option,
    body: JSON.stringify(body),
  });

  return fetchRes;
}
