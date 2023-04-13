import {useAtom} from 'jotai';

import * as Fetch from './Fetch';
import {
  noticeAtom,
  alarmAtom,
  spotNoticeAtom,
  isGetNoticeLoadingAtom,
  isGetSpotNoticeLoadingAtom,
  isGetAlarmLoadingAtom,
  isDeleteAlarmLoadingAtom,
} from './store';

const useBoard = () => {
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

  const getNotice = async type => {
    try {
      if (type === 0) setGetNoticeLoading(true);
      if (type === 1) setGetSpotNoticeLoading(true);

      console.log('타입확인하기');
      console.log(type);

      const res = await Fetch.getNotice(type);
      if (type === 0) setNotice(res.data);
      if (type === 1) setSpotNotice(res.data);
    } catch (err) {
      throw err;
    } finally {
      if (type === 0) setGetNoticeLoading(false);
      if (type === 1) setGetSpotNoticeLoading(false);
    }
  };
  const getAlarm = async () => {
    try {
      setGetAlarmLoading(true);
      const res = await Fetch.getAlarm();
      setAlarm(res.data);
    } catch (err) {
      throw err;
    } finally {
      setGetAlarmLoading(false);
    }
  };
  const deleteAlarm = async () => {
    try {
      setDeleteAlarmLoading(true);
      const res = await Fetch.deleteAlarm();
      setAlarm([]);
    } catch (err) {
      throw err;
    } finally {
      setDeleteAlarmLoading(false);
    }
  };
  return {
    getNotice,
    getAlarm,
    deleteAlarm,
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

export default useBoard;
