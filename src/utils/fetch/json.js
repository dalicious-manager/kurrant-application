/* eslint-disable no-unreachable */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import Config from 'react-native-config';

import mSleep from '../../helpers/mSleep';

import { getStorage, setStorage } from '../asyncStorage';
const RESPONSE_SLEEP = 300;

const apiHostUrl =
  process.env.NODE_ENV === 'prod'
    ? Config.API_HOST_URL + '/' + Config.API_VERSION
    : Config.API_DEVELOP_URL + '/' + Config.API_VERSION;

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

async function json(url, method, options = {}) {
  const storage = await getStorage('token');

  let token = JSON.parse(storage);
  if (method === 'POST' || method === 'PATCH') {
    if (options.body === undefined) {
      throw new Error('body is empty');
    }
  }

  // console.log(token?.expiresIn, new Date().getTime(), token?.expiresIn < new Date().getTime())
  if (token?.expiresIn < new Date().getTime()) {
    const bodyData = {
      "accessToken": token.accessToken,
      "refreshToken": token.refreshToken
    }
    const reissue = await fetch(apiHostUrl + "/auth/reissue", {
      headers: { 'content-type': 'application/json', },
      method: "POST",
      body: JSON.stringify(bodyData),
    })
    // console.log(reissue);
    const result = await reissue.json();

    if (result.statusCode === 403) {
      await AsyncStorage.clear();
      throw new Error(result.statusCode.toString());
    } else {
      const resultData = {
        "accessToken": result.data.accessToken,
        "expiresIn": result.data.accessTokenExpiredIn,
        "refreshToken": result.data.refreshToken,
        "spotStatus": token.spotStatus
      }
      await setStorage('token', JSON.stringify(resultData));
      await setStorage('spotStatus', token.spotStatus.toString());
      token = resultData;
    }

  }
  let reqUrl = apiHostUrl + url;

  if (options.querystring !== undefined) {
    const params = Object.assign({}, options.querystring);
    reqUrl += buildQuery(params);
  }
  let headers = {
    'content-type': 'application/json',
    'Authorization': `Bearer ${token?.accessToken}`
  };

  if (options.accessToken !== undefined) {
    headers.Authorization = 'Bearer ' + options.accessToken;
  }

  // console.log('fetching to:', reqUrl);
  // console.log('fetching method:', method);
  // console.log('fetching option:', options.body);
  // console.log('fetching token:', headers.Authorization);
  // throw new Error('rul : ' + reqUrl);
  let startTs = Date.now();

  const res = await fetch(reqUrl, {
    headers,
    method,
    body: options.body,
  });
  const ret = await res.json();

  if (ret.error) {
    const errors = new Error(ret.message);
    errors.name = "error";
    throw errors;
  }

  let endTs = Date.now();

  const diff = RESPONSE_SLEEP - (endTs - startTs);
  if (diff > 0) {
    await mSleep(diff);
  }

  return ret;

}

export default json;
