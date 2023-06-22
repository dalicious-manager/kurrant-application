import EventSource from 'react-native-sse';

class SseService2 {
  constructor() {
    this.eventSource = new EventSource(`http://localhost:3000`, {
      method: 'GET', // Request method. Default: GET
      timeout: 0, // Time after which the connection will expire without any activity: Default: 0 (no timeout)
      headers: {}, // Your request headers. Default: {}
      body: undefined, // Your request body sent on connection: Default: undefined
      debug: false, // Show console.debug messages for debugging purpose. Default: false
      pollingInterval: 1000 * 60 * 10, // Time (ms) between reconnections. Default: 5000
      // 10분에 한번씩만 폴링하게끔
    });
  }

  onMessage = callback => {
    this.eventSource.addEventListener('message', e => {
      console.log('온메세지');
      console.log(e.data);
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
      console.log('온 오픈이여');
      console.log(e.data);
      callback(e.data);
    });
  };

  onError = () => {
    this.eventSource.onerror = () => {
      console.log('server closed connection');
      //  에러가 뜨면 프론트에서 닫아준다
      this.eventSource.removeAllListeners();
      this.eventSource.close();
    };
  };

  onDisconnect = () => {
    this.eventSource.removeAllListeners();
    this.eventSource.close();
  };
}

export default SseService2;
