const id = 'frbi51gn4o';
const key = 'QwC8dsoAGD8XBDYV1ykHflWQp0b7KbIRd1Hzr97P';

export const mapApis = {
  getRoadAddress: async (longitude, latitude) => {
    const output = 'json';
    const orders = 'roadaddr,addr';
    const res = await fetch(
      `https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords=${longitude},${latitude}&output=${output}&orders=${orders}&X-NCP-APIGW-API-KEY-ID=${id}&X-NCP-APIGW-API-KEY=${key}`,
    );

    const data = await res.json();

    const roadAddress =
      data.results[0].region?.area1?.name +
      ' ' +
      (data.results[0].region?.area2?.name &&
        data.results[0].region?.area2?.name) +
      ' ' +
      (data.results[0].land?.name ? data.results[0].land?.name : '') +
      ' ' +
      (data.results[0].land?.number1 ? data.results[0].land.number1 : '') +
      (data.results[0].land.number2 !== ''
        ? '-' + data.results[0].land?.number2
        : ' ');
    return roadAddress;
  },
  getAddress: async roadAddress => {
    const res = await fetch(
      `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${roadAddress}&X-NCP-APIGW-API-KEY-ID=${id}&X-NCP-APIGW-API-KEY=${key}`,
    );

    const result = await res.json();

    if (result.addresses.length > 0) return result.addresses[0].jibunAddress;
    else if (result.addresses.length === 0) return roadAddress;
  },
};
