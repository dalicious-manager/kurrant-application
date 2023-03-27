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
      const res = await Fetch.getAnnouncements(id);

      const getClickedDate = await getStorage('announcementsClickedDates');

      const clickedDate = getClickedDate && JSON.parse(getClickedDate);

      // 테스트용
      // const clickedDate = {
      //   3: 1678892400000, // 3월 16일
      //   // 3: 1679756400000, // 3월 26일
      // };

      const yes = {};

      // localStorage에 없으면 그대로 쓴다

      if (!clickedDate) {
        setAnnouncements([...res.data]);

        setAnnouncementModalVisible(
          [...res.data].map(v => {
            return v.id.toString();
          }),
        );
      } else {
        console.log(clickedDate);
      }

      res.data.forEach(k => {
        if (Object.keys(clickedDate).includes(k.id.toString())) {
          Object.entries(clickedDate).forEach(b => {
            if (
              isTimeDifferenceLarger(new Date(b[1]), new Date(Date.now()), 7)
            ) {
              yes[k.id] = undefined;
            } else {
              yes[k.id] = b[1];
            }
          });
        } else {
          yes[k.id] = undefined;
        }
      });

      let yes2 = [];

      [...res.data].forEach(v => {
        if (Object.keys(yes).includes(v.id.toString())) {
          if (!yes[v.id.toString()]) {
            console.log('여기에요 여기!');
            yes2.push(v);
          }
        }
      });

      setAnnouncementModalVisible(yes);
      setAnnouncements([...yes2]);
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
