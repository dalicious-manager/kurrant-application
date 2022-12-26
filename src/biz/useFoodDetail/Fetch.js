import { fetchJson } from '../../utils/fetch';

export async function FoodDetail(foodId){
    // const fetchRes = await fetchJson(`v1/foods/${foodId}`,'GET',{
    //     'accessToken': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyIiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTY3MTc4OTYyNSwiZXhwIjoxNjcyMTQ5NjI1fQ.o8tp8TUib2OLWcnGK9aaY4Qc_rR-ViYUUnzrP_1uQEM'
    // });

    // return fetchRes;

    return {
        foodDetail:{
            makers: '일품만찬',
            name: '삼겹살 ~~~~~',
            price:7500,
            description:'샤브육수,샤브야채,소고기,소스,칼국수,그날의 서비스',
            diningType:'점심',
            img:'',
            spicy:'불닭볶음면면',
            originList:[{name:'감자',origin:'국내산'},{name:'고구마',origin:'국내산'}]
        }
    }
}