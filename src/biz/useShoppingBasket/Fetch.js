import { fetchJson } from "../../utils/fetch";

export async function addMealCart(body) {

    const fetchRes = await fetchJson('/users/me/carts', 'POST', {
        body: JSON.stringify(body)
    });

    return fetchRes;
}

export async function loadMealCart() {
    const fetchRes = await fetchJson('/users/me/carts','GET');

    return fetchRes;

    // return {
    //     data: [
    //         {
    //             date: '2022-12-24',
    //             id: 1,
    //             makers: '폴어스',
    //             name: '리코타치즈샐러드',
    //             diningType: '아침',
    //             img: 'string',
    //             count: 1,
    //             price: 15000,
    //             할인율: ''
    //         },

    //         // {
    //         //     date: '2022-12-24',
    //         //     id: 2,
    //         //     makers: '폴폴어스',
    //         //     name: '붕어빵',
    //         //     diningType: '저녁',
    //         //     img: 'string',
    //         //     count: 2,
    //         //     price: 20000,
    //         //     할인율: ''
    //         // },

    //         // {
    //         //     date: '2022-12-25',
    //         //     id: 3,
    //         //     makers: '폴어스',
    //         //     name: '핫도그',
    //         //     diningType: '아침',
    //         //     img: 'string',
    //         //     count: 3,
    //         //     price: 15000,
    //         //     할인율: ''
    //         // },
    //         // {
    //         //     date: '2022-12-25',
    //         //     id: 4,
    //         //     makers: '폴폴어스',
    //         //     name: '피자',
    //         //     diningType: '저녁',
    //         //     img: 'string',
    //         //     count: 1,
    //         //     price: 20000,
    //         //     할인율: ''
    //         // }



    //     ]
    // }
}

export async function updateMealCart(body) {
    const fetchRes = await fetchJson('/users/me/carts', 'PATCH',{
        body: JSON.stringify(body)
        
    });

    return fetchRes;
}

export async function allDeleteMealCart(spotId) {
    const fetchRes = await fetchJson(`/users/me/carts/spots/${spotId}`, 'DELETE');

    return fetchRes;
}

export async function deleteMealCart(foodId) {
    const fetchRes = await fetchJson(`/users/me/carts/${foodId}`, 'DELETE');

    return fetchRes;
}

export async function loadSoldOutMealCart(spotId,date,type) {
    const fetchRes = await fetchJson(`/dailyfoods?spotId=${spotId}&selectedDate=${date}&diningType=${type}`,'GET');

    return fetchRes;
}

export async function ordrMealCart(spotId,body){
    const fetchRes = await fetchJson(`/users/me/orders/${spotId}`,'POST',{
        body:JSON.stringify(body)
    });
    return fetchRes;
}