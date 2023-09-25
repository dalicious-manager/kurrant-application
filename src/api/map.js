import {
  findClosestCoordinate,
  findClosestLocation,
} from '../pages/Map/components/location';

const id = 'frbi51gn4o';
const key = 'QwC8dsoAGD8XBDYV1ykHflWQp0b7KbIRd1Hzr97P';
const kakaoKey = 'ecca029eb4635c04980ca7e0906fd87c';
export const mapApis = {
  // 네이버 지도 도로명 주소 , 우편 번호
  getRoadAddress: async (longitude, latitude) => {
    const output = 'json';
    const orders = 'roadaddr,addr';
    const res = await fetch(
      `https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords=${longitude},${latitude}&output=${output}&orders=${orders}&X-NCP-APIGW-API-KEY-ID=${id}&X-NCP-APIGW-API-KEY=${key}`,
    );

    const data = await res.json();

    const roadAddress =
      data?.results &&
      data?.results?.length > 0 &&
      data.results[0]?.region?.area1?.name +
        ' ' +
        (data.results[0]?.region?.area2?.name &&
          data.results[0]?.region?.area2?.name) +
        ' ' +
        (data?.results[0]?.land
          ? (data.results[0].land?.name === undefined
              ? data.results[0]?.region?.area3?.name
              : '') +
            (data.results[0].land?.name ? data.results[0].land?.name : '') +
            ' ' +
            (data.results[0].land?.number1
              ? data.results[0].land.number1
              : '') +
            (data.results[0].land.number2 !== ''
              ? '-' + data.results[0].land?.number2
              : ' ')
          : '');
    const zipcode = data.results[0]?.land
      ? data.results[0].land.addition1.value
      : '';
    const ress = await fetch(
      `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${roadAddress}&X-NCP-APIGW-API-KEY-ID=${id}&X-NCP-APIGW-API-KEY=${key}`,
    );
    const result = await ress.json();

    if (result.addresses.length > 0) {
      const addressParts = result.addresses[0].jibunAddress.split(' ');
      const jibunAddress = addressParts.slice(0, 4).join(' ');
      return {
        roadAddress: roadAddress,
        zipcode: zipcode,
        address: jibunAddress,
      };
    }
    return {roadAddress: roadAddress, zipcode: zipcode, address: roadAddress};
  },
  // 네이버 지도 도로명 -> 지번 주소 변환
  getAddress: async roadAddress => {
    const res = await fetch(
      `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${roadAddress}&X-NCP-APIGW-API-KEY-ID=${id}&X-NCP-APIGW-API-KEY=${key}`,
    );

    const result = await res.json();

    if (result.addresses.length > 0) {
      const addressParts = result.addresses[0].jibunAddress.split(' ');
      const jibunAddress = addressParts.slice(0, 4).join(' ');

      return jibunAddress;
    } else if (result.addresses.length === 0) return roadAddress;
  },
  // 카카오 주소 검색
  searchObject: async query => {
    const lat = 37.49703;
    const lng = 127.028191;
    const sort = 'accuracy';

    const apiUrl = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${query}&x=${lat}&y=${lng}&sort=${sort}`;

    const res = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `KakaoAK ${kakaoKey}`,
      },
    });
    const result = await res.json();

    if (result.documents.length > 0) {
      return result.documents;
    }
    const addrApiUrl = `https://dapi.kakao.com/v2/local/search/address.json?query=${query}&x=${lat}&y=${lng}&sort=${sort}`;

    const addrRes = await fetch(addrApiUrl, {
      method: 'GET',
      headers: {
        Authorization: `KakaoAK ${kakaoKey}`,
      },
    });
    const addrResult = await addrRes.json();

    return addrResult.documents;
  },
  getMakersAddress: async (longitude, latitude) => {
    const baseLocation = {latitude: latitude, longitude: longitude};

    const apiUrl = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}`;

    const apiRes = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `KakaoAK ${kakaoKey}`,
      },
    });
    const apiResult = await apiRes.json();
    const query = apiResult?.documents[0]?.address?.address_name;

    //return result;

    const addrApiUrl = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${query}&x=${longitude}&y=${latitude}&category_group_code=FD6&sort=distance`;

    const addrRes = await fetch(addrApiUrl, {
      method: 'GET',
      headers: {
        Authorization: `KakaoAK ${kakaoKey}`,
      },
    });
    const addrResult = await addrRes.json();
    console.log(addrResult, '11');
    const test = addrResult.documents.map(x => {
      return {
        longitude: x.x,
        latitude: x.y,
      };
    });

    const closestLocation = findClosestCoordinate(test, baseLocation);
    console.log(closestLocation, 'rkRKdns');
    if (closestLocation !== null) {
      console.log('가장 가까운 위치 정보:', closestLocation);
    } else {
      console.log('배열이 비어있습니다.');
    }
  },
};
