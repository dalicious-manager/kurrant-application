import {useAtom} from 'jotai';

import * as Fetch from './Fetch';
import { isUserMeAtom } from './store';

const useUserMe = () => {

    const [isUserMe,setUserMe] = useAtom(isUserMeAtom);
        
    const userMe = async () => {
        try {
            const res = await Fetch.userMe();
            setUserMe(res.items)
           
        } catch (err) {
            throw err;
        }
    };

    return {
        userMe,
        isUserMe
        
    }
};




export default useUserMe;