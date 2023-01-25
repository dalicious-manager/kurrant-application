
import { fetchJson } from '../../utils/fetch';

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


export async function membershipTerminate(body, option) {
  const fetchRes = await fetchJson(`/users/membership/unsubscribing`, 'POST', {
    ...option,
    body: JSON.stringify(body)
  });

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
