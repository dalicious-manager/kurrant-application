import {useAtom} from 'jotai';

import * as Fetch from './Fetch';
import { isUserInfoAtom } from './store';

const useUserMe = () => {

    const [isUserInfo,setUserInfo] = useAtom(isUserInfoAtom);
        
    const userInfo = async () => {
    
        try {
            const res = await Fetch.userInfo();
            setUserInfo(res.data)
           
        } catch (err) {
            throw err;
        }
    };

    return {
        userInfo,
        isUserInfo
        
    }
};




export default useUserMe;