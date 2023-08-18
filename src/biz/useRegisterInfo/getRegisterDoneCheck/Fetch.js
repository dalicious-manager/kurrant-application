import mSleep from '../../../helpers/mSleep';
import {fetchJson} from '../../../utils/fetch';

// 국가 전체 조회
export async function getRegisterDoneCheck() {
  const fetchRes = await fetchJson(
    `/users/me/preference/check`,

    'GET',
  );

  return fetchRes;
}
