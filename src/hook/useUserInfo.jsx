import {useEffect, useState} from 'react';
import {useQuery} from 'react-query';

import {userInfoApi} from '../api/user';
import {getStorage} from '../utils/asyncStorage';
import jwtUtils from '../utils/fetch/jwtUtill';

export function useGetUserInfo() {
  return useQuery('userInfo', () => {
    return userInfoApi.getUserInfo();
  });
}

export function useGetPrivateMembership() {
  return useQuery('private-membership', () => {
    return userInfoApi.getPrivateMembership();
  });
}
