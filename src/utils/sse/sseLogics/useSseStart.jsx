import {useCallback, useEffect, useMemo} from 'react';
import {getStorage} from '../../asyncStorage';
import Config from 'react-native-config';

import SseService from '../SseService/SseService';
import * as sseAtoms from './store';
import {useAtom} from 'jotai';
import EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter';

const apiHostUrl =
  Config.NODE_ENV === 'dev'
    ? Config.API_DEVELOP_URL + '/' + Config.API_VERSION
    : Config.NODE_ENV === 'rel'
    ? Config.API_RELEASE_URL + '/' + Config.API_VERSION
    : Config.API_HOST_URL + '/' + Config.API_VERSION;

let forOnlyOneSseService;

const useSseStart = () => {
  const [sseType1, setSseType1] = useAtom(sseAtoms.sseType1Atom);
  const [sseType2, setSseType2] = useAtom(sseAtoms.sseType2Atom);
  const [sseType3, setSseType3] = useAtom(sseAtoms.sseType3Atom);
  const [sseType4, setSseType4] = useAtom(sseAtoms.sseType4Atom);
  const [sseType5, setSseType5] = useAtom(sseAtoms.sseType5Atom);
  const [sseType6, setSseType6] = useAtom(sseAtoms.sseType6Atom);
  const [sseType7, setSseType7] = useAtom(sseAtoms.sseType7Atom);
  const [sseType8, setSseType8] = useAtom(sseAtoms.sseType8Atom);

  const getToken = useCallback(async () => {
    const token = await getStorage('token');

    let yo;
    if (token) {
      yo = JSON.parse(token);
    }
    return yo?.accessToken;
  }, []);

  // blank Error 대처를 위한 eventEmitter
  const blankErrorHandler = useMemo(() => new EventEmitter(), []);

  // const [openAgainPlease, setOpenAgainPlease] = useState(false)

  useEffect(() => {
    if (!!blankErrorHandler) {
      blankErrorHandler.addListener('blank-error-handle', () => {
        console.log('재 요청 시키자~');
        // 재요청시키기
        (async () => {
          forOnlyOneSseService = null;

          const instance = await getSseServiceInstance(true);
        })();
      });
    } else {
      console.log('뭔가 쪼까');
    }
  }, [blankErrorHandler]);

  const blankErrorHandleObject = {
    blankErrorHandler,
    blankErrorPermission: false,
  };

  const getSseServiceInstance = useCallback(
    async value => {
      const tokenYo = await getToken();

      if (forOnlyOneSseService) return forOnlyOneSseService; // 이미 인스턴스가 만들어졌으면 다시 만들지 않는다

      if (!tokenYo) return;

      forOnlyOneSseService = new SseService(
        apiHostUrl,
        tokenYo,
        {...blankErrorHandleObject, blankErrorPermission: value},
        [
          data => {
            setSseType1(data);
          },
          data => {
            setSseType2(data);
          },
          data => {
            setSseType3(data);
          },
          data => {
            setSseType4(data);
          },
          data => {
            setSseType5(data);
          },
          data => {
            setSseType6(data);
          },
          data => {
            setSseType7(data);
          },
          data => {
            setSseType8(data);
          },
        ],
      );

      if (!forOnlyOneSseService) {
        console.log('forOnlyOneSseService 가 지금 undefined에요 ');
        console.log(forOnlyOneSseService);
      }

      return forOnlyOneSseService;
    },
    [apiHostUrl, getToken, blankErrorHandler],
  );

  useEffect(() => {
    setTimeout(() => {
      (async () => {
        const instance = await getSseServiceInstance(false);

        // if (instance.isBlankErrorReconnectionProtocol) {
        //   console.log('sse blank 에러가 있습니다');
        //   // 기존 프론트 sse instance 지우기

        //   forOnlyOneSseService = undefined;

        //   const instance2 = await getSseServiceInstance();

        //   if (!!instance2) {
        //     console.log('instance 지우고 다시 만들었습니다');
        //     console.log(instance2);
        //   }

        //   // 만약 되면 그대로 쓰고 또 안되면 끄기
        // } else {
        //   console.log('문제 없이 잘 되고 있어요 ');
        // }
      })();
    }, 500);
  }, []);

  return;
};

export default useSseStart;
