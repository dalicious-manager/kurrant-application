/* eslint-disable no-unreachable */
import Config from 'react-native-config';

import mSleep from '../../helpers/mSleep';

const RESPONSE_SLEEP = 300;

const apiHostUrl =
  process.env.NODE_ENV === 'production'
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
  console.log(options);

  if (method === 'POST' || method === 'PATCH') {
    if (options.body === undefined) {
      throw new Error('body is empty');
    }
  }

  let reqUrl = apiHostUrl + url;

  if (options.querystring !== undefined) {
    const params = Object.assign({}, options.querystring);
    reqUrl += buildQuery(params);
  }

  let headers = {
    'content-type': 'application/json',
  };
  if (options.accessToken !== undefined) {
    headers.Authorization = 'Bearer ' + options.accessToken;
  }

  console.log('fetching to:', reqUrl);
  console.log('fetching method:', method);
  console.log('fetching option:', options.body);
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
