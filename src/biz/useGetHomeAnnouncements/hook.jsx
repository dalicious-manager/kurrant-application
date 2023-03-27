import {useAtom} from 'jotai';
import {useState} from 'react';
import * as Fetch from './Fetch';
import {AnnouncementsAtom} from './store';

const useGetAnnouncements = () => {
  const [announcements, setAnnouncements] = useAtom(AnnouncementsAtom);

  const [announcementModalVisible, setAnnouncementModalVisible] = useState({});

  const getAnnouncements = async id => {
    try {
      const res = await Fetch.getAnnouncements(id);

      setAnnouncements([...res.data]);

      // 가져온 공지사항 각각을 state에 등록할 수 있도록 만듬

      let modalListVisible = {};

      for (let i = 0; i < res.data.length; i++) {
        modalListVisible[res.data[i].id] = true;
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
