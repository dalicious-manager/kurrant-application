import { fetchJson } from '../../utils/fetch';


export async function requestEmailAuth(option) {
  const fetchRes = await fetchJson(`/auth/certification/email`, 'POST', {
    ...option,
  });
  return fetchRes;
}

export async function confirmEmailAuth(auth) {
  const fetchRes = await fetchJson(`/auth/certification/email?key=${auth}`, 'GET');
  return fetchRes;
}


export async function requestPhoneAuth(option) {
  const fetchRes = await fetchJson(`/auth/certification/phone`, 'POST', {
    ...option,
  });
  return fetchRes;
}

export async function confirmPhoneAuth(auth) {
  const fetchRes = await fetchJson(`/auth/certification/phone?key=${auth}`, 'GET');
  return fetchRes;
}


export async function login(body, option) {
  const fetchRes = await fetchJson(`/auth/certification/phone`, 'POST', {
    ...option,
    body: JSON.stringify(body)
  });
  return fetchRes;
}