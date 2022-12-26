import { fetchJson } from "../../utils/fetch";

export async function OrderMeal(startdate,enddate){
    
    const fetchRes = await fetchJson(`/users/me/order?startDate=${startdate}&endDate=${enddate}`,'GET',{
        'accessToken' : 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyIiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTY3MTc4OTYyNSwiZXhwIjoxNjcyMTQ5NjI1fQ.o8tp8TUib2OLWcnGK9aaY4Qc_rR-ViYUUnzrP_1uQEM'
    });
   
    return fetchRes;
    // return {
    //     orderFood: [
    //         {
    //             id: 0,
    //             date : '2022-12-19',
    
    //             orderItemDtoList: [
    //             {   makers:'메이커스이름',
    //                 name: '비빔밥',
    //                 diningType: '아침',
    //                 img: 111,
    //                 count: 1
    //             },
    //             {   makers:'메이커스이름',
    //                 name: '원할머니보쌈',
    //                 diningType: '점심',
    //                 img: 111,
    //                 count: 1
    //             },
    //             {   makers:'진천순대국',
    //                 name: '순대국',
    //                 diningType: '점심',
    //                 img: 111,
    //                 count: 1
    //             },
    //             {   makers:'메이커스이름',
    //                 name: '뚝불',
    //                 diningType: '저녁',
    //                 img: 111,
    //                 count: 1
    //                 }
    //         ]
                
    //         },

    //         {
    //         id: 1,
    //         date : '2022-12-23',
            
    //         orderItemDtoList: [{
    //         makers:'메이커스이름',
    //         name: '오리구이',
    //         diningType: '점심',
    //         img: 111,
    //         count: 1
    //         }]
            
    //         },
    //         {
    //             id: 2,
    //             date : '2022-12-24',
    
    //             orderItemDtoList: [{
    //             makers:'메이커스이름',    
    //             name: '오리구탕탕',
    //             diningType: '저녁',
    //             img: 111,
    //             count: 1
    //             }]
                
    //         },
    //         {
    //             id: 3,
    //             date : '2022-12-26',
    
    //             orderItemDtoList: [
    //             {
    //                 makers:'메이커스이름',
    //                 name: '엽떡',
    //                 diningType: '점심',
    //                 img: 111,
    //                 count: 2
    //             },
    //             {
    //                 makers:'메이커스이름',
    //                 name: '피자',
    //                 diningType: '저녁',
    //                 img: 111,
    //                 count: 1
    //                 }
    //         ]
                
    //         },

    //         {
    //             id: 4,
    //             date : '2022-12-20',
    
    //             orderItemDtoList: [
    //             {   makers:'메이커스이름',
    //                 name: '비빔밥',
    //                 diningType: '아침',
    //                 img: 111,
    //                 count: 1
    //             },
    //             {   makers:'메이커스이름',
    //                 name: '원할머니보쌈',
    //                 diningType: '점심',
    //                 img: 111,
    //                 count: 1
    //             },
                
    //             {   makers:'메이커스이름',
    //                 name: '뚝불',
    //                 diningType: '저녁',
    //                 img: 111,
    //                 count: 1
    //                 }
    //         ]
                
    //         },
    //     ]
    // }
 }
