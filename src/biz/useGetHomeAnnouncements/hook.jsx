import {useAtom} from 'jotai';
import {useState} from 'react';
import {getStorage} from '../../utils/asyncStorage';
import {isTimeDifferenceLarger} from '../../utils/dateFormatter';
import * as Fetch from './Fetch';
import {AnnouncementsAtom} from './store';

const useGetAnnouncements = () => {
  const [announcements, setAnnouncements] = useAtom(AnnouncementsAtom);

  const [announcementModalVisible, setAnnouncementModalVisible] = useState({});

  const getAnnouncements = async id => {
    try {
      // 서버에서 데이터 가져오기

      console.log('일단 get불러옴 1');

      const res = await Fetch.getAnnouncements(id);

      // 로컬스토리지 클릭여부확인하기

      const getClickedDate = await getStorage('announcementsClickedDates');

      // const clickedDate = getClickedDate && JSON.parse(getClickedDate);
      const clickedDate = {
        3: 1678892400000, // 3월 16일
        // 3: 1679756400000, // 3월 26일
      };

      const yes = {};

      ////////// localStorage에 없으면 그대로 쓴다

      if (!clickedDate) {
        console.log('지금 로컬 스토리지에 아무 값도 없음');
      }

      res.data.forEach(k => {
        // 받아온 데이터들 가운데

        // 이미 클릭한게 있다면 걸러내고

        if (Object.keys(clickedDate).includes(k.id.toString())) {
          // 날짜 확인
          Object.entries(clickedDate).forEach(b => {
            // b 를 밀리세컨드 값으로 받아오자
            if (
              isTimeDifferenceLarger(new Date(b[1]), new Date(Date.now()), 7)
            ) {
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

      console.log('2 예스~~');

      console.log(yes);

      // 필요한것만 리스트에 넣기

      let yes2 = [];

      [...res.data].forEach(v => {
        // 일단 yes 에 존재하고
        if (Object.keys(yes).includes(v.id.toString())) {
          // undefined 인 것만 배열에 넣는다
          if (!yes[v.id.toString()]) {
            console.log('여기에요 여기!');
            yes2.push(v);
          }
        }
      });

      console.log('3 예스 3333');
      console.log(yes2);

      setAnnouncements([...yes2]);

      setAnnouncementModalVisible(yes);

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
