import Config from 'react-native-config';

import EventSource from 'react-native-sse';

let SseServiceOnlyOneInstance;

let instanceCount = 0;

class SseService {
  token;
  baseUrl;
  eventSource;
  constructor(baseUrl, token) {
    if (SseServiceOnlyOneInstance) {
      return SseServiceOnlyOneInstance;
    } else {
      instanceCount += 1;
      console.log('인스턴스 만든 횟수 ' + instanceCount);
    }

    this.baseUrl = baseUrl;
    this.token = token;

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

    SseServiceOnlyOneInstance = this;
  }

  onMessage = callback => {
    this.eventSource.addEventListener('message', e => {
      callback(e.data);
    });
  };

  // 일단 만들었는데 아마 잘 안될듯

  onOpen = (callback = () => {}) => {
    // this.eventSource.onopen = e => {
    //   console.log(e);
    //   console.log(' sse onOpen');
    // };
    this.eventSource.addEventListener('open', e => {
      console.log('sse OnOpen됬어요');
      callback(e.data);
    });
  };

  onError = () => {
    this.eventSource.onerror = () => {};

    this.eventSource.addEventListener('error', e => {
      console.log('error occured closing connection');
      console.log(e);
      //  에러가 뜨면 프론트에서 닫아준다
      this.onDisconnect();
    });
  };

  onDisconnect = () => {
    console.log('onDisconnect! closing connection');
    this.eventSource.removeAllListeners();
    this.eventSource.close();
  };
}
export default SseService;
