import RNEventSource from 'react-native-event-source';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {Text, View} from 'react-native';
import {getStorage, setStorage} from '../../../asyncStorage';
import {getCheck} from '../restApis/getRestApis';
import Config from 'react-native-config';
import SseService from '../../SseService/SseService';

const apiHostUrl =
  Config.NODE_ENV === 'dev'
    ? Config.API_DEVELOP_URL + '/' + Config.API_VERSION
    : Config.API_HOST_URL + '/' + Config.API_VERSION;

const useSse = () => {
  const [eventSourceMsg, setEventSourceMsg] = useState({});

  const [myEventSource, setMyEventSource] = useState();

  // const [token, setToken] = useState(undefined);

  const getToken = useCallback(async () => {
    const token = await getStorage('token');

    let yo;
    if (token) {
      yo = JSON.parse(token);
    }

    return yo?.accessToken;
  }, []);

  // const SseServiceKit = useMemo(async () => {
  //   const tokenYo = await getToken();
  //   // console.log(apiHostUrl);
  //   // console.log(tokenYo);

  //   const yoyoyo = new SseService(apiHostUrl, tokenYo);

  //   setMyEventSource(yoyoyo);
  //   return yoyoyo;
  // }, [apiHostUrl, getToken]);

  const getSseServiceInstance = useCallback(async () => {
    const tokenYo = await getToken();
    const yoyoyo = new SseService(apiHostUrl, tokenYo);
    setMyEventSource(yoyoyo);
    return yoyoyo;
  }, [apiHostUrl, getToken]);

  useEffect(() => {
    getSseServiceInstance().then(sseServiceInstance => {
      // console.log(sseServiceInstance);
      // console.log(typeof sseServiceInstance);
      // console.log(sseServiceInstance.onMessage);

      sseServiceInstance.onOpen();

      sseServiceInstance.onMessage(message => {
        // console.log('연결된듯');
        // console.log(message);
        setEventSourceMsg(message);
      });
    });
  }, [getSseServiceInstance, setEventSourceMsg]);

  useEffect(() => {
    console.log('잘 들어옴 이벤트 메세지');

    console.log(eventSourceMsg);
    // console.log(typeof eventSourceMsg);
    if (typeof eventSourceMsg === 'string') {
      console.log('일단 스트링이긴 함');

      // console.log(JSON.parse(eventSourceMsg));

      if (eventSourceMsg.includes('EventStream')) {
        console.log(1);
        // console.log(eventSourceMsg);
      } else {
        console.log(2);

        console.log(JSON.parse(eventSourceMsg));

        // if (JSON.parse(eventSourceMsg).content) {
        //   setEventSourceMsg(JSON.parse(eventSourceMsg).content);
        // } else {
        //   setEventSourceMsg(undefined);
        // }
      }

      // try {
      //   console.log('에러안뜸');
      //   const jsonObj = JSON.parse(eventSourceMsg);

      //   console.log(jsonObj);
      //   console.log('말풍선 대사 들어올랑가??' + jsonObj.content);
      // } catch (e) {
      //   console.log('에러뜸 메세지확인 ㄱ');
      //   console.error('Error parsing JSON string: ' + e.message);
      // }

      // if (/{/.test(eventSourceMsg)) {
      //   console.log('1');
      //   console.log(JSON.parse(eventSourceMsg));
      // } else {
      //   console.log('2');
      //   console.log(eventSourceMsg);
      // }
    }

    // console.log(JSON.parse(`${eventSourceMsg}`));
    // if (typeof eventSourceMsg === 'string') {
    //   console.log(JSON.parse(eventSourceMsg));
    // }

    // console.log(eventSourceMsg.id);
    // if (eventSourceMsg.id) {
    //   console.log(eventSourceMsg.content);
    // }
  }, [eventSourceMsg]);

  // useEffect(() => {
  //   // console.log()
  //   // console.log('2 랄랄라~~');
  //   // console.log('SseServiceKit 임' + SseServiceKit);
  //   // console.log(SseServiceKit);

  //   console.log(myEventSource);
  //   console.log(typeof myEventSource);
  //   console.log(myEventSource.onMessage);

  //   // myEventSource.onMessage(message => {
  //   //   console.log(message);
  //   // });
  // }, [myEventSource]);

  // 메세지 받아고기

  // 뭔가 에러터지면 끊기

  useEffect(() => {
    return () => {
      getSseServiceInstance().then(sseServiceInstance => {
        sseServiceInstance.onDisconnect();
      });
    };
  }, []);

  //////////////////////////////////////////////////////////////////////////////

  // const [eventSource, setEventSource] = useState('');

  // const [eventSourceMsg, setEventSourceMsg] = useState({});

  // const setSse = useCallback(async () => {
  //   const token = await getStorage('token');

  //   let yo;
  //   if (token) {
  //     yo = JSON.parse(token);

  //     console.log(yo);
  //   }

  //   let eventSourceYo = new RNEventSource(
  //     `${apiHostUrl}/notification/subscribe`,

  //     {
  //       headers: {
  //         Authorization: `Bearer ${yo?.accessToken}`,
  //       },
  //       withCredentials: true,
  //       retry: 3000,
  //     },
  //   );

  //   console.log(eventSourceYo);

  //   setEventSource(eventSourceYo);
  // }, [setEventSource]);

  // // 시작할때 한번만 만들기 (샘플코드에서 이렇게 하드라)

  // useEffect(() => {
  //   setSse();
  //   // getCheck('2023-02-06', '2023-02-10');
  // }, []);
  // useEffect(() => {
  //   return () => {
  //     console.log(`server closed connection`);
  //     if (eventSource) {
  //       eventSource.removeAllListeners();
  //       eventSource.close();
  //     }
  //   };
  // }, []);

  // if (!eventSource) {
  //   return {evetnSourceMsg: undefined};
  // }

  // console.log('sse 열림 잘 들어옴');
  // eventSource.addEventListener('message', e => {
  //   // console.log(JSON.parse(e.data));

  //   setEventSourceMsg(e.data);

  //   console.log('addEventLister 여기여 ' + e.data);
  // });
  // eventSource.onopen = event => {
  //   console.log(event);
  //   console.log('hi i am open');
  // };
  // eventSource.onmessage = e => {
  //   console.log('오 성공? ㅋㅋ');
  //   // console.log(JSON.parse(e.data));
  //   console.log(e.data);
  //   // console.log("onmessage" + e.data);
  //   // setMessages([...messages, event.data]);
  // };
  // eventSource.onerror = () => {
  //   // setMessages([...messages, "Server closed connection"]);
  //   console.log(`server closed connection`);
  //   eventSource.close();
  // };

  return {eventSourceMsg};
};

export default useSse;
