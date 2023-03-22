import {fetchJson} from '../../utils/fetch';

export async function getMembershipProduct(option) {
  const fetchRes = await fetchJson(`/public/membership`, 'GET', {
    ...option,
  });

  return fetchRes;
}

export async function membershipJoin(body, option) {
  const fetchRes = await fetchJson(`/users/membership`, 'POST', {
    ...option,
    body: JSON.stringify(body),
  });

  return fetchRes;
}
export async function membershipJoinNice(body, option) {
  const fetchRes = await fetchJson(`/users/membership/nice`, 'POST', {
    ...option,
    body: JSON.stringify(body),
  });

  return fetchRes;
}

export async function membershipTerminate(option) {
  const fetchRes = await fetchJson(`/users/membership/unsubscribing`, 'GET', {
    ...option,
  });

  return fetchRes;
}
export async function membershipTerminateNice(option) {
  const fetchRes = await fetchJson(
    `/users/membership/unsubscribing/nice`,
    'GET',
    {
      ...option,
    },
  );

  return fetchRes;
}

export async function getMembershipHistory(option) {
  const fetchRes = await fetchJson(`/users/membership`, 'GET', {
    ...option,
  });

  return fetchRes;
}
export async function getMembershipType(type, option) {
  const fetchRes = await fetchJson(`/users/membership/${type}`, 'GET', {
    ...option,
  });

  return fetchRes;
}

export async function getMembershipInfo() {
  const fetchRes = await fetchJson(`/users/membership/benefits`, 'GET');

  return fetchRes;
}
