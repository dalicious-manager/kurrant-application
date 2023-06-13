import RNEventSource from 'react-native-event-source';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {Text, View} from 'react-native';
import {getStorage, setStorage} from '../../../asyncStorage';
import {getCheck} from '../restApis/getRestApis';
import Config from 'react-native-config';
import SseService from '../../SseService/SseService';
import {
  eventSourceMsgAtom,
  eventSourceMsgBundleAtom,
  sseType1Atom,
  sseType2Atom,
  sseType3Atom,
  sseType4Atom,
  sseType5Atom,
} from '../store';
import {useAtom} from 'jotai';
import {useQuery} from 'react-query';
import {fetchJson} from '../../../fetch';

const apiHostUrl =
  Config.NODE_ENV === 'dev'
    ? Config.API_DEVELOP_URL + '/' + Config.API_VERSION
    : Config.API_HOST_URL + '/' + Config.API_VERSION;

const useSse = () => {
  //

  const [sseType1, setSseType1] = useAtom(sseType1Atom);
  const [sseType2, setSseType2] = useAtom(sseType2Atom);
  const [sseType3, setSseType3] = useAtom(sseType3Atom);
  const [sseType4, setSseType4] = useAtom(sseType4Atom);
  const [sseType5, setSseType5] = useAtom(sseType5Atom);

  // sse 구독

  const {
    data,
    status,
    isLoading,
    refetch: getSseType5Refetch,
  } = useQuery(
    ['sse', 'type5'],

    async ({queryKey}) => {
      const response = await fetchJson('/notification/subscribe', 'GET');
      // console.log('리뷰 받아왔다 확인해라');
      // console.log(response.data.items);

      console.log('sse get ㄹㅇ 됨 ㅋㅋ');
      console.log(response.data);

      return response.data;
    },
    {
      onError: () => {
        console.log('이런 에러가 떳습니다 아쉽습니다');
      },

      enabled: false,
      retry: 1,
      retryDelay: 800,
    },
  );

  //  const {
  //     data,
  //     status,
  //     isLoading,
  //     refetch: reviewQueryRefetch,
  //   } = useQuery(
  //     ['sse'],

  //     async ({queryKey}) => {
  //       const response = await instance.get(url);

  //       // 메이커스 목록

  //       setMakersList(response.data.items.makersInfoList);
  //       // 리뷰 리스트 목록
  //       setReviewList(response.data.items.reviewList);
  //       // 미답변 갯수
  //       setUnansweredCount(response.data.items.unansweredCount);
  //       setTotalPage(response.data.total);
  //       return response.data;
  //     },
  //     {
  //       enabled: enable,
  //       retry: 1,
  //       retryDelay: 800,
  //     },
  //   );

  const getToken = useCallback(async () => {
    const token = await getStorage('token');

    let yo;
    if (token) {
      yo = JSON.parse(token);
    }

    return yo?.accessToken;
  }, []);

  const getSseServiceInstance = useCallback(async () => {
    const tokenYo = await getToken();
    const yoyoyo = new SseService(apiHostUrl, tokenYo);

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
            console.log(1);
            console.log('EventStream 연결 되었답니다');
          } else {
            const messageType = JSON.parse(message).type;

            switch (messageType) {
              case 1:
                // type: 1 전체공지

                break;
              case 2:
                // type: 2 스팟공지

                break;
              case 3:
                // type: 3 구매후기
                break;
              case 4:
                // type: 4 마감시간
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
  }, [getSseServiceInstance]);

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

  return {
    sseType1,
    sseType2,
    sseType3,
    sseType4,
    sseType5,
    getSseType5Refetch,
  };
};

export default useSse;
