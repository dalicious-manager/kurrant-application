import { fetchJson } from '../../utils/fetch';

// 아파트 개설 신청
export async function ApartmentApplication(body,option) {
    const req = {
        ...body,
        apartmentInfo:{
            ...body.apartmentInfo,
            serviceStartDate:body.apartmentInfo.serviceStartDate.split(".").join(""),
        },
        
    }
    
    const fetchRes = await fetchJson('/application-form/apartments', 'POST',{
        ...option,
        body:JSON.stringify(req)
    });


    return fetchRes;
}

// 아파트 신청내역 조회
export async function ApartmentApplicationCheck(id) {
    const fetchRes = await fetchJson(`/application-form/apartments/${id}`, 'GET');

    return fetchRes;
}

// 아파트 신청서 메모 수정
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

// 아파트 상세주소 수정

export async function ApartmentModifyHo(id,body){
    const fetchRes = await fetchJson(`/users/me/groups/apartments/spots/${id}`,'POST',{
        body:JSON.stringify(body)
    })
    return fetchRes;
}