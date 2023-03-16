import Config from 'react-native-config';

import RNEventSource from 'react-native-event-source';

class SseService {
  token;
  baseUrl;

  constructor(baseUrl, token) {
    this.baseUrl = baseUrl;
    this.token = token;
  }

  eventSource = new RNEventSource(
    `${this.baseUrl}/notification/subscribe`,

    this.token && {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      withCredentials: true,
      retry: 3000,
    },
  );

  onMessage = callback => {
    this.eventSource.addEventListener('message', e => {
      callback(e.data);
    });
  };

  // 일단 만들었는데 아마 잘 안될듯

  onOpen = () => {
    this.eventSource.onopen = e => {
      console.log(e);
      console.log(' sse onOpen');
    };
  };

  onDisconnect = () => {
    this.eventSource.onerror = () => {
      console.log('server closed connection');
      //  에러가 뜨면 프론트에서 닫아준다
      this.eventSource.removeAllListeners();
      this.eventSource.close();
    };
  };
}
export default SseService;
