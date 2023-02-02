import mSleep from '../../helpers/mSleep';
import { fetchJson } from "../../utils/fetch";

export async function getPurchaseHistory(data, option) {
  // const fetchRes = await fetchJson('/application-form/corporations', 'POST',{
  //   ...option,
  //   body:JSON.stringify(body)
  // });

  await mSleep(1000);

  // return fetchRes
  return {
    data: [
      {
        "id": 57,
        "code": "S2023013100548136",
        "orderDate": "2023-01-31",
        "orderItems": [
          {
            "id": 69,
            "makersName": "마라하오",
            "name": "마라샹궈",
            "image": "https://kurrant-v1-dev.s3.ap-northeast-2.amazonaws.com/food/%EB%A7%88%EB%9D%BC%EC%83%B9%EA%B6%88.png",
            "serviceDate": "2023-02-01",
            "diningType": 2,
            "count": 1,
            "price": 18000.00,
            "orderStatus": 5
          },
          {
            "id": 70,
            "makersName": "라무진",
            "name": "마늘밥",
            "image": "https://kurrant-v1-dev.s3.ap-northeast-2.amazonaws.com/food/%EB%A7%88%EB%8A%98%EB%B0%A5.jpg",
            "serviceDate": "2023-02-01",
            "diningType": 2,
            "count": 1,
            "price": 4000.00,
            "orderStatus": 5
          },
          {
            "id": 71,
            "makersName": "마라하오",
            "name": "마라탕",
            "image": "https://kurrant-v1-dev.s3.ap-northeast-2.amazonaws.com/food/%EB%A7%88%EB%9D%BC%ED%83%95.jpg",
            "serviceDate": "2023-02-03",
            "diningType": 2,
            "count": 2,
            "price": 21600.00,
            "orderStatus": 5
          }
        ]
      }
    ]
  }
}
export async function getPurchaseDetail(body) {
  const fetchRes = await fetchJson(`/users/me/orders/${body.purchaseId}`, 'GET');
  return fetchRes
}
export async function getPurchaseHistoryMeal(data, option) {
  const fetchRes = await fetchJson(`/users/me/orders/histories?startDate=${data.startDate}&endDate=${data.endDate}&orderType=${data.orderType}`, 'GET');

  // await mSleep(1000);

  return fetchRes
  // return {
  //   data: [
  //     {
  //       orderDate: '2023-01-13',
  //       orderData: [
  //         {
  //           code: "S300049283714",
  //           orderItem: [
  //             {
  //               id: 0,
  //               makersName: '폴어스',
  //               name: '리코타 치즈 샐러드',
  //               Image: "https://recipe1.ezmember.co.kr/cache/recipe/2020/12/17/5dd8b5fc87e0696950f8836f6f50657e1.jpg",
  //               serviceDate: "2023-02-12",
  //               cancelDate: null,
  //               diningType: 1,
  //               count: 1,
  //               price: 8500,
  //               foodStatus: 5,
  //             },
  //             {
  //               id: 1,
  //               makersName: '폴어스',
  //               name: '리코타 치즈 샐러드',
  //               Image: "https://recipe1.ezmember.co.kr/cache/recipe/2020/12/17/5dd8b5fc87e0696950f8836f6f50657e1.jpg",
  //               serviceDate: "2023-02-12",
  //               cancelDate: null,
  //               diningType: 1,
  //               count: 1,
  //               price: 8500,
  //               foodStatus: 5,
  //             },
  //             {
  //               id: 2,
  //               makersName: '폴어스',
  //               name: '리코타 치즈 샐러드',
  //               Image: "https://recipe1.ezmember.co.kr/cache/recipe/2020/12/17/5dd8b5fc87e0696950f8836f6f50657e1.jpg",
  //               serviceDate: "2023-02-12",
  //               cancelDate: null,
  //               diningType: 1,
  //               count: 1,
  //               price: 8500,
  //               foodStatus: 6,
  //             }
  //           ]
  //         },
  //         {
  //           code: "S300049283713",
  //           orderItem: [
  //             {
  //               id: 0,
  //               makersName: '폴어스',
  //               name: '리코타 치즈 샐러드',
  //               Image: "https://recipe1.ezmember.co.kr/cache/recipe/2020/12/17/5dd8b5fc87e0696950f8836f6f50657e1.jpg",
  //               serviceDate: "2023-02-12",
  //               cancelDate: "2022-11-11",
  //               diningType: 1,
  //               count: 1,
  //               price: 8500,
  //               foodStatus: 7,
  //             },
  //             {
  //               id: 1,
  //               makersName: '폴어스',
  //               name: '리코타 치즈 샐러드',
  //               Image: "https://recipe1.ezmember.co.kr/cache/recipe/2020/12/17/5dd8b5fc87e0696950f8836f6f50657e1.jpg",
  //               serviceDate: "2023-02-12",
  //               cancelDate: null,
  //               diningType: 1,
  //               count: 1,
  //               price: 8500,
  //               foodStatus: 8,
  //             },
  //             {
  //               id: 2,
  //               makersName: '폴어스',
  //               name: '리코타 치즈 샐러드',
  //               Image: "https://recipe1.ezmember.co.kr/cache/recipe/2020/12/17/5dd8b5fc87e0696950f8836f6f50657e1.jpg",
  //               serviceDate: "2023-02-12",
  //               cancelDate: null,
  //               diningType: 1,
  //               count: 1,
  //               price: 8500,
  //               foodStatus: 9,
  //             }
  //           ]
  //         }

  //       ]

  //     },
  //     {
  //       orderDate: '2023-01-12',
  //       orderData: [
  //         {
  //           code: "S300049283712",
  //           orderItem: [
  //             {
  //               id: 0,
  //               makersName: '폴어스',
  //               name: '리코타 치즈 샐러드',
  //               Image: "https://recipe1.ezmember.co.kr/cache/recipe/2020/12/17/5dd8b5fc87e0696950f8836f6f50657e1.jpg",
  //               serviceDate: "2023-02-12",
  //               cancelDate: null,
  //               diningType: 1,
  //               count: 1,
  //               price: 8500,
  //               foodStatus: 10,
  //             },
  //             {
  //               id: 1,
  //               makersName: '폴어스',
  //               name: '리코타 치즈 샐러드',
  //               Image: "https://recipe1.ezmember.co.kr/cache/recipe/2020/12/17/5dd8b5fc87e0696950f8836f6f50657e1.jpg",
  //               serviceDate: "2023-02-12",
  //               cancelDate: "2023-02-10",
  //               diningType: 1,
  //               count: 1,
  //               price: 8500,
  //               foodStatus: 11,
  //             },
  //             {
  //               id: 2,
  //               makersName: '폴어스',
  //               name: '리코타 치즈 샐러드',
  //               Image: "https://recipe1.ezmember.co.kr/cache/recipe/2020/12/17/5dd8b5fc87e0696950f8836f6f50657e1.jpg",
  //               serviceDate: "2023-02-12",
  //               cancelDate: "2023-02-11",
  //               diningType: 1,
  //               count: 1,
  //               price: 8500,
  //               foodStatus: 12,
  //             }
  //           ]
  //         },

  //       ]
  //     }
  //   ]
  // }
}

