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
  const fetchRes = await fetchJson(`/users/me/change/password`, 'POST', {
    ...option,
    body: JSON.stringify(body)
  });
  return fetchRes
}

export async function settingEmail(body, option) {
  const fetchRes = await fetchJson(`/users/me/setting/GENERAL`, 'POST', {
    ...option,
    body: JSON.stringify(body)
  });
  return fetchRes
}

export async function settingPhoneNumber(body, option) {
  const fetchRes = await fetchJson(`/users/me/change/phone`, 'POST', {
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
export async function cardRegisted(body, option) {
  const fetchRes = await fetchJson(`/users/me/cards`, 'POST', {
    ...option,
    body: JSON.stringify(body)
  });
  return fetchRes
}
export async function cardSetting(body, option) {
  const fetchRes = await fetchJson(`/users/me/cards/setting`, 'PATCH', {
    ...option,
    body: JSON.stringify(body)
  });
  return fetchRes
}
export async function getCardList() {
  const fetchRes = await fetchJson(`/users/me/cards`, 'GET');
  return fetchRes
}

export async function snsDisconnect(type) {
  const fetchRes = await fetchJson(`/users/me/disconnecting/${type}`, 'DELETE');
  return fetchRes
}

export async function alarmSetting(body, option) {
  const fetchRes = await fetchJson(`/users/me/setting`, 'POST', {
    ...option,
    body: JSON.stringify(body)
  });
  return fetchRes
}

export async function alarmLookup() {
  const fetchRes = await fetchJson(`/users/me/setting`, 'GET');
  return fetchRes
}

