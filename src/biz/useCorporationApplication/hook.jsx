import {useAtom} from 'jotai';
import {Alert} from 'react-native';

import * as Fetch from './Fetch';
import {corpApplicationListAtom, isCorpApplicationLoadingAtom} from './store';
import {setStorage} from '../../utils/asyncStorage';

const useCorporationApplication = () => {
  const [isCorpCheck, setCorpCheck] = useAtom(corpApplicationListAtom);
  const [isCorpLoading, setCorpLoading] = useAtom(isCorpApplicationLoadingAtom);

  // 프라이빗 스팟 그룹 스팟 개설 신청
  const corpApplication = async (body, option = {}) => {
    try {
      const res = await Fetch.CorporationApplication(
        {
          ...body,
        },
        option,
      );

      return res;
    } catch (err) {
      throw err;
    }
  };

  // 신청내역 조회
  const corpApplicationCheck = async id => {
    try {
      setCorpLoading(true);
      const res = await Fetch.CorporationApplicationCheck(id);

      setCorpCheck(res.data);
    } catch (err) {
      // Alert.alert('신청 내역 조회', err.toString()?.replace('error: ', ''), [
      //   {
      //     text: '확인',
      //     onPress: () => {},
      //     style: 'cancel',
      //   },
      // ]);
      console.log(err.toString()?.replace('error: ', ''));
    } finally {
      setCorpLoading(false);
    }
  };

  // 메모 수정
  const corporationApplicationMemo = async (body, id) => {
    try {
      const res = await Fetch.CorporationApplicationMemo(
        {
          ...body,
        },
        id,
      );
      return res;
    } catch (err) {
      throw err;
    }
  };
  return {
    corpApplication,
    corpApplicationCheck,
    corporationApplicationMemo,
    isCorpCheck,
    setCorpCheck,
  };
};

export default useCorporationApplication;
