import EventSource from 'react-native-sse';

import {Fetch} from '../../../biz/useAuth';
import Base64 from '../sseLogics/base64Converter';

let SseServiceOnlyOneInstance;

let instanceCount = 0;

class SseService {
  baseUrl;
  token;

  sseResetHandler;
  eventSource;

  callbackForAtoms;

  constructor(
    baseUrl,
    token,

    sseResetHandler,
    resetSse,
    callbackForAtoms,
  ) {
    if (SseServiceOnlyOneInstance)
      if (resetSse) {
        SseServiceOnlyOneInstance = null;
      } else {
        return SseServiceOnlyOneInstance;
      }

    instanceCount += 1;
    //console.log('SseService 인스턴스 만든 횟수 ' + instanceCount);

    this.baseUrl = baseUrl;
    this.token = token;

    this.sseResetHandler = sseResetHandler;
    this.callbackForAtoms = callbackForAtoms;

    this.sseResetHandler = sseResetHandler;

    this.eventSource =
      this.token &&
      new EventSource(
        // `${this.baseUrl}/notification/subscribe`,
        `${this.baseUrl}/sse/subscribe`,

        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },

          // pollingInterval: 서버와의 Sse연결이 끊겼을때 몇초 후에 재연결을 시도할 것인가
          // pollingInterval: 1000 * 60 * 30,
          pollingInterval: 1000 * 2,
        },
      );

    this.eventSource?.addEventListener('open', this.onOpen);
    this.eventSource?.addEventListener('message', this.onMessage);
    this.eventSource?.addEventListener('error', this.onError);
    this.eventSource?.addEventListener('close', this.onClose);

    SseServiceOnlyOneInstance = this;
  }

  onMessage = e => {
    if (typeof e.data === 'string') {
      if (e.data.includes('EventStream')) {
        //console.log('Sse 연결을 성공하였습니다');
      } else {
        const receiveMessage =
          e.data && JSON.parse(Base64.decode(JSON.parse(e.data).body))[1];
        const messageType = receiveMessage.type;
        switch (messageType) {
          case 1:
            // type: 1 전체공지
            //console.log('type: 1 전체공지 Sse 확인');
            //console.log(receiveMessage);
            this.callbackForAtoms[0]({...receiveMessage});
            break;
          case 2:
            // type: 2 스팟공지
            //console.log('type: 2 스팟공지 Sse 확인');
            //console.log(receiveMessage);
            this.callbackForAtoms[1]({...receiveMessage});
            break;
          case 3:
            // type: 3 구매후기 (완료)
            // 발동조건: 새로운 리뷰작성할 상품이 올라왔을떄
            //console.log('type: 3 구매후기 Sse 확인');
            //console.log(receiveMessage);
            this.callbackForAtoms[2]({...receiveMessage});
            break;
          case 4:
            // type: 4 마감시간
            //console.log('type: 4 마감시간 Sse 확인');
            //console.log(receiveMessage);
            this.callbackForAtoms[3]({...receiveMessage});
            break;
          case 5:
            // type: 5 다음주 식사 구매하셨나요? (완료)
            //console.log('type: 5 다음주 식사 구매하셨나요? Sse 확인');
            //console.log(receiveMessage);
            this.callbackForAtoms[4]({...receiveMessage});
            break;
          case 6:
            // type: 6 푸시 알림 관련 (완료)
            // 발동조건: 푸시알림을 받으면 뜸
            //console.log('type: 6 푸시 알림 Sse 확인');
            //console.log(receiveMessage);
            this.callbackForAtoms[5]({...receiveMessage});
            break;
          case 7:
            // type: 7 스팟공지 (완료)
            //console.log('type: 7 스팟공지 Sse 확인');
            //console.log(receiveMessage);
            this.callbackForAtoms[6]({...receiveMessage});
            break;
          case 8:
            // type: 8 사장님 댓글 (완료)
            //console.log('type: 8 사장님 댓글 Sse 확인');
            //console.log(receiveMessage);
            this.callbackForAtoms[7]({...receiveMessage});
            break;
          default:
            break;
        }
      }
    }
  };

  // 일단 만들었는데 아마 잘 안될듯

  onOpen = e => {
    //console.log('sse OnOpen됬어요');
  };

  onError = e => {
    if (!e.message) {
      // console.log(
      //   'sse 에러가 뜹니다 (message가 빈 에러)' + new Date().toString(),
      // );
      (async () => {
        // console.log('autoLogin해서 토큰을 reissue해보자 ');

        const result = await Fetch.autoLogin();

        // console.log('로컬의 토큰값 확인');
        // console.log(this.token);

        // console.log('받은 토큰 값 확인');
        // console.log(result?.data?.accessToken);

        if (
          !!result?.data?.accessToken &&
          this.token !== result?.data?.accessToken
        ) {
          // console.log('token이 stale합니다 ');
          // console.log(
          //   'token을 reissue하고 새 토큰으로 새 sseInstance를 생성합니다',
          // );
          this.onReset();

          return;
        } else {
          //console.log('token이 최신 토큰입니다 ');
          return;
        }
      })();
    } else {
      //console.log('sse 에러가 뜹니다 ' + new Date().toString());

      this.onReset();
    }

    //console.log(e);
  };

  onClose = e => {
    //console.log('Sse를 Close 하겠습니다. closing connection ' + new Date());

    this.eventSource.removeAllEventListeners();
    this.eventSource.close();
  };

  onReset = () => {
    this.onClose();
    this.sseResetHandler.emit('reset-sse-instance', {
      es6rules: true,
      mixinsAreLame: true,
    });
  };
}

export default SseService;
