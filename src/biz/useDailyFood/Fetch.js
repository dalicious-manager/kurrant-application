import { useAtom } from 'jotai';
import mSleep from '../../helpers/mSleep';
import { getStorage } from '../../utils/asyncStorage';
import { fetchJson } from '../../utils/fetch';
import useAuth from '../useAuth';


export async function DailyFood(spotId, selectedDate, userRole) {

    if (userRole === "ROLE_GUEST") {
        await mSleep(100)
        return {
            "data": {
                "diningTypes": [
                    1,
                    2
                ],
                "dailyFoodDtos": [
                    {
                        "id": 178,
                        "diningType": 2,
                        "foodId": 5,
                        "foodName": "오뎅탕",
                        "capacity": 19,
                        "status": 1,
                        "spotId": 1,
                        "serviceDate": "2023-02-07",
                        "makersName": "라무진",
                        "spicy": "NULL",
                        "image": "https://kurrant-v1-dev.s3.ap-northeast-2.amazonaws.com/food/%EC%98%A4%EB%8E%85%ED%83%95.jpg",
                        "description": "100% 원육 어묵과 쯔유를 사용해 진하게 우린 명품 오뎅탕",
                        "price": 16000.00,
                        "discountedPrice": 14400.00000,
                        "membershipDiscountPrice": 1600.000,
                        "membershipDiscountRate": 10,
                        "makersDiscountPrice": 0,
                        "makersDiscountRate": 0,
                        "periodDiscountPrice": 0,
                        "periodDiscountRate": 0
                    },
                    {
                        "id": 179,
                        "diningType": 2,
                        "foodId": 7,
                        "foodName": "BLT샌드위치",
                        "capacity": 27,
                        "status": 1,
                        "spotId": 1,
                        "serviceDate": "2023-02-07",
                        "makersName": "민디씨샌드위치",
                        "spicy": "NULL",
                        "image": "https://kurrant-v1-dev.s3.ap-northeast-2.amazonaws.com/food/BLT%EC%83%8C%EB%93%9C%EC%9C%84%EC%B9%98.jpg",
                        "description": "베이컨 (Bacon), 양상추 (Lettuce), 토마토 (Tomato) 조합의 BLT 샌드위치",
                        "price": 6000.00,
                        "discountedPrice": 5400.00000,
                        "membershipDiscountPrice": 0,
                        "membershipDiscountRate": 0,
                        "makersDiscountPrice": 600.000,
                        "makersDiscountRate": 10,
                        "periodDiscountPrice": 0,
                        "periodDiscountRate": 0
                    },
                    {
                        "id": 180,
                        "diningType": 2,
                        "foodId": 2,
                        "foodName": "마라샹궈",
                        "capacity": 30,
                        "status": 1,
                        "spotId": 1,
                        "serviceDate": "2023-02-07",
                        "makersName": "마라하오",
                        "spicy": "신라면 맵기",
                        "image": "https://kurrant-v1-dev.s3.ap-northeast-2.amazonaws.com/food/%EB%A7%88%EB%9D%BC%EC%83%B9%EA%B6%88.png",
                        "description": "알싸하고 매콤한 마라샹궈를 즐겨보세요!",
                        "price": 20000.00,
                        "discountedPrice": 14400.00000,
                        "membershipDiscountPrice": 4000.000,
                        "membershipDiscountRate": 20,
                        "makersDiscountPrice": 1600.0000,
                        "makersDiscountRate": 10,
                        "periodDiscountPrice": 0,
                        "periodDiscountRate": 0
                    },
                    {
                        "id": 227,
                        "diningType": 1,
                        "foodId": 7,
                        "foodName": "BLT샌드위치",
                        "capacity": 30,
                        "status": 0,
                        "spotId": 1,
                        "serviceDate": "2023-02-07",
                        "makersName": "민디씨샌드위치",
                        "spicy": "NULL",
                        "image": "https://kurrant-v1-dev.s3.ap-northeast-2.amazonaws.com/food/BLT%EC%83%8C%EB%93%9C%EC%9C%84%EC%B9%98.jpg",
                        "description": "베이컨 (Bacon), 양상추 (Lettuce), 토마토 (Tomato) 조합의 BLT 샌드위치",
                        "price": 6000.00,
                        "discountedPrice": 5400.00000,
                        "membershipDiscountPrice": 0,
                        "membershipDiscountRate": 0,
                        "makersDiscountPrice": 600.000,
                        "makersDiscountRate": 10,
                        "periodDiscountPrice": 0,
                        "periodDiscountRate": 0
                    },
                    {
                        "id": 228,
                        "diningType": 1,
                        "foodId": 6,
                        "foodName": "한정식 도시락",
                        "capacity": 22,
                        "status": 1,
                        "spotId": 1,
                        "serviceDate": "2023-02-07",
                        "makersName": "민디도시락",
                        "spicy": "NULL",
                        "image": "https://kurrant-v1-dev.s3.ap-northeast-2.amazonaws.com/food/%ED%95%9C%EC%A0%95%EC%8B%9D%EB%8F%84%EC%8B%9C%EB%9D%BD.jpg",
                        "description": "10가지 반찬으로 구성된 든든한 한정식 도시락",
                        "price": 9000.00,
                        "discountedPrice": 9000.00000,
                        "membershipDiscountPrice": 0,
                        "membershipDiscountRate": 0,
                        "makersDiscountPrice": 0,
                        "makersDiscountRate": 0,
                        "periodDiscountPrice": 0,
                        "periodDiscountRate": 0
                    }
                ]
            },
        }
    }

    const fetchRes = await fetchJson(`/dailyfoods?spotId=${spotId}&selectedDate=${selectedDate}`, 'GET');


    return fetchRes;

    // return {
    //     dailyFood:[{
    //         id: 0,
    //         makers:'폴어스',
    //         name: '리코타 치즈샐러드',
    //         price: 15000,
    //         description: '치즈치즈치즈',
    //         diningType: '점심',
    //         img: 'string',
    //         spicy: '불닭볶음탕탕면맵기임',
    //         isSoldOut : false

    //         },
    //         {
    //         id: 1,
    //         makers:'폴어스',
    //         name: '샌드위치',
    //         price: 15000,
    //         description: '샐러드에 샐러드 없는 ',
    //         diningType: '아침',
    //         img: 'string',
    //         spicy: '신라면맵기',
    //         isSoldOut : true

    //         },
    //         {
    //             id: 2,
    //             makers:'폴어스',
    //             name: '삼겹살',
    //             price: 10000,
    //             description: '샐러드에 샐러드 없는 그런샐러드에 리코타치즈를 얹은 프리미엄 상품',
    //             diningType: '아침',
    //             img: 'string',
    //             spicy: '불닭맵기',
    //             isSoldOut : false

    //             },
    //             {
    //                 id: 3,
    //                 makers:'폴어스',
    //                 name: '황소곱창',
    //                 price: 10000,
    //                 description: '곱창 막창 대창',
    //                 diningType: '저녁',
    //                 img: 'string',
    //                 spicy: null,
    //                 isSoldOut : false

    //                 },
    //                 {
    //                     id: 4,
    //                     makers:'폴어스',
    //                     name: '황소곱창',
    //                     price: 10000,
    //                     description: '곱창 막창 대창',
    //                     diningType: '점심',
    //                     img: 'string',
    //                     spicy: null,
    //                     isSoldOut : true

    //                     }
    //     ]
    // }
}