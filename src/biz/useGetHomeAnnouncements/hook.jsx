import {useAtom} from 'jotai';
import {useEffect, useState} from 'react';

import * as Fetch from './Fetch';
import {AnnouncementsAtom} from './store';
import {getStorage} from '../../utils/asyncStorage';
import {isTimeDifferenceLarger} from '../../utils/dateFormatter';

const useGetAnnouncements = () => {
  const [announcements, setAnnouncements] = useAtom(AnnouncementsAtom);

  const [announcementModalVisible, setAnnouncementModalVisible] = useState({});

  const getAnnouncements = async (id, spotId) => {
    try {
      const res = await Fetch.getAnnouncements(id, spotId);

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
        {
          id: 4,
          created: '2023-03-22',
          updated: '2023-03-22',
          title: '식사 222222가격 변경 관련 공지',
          content:
            '안녕하세요22222222222. <br><br>\n\n커런트 서비스를 운영하고 있는 달리셔스입니다.<br><br>\n\n\n2023-03-27 월요일부터 시행되는 식사 가격 관련 변경사항을 공지드립니다.<br><br>\n변경되는 방식은 아래와 같습니다.<br>\n<br>\n1)기존<br>\n식사 가격을 10원 단위로 반올림<br><br>\n\n2)변경후<br>\n\n식사 가격을 100원 단위로 반올림<br><br>\n\n\n식사 가격 변동 범위는 최대 50원 내외일 것으로 예상됩니다.<br><br>\n\n\n이에 다음주 식단가격의 경우, 이번주는 10원 단위 반올림으로 결제가 되고, 다음주 부터는 100원 단위로 결제가 이루어집니다.<br><br>\n\n\n고객님들께 불편함을 드린 점에 사과드리며, 더욱 안정적인 서비스 제공을 위해 노력하겠습니다.<br><br>\n\n\n감사합니다.<br><br>\n\n\n커런트 드림 ',
          status: 1,
        },
        {
          id: 5,
          created: '2023-03-23',
          updated: '2023-03-23',
          title: '식사 3333가격 변경 관련 공지',
          content:
            '안녕하세요33333333333. <br><br>\n\n커런트 서비스를 운영하고 있는 달리셔스입니다.<br><br>\n\n\n2023-03-27 월요일부터 시행되는 식사 가격 관련 변경사항을 공지드립니다.<br><br>\n변경되는 방식은 아래와 같습니다.<br>\n<br>\n1)기존<br>\n식사 가격을 10원 단위로 반올림<br><br>\n\n2)변경후<br>\n\n식사 가격을 100원 단위로 반올림<br><br>\n\n\n식사 가격 변동 범위는 최대 50원 내외일 것으로 예상됩니다.<br><br>\n\n\n이에 다음주 식단가격의 경우, 이번주는 10원 단위 반올림으로 결제가 되고, 다음주 부터는 100원 단위로 결제가 이루어집니다.<br><br>\n\n\n고객님들께 불편함을 드린 점에 사과드리며, 더욱 안정적인 서비스 제공을 위해 노력하겠습니다.<br><br>\n\n\n감사합니다.<br><br>\n\n\n커런트 드림 ',
          status: 1,
        },
      ];

      const dataFromDb = res.data;

      const getClickedDate = await getStorage('announcementsClickedDates');

      const clickedDate = getClickedDate && JSON.parse(getClickedDate);

      // 테스트용
      // const clickedDate = {
      //   3: 1678892400000, // 3월 16일
      //   // 3: 1679756400000, // 3월 26일
      // };

      // localStorage에 없으면 그대로 쓴다

      if (!clickedDate) {
        setAnnouncements([...dataFromDb]);

        // 처음 값 넣기 여기가 객체 형태로 들어가야됨

        const yes = {};
        [...dataFromDb]
          .map(v => {
            return v.id.toString();
          })
          .forEach(v => {
            yes[v] = undefined;
          });

        // 없을때 값 예시 : {"4": undefined}

        setAnnouncementModalVisible(yes);
        setAnnouncements([...dataFromDb]);
        return;
      } else {
        const yes = {};

        dataFromDb.forEach(k => {
          if (Object.keys(clickedDate).includes(k.id.toString())) {
            // clickedDate안에  db에서 온 id가 있으면

            Object.entries(clickedDate).forEach(b => {
              if (
                isTimeDifferenceLarger(new Date(b[1]), new Date(Date.now()), 7)
              ) {
                // 확인한지 7일이  지나면
                yes[k.id] = undefined;
              } else {
                // 힉ㅇ;ㄴ힞; 7ㅇ;ㄹㅇ; 인지나면
                yes[k.id] = b[1];
              }
            });
          } else {
            // 없다? 새로 넣어준다
            yes[k.id] = undefined;
          }
        });

        let yes2 = [];

        [...dataFromDb].forEach(v => {
          if (Object.keys(yes).includes(v.id.toString())) {
            if (!yes[v.id.toString()]) {
              yes2.push(v);
            }
          }
        });

        setAnnouncementModalVisible(yes);
        setAnnouncements([...yes2]);
      }
      //
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    console.log('일단 로컬스토리지에는 없어 리스판스 여기여~~~~');
    console.log(announcementModalVisible);
  }, [announcementModalVisible]);

  return {
    getAnnouncements,
    announcements,
    announcementModalVisible,
    setAnnouncementModalVisible,
  };
};

export default useGetAnnouncements;
