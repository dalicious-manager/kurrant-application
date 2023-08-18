import {fetchJson} from '../../utils/fetch';

// 프라이빗 스팟 신청내역 조회
export async function getAnnouncements() {
  const fetchRes = await fetchJson(`/boards/notices/popup`, 'GET');

  return fetchRes;
}
