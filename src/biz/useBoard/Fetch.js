import mSleep from '../../helpers/mSleep';
import {fetchJson} from '../../utils/fetch';

export async function getNotice(type, option) {
  // const fetchRes = await fetchJson(`/boards/notices?type=${type}`, 'GET');
  const fetchRes = await fetchJson(`/boards/notices?status=${type}`, 'GET');

  //await mSleep(1000);

  return fetchRes;
  // return {
  //   items: [
  //       {
  //           name:'김달리달리',
  //           membership:true,
  //           spot:'팁스타운',
  //           point:2000,
  //           address:'주소주소주소'
  //          }
  //   ]

  // }
}

export async function getAlarm(type, option) {
  const fetchRes = await fetchJson(`/boards/alarms`, 'GET');

  //await mSleep(1000);

  return fetchRes;
  // return {
  //   items: [
  //       {
  //           name:'김달리달리',
  //           membership:true,
  //           spot:'팁스타운',
  //           point:2000,
  //           address:'주소주소주소'
  //          }
  //   ]

  // }
}

export async function deleteAlarm(type, option) {
  const fetchRes = await fetchJson(`/boards/alarms`, 'DELETE');

  //await mSleep(1000);

  return fetchRes;
  // return {
  //   items: [
  //       {
  //           name:'김달리달리',
  //           membership:true,
  //           spot:'팁스타운',
  //           point:2000,
  //           address:'주소주소주소'
  //          }
  //   ]

  // }
}

export async function readAlarm(body) {
  const fetchRes = await fetchJson('/boards/alarms', 'PATCH', {
    body: JSON.stringify(body),
  });

  return fetchRes;
}
