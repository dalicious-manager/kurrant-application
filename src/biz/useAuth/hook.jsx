import { useAtom } from 'jotai';

import * as Fetch from './Fetch';
import {  
  isPhoneAuthLoadingAtom ,
  isEmailAuthLoadingAtom,
  isConfirmPhoneLoadingAtom,
  isConfirmEmailLoadingAtom,
  isLoginLoadingAtom,
  isCheckedAuthLoadingAtom,
  isChangePasswordLoadingAtom
} from './store';



const useAuth = () => {
  const [isEmailAuthLoading, setEmailAuthLoading] = useAtom(isEmailAuthLoadingAtom);
  const [isPhoneAuthLoading, setPhoneAuthLoading] = useAtom(isPhoneAuthLoadingAtom);
  const [isConfirmEmailLoading, setConfirmEmailLoading] = useAtom(isConfirmEmailLoadingAtom);
  const [isConfirmPhoneLoading, setConfirmPhoneLoading] = useAtom(isConfirmPhoneLoadingAtom);
  const [isCheckedAuthLoading, setCheckedAuthLoading] = useAtom(isCheckedAuthLoadingAtom);
  const [isChangePasswordLoading, setChangePasswordLoading] = useAtom(isChangePasswordLoadingAtom);
  const [isLoginLoading, setLoginLoading] = useAtom(isLoginLoadingAtom);
  
  const requestEmailAuth = async (body,type,option = {}) => {
    try {
      setEmailAuthLoading(true);

      const res = await Fetch.requestEmailAuth(     
        {
          ...body
        } ,  
        type,
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
  const confirmEmailAuth = async (auth,type) => {
    try {
      setConfirmEmailLoading(true);

      const res = await Fetch.confirmEmailAuth(     
        auth,type
      );

      return res;
    } catch (err) {
      throw err
    } finally {
      setConfirmEmailLoading(false);
    }
  };
  const requestPhoneAuth = async (body,type,option = {}) => {
    console.log(body);
    try {
      setPhoneAuthLoading(true);
      const res = await Fetch.requestPhoneAuth(
        {
          ...body
        } ,  
        type,
        option
      );

      return res;
    } catch (err) {
      throw err
    } finally {
      setPhoneAuthLoading(false);
    }
  };
  const confirmPhoneAuth = async (auth,type) => {
    try {
      setConfirmPhoneLoading(true);

      const res = await Fetch.confirmPhoneAuth(     
        auth,type
      );

      return res;
    } catch (err) {
      throw err
    } finally {
      setConfirmPhoneLoading(false);
    }
  };
  const checkedAuth = async (body,option = {}) => {
    console.log(body);
    try {
      setCheckedAuthLoading(true);
      const res = await Fetch.checkedAuth(
        {
          ...body
        } ,  
        option
      );

      return res;
    } catch (err) {
      throw err
    } finally {
      setCheckedAuthLoading(false);
    }
  };
  const changePassword = async (body,type,option = {}) => {
    console.log(body);
    try {
      setChangePasswordLoading(true);
      const res = await Fetch.changePassword(
        {
          ...body
        } ,  
        type,
        option
      );

      return res;
    } catch (err) {
      throw err
    } finally {
      setChangePasswordLoading(false);
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
    checkedAuth,
    changePassword,
    login,
    readableAtom: {
      isPhoneAuthLoading,
      isEmailAuthLoading,
      isConfirmPhoneLoading,
      isConfirmEmailLoading,
      isCheckedAuthLoading,
      isChangePasswordLoading,
      isLoginLoading,
    },
  };
};

export default useAuth;
