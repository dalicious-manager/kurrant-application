import {useAtom} from 'jotai';

import * as Fetch from './Fetch';

const useApartApplication = () => {
    const apartApplication = async (body,option={}) => {
        try {
            console.log(body,'hook')
            const res = await Fetch.ApartmentApplication({
                ...body
            },
            option
            );
            return res;

        } catch(err){
            throw err;
        }
    }

    return {
        apartApplication
    }
}

export default useApartApplication;