import { useAtom } from 'jotai';

import * as Fetch from './Fetch';
import {  isPhoneAuthLoadingAtom ,isEmailAuthLoadingAtom,isConfirmPhoneLoadingAtom,isConfirmEmailLoadingAtom,isLoginLoadingAtom} from './store';



const useJoinUser = () => {
  const [isEmailAuthLoading, setEmailAuthLoading] = useAtom(isEmailAuthLoadingAtom);
  const [isPhoneAuthLoading, setPhoneAuthLoading] = useAtom(isPhoneAuthLoadingAtom);
  const [isConfirmEmailLoading, setConfirmEmailLoading] = useAtom(isConfirmEmailLoadingAtom);
  const [isConfirmPhoneLoading, setConfirmPhoneLoading] = useAtom(isConfirmPhoneLoadingAtom);
  const [isLoginLoading, setLoginLoading] = useAtom(isLoginLoadingAtom);
  
  const requestEmailAuth = async (option = {}) => {
    try {
      setEmailAuthLoading(true);

      const res = await Fetch.requestEmailAuth(     
        option
      );
     console.log(res);

      return res;
    } catch (err) {
      throw err
    } finally {
      setEmailAuthLoading(false);
    }
  };
  const confirmEmailAuth = async (auth) => {
    try {
      setConfirmEmailLoading(true);

      const res = await Fetch.confirmEmailAuth(     
        auth
      );

      return res;
    } catch (err) {
      throw err
    } finally {
      setConfirmEmailLoading(false);
    }
  };
  const requestPhoneAuth = async (option = {}) => {
    try {
      setPhoneAuthLoading(true);

      const res = await Fetch.requestPhoneAuth(     
        option
      );

      return res;
    } catch (err) {
      throw err
    } finally {
      setPhoneAuthLoading(false);
    }
  };
  const confirmPhoneAuth = async (auth) => {
    try {
      setConfirmPhoneLoading(true);

      const res = await Fetch.confirmPhoneAuth(     
        auth
      );

      return res;
    } catch (err) {
      throw err
    } finally {
      setConfirmPhoneLoading(false);
    }
  };
  const login = async (body,option = {}) => {
    try {
      setLoginLoading(true);

      const res = await Fetch.login(     
        {
          ...body
        },
        option
      );

      return res;
    } catch (err) {
      throw err
    } finally {
      setLoginLoading(false);
    }
  };
  return {
    requestEmailAuth,
    confirmEmailAuth,
    requestPhoneAuth,
    confirmPhoneAuth,
    login,
    readableAtom: {
      isPhoneAuthLoading,
      isEmailAuthLoading,
      isConfirmPhoneLoading,
      isConfirmEmailLoading,
      isLoginLoading,
    },
  };
};

export default useJoinUser;
