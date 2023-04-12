import {fetchJson} from '../../utils/fetch';

export async function userMe() {
  const fetchRes = await fetchJson(`/users/me`, 'GET');
  return fetchRes;
}

export async function userMePersonal() {
  const fetchRes = await fetchJson(`/users/me/personal`, 'GET');
  return fetchRes;
}

export async function changePassword(body, option) {
  const fetchRes = await fetchJson(`/users/me/change/password`, 'POST', {
    ...option,
    body: JSON.stringify(body),
  });
  return fetchRes;
}

export async function settingEmail(body, option) {
  const fetchRes = await fetchJson(`/users/me/setting/GENERAL`, 'POST', {
    ...option,
    body: JSON.stringify(body),
  });
  return fetchRes;
}

export async function settingPhoneNumber(body, option) {
  const fetchRes = await fetchJson(`/users/me/change/phone`, 'POST', {
    ...option,
    body: JSON.stringify(body),
  });
  return fetchRes;
}

export async function snsConnect(body, type, option) {
  if (type === 'APPLE') {
    const fetchRes = await fetchJson(`/users/me/connectingApple/`, 'POST', {
      ...option,
      body: JSON.stringify(body),
    });
    return fetchRes;
  }
  const fetchRes = await fetchJson(`/users/me/connecting/${type}`, 'POST', {
    ...option,
    body: JSON.stringify(body),
  });
  return fetchRes;
}
export async function cardRegisted(body, option) {
  const fetchRes = await fetchJson(`/users/me/cards`, 'POST', {
    ...option,
    body: JSON.stringify(body),
  });
  return fetchRes;
}
export async function cardRegistedNice(body, type, option) {
  const fetchRes = await fetchJson(`/users/me/cards/types/${type}`, 'POST', {
    ...option,
    body: JSON.stringify(body),
  });
  return fetchRes;
}
export async function cardSetting(body, option) {
  const fetchRes = await fetchJson(`/users/me/cards/setting`, 'PATCH', {
    ...option,
    body: JSON.stringify(body),
  });
  return fetchRes;
}
export async function snsDisconnect(type) {
  const fetchRes = await fetchJson(`/users/me/disconnecting/${type}`, 'DELETE');
  return fetchRes;
}
export async function getCardList() {
  const fetchRes = await fetchJson(`/users/me/cards`, 'GET');
  return fetchRes;
}

export async function cardDelete(body, option) {
  const fetchRes = await fetchJson(`/users/me/cards`, 'PATCH', {
    ...option,
    body: JSON.stringify(body),
  });
  return fetchRes;
}

export async function alarmSetting(body, option) {
  const fetchRes = await fetchJson(`/users/me/setting`, 'POST', {
    ...option,
    body: JSON.stringify(body),
  });
  return fetchRes;
}

export async function alarmLookup() {
  const fetchRes = await fetchJson(`/users/me/setting`, 'GET');
  return fetchRes;
}
export async function payCheckPassword() {
  const fetchRes = await fetchJson(`/users/me/payment/password`, 'GET');
  return fetchRes;
}
export async function payCheckEmail() {
  const fetchRes = await fetchJson(`/users/me/check/hideEmail`, 'GET');
  return fetchRes;
}
export async function cardRegistedNiceFirst(body, option) {
  const fetchRes = await fetchJson(
    `/users/me/orders/nice/create/billing/first`,
    'POST',
    {
      ...option,
      body: JSON.stringify(body),
    },
  );
  return fetchRes;
}
export async function updatePayCheckPassword(body, option) {
  const fetchRes = await fetchJson(
    `/users/me/payment/password/reset`,
    'PATCH',
    {
      ...option,
      body: JSON.stringify(body),
    },
  );
  return fetchRes;
}
export async function submitPasswordCheck(body, option) {
  const fetchRes = await fetchJson(`/users/me/payment/password/check`, 'POST', {
    ...option,
    body: JSON.stringify(body),
  });
  return fetchRes;
}
// export async function payCheckPassword() {
//   const fetchRes = await fetchJson(`/users/me/password`, 'GET');
//   return fetchRes;
// }
