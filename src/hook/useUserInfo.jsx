import {useEffect, useState} from 'react';
import {useQuery} from 'react-query';

import {userInfoApi} from '../api/user';
import {getStorage} from '../utils/asyncStorage';
import jwtUtils from '../utils/fetch/jwtUtill';

export function useGetUserInfo() {
  const [isTokenValid, setIsTokenValid] = useState(false);

  useEffect(() => {
    const getTokenData = async () => {
      const storage = JSON.parse(await getStorage('token'));
      return jwtUtils.isAuth(storage?.accessToken);
    };

    getTokenData().then(result => {
      setIsTokenValid(result);
    });
  }, []);
  return useQuery(
    'userInfo',
    () => {
      return userInfoApi.getUserInfo();
    },
    {
      enabled: isTokenValid,
    },
  );
}
