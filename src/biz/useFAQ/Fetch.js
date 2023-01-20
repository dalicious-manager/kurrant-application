import mSleep from '../../helpers/mSleep';
import { fetchJson } from "../../utils/fetch";

export async function getFAQ() {
  const fetchRes = await fetchJson(`/boards/customers`, 'GET');

  //await mSleep(1000);

  return fetchRes
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