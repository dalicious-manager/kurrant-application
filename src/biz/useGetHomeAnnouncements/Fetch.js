import {fetchJson} from '../../utils/fetch';

// 프라이빗 스팟 신청내역 조회
export async function getAnnouncements(id, spotId) {
  const fetchRes = await fetchJson(
    spotId
      ? `/boards/notices?status=${id}?spotId=${spotId}`
      : `/boards/notices?status=${id}`,
    'GET',
  );

  return fetchRes;
}
