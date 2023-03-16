import {fetchJson} from '../../../fetch';

export const getCheck = async (startDate, endDate) => {
  // const fetchRes = await fetchJson(`/auth/certification/email?key=${auth}&type=${type}`, 'GET');

  try {
    const fetchRes = await fetchJson(
      `/users/me/orders?startDate=${startDate}&endDate=${endDate}`,
      'GET',
    );
    console.log(fetchRes);
  } catch (err) {
    console.log('뭔가 get이 안됨');
    console.log(err);
  }

  // return fetchRes;
};

export const sendDone = async type => {
  try {
    const sendYo = await fetchJson(`/notification/read?type=${type}`, 'PUT');
    console.log(sendYo);
  } catch (err) {
    console.log(err);
  }
};
