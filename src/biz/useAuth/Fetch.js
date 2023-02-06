import mSleep from '../../helpers/mSleep';
import { fetchJson } from '../../utils/fetch';

export async function requestEmailAuth(body, type, option) {
  const fetchRes = await fetchJson(`/auth/certification/email?type=${type}`, 'POST', {
    ...option,
    body: JSON.stringify(body),
  });
  return fetchRes;
}

export async function confirmEmailAuth(auth, type) {
  const fetchRes = await fetchJson(`/auth/certification/email?key=${auth}&type=${type}`, 'GET');
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

export async function findEmail(body, option) {
  const fetchRes = await fetchJson(`/auth/inquiry/id`, 'POST', {
    ...option,
    body: JSON.stringify(body),
  });
  return fetchRes;
}

export async function checkedAuth(body, option) {
  const fetchRes = await fetchJson(`/auth/inquiry/password`, 'POST', {
    ...option,
    body: JSON.stringify(body),
  });
  return fetchRes;
  // await mSleep(1000);

  // return {
  //   statusCode: 200
  // };
}

export async function changePassword(body, type, option) {
  console.log(type, body)
  const fetchRes = await fetchJson(`/auth/inquiry/password/${type}`, 'POST', {
    ...option,
    body: JSON.stringify(body),
  });
  return fetchRes;
}

export async function login(body, option) {
  const fetchRes = await fetchJson(`/auth/login`, 'POST', {
    ...option,
    body: JSON.stringify(body)
  });
  return fetchRes;
}
export async function guestLogin() {
  const fetchRes = await fetchJson(`/auth/lookingAround`, 'GET',);
  return fetchRes;
}
export async function nameSetting(body, option) {
  const fetchRes = await fetchJson(`/users/me/setting/name`, 'POST', {
    ...option,
    body: JSON.stringify(body)
  });
  return fetchRes;
}

export async function snsLogin(body, type, option) {
  const fetchRes = await fetchJson(`/auth/login/${type}`, 'POST', {
    ...option,
    body: JSON.stringify(body)
  });
  return fetchRes;
}
export async function snsAppleLogin(body, type, option) {
  const fetchRes = await fetchJson(`/auth/loginApple`, 'POST', {
    ...option,
    body: JSON.stringify(body)
  });
  return fetchRes;
}

export async function logout(body, option) {
  console.log("로그아웃")
  console.log(body);
  const fetchRes = await fetchJson(`/auth/logout`, 'POST', {
    ...option,
    body: JSON.stringify(body)
  });
  return fetchRes;
}