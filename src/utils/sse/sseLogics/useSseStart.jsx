import {useAtom} from 'jotai';
import {useCallback, useEffect, useMemo} from 'react';
import EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter';
import Config from 'react-native-config';

import * as sseAtoms from './store';
import {getStorage} from '../../asyncStorage';
import SseService from '../SseService/SseService';

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

  // sse를 리셋하기 위한 eventEmitter
  const sseResetHandler = useMemo(() => new EventEmitter(), []);
  const resetSseInstance = () => {
    //console.log('sse 인스턴스 reset시키기');

    forOnlyOneSseService = null;
    getSseServiceInstance(true);
  };

  useEffect(() => {
    if (sseResetHandler) {
      sseResetHandler.addListener('reset-sse-instance', () => {
        resetSseInstance();
      });
    }
  }, [sseResetHandler]);

  const getSseServiceInstance = useCallback(
    async resetSse => {
      const tokenYo = await getToken();

      if (forOnlyOneSseService) return forOnlyOneSseService; // 이미 인스턴스가 만들어졌으면 다시 만들지 않는다

      if (!tokenYo) return;

      forOnlyOneSseService = new SseService(
        apiHostUrl,
        tokenYo,

        sseResetHandler,

        resetSse,
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

      return forOnlyOneSseService;
    },
    [apiHostUrl, getToken, sseResetHandler],
  );

  useEffect(() => {
    setTimeout(() => {
      getSseServiceInstance(false);
    }, 500);
  }, []);

  useEffect(() => {
    return () => {
      if (forOnlyOneSseService) {
        forOnlyOneSseService.onClose();
      }
    };
  }, []);

  return;
};

export default useSseStart;
