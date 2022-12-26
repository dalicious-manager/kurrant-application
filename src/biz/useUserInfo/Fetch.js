import mSleep from '../../helpers/mSleep';
import { fetchJson } from "../../utils/fetch";

export async function userInfo(data,option){
    const fetchRes = await fetchJson(`/users/me/userInfo`,'GET', {
     'accessToken' : 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyIiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTY3MTc4OTYyNSwiZXhwIjoxNjcyMTQ5NjI1fQ.o8tp8TUib2OLWcnGK9aaY4Qc_rR-ViYUUnzrP_1uQEM'
    });

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