import {useQuery} from 'react-query';

import {userInfoApi} from '../api/user';

export function useGetUserInfo() {
  return useQuery('userInfo', () => {
    return userInfoApi.getUserInfo();
  });
}
