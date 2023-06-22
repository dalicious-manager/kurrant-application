import {useCallback, useEffect} from 'react';
import SseService2 from '../SseService/SseService2';

const useSse2 = () => {
  const getSseServiceInstance = useCallback(async () => {
    // const tokenYo = await getToken();
    const yoyoyo = new SseService2();

    console.log('setEventSourceMsg2 url확인');
    // console.log(apiHostUrl);

    return yoyoyo;
  }, []);

  useEffect(() => {
    getSseServiceInstance().then(sseServiceInstance => {
      sseServiceInstance.onOpen();
      sseServiceInstance.onMessage(message => {
        // if (typeof message === 'string') {
        //   if (message.includes('EventStream')) {
        //     console.log(1);
        //     console.log('EventStream 연결 되었답니다');
        //   } else {
        //     const messageType = JSON.parse(message).type;
        //     switch (messageType) {
        //       case 1:
        //         // type: 1 전체공지
        //         break;
        //       case 2:
        //         // type: 2 스팟공지
        //         break;
        //       case 3:
        //         // type: 3 구매후기
        //         break;
        //       case 4:
        //         // type: 4 마감시간
        //         break;
        //       case 5:
        //         // type: 5 다음주 식사 구매하셨나요?
        //         console.log('message type 5');
        //         console.log({...JSON.parse(message)});
        //         setSseType5({...JSON.parse(message)});
        //         break;
        //       default:
        //         break;
        //     }
        //   }
        // }
      });
    });
  }, []);

  return {};
};
export default useSse2;
