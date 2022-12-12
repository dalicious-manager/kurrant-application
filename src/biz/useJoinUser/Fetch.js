import { fetchJson } from '../../utils/fetch';


export async function joinUser(body, option) {
  const fetchRes = await fetchJson(`/auth/join`, 'POST', {
    ...option,
    body: JSON.stringify(body),
  });
  return fetchRes;
}

