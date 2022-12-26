
import { fetchJson } from '../../utils/fetch';

export async function getMembershipProduct(option) {
  const fetchRes = await fetchJson(`/public/membership`, 'GET', {
    ...option,
  });

  return fetchRes;
}


export async function membershipJoin(type, option) {
  const fetchRes = await fetchJson(`/users/membership/YEAR`, 'POST', {
    ...option,
  });

  return fetchRes;
}


export async function membershipTerminate(option) {
  const fetchRes = await fetchJson(`/users/membership/unsubscribing`, 'POST', {
    ...option,
  });

  return fetchRes;
}

export async function getMembershipHistory(option) {
  const fetchRes = await fetchJson(`/users/membership`, 'GET', {
    ...option,
  });

  return fetchRes;
}
