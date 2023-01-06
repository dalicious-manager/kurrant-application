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

export async function ApartmentApplicationMemo(body,id) { // id 바꿔야함
    console.log(body,id)
    const fetchRes = await fetchJson(`/application-form/apartments/${id}/memo`, 'PUT',{
       
        body:JSON.stringify(body)
    });
    
    return fetchRes;
}

export async function ApartmentApplicationList(){
    const fetchRes = await fetchJson('/application-form/clients','GET');

    return fetchRes;
}