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
import {useQuery} from 'react-query';

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

  const {isFetching: isGetAlarmFetching, refetch: getAlarmRefetch} = useQuery(
    ['board', 'alarm'],
    async ({queryKey}) => {
      // const response = await fetchJson(
      //   `/dailyfoods/${dailyFoodId}/review/keyword`,
      //   'GET',
      // );

      // setReviewKeyword(response.data.filter(v => v !== ''));

      const response = await Fetch.getAlarm();
      setAlarm(response.data);
    },
  );

  return {
    getAlarmRefetch,

    readableAtom: {
      notice,
      spotNotice,
      isGetNoticeLoading,
      isGetSpotNoticeLoading,
      alarm,
      isDeleteAlarmLoading,
      isGetAlarmLoading,
    },
  };
};
export default useGetBoard;
