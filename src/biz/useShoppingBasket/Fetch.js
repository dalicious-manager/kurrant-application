import { fetchJson } from "../../utils/fetch";

export async function addMealCart(body,option){
    const fetchRes = await fetchJson('users/me/order/cart','POST',{
        'accessToken' : 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyIiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTY3MTc4OTYyNSwiZXhwIjoxNjcyMTQ5NjI1fQ.o8tp8TUib2OLWcnGK9aaY4Qc_rR-ViYUUnzrP_1uQEM',
        ...option,
        body:JSON.stringify(body)
    });
   
    return fetchRes;
}

export async function loadMealCart(){
    // const fetchRes = await fetchJson('','GET',{
    //     'accessToken' : 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyIiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTY3MTc4OTYyNSwiZXhwIjoxNjcyMTQ5NjI1fQ.o8tp8TUib2OLWcnGK9aaY4Qc_rR-ViYUUnzrP_1uQEM'
    // });
   
    // return fetchRes;
    return {
       data: [
                {   date:'2022-12-24',
                    id:1,
                    makers:'폴어스',
                    name: '리코타치즈샐러드',
                    diningType: '아침',
                    img: 'string',
                    count: 1,
                    price: 15000,
                    할인율:''
                },
                
                {   date:'2022-12-24',
                    id:2,
                    makers:'폴폴어스',
                    name: '붕어빵',
                    diningType: '저녁',
                    img: 'string',
                    count: 2,
                    price: 20000,
                    할인율:''
                },

                {
                    date:'2022-12-25',
                    id:3,
                    makers:'폴어스',
                    name: '핫도그',
                    diningType: '아침',
                    img: 'string',
                    count: 3,
                    price: 15000,
                    할인율:''
                },
                {
                    date:'2022-12-25',
                    id:4,
                    makers:'폴폴어스',
                    name: '피자',
                    diningType: '저녁',
                    img: 'string',
                    count: 1,
                    price: 20000,
                    할인율:''
                }
                
                
        
        ]
    }
}

export async function updateMealCart(){
    const fetchRes = await fetchJson('users/me/order/cart','PATCH',{
        'accessToken' : 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyIiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTY3MTc4OTYyNSwiZXhwIjoxNjcyMTQ5NjI1fQ.o8tp8TUib2OLWcnGK9aaY4Qc_rR-ViYUUnzrP_1uQEM'
    });
   
    return fetchRes;
}

export async function allDeleteMealCart(){
    const fetchRes = await fetchJson('users/me/order/cart','DELETE',{
        'accessToken' : 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyIiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTY3MTc4OTYyNSwiZXhwIjoxNjcyMTQ5NjI1fQ.o8tp8TUib2OLWcnGK9aaY4Qc_rR-ViYUUnzrP_1uQEM'
    });
   
    return fetchRes;
}

export async function deleteMealCart(body){
    const fetchRes = await fetchJson('users/me/order/cart','PATCH',{
        'accessToken' : 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyIiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTY3MTc4OTYyNSwiZXhwIjoxNjcyMTQ5NjI1fQ.o8tp8TUib2OLWcnGK9aaY4Qc_rR-ViYUUnzrP_1uQEM',
        body:JSON.stringify(body)
    });
   
    return fetchRes;
}