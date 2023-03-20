import RNEventSource from 'react-native-event-source';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {Text, View} from 'react-native';
import {getStorage, setStorage} from '../../../asyncStorage';
import {getCheck} from '../restApis/getRestApis';
import Config from 'react-native-config';
import SseService from '../../SseService/SseService';
import {eventSourceMsgAtom} from '../store';
import {useAtom} from 'jotai';

const apiHostUrl =
  Config.NODE_ENV === 'dev'
    ? Config.API_DEVELOP_URL + '/' + Config.API_VERSION
    : Config.API_HOST_URL + '/' + Config.API_VERSION;

const useSse = () => {
  const [eventSourceMsg, setEventSourceMsg] = useAtom(eventSourceMsgAtom);

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
        if (typeof message === 'string') {
          if (message.includes('EventStream')) {
            console.log(1);
            console.log('EventStream 연결 되었답니다');
          } else {
            console.log(2);

            setEventSourceMsg(JSON.parse(message));
          }
        }
      });
    });
  }, [getSseServiceInstance, setEventSourceMsg]);

  // useEffect(() => {
  //   console.log('잘 들어옴 이벤트 메세지');

  //   console.log(eventSourceMsg);
  //   // console.log(typeof eventSourceMsg);
  //   if (typeof eventSourceMsg === 'string') {
  //     console.log('일단 스트링이긴 함');

  //     // console.log(JSON.parse(eventSourceMsg));

  //     if (eventSourceMsg.includes('EventStream')) {
  //       console.log(1);
  //       // console.log(eventSourceMsg);
  //     } else {
  //       console.log(2);

  //       console.log(JSON.parse(eventSourceMsg));
  //     }
  //   }

  //   // }
  // }, [eventSourceMsg]);

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

  return {eventSourceMsg, setEventSourceMsg};
};

export default useSse;
