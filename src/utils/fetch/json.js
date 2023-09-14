/* eslint-disable no-unreachable */
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';
import Config from 'react-native-config';

import jwtUtils from './jwtUtill';
import mSleep from '../../helpers/mSleep';
import {getStorage, setStorage} from '../asyncStorage';
const RESPONSE_SLEEP = 300;

const apiHostUrl =
  Config.NODE_ENV === 'dev'
    ? Config.API_DEVELOP_URL + '/' + Config.API_VERSION
    : Config.NODE_ENV === 'rel'
    ? Config.API_RELEASE_URL + '/' + Config.API_VERSION
    : Config.API_HOST_URL + '/' + Config.API_VERSION;

const buildQuery = queryObj => {
  let ret;
  const queryKeys = Object.keys(queryObj);
  if (queryKeys.length > 0) {
    ret =
      '?' +
      queryKeys
        .filter(k => queryObj[k] !== null && queryObj[k] !== undefined)
        .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(queryObj[k])}`)
        .join('&');
  } else {
    ret = '';
  }
  return ret;
};
const getReissue = async (headers, reqUrl, token, method, options) => {
  let tokenData = token;
  const bodyData = {
    accessToken: tokenData?.accessToken,
    refreshToken: tokenData?.refreshToken,
  };
  const reissue = await fetch(apiHostUrl + '/auth/reissue', {
    headers: {'content-type': 'application/json'},
    method: 'POST',
    body: JSON.stringify(bodyData),
  });
  const result = await reissue.json();

  if (result.error === 'E4030002') {
    await AsyncStorage.clear();
    throw new Error(result.statusCode.toString());
  } else if (result.error === 'E5000014') {
    await mSleep(1000);
    const bodyDatas = {
      accessToken: tokenData?.accessToken,
      refreshToken: tokenData?.refreshToken,
    };
    json(apiHostUrl + '/auth/reissue', 'POST', {
      body: JSON.stringify(bodyDatas),
    });
  } else {
    const resultData = {
      accessToken: result?.data?.accessToken,
      expiresIn: result?.data?.accessTokenExpiredIn,
      refreshToken: result?.data?.refreshToken,
      spotStatus: tokenData.spotStatus,
    };
    setStorage('token', JSON.stringify(resultData));
    setStorage('spotStatus', tokenData.spotStatus.toString());
    tokenData = resultData;
  }
  headers = {
    'content-type': 'application/json',
    Authorization: `Bearer ${result.data.accessToken}`,
  };
  const res2 = await fetch(reqUrl, {
    headers,
    method,
    body: options?.body,
  });
  const ret2 = await res2.json();
  if (ret2.error) {
    const errors = new Error(ret2.message);
    errors.name = 'error';
    throw errors;
  }

  return ret2;
};
async function json(url, method, options = {}) {
  const storage = await getStorage('token');
  let token = JSON.parse(storage);
  if (method === 'POST' || method === 'PATCH') {
    if (options.body === undefined) {
      throw new Error('body is empty');
    }
  }

  // console.log(token?.expiresIn, new Date().getTime(), token?.expiresIn < new Date().getTime())

  let reqUrl = apiHostUrl + url;

  if (options.querystring !== undefined) {
    const params = Object.assign({}, options.querystring);
    reqUrl += buildQuery(params);
  }
  let headers = {
    'content-type': 'application/json',
    Authorization: `Bearer ${token?.accessToken}`,
  };

  if (options.accessToken !== undefined) {
    headers.Authorization = 'Bearer ' + options.accessToken;
  }
  // if (Config.NODE_ENV === 'dev') {
  //   console.log('fetching to:', reqUrl);
  //   console.log('fetching method:', method);
  //   console.log('fetching option:', options.body);
  // }

  // if (token?.refreshToken)
  //   if (!jwtUtils.isAuth(token?.accessToken)) {
  //     return await getReissue(headers, reqUrl, token, method, options);
  //   }

  console.log('fetching to:', reqUrl);
  console.log('fetching method:', method);
  console.log('fetching option:', options.body);

  // console.log('fetching token:', headers.Authorization);
  // throw new Error('rul : ' + reqUrl);
  let startTs = Date.now();

  const res = await fetch(reqUrl, {
    headers,
    method,
    body: options.body,
  });
  const ret = await res.json();
  console.log(ret);
  if (ret.error === 'E4030003' || ret.error === 'E4110003') {
    return await getReissue(headers, reqUrl, token, method, options);
  }
  let endTs = Date.now();

  const diff = RESPONSE_SLEEP - (endTs - startTs);
  if (diff > 0) {
    await mSleep(diff);
  }

  if (ret.error) {
    const errors = new Error(ret.message);
    errors.name = 'error';
    throw errors;
  }
  return ret;
}

export default json;
