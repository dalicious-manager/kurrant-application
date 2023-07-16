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

let forOnlyOneSseService;

const useSse = () => {
  const [sseType1, setSseType1] = useAtom(sseType1Atom);
  const [sseType2, setSseType2] = useAtom(sseType2Atom);
  const [sseType3, setSseType3] = useAtom(sseType3Atom);
  const [sseType4, setSseType4] = useAtom(sseType4Atom);
  const [sseType5, setSseType5] = useAtom(sseType5Atom);
  const [sseType6, setSseType6] = useAtom(sseType5Atom);

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

    if (forOnlyOneSseService) return forOnlyOneSseService; // 이미 인스턴스가 만들어졌으면 다시 만들지 않는다
    forOnlyOneSseService = new SseService(apiHostUrl, tokenYo);

    if (!forOnlyOneSseService) {
      console.log('forOnlyOneSseService 가 지금 undefined에요 ');
      console.log(forOnlyOneSseService);
    }

    return forOnlyOneSseService;
  }, [apiHostUrl, getToken]);

  useEffect(() => {
    getSseServiceInstance().then(sseServiceInstance => {
      if (!sseServiceInstance) return;
      sseServiceInstance.onOpen();
      sseServiceInstance.onMessage(message => {
        if (typeof message === 'string') {
          if (message.includes('EventStream')) {
            console.log('-----');
            console.log('EventStream 연결 되었답니다');
            console.log(message);
            // sseType12345 전부 초기화
            // setSseType1({});
            // setSseType2({});
            // setSseType3({});
            // setSseType4({});
            // setSseType5({});
          } else {
            const messageType = JSON.parse(message).type;
            switch (messageType) {
              case 1:
                // type: 1 전체공지
                console.log('type: 1 전체공지 Sse 확인');
                console.log({...JSON.parse(message)});
                setSseType1({...JSON.parse(message)});
                break;
              case 2:
                // type: 2 스팟공지
                console.log('type: 2 스팟공지 Sse 확인');
                console.log({...JSON.parse(message)});
                setSseType2({...JSON.parse(message)});
                break;
              case 3:
                // type: 3 구매후기
                // 발동조건: 새로운 리뷰작성할 상품이 올라왔을떄
                console.log('type: 3 구매후기 Sse 확인');
                console.log({...JSON.parse(message)});
                setSseType3({...JSON.parse(message)});
                break;
              case 4:
                // type: 4 마감시간
                console.log('type: 4 마감시간 Sse 확인');
                console.log({...JSON.parse(message)});
                setSseType4({...JSON.parse(message)});
                break;
              case 5:
                // type: 5 다음주 식사 구매하셨나요?
                console.log('type: 5 다음주 식사 구매하셨나요? Sse 확인');
                console.log({...JSON.parse(message)});
                setSseType5({...JSON.parse(message)});
                break;
              case 6:
                // type: 6 알림 관련
                // 발동조건: 푸시알림을 받으면 뜸
                console.log('type: 6 Sse 확인');
                console.log({...JSON.parse(message)});
                setSseType6({...JSON.parse(message)});
                break;
              default:
                break;
            }
          }
        }
      });
    });
  }, []);

  // sse 알림 읽었다고 서버에 보내주기
  const {mutate: confirmSseIsRead} = useMutation(
    async data => {
      const response = await fetchJson('/notification/read', 'PUT', {
        body: JSON.stringify(data),
      });

      return [response, data];
    },
    {
      onSuccess: data => {
        console.log('sse 알림 읽기 success');
        console.log(data[1]);

        const messageType = data[1];

        switch (messageType) {
          case 1:
            // type: 1 전체공지
            console.log('sse 알림읽기 성공 message type 1');
            setSseType1({});
            break;
          case 2:
            // type: 2 스팟공지
            console.log('sse 알림읽기 성공 message type 2');
            setSseType2({});
            break;
          case 3:
            // type: 3 구매후기
            console.log('sse 알림읽기 성공 message type 3');
            setSseType3({});
            break;
          case 4:
            // type: 4 마감시간
            console.log('sse 알림읽기 성공 message type 4');
            setSseType4({});
            break;
          case 5:
            // type: 5 다음주 식사 구매하셨나요?
            console.log('sse 알림읽기 성공 message type 5');
            // console.log({});
            setSseType5({});
            break;
          case 6:
            // type: 6 알림관련
            console.log('sse 알림읽기 성공 message type 6');
            // console.log({});
            setSseType6({});
            break;
          default:
            break;
        }
      },
      onError: err => {
        console.log('이런 ㅜㅜ 에러가 떳군요, 어서 코드를 확인해보셔요');
        console.log(err);
      },
    },
  );

  // 뭔가 에러터지면 끊기

  const disconnectSse = async () => {
    const yo = await getSseServiceInstance();

    // console.log('sseServiceInstance값 확인');
    // console.log(yo);

    yo.onDisconnect();
  };

  // useEffect(() => {
  //   return () => {
  //     disconnectSse();
  //   };
  // }, []);

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
