
import { fetchJson } from '../../utils/fetch';

// 그룹/스팟 신청 목록 (기업 + 아파트)
export async function ApplicationList(){
    const fetchRes = await fetchJson('/application-form/clients','GET');

    return fetchRes;
}

// 유저가 속한 그룹/스팟 조회
export async function GroupSpotCheck(){
    const fetchRes = await fetchJson('/users/me/groups','GET');

    return fetchRes;
}

// 유저 그룹 추가
export async function UserGroupAdd(body){
    const fetchRes = await fetchJson(`/users/me/groups/apartments`,'POST',{
        body:JSON.stringify(body)
    });

    return fetchRes;
}


// 그룹별 스팟 상세 조회
export async function GroupDetail(id){
    const fetchRes = await fetchJson(`/users/me/groups/spots/${id}`,'GET');

    return fetchRes;
}

// 유저 스팟 등록
export async function SpotRegister(body){
    const fetchRes = await fetchJson(`/users/me/groups/spots`,'POST',{
        body:JSON.stringify(body)
    });

    return fetchRes;
}

// 그룹 탈퇴

export async function WithdrawGroup(body){
    const fetchRes = await fetchJson(`/users/me/groups`,'POST',{
        body:JSON.stringify(body)
    });

    return fetchRes;
}