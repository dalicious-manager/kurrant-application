import {useCallback, useEffect, useMemo, useState} from 'react';

import {getStorage, setStorage} from '../../asyncStorage';

import Config from 'react-native-config';
import SseService from '../SseService/SseService';
import {
  sseType1Atom,
  sseType2Atom,
  sseType3Atom,
  sseType4Atom,
  sseType5Atom,
} from './store';
import {useAtom} from 'jotai';
import {useMutation, useQuery} from 'react-query';
import {fetchJson} from '../../fetch';

const apiHostUrl =
  Config.NODE_ENV === 'dev'
    ? Config.API_DEVELOP_URL + '/' + Config.API_VERSION
    : Config.API_HOST_URL + '/' + Config.API_VERSION;

const useSse = () => {
  const [sseType1, setSseType1] = useAtom(sseType1Atom);
  const [sseType2, setSseType2] = useAtom(sseType2Atom);
  const [sseType3, setSseType3] = useAtom(sseType3Atom);
  const [sseType4, setSseType4] = useAtom(sseType4Atom);
  const [sseType5, setSseType5] = useAtom(sseType5Atom);

  // sse 구독

  const getToken = useCallback(async () => {
    const token = await getStorage('token');

    let yo;
    if (token) {
      yo = JSON.parse(token);
    }

    return yo?.accessToken;
  }, []);

  // getSseSercieInstance

  const getSseServiceInstance = useCallback(async () => {
    const tokenYo = await getToken();
    const yoyoyo = new SseService(apiHostUrl, tokenYo);
    // const yoyoyo = new SseService3(apiHostUrl, tokenYo);

    console.log('setEventSourceMsg url확인');
    console.log(apiHostUrl);

    return yoyoyo;
  }, [apiHostUrl, getToken]);

  useEffect(() => {
    getSseServiceInstance().then(sseServiceInstance => {
      sseServiceInstance.onOpen();
      sseServiceInstance.onMessage(message => {
        if (typeof message === 'string') {
          if (message.includes('EventStream')) {
            console.log('-----');
            console.log('EventStream 연결 되었답니다');

            // sseType12345 전부 초기화
            setSseType1({});
            setSseType2({});
            setSseType3({});
            setSseType4({});
            setSseType5({});
          } else {
            const messageType = JSON.parse(message).type;
            switch (messageType) {
              case 1:
                // type: 1 전체공지
                setSseType1({...JSON.parse(message)});
                break;
              case 2:
                // type: 2 스팟공지
                setSseType2({...JSON.parse(message)});
                break;
              case 3:
                // type: 3 구매후기
                setSseType3({...JSON.parse(message)});
                break;
              case 4:
                // type: 4 마감시간
                setSseType4({...JSON.parse(message)});
                break;
              case 5:
                // type: 5 다음주 식사 구매하셨나요?
                console.log('message type 5');
                console.log({...JSON.parse(message)});
                setSseType5({...JSON.parse(message)});
                break;
              default:
                break;
            }
          }
        }
      });
    });
  }, []);

  // sse 알림 읽기
  const {mutate: confirmSseIsRead} = useMutation(
    async data => {
      const response = await fetchJson('/notification/read', 'PUT', {
        body: JSON.stringify(data),
      });

      return [response, data, 'ㅋㅋㅋ테스트'];
    },
    {
      onSuccess: data => {
        console.log('sse 알림 읽기 success');

        console.log(data[2]);
      },
      onError: err => {
        console.log('이런 ㅜㅜ 에러가 떳군요, 어서 코드를 확인해보셔요');
        console.log(err);
      },
    },
  );

  // 뭔가 에러터지면 끊기

  const disconnectSse = () => {
    getSseServiceInstance().then(sseServiceInstance => {
      sseServiceInstance.onDisconnect();
    });
  };

  useEffect(() => {
    return () => {
      getSseServiceInstance().then(sseServiceInstance => {
        sseServiceInstance.onDisconnect();
      });
    };
  }, []);

  return {
    sseType1,
    sseType2,
    sseType3,
    sseType4,
    sseType5,

    confirmSseIsRead,
    disconnectSse,
  };
};

export default useSse;
