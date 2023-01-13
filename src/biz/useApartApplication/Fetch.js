import { fetchJson } from '../../utils/fetch';


export async function ApartmentApplication(body,option) {
    const fetchRes = await fetchJson('/application-form/apartments', 'POST',{
        ...option,
        body:JSON.stringify(body)
    });


    return fetchRes;
}

export async function ApartmentApplicationCheck(id) {
    const fetchRes = await fetchJson(`/application-form/apartments/${id}`, 'GET');

    return fetchRes;
}

export async function ApartmentApplicationMemo(body,id) { 
    const fetchRes = await fetchJson(`/application-form/apartments/${id}/memo`, 'PUT',{
       
        body:JSON.stringify(body)
    });
    
    return fetchRes;
}


//  아파트 검색

export async function ApartmentSearch(){
    const fetchRes = await fetchJson('/users/me/groups/apartments','GET');

    return fetchRes;
}

// 유저 아파트 스팟 등록

export async function ApartmentRegisterSpot(id,body){
    const fetchRes = await fetchJson(`/users/me/groups/apartments/spots/${id}`,'POST',{
        body:JSON.stringify(body)
    });

    return fetchRes;
}