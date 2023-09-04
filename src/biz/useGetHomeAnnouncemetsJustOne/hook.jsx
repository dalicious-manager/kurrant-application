import {useAtom} from 'jotai';
import {useEffect, useState} from 'react';

import * as Fetch from './Fetch';
import {toStringByFormatting} from './logic';
import {OneAnnouncementsAtom} from './store';
import {getStorage} from '../../utils/asyncStorage';
import {isTimeDifferenceLarger} from '../../utils/dateFormatter';

const useGetOneAnnouncements = () => {
  const [oneAnnouncement, setOneAnnouncement] = useAtom(OneAnnouncementsAtom);

  // 모달 보이게하기 state
  const [isOneAnnouncementModalVisible, setIsOneAnnouncementModalVisible] =
    useState(false);

  const getOneAnnouncement = async () => {
    try {
      const res = await Fetch.getAnnouncements();

      const sampleArray = [
        {
          id: 3,
          created: '2023-03-21',
          updated: '2023-03-21',
          title: '식사 가격 변경 관련 공지',
          content:
            '안녕하세요. <br><br>\n\n커런트 서비스를 운영하고 있는 달리셔스입니다.<br><br>\n\n\n2023-03-27 월요일부터 시행되는 식사 가격 관련 변경사항을 공지드립니다.<br><br>\n변경되는 방식은 아래와 같습니다.<br>\n<br>\n1)기존<br>\n식사 가격을 10원 단위로 반올림<br><br>\n\n2)변경후<br>\n\n식사 가격을 100원 단위로 반올림<br><br>\n\n\n식사 가격 변동 범위는 최대 50원 내외일 것으로 예상됩니다.<br><br>\n\n\n이에 다음주 식단가격의 경우, 이번주는 10원 단위 반올림으로 결제가 되고, 다음주 부터는 100원 단위로 결제가 이루어집니다.<br><br>\n\n\n고객님들께 불편함을 드린 점에 사과드리며, 더욱 안정적인 서비스 제공을 위해 노력하겠습니다.<br><br>\n\n\n감사합니다.<br><br>\n\n\n커런트 드림 ',
          status: 1,
        },
      ];

      // 데이터가 없거나 이상하면 아예 함수종료하기
      if (!Array.isArray(res.data) || res.data.length <= 0) {
        return;
      }

      const dataFromDb =
        Array.isArray(res.data) && res.data.length > 0 && res.data;

      // oneAnnouncements에 하나만 넣기

      // 7일이 넘지 않았으면 넣어주고 넘었으면 넣어주지 말기
      const announcementsClickedOneDate = await getStorage(
        'announcementsClickedOneDate',
      );

      const timeObject = JSON.parse(announcementsClickedOneDate);

      if (timeObject) {
        if (
          isTimeDifferenceLarger(
            new Date(Object.values(timeObject)[0]),
            new Date(Date.now()),
            7,
          )
        ) {
          // 데이터 새로 넣으면 됨

          setOneAnnouncement(res.data);
          setIsOneAnnouncementModalVisible(true);
        } else {
          // undefine d넣어주면 됨

          setOneAnnouncement(undefined);
          setIsOneAnnouncementModalVisible(false);
        }
      } else {
        setOneAnnouncement(res.data);
        setIsOneAnnouncementModalVisible(true);
      }

      //
    } catch (err) {
      throw err;
    }
  };

  return {
    getOneAnnouncement,
    oneAnnouncement,
    isOneAnnouncementModalVisible,
    setIsOneAnnouncementModalVisible,
  };
};

export default useGetOneAnnouncements;
