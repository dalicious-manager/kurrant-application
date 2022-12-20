import { useAtom } from "jotai";
import { useEffect } from "react";

import { getStorage } from "../../utils/asyncStorage";
import { loginTokenAtom, isTokenLoadingAtom } from "./store";

export default function useToken() {

    const [token,setToken] = useAtom(loginTokenAtom);
    const [isTokenLoading,setTokenLoading] = useAtom(isTokenLoadingAtom);
    useEffect(()=>{
        const data = async ()=> {
            setTokenLoading(true);
            const isLogin = await getStorage('isLogin');
            if(isLogin !== 'false'){                
                const getToken = await getStorage('token');
                setToken(getToken);
            }
            setTokenLoading(false);
        }        
        if(!token) data();
    },[token,setToken,setTokenLoading])


    return{token ,isTokenLoading}
}