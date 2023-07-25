import EventSource from 'react-native-sse';

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
      console.log('인스턴스 만든 횟수 ' + instanceCount);
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
        // withCredentials: true,
        pollingInterval: 1000 * 60 * 15,
        // retry: 3000,
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
        console.log('EventStream 연결 되었답니다');
        console.log(e.data);
        // sseType12345 전부 초기화
        // setSseType1({});
        // setSseType2({});
        // setSseType3({});
        // setSseType4({});
        // setSseType5({});
      } else {
        const messageType = JSON.parse(e.data).type;
        switch (messageType) {
          case 1:
            // type: 1 전체공지
            console.log('type: 1 전체공지 Sse 확인');
            console.log({...JSON.parse(e.data)});

            this.callbackForAtoms[0]({...JSON.parse(e.data)});

            break;
          case 2:
            // type: 2 스팟공지
            console.log('type: 2 스팟공지 Sse 확인');
            console.log({...JSON.parse(e.data)});
            this.callbackForAtoms[1]({...JSON.parse(e.data)});
            break;
          case 3:
            // type: 3 구매후기
            // 발동조건: 새로운 리뷰작성할 상품이 올라왔을떄
            console.log('type: 3 구매후기 Sse 확인');
            console.log({...JSON.parse(e.data)});
            this.callbackForAtoms[2]({...JSON.parse(e.data)});
            break;
          case 4:
            // type: 4 마감시간
            console.log('type: 4 마감시간 Sse 확인');
            console.log({...JSON.parse(e.data)});
            this.callbackForAtoms[3]({...JSON.parse(e.data)});

            break;
          case 5:
            // type: 5 다음주 식사 구매하셨나요?
            console.log('type: 5 다음주 식사 구매하셨나요? Sse 확인');
            console.log({...JSON.parse(e.data)});
            this.callbackForAtoms[4]({...JSON.parse(e.data)});

            break;
          case 6:
            // type: 6 푸시 알림 관련
            // 발동조건: 푸시알림을 받으면 뜸
            console.log('type: 6 Sse 확인');
            console.log({...JSON.parse(e.data)});
            this.callbackForAtoms[5]({...JSON.parse(e.data)});

            break;
          case 7:
            // type: 7 그룹

            console.log('type: 6 Sse 확인');
            console.log({...JSON.parse(e.data)});
            this.callbackForAtoms[6]({...JSON.parse(e.data)});

            break;
          case 8:
            // type: 8 댓글

            console.log('type: 6 Sse 확인');
            console.log({...JSON.parse(e.data)});
            this.callbackForAtoms[7]({...JSON.parse(e.data)});

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
    console.log('error occured closing connection');
    console.log(e);
  };

  onClose = e => {
    console.log('sse를 닫습니다!');
    this.onDisconnect();
  };

  onDisconnect = () => {
    console.log('onDisconnect! closing connection');
    this.eventSource.removeAllListeners();
    this.eventSource.close();
  };
}

export default SseService;
