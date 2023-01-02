import { fetchJson } from '../../utils/fetch';


export async function ApartmentApplication(body,option) {
    const fetchRes = await fetchJson('/application-form/apartments', 'POST',{
        ...option,
        body:JSON.stringify(body)
    });


    return fetchRes;
}