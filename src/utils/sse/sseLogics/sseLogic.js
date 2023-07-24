import {getStorage} from '../../asyncStorage';

export const SseLogics = {};

export const applyDebouncing = (millisecond, callback) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(callback());
    }, millisecond);
  });
};

export const applyThrottle = () => {};

export const getAppToken = async () => {
  const token = await getStorage('token');

  let yo;
  if (token) {
    yo = JSON.parse(token);
  }

  return yo?.accessToken;
};
