import { fetchJson } from '../../utils/fetch';


export async function DailyFood(spotId, selectedDate) {
    const fetchRes = await fetchJson(`/foods/dailyfoods?spotId=${spotId}&selectedDate=${selectedDate}`, 'GET');


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