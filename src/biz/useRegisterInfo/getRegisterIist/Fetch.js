import mSleep from '../../../helpers/mSleep';
import {fetchJson} from '../../../utils/fetch';

// 국가 전체 조회
export async function getCountryList() {
  const fetchRes = await fetchJson(
    `/users/me/country`,

    'GET',
  );

  return fetchRes;
}

// 직종 조회
export async function getJobList() {
  const fetchRes = await fetchJson(
    `/users/me/jobs?category=0`,

    'GET',
  );

  return fetchRes;
}
export async function getDetailJobList(id) {
  const fetchRes = await fetchJson(
    `/users/me/jobs?category=1&code=${id}`,

    'GET',
  );

  return fetchRes;
}

//푸드테그 조회

export async function getCountryFoodList() {
  const fetchRes = await fetchJson(
    `/users/me/tags?code=0`,

    'GET',
  );

  return fetchRes;
}
export async function getAlergyList() {
  const fetchRes = await fetchJson(
    `/users/me/tags?code=1`,

    'GET',
  );

  return fetchRes;
}

// 음식 이미지 조회

export async function getFoodImageList() {
  const fetchRes = await fetchJson(
    `/users/me/preference/foods`,

    'GET',
  );

  return fetchRes;
}
