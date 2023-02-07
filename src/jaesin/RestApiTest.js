import {fetchJson} from '../utils/fetch';

export const getCheck = async (startDate, endDate) => {
  // const fetchRes = await fetchJson(`/auth/certification/email?key=${auth}&type=${type}`, 'GET');
  const fetchRes = await fetchJson(
    `/users/me/orders?startDate=${startDate}&endDate=${endDate}`,
    'GET',
  );
  console.log(fetchRes);
  // return fetchRes;
};

// getCheck 는 아래와 같은 형식으로 요청을 보내고 있습니다

// http://13.125.224.194:8882/v1/users/me/orders?startDate=2023-02-06&endDate=2023-02-10
// , {
// Headers: {
// 	'content-type': 'application/json',
//         'Authorization': `Bearer ${token?.accessToken}`

// },
// Method: GET
// body: {}

// }
