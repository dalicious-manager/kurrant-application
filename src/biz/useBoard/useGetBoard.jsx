import {useAtom} from 'jotai';
import {
  noticeAtom,
  alarmAtom,
  spotNoticeAtom,
  isGetNoticeLoadingAtom,
  isGetSpotNoticeLoadingAtom,
  isGetAlarmLoadingAtom,
  isDeleteAlarmLoadingAtom,
} from './store';

import * as Fetch from './Fetch';

const useGetBoard = () => {
  const [notice, setNotice] = useAtom(noticeAtom);
  const [spotNotice, setSpotNotice] = useAtom(spotNoticeAtom);
  const [alarm, setAlarm] = useAtom(alarmAtom);
  const [isGetNoticeLoading, setGetNoticeLoading] = useAtom(
    isGetNoticeLoadingAtom,
  );
  const [isGetAlarmLoading, setGetAlarmLoading] = useAtom(
    isGetAlarmLoadingAtom,
  );
  const [isDeleteAlarmLoading, setDeleteAlarmLoading] = useAtom(
    isDeleteAlarmLoadingAtom,
  );
  const [isGetSpotNoticeLoading, setGetSpotNoticeLoading] = useAtom(
    isGetSpotNoticeLoadingAtom,
  );

  useQuery(['board', 'alarm'], async ({queryKey}) => {
    // const response = await fetchJson(
    //   `/dailyfoods/${dailyFoodId}/review/keyword`,
    //   'GET',
    // );

    // setReviewKeyword(response.data.filter(v => v !== ''));

    const response = await Fetch.getAlarm();
  });

  return {};
};
export default useGetBoard;
