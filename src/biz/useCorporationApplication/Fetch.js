import { fetchJson } from '../../utils/fetch';

// 아파트 개설 신청
export async function CorporationApplication(body,option) {
    const fetchRes = await fetchJson('/application-form/corporations', 'POST',{
        ...option,
        body:JSON.stringify(body)
    });


    return fetchRes;
}

// 아파트 신청내역 조회
export async function CorporationApplicationCheck(id) {
    const fetchRes = await fetchJson(`/application-form/corporations/${id}`, 'GET');

    return fetchRes;
}

// 아파트 신청서 메모 수정
export async function CorporationApplicationMemo(body,id) { 
    
    const fetchRes = await fetchJson(`/application-form/corporations/${id}/memo`, 'PUT',{
       
        body:JSON.stringify(body)
    });
    
    return fetchRes;
}