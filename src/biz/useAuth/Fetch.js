import mSleep from '../../helpers/mSleep';
import { fetchJson } from '../../utils/fetch';

export async function requestEmailAuth(body, option) {
  const fetchRes = await fetchJson(`/auth/certification/email`, 'POST', {
    ...option,
    body: JSON.stringify(body),
  });
  return fetchRes;
}

export async function confirmEmailAuth(auth) {
  const fetchRes = await fetchJson(`/auth/certification/email?key=${auth}`, 'GET');
  return fetchRes;
}


export async function requestPhoneAuth(body, type, option) {
  const fetchRes = await fetchJson(`/auth/certification/phone?type=${type}`, 'POST', {
    ...option,
    body: JSON.stringify(body),
  });
  return fetchRes;
}

export async function confirmPhoneAuth(auth, type) {
  const fetchRes = await fetchJson(`/auth/certification/phone?key=${auth}&type=${type}`, 'GET');
  return fetchRes;
}

export async function checkedAuth(body, option) {
  // const fetchRes = await fetchJson(`/auth/inquiry/password`, 'POST', {
  //   ...option,
  //   body: JSON.stringify(body),
  // });
  // return fetchRes;
  await mSleep(1000);

  return {
    statusCode: 200
  };
}

export async function changePassword(body, type, option) {
  const fetchRes = await fetchJson(`/auth/inquiry/password/${type}`, 'POST', {
    ...option,
    body: JSON.stringify(body),
  });
  return fetchRes;
}

export async function login(body, option) {
  const fetchRes = await fetchJson(`/auth/certification/phone`, 'POST', {
    ...option,
    body: JSON.stringify(body)
  });
  return fetchRes;
}