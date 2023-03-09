import {fetchJson} from '../../utils/fetch';

export async function GetSupportPrice(spotId, selectedDate) {
  const fetchRes = await fetchJson(
    `/dailyfoods?spotId=${spotId}&selectedDate=${selectedDate}`,
    'GET',
  );

  return fetchRes;
}
