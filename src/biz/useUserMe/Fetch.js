import { fetchJson } from "../../utils/fetch";

export async function userMe() {
  const fetchRes = await fetchJson(`/users/me`, 'GET');
  return fetchRes
}

export async function userMePersonal() {
  const fetchRes = await fetchJson(`/users/me/personal`, 'GET');
  return fetchRes
}


export async function changePassword(body, option) {
  const fetchRes = await fetchJson(`//users/change/password`, 'POST', {
    ...option,
    body: JSON.stringify(body)
  });
  return fetchRes
}


export async function snsConnect(body, type, option) {
  const fetchRes = await fetchJson(`/users/me/connecting/${type}`, 'POST', {
    ...option,
    body: JSON.stringify(body)
  });
  return fetchRes
}

export async function snsDisconnect(type) {
  const fetchRes = await fetchJson(`/users/me/disconnecting/${type}`, 'DELETE');
  return fetchRes
}

export async function alarmSetting(type, value) {
  const fetchRes = await fetchJson(`/users/me/setting?${type}=${value}`, 'POST');
  return fetchRes
}

