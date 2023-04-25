import {useAtom} from 'jotai';
import {useState} from 'react';

import * as Fetch from './Fetch';
import {isRegisterDoneAtom} from '../getRegisterIist/store';

const useGetRegisterDoneCheck = () => {
  const [isRegisterDone, setIsRegisterDone] = useAtom(isRegisterDoneAtom);

  const [isRegisterInfoLoading, setIsRegisterInfoLoading] = useState(undefined);

  const getRegisterDoneCheck = async () => {
    try {
      setIsRegisterInfoLoading(true);
      const res = await Fetch.getRegisterDoneCheck();

      setIsRegisterDone(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsRegisterInfoLoading(false);
    }
  };

  return {isRegisterDone, getRegisterDoneCheck, isRegisterInfoLoading};
};

export default useGetRegisterDoneCheck;
