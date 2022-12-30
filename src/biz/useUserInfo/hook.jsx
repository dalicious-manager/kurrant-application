import {useAtom} from 'jotai';

import * as Fetch from './Fetch';
import { isUserInfoAtom, isUserInfoLoadingAtom } from './store';

const useUserInfo = () => {

    const [isUserInfo,setUserInfo] = useAtom(isUserInfoAtom);
    const [isUserInfoLoading,setUserInfoLoading] = useAtom(isUserInfoLoadingAtom);
        
    const userInfo = async () => {
    
        try {
            setUserInfoLoading(true)
            const res = await Fetch.userInfo();
            setUserInfo(res.data)
           
        } catch (err) {
            throw err;
        } finally {
            setUserInfoLoading(false)
        }
    };

    return {
        userInfo,
        isUserInfo,
        isUserInfoLoading
        
    }
};




export default useUserInfo;