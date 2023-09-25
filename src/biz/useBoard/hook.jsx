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
      if (type === 1 || type === 2) setGetNoticeLoading(true);
      if (type === 3) setGetSpotNoticeLoading(true);

      const res = await Fetch.getNotice(type);
      if (type === 1 || type === 2) setNotice(res.data);
      if (type === 3) setSpotNotice(res.data);
    } catch (err) {
      throw err;
    } finally {
      if (type === 1 || type === 2) setGetNoticeLoading(false);
      if (type === 3) setGetSpotNoticeLoading(false);
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

  const getMypageNotice = async () => {
    try {
      setGetNoticeLoading(true);
      const fetchRes1 = await Fetch.getNotice(1);
      const fetchRes2 = await Fetch.getNotice(2);

      setGetNoticeLoading(false);
      // console.log('공지 여기여');
      // console.log([...fetchRes1.data, ...fetchRes2.data]);

      setNotice([...fetchRes1.data, ...fetchRes2.data]);
    } catch (err) {
      throw err;
    }
  };
  const getSpotNotice = async () => {
    try {
      setGetSpotNoticeLoading(true);
      const fetchRes = await Fetch.getNotice(3);

      setGetSpotNoticeLoading(false);

      setSpotNotice([...fetchRes.data]);
    } catch (err) {
      throw err;
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

  const readAlarm = async (data, isRerenderNeeded = false) => {
    try {
      const response = await Fetch.readAlarm(data);

      if (response.statusCode === 200) {
        if (isRerenderNeeded) {
          getAlarm();
          console.log(`id: ${data[0]} 알림 읽었습니다 `);
        } else {
          console.log('알림을 모두 읽었습니다 ');
        }
      }
    } catch (err) {
      throw err;
    } finally {
    }
  };

  return {
    getNotice,
    getMypageNotice,
    getSpotNotice,
    getAlarm,
    deleteAlarm,
    readAlarm,
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
