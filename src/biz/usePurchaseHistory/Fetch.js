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
        orderDate: '2023-01-13',
        orderData: [
          {
            code: "S300049283714",
            orderItem: [
              {
                id: 0,
                makersName: '폴어스',
                name: '리코타 치즈 샐러드',
                Image: "https://recipe1.ezmember.co.kr/cache/recipe/2020/12/17/5dd8b5fc87e0696950f8836f6f50657e1.jpg",
                serviceDate: "2023-02-12",
                cancelDate: null,
                diningType: 1,
                count: 1,
                price: 8500,
                foodStatus: 5,
              },
              {
                id: 1,
                makersName: '폴어스',
                name: '리코타 치즈 샐러드',
                Image: "https://recipe1.ezmember.co.kr/cache/recipe/2020/12/17/5dd8b5fc87e0696950f8836f6f50657e1.jpg",
                serviceDate: "2023-02-12",
                cancelDate: null,
                diningType: 1,
                count: 1,
                price: 8500,
                foodStatus: 5,
              },
              {
                id: 2,
                makersName: '폴어스',
                name: '리코타 치즈 샐러드',
                Image: "https://recipe1.ezmember.co.kr/cache/recipe/2020/12/17/5dd8b5fc87e0696950f8836f6f50657e1.jpg",
                serviceDate: "2023-02-12",
                cancelDate: null,
                diningType: 1,
                count: 1,
                price: 8500,
                foodStatus: 6,
              }
            ]
          },
          {
            code: "S300049283713",
            orderItem: [
              {
                id: 0,
                makersName: '폴어스',
                name: '리코타 치즈 샐러드',
                Image: "https://recipe1.ezmember.co.kr/cache/recipe/2020/12/17/5dd8b5fc87e0696950f8836f6f50657e1.jpg",
                serviceDate: "2023-02-12",
                cancelDate: "2022-11-11",
                diningType: 1,
                count: 1,
                price: 8500,
                foodStatus: 7,
              },
              {
                id: 1,
                makersName: '폴어스',
                name: '리코타 치즈 샐러드',
                Image: "https://recipe1.ezmember.co.kr/cache/recipe/2020/12/17/5dd8b5fc87e0696950f8836f6f50657e1.jpg",
                serviceDate: "2023-02-12",
                cancelDate: null,
                diningType: 1,
                count: 1,
                price: 8500,
                foodStatus: 8,
              },
              {
                id: 2,
                makersName: '폴어스',
                name: '리코타 치즈 샐러드',
                Image: "https://recipe1.ezmember.co.kr/cache/recipe/2020/12/17/5dd8b5fc87e0696950f8836f6f50657e1.jpg",
                serviceDate: "2023-02-12",
                cancelDate: null,
                diningType: 1,
                count: 1,
                price: 8500,
                foodStatus: 9,
              }
            ]
          }

        ]

      },
      {
        orderDate: '2023-01-12',
        orderData: [
          {
            code: "S300049283712",
            orderItem: [
              {
                id: 0,
                makersName: '폴어스',
                name: '리코타 치즈 샐러드',
                Image: "https://recipe1.ezmember.co.kr/cache/recipe/2020/12/17/5dd8b5fc87e0696950f8836f6f50657e1.jpg",
                serviceDate: "2023-02-12",
                cancelDate: null,
                diningType: 1,
                count: 1,
                price: 8500,
                foodStatus: 10,
              },
              {
                id: 1,
                makersName: '폴어스',
                name: '리코타 치즈 샐러드',
                Image: "https://recipe1.ezmember.co.kr/cache/recipe/2020/12/17/5dd8b5fc87e0696950f8836f6f50657e1.jpg",
                serviceDate: "2023-02-12",
                cancelDate: "2023-02-10",
                diningType: 1,
                count: 1,
                price: 8500,
                foodStatus: 11,
              },
              {
                id: 2,
                makersName: '폴어스',
                name: '리코타 치즈 샐러드',
                Image: "https://recipe1.ezmember.co.kr/cache/recipe/2020/12/17/5dd8b5fc87e0696950f8836f6f50657e1.jpg",
                serviceDate: "2023-02-12",
                cancelDate: "2023-02-11",
                diningType: 1,
                count: 1,
                price: 8500,
                foodStatus: 12,
              }
            ]
          },

        ]
      }
    ]
  }
}

export async function getPurchaseHistoryMeal(data, option) {
  // const fetchRes = await fetchJson(`/users/me/userInfo`, 'GET');

  await mSleep(1000);

  // return fetchRes
  return {
    data: [
      {
        orderDate: '2023-01-13',
        orderData: [
          {
            code: "S300049283714",
            orderItem: [
              {
                id: 0,
                makersName: '폴어스',
                name: '리코타 치즈 샐러드',
                Image: "https://recipe1.ezmember.co.kr/cache/recipe/2020/12/17/5dd8b5fc87e0696950f8836f6f50657e1.jpg",
                serviceDate: "2023-02-12",
                cancelDate: null,
                diningType: 1,
                count: 1,
                price: 8500,
                foodStatus: 5,
              },
              {
                id: 1,
                makersName: '폴어스',
                name: '리코타 치즈 샐러드',
                Image: "https://recipe1.ezmember.co.kr/cache/recipe/2020/12/17/5dd8b5fc87e0696950f8836f6f50657e1.jpg",
                serviceDate: "2023-02-12",
                cancelDate: null,
                diningType: 1,
                count: 1,
                price: 8500,
                foodStatus: 5,
              },
              {
                id: 2,
                makersName: '폴어스',
                name: '리코타 치즈 샐러드',
                Image: "https://recipe1.ezmember.co.kr/cache/recipe/2020/12/17/5dd8b5fc87e0696950f8836f6f50657e1.jpg",
                serviceDate: "2023-02-12",
                cancelDate: null,
                diningType: 1,
                count: 1,
                price: 8500,
                foodStatus: 6,
              }
            ]
          },
          {
            code: "S300049283713",
            orderItem: [
              {
                id: 0,
                makersName: '폴어스',
                name: '리코타 치즈 샐러드',
                Image: "https://recipe1.ezmember.co.kr/cache/recipe/2020/12/17/5dd8b5fc87e0696950f8836f6f50657e1.jpg",
                serviceDate: "2023-02-12",
                cancelDate: "2022-11-11",
                diningType: 1,
                count: 1,
                price: 8500,
                foodStatus: 7,
              },
              {
                id: 1,
                makersName: '폴어스',
                name: '리코타 치즈 샐러드',
                Image: "https://recipe1.ezmember.co.kr/cache/recipe/2020/12/17/5dd8b5fc87e0696950f8836f6f50657e1.jpg",
                serviceDate: "2023-02-12",
                cancelDate: null,
                diningType: 1,
                count: 1,
                price: 8500,
                foodStatus: 8,
              },
              {
                id: 2,
                makersName: '폴어스',
                name: '리코타 치즈 샐러드',
                Image: "https://recipe1.ezmember.co.kr/cache/recipe/2020/12/17/5dd8b5fc87e0696950f8836f6f50657e1.jpg",
                serviceDate: "2023-02-12",
                cancelDate: null,
                diningType: 1,
                count: 1,
                price: 8500,
                foodStatus: 9,
              }
            ]
          }

        ]

      },
      {
        orderDate: '2023-01-12',
        orderData: [
          {
            code: "S300049283712",
            orderItem: [
              {
                id: 0,
                makersName: '폴어스',
                name: '리코타 치즈 샐러드',
                Image: "https://recipe1.ezmember.co.kr/cache/recipe/2020/12/17/5dd8b5fc87e0696950f8836f6f50657e1.jpg",
                serviceDate: "2023-02-12",
                cancelDate: null,
                diningType: 1,
                count: 1,
                price: 8500,
                foodStatus: 10,
              },
              {
                id: 1,
                makersName: '폴어스',
                name: '리코타 치즈 샐러드',
                Image: "https://recipe1.ezmember.co.kr/cache/recipe/2020/12/17/5dd8b5fc87e0696950f8836f6f50657e1.jpg",
                serviceDate: "2023-02-12",
                cancelDate: "2023-02-10",
                diningType: 1,
                count: 1,
                price: 8500,
                foodStatus: 11,
              },
              {
                id: 2,
                makersName: '폴어스',
                name: '리코타 치즈 샐러드',
                Image: "https://recipe1.ezmember.co.kr/cache/recipe/2020/12/17/5dd8b5fc87e0696950f8836f6f50657e1.jpg",
                serviceDate: "2023-02-12",
                cancelDate: "2023-02-11",
                diningType: 1,
                count: 1,
                price: 8500,
                foodStatus: 12,
              }
            ]
          },

        ]
      }
    ]
  }
}