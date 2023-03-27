import {useAtom} from 'jotai';
import {useState} from 'react';
import {getStorage} from '../../utils/asyncStorage';
import * as Fetch from './Fetch';
import {AnnouncementsAtom} from './store';

const useGetAnnouncements = () => {
  const [announcements, setAnnouncements] = useAtom(AnnouncementsAtom);

  const [announcementModalVisible, setAnnouncementModalVisible] = useState({});

  const getAnnouncements = async id => {
    try {
      // 서버에서 데이터 가져오기

      const res = await Fetch.getAnnouncements(id);

      // 로컬스토리지 클릭여부확인하기

      const getClickedDate = await getStorage('announcementsClickedDates');

      const clickedDate = JSON.parse(getClickedDate);

      const yes = {};

      res.data.forEach(k => {
        // 받아온 데이터들 가운데

        // 이미 클릭한게 있다면 걸러내고

        if (Object.keys(clickedDate).includes(k.id)) {
          // 날짜 확인
          Object.entries(clickedDate).forEach(b => {
            if (b[1] - '현재날짜' > 7) {
              // 이 값 집어넣기
              yes[k.id] = undefined;
            } else {
              yes[k.id] = b[1];
            }
          });
        } else {
          yes[k.id] = undefined;
        }

        // 남은거 state에 집어넣음
      });

      console.log(yes);

      // 필요한것만 리스트에 넣기

      // setAnnouncements([...res.data]);

      let modalListVisible = {};

      for (let i = 0; i < res.data.length; i++) {
        modalListVisible[res.data[i].id] = undefined;
      }
      console.log('모달 리스트 보이게하기 ');

      console.log(modalListVisible);

      setAnnouncementModalVisible(modalListVisible);

      return res;
    } catch (err) {
      throw err;
    }
  };

  return {
    getAnnouncements,
    announcements,
    announcementModalVisible,
    setAnnouncementModalVisible,
  };
};

export default useGetAnnouncements;
