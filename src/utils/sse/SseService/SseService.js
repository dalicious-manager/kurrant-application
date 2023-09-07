import EventSource from 'react-native-sse';
import Base64 from '../sseLogics/base64Converter';

let SseServiceOnlyOneInstance;

let instanceCount = 0;

let blankErrorReconnectionCount = 0;

//
let hadDoneBlankErrorReconnectionProtocolAlready = false;

class SseService {
  token;
  baseUrl;
  eventSource;
  callbackForAtoms;
  blankErrorHandler;

  constructor(
    baseUrl,
    token,
    blankErrorHandleObject = {},
    // blankErrorHandler = null,
    callbackForAtoms,
  ) {
    if (SseServiceOnlyOneInstance)
      if (!!blankErrorHandleObject?.blankErrorPermission) {
        SseServiceOnlyOneInstance = null;
      } else {
        return SseServiceOnlyOneInstance;
      }

    instanceCount += 1;
    console.log('SseService 인스턴스 만든 횟수 ' + instanceCount);

    this.baseUrl = baseUrl;
    this.token = token;
    this.callbackForAtoms = callbackForAtoms;

    this.eventSource = new EventSource(
      `${this.baseUrl}/notification/subscribe`,

      this.token && {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },

        // pollingInterval: 서버와의 Sse연결이 끊겼을때 몇초 후에 재연결을 시도할 것인가
        // pollingInterval: 1000 * 60 * 15,
        pollingInterval: 1000 * 1,
      },
    );

    // 여기에다가 eventSource 받는 로직 작성

    this.eventSource.addEventListener('open', this.onOpen);
    this.eventSource.addEventListener('message', this.onMessage);
    this.eventSource.addEventListener('error', this.onError);
    this.eventSource.addEventListener('close', this.onClose);

    // blanc error가 뜰때 대처하기 위한 eventEmitter

    this.blankErrorHandler = blankErrorHandleObject.blankErrorHandler;

    SseServiceOnlyOneInstance = this;
  }

  onMessage = e => {
    if (typeof e.data === 'string') {
      if (e.data.includes('EventStream')) {
        console.log('-----');
        console.log('Sse 연결을 성공하였습니다');
        // console.log(e.data);
      } else {
        const receiveMessage =
          e.data && JSON.parse(Base64.decode(JSON.parse(e.data).body))[1];
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
            // type: 3 구매후기 (완료)
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
            // type: 5 다음주 식사 구매하셨나요? (완료)
            console.log('type: 5 다음주 식사 구매하셨나요? Sse 확인');
            console.log(receiveMessage);
            this.callbackForAtoms[4]({...receiveMessage});
            break;
          case 6:
            // type: 6 푸시 알림 관련 (완료)
            // 발동조건: 푸시알림을 받으면 뜸
            console.log('type: 6 푸시 알림 Sse 확인');
            console.log(receiveMessage);
            this.callbackForAtoms[5]({...receiveMessage});
            break;
          case 7:
            // type: 7 스팟공지 (완료)
            console.log('type: 7 스팟공지 Sse 확인');
            console.log(receiveMessage);
            this.callbackForAtoms[6]({...receiveMessage});
            break;
          case 8:
            // type: 8 사장님 댓글 (완료)
            console.log('type: 8 사장님 댓글 Sse 확인');
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

    // The network connection was lost.

    // "" -> 이 에러가 10번 이상이면 자동으로  sseService를 끄자

    if (!e.message) blankErrorReconnectionCount += 1;

    if (blankErrorReconnectionCount > 5) {
      if (!hadDoneBlankErrorReconnectionProtocolAlready) {
        // 초범이다

        this.onHandleBlankError();
        blankErrorReconnectionCount = 0;
      } else {
        // 두번쨰면 아예 꺼버리기
        this.onClose();
      }
    }
  };

  onClose = e => {
    console.log('Sse를 Close 하겠습니다. closing connection');

    this.eventSource.removeAllEventListeners();
    this.eventSource.close();
  };

  onHandleBlankError = () => {
    hadDoneBlankErrorReconnectionProtocolAlready = true;
    console.log('message가 비어있는 에러입니다 ');

    // token확인

    if (!!this.token) {
      console.log('프론트에서 토큰을 안줘서 뜨는 에러뜨는건 아닐듯');
    } else {
      console.log('프론트에서 토큰을 안줘서 뜨는 에러인것 같아요');
    }

    // 1. 끄기

    this.onClose();

    // 2. 기존 프론트 sse를 지우기

    this.blankErrorHandler.emit('blank-error-handle', {
      es6rules: true,
      mixinsAreLame: true,
    });

    // 3. 재요청

    // 되면 그대로 쓰고 , 또 안되면 끄기
  };
}

export default SseService;
