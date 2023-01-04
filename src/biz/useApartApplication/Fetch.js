import { fetchJson } from '../../utils/fetch';


export async function ApartmentApplication(body,option) {
    const fetchRes = await fetchJson('/application-form/apartments', 'POST',{
        ...option,
        body:JSON.stringify(body)
    });


    return fetchRes;
}

export async function ApartmentApplicationCheck(id) {
    const fetchRes = await fetchJson(`/application-form/apartments/2`, 'GET');

    return fetchRes;
}

export async function ApartmentApplicationMemo(body) { // id 바꿔야함
    const fetchRes = await fetchJson(`/application-form/apartments/2/memo`, 'PUT',{
       
        body:JSON.stringify(body)
    });
    
    return fetchRes;
}

export async function ApartmentApplicationList(){
    const fetchRes = await fetchJson('/application-form/clients','GET');

    return fetchRes;
}