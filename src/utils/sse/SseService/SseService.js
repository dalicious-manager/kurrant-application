import EventSource from 'react-native-sse';
import Base64 from '../sseLogics/base64Converter';

let SseServiceOnlyOneInstance;

let instanceCount = 0;

class SseService {
  token;
  baseUrl;
  eventSource;
  callbackForAtoms;
  constructor(baseUrl, token, callbackForAtoms) {
    if (SseServiceOnlyOneInstance) {
      return SseServiceOnlyOneInstance;
    } else {
      instanceCount += 1;
      console.log('SseService 인스턴스 만든 횟수 ' + instanceCount);
    }

    this.baseUrl = baseUrl;
    this.token = token;
    this.callbackForAtoms = callbackForAtoms;

    this.eventSource = new EventSource(
      `${this.baseUrl}/notification/subscribe`,

      this.token && {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },

        pollingInterval: 1000 * 60 * 15,
      },
    );

    // 여기에다가 eventSource 받는 로직 작성

    this.eventSource.addEventListener('open', this.onOpen);
    this.eventSource.addEventListener('message', this.onMessage);
    this.eventSource.addEventListener('error', this.onError);
    this.eventSource.addEventListener('close', this.onClose);

    SseServiceOnlyOneInstance = this;
  }

  onMessage = e => {
    if (typeof e.data === 'string') {
      if (e.data.includes('EventStream')) {
        console.log('-----');
        console.log('Sse 연결을 성공하였습니다');
        console.log(e.data);
      } else {
        const receiveMessage = JSON.parse(
          Base64.decode(JSON.parse(e.data).body),
        )[1];

        const messageType = receiveMessage.type;

        switch (messageType) {
          case 1:
            // type: 1 전체공지
            console.log('type: 1 전체공지 Sse 확인');
            console.log(receiveMessage);

            this.callbackForAtoms[0]({...receiveMessage});

            break;
          case 2:
            // type: 2 스팟공지
            console.log('type: 2 스팟공지 Sse 확인');
            console.log(receiveMessage);
            this.callbackForAtoms[1]({...receiveMessage});
            break;
          case 3:
            // type: 3 구매후기
            // 발동조건: 새로운 리뷰작성할 상품이 올라왔을떄
            console.log('type: 3 구매후기 Sse 확인');
            console.log(receiveMessage);
            this.callbackForAtoms[2]({...receiveMessage});
            break;
          case 4:
            // type: 4 마감시간
            console.log('type: 4 마감시간 Sse 확인');
            console.log(receiveMessage);
            this.callbackForAtoms[3]({...receiveMessage});

            break;
          case 5:
            // type: 5 다음주 식사 구매하셨나요?
            console.log('type: 5 다음주 식사 구매하셨나요? Sse 확인');
            console.log(receiveMessage);
            this.callbackForAtoms[4]({...receiveMessage});

            break;
          case 6:
            // type: 6 푸시 알림 관련
            // 발동조건: 푸시알림을 받으면 뜸
            console.log('type: 6 Sse 확인');
            console.log(receiveMessage);
            this.callbackForAtoms[5]({...receiveMessage});

            break;
          case 7:
            // type: 7 그룹

            console.log('type: 7 Sse 확인');
            console.log(receiveMessage);
            this.callbackForAtoms[6]({...receiveMessage});

            break;
          case 8:
            // type: 8 댓글
            // 발동 조건:

            console.log('type: 8 Sse 확인');
            console.log(receiveMessage);
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
    console.log('sse OnOpen됬어요');
    console.log(e.data);
  };

  onError = e => {
    console.log('sse 에러가 뜹니다. error occured closing connection');
    console.log(e);
  };

  onClose = e => {
    console.log('sse를 닫습니다!');
    this.onDisconnect();
  };

  onDisconnect = () => {
    console.log(
      'Sse를 Disconnect 하겠습니다. onDisconnect! closing connection',
    );
    this.eventSource.removeAllListeners();
    this.eventSource.close();
  };
}

export default SseService;
