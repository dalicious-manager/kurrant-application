import { useAtom } from 'jotai';

import * as Fetch from './Fetch';
import {  isLoadingAtom } from './store';

const useJoinUser = () => {

  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
    const joinUser = async (body, option = {}) => {
    try {
      setIsLoading(true);

      const res = await Fetch.joinUser(
        {
          ...body,
        },
        option
      );

      return res;
    } catch (err) {
      return err
    } finally {
      setIsLoading(false);
    }
  };
  return {
    joinUser,
    readableAtom: {
      isLoading,
    },
  };
};

export default useJoinUser;
