import {useAtom} from 'jotai';

import * as Fetch from './Fetch';
import { 
    isAlarmSettingLoadingAtom,
    isMyInfoAtom , 
    isMyInfoLoadingAtom ,
    isMyInfoPersonalLoadingAtom,
    isSNSConnectAtom,
    isSNSConnectLoadingAtom,
    isSNSDisconnectLoadingAtom,
    isChangePasswordLoadingAtom
} from './store';

const useUserInfo = () => {

    const [myInfo,setMyInfo] = useAtom(isMyInfoAtom);
    const [myInfoPerson,setMyInfoPerson] = useAtom(isMyInfoAtom);
    const [isConnected , setConnected] = useAtom(isSNSConnectAtom);
    const [isMyInfoLoading,setMyInfoLoading] = useAtom(isMyInfoLoadingAtom);
    const [isMyInfoPersonalLoading,setMyInfoPersonalLoading] = useAtom(isMyInfoPersonalLoadingAtom);
    const [isSNSConnectLoading,setSNSConnectLoading] = useAtom(isSNSConnectLoadingAtom);
    const [isSNSDisconnectLoading,setSNSDisconnectLoading] = useAtom(isSNSDisconnectLoadingAtom);
    const [isAlarmSettingLoading,setAlarmSettingLoading] = useAtom(isAlarmSettingLoadingAtom);
    const [isChangePasswordLoading,setChangePasswordLoading] = useAtom(isChangePasswordLoadingAtom);

    const userMe = async () => {
        
        try {
            setMyInfoLoading(true)
            const res = await Fetch.userMe();
            setMyInfo(res.data)
           
        } catch (err) {
            throw err;
        }finally{
            setMyInfoLoading(false)
        }
    };

    const userMePersonal = async () => {
        
        try {
            setMyInfoPersonalLoading(true)
            const res = await Fetch.userMePersonal();
            setMyInfoPerson(res.data);
            const result  = isConnected.map((data)=>{
                return {
                    social : data.social,
                    email: res.data?.providerEmails.find((v)=> v.provider ===data.social)?.email,
                    isConnect : res.data?.providerEmails.find((v)=> v.provider ===data.social)
                }
            })
            setConnected(result);
            return res.data;
            
        } catch (err) {
            throw err;
        }finally{
            setMyInfoPersonalLoading(false)
        }
    };
    const snsConnect = async (body,type,option={}) => {
        
        try {
            setSNSConnectLoading(true)
            const res = await Fetch.snsConnect( 
                {
                  ...body
                },
                type,
                option
            );
            return res;
        } catch (err) {
            throw err;
        }finally{
            setSNSConnectLoading(false)
        }
    };
    const snsDisconnect = async (type) => {
        
        try {
            setSNSDisconnectLoading(true)
            const res = await Fetch.snsDisconnect(type);
            return res;
        } catch (err) {
            throw err;
        }finally{
            setSNSDisconnectLoading(false)
        }
    };

    const alarmSetting = async (type,value) => {
        
        try {
            setAlarmSettingLoading(true)
            const res = await Fetch.alarmSetting(type,value);
            return res;
        } catch (err) {
            throw err;
        }finally{
            setAlarmSettingLoading(false)
        }
    };

    const changePassword = async (body,option={}) => {
        
        try {
            setChangePasswordLoading(true)
            const res = await Fetch.changePassword( 
                {
                  ...body
                },
                option
            );
            return res;
        } catch (err) {
            throw err;
        }finally{
            setChangePasswordLoading(false)
        }
    };

    return {
        userMe,
        snsConnect,
        snsDisconnect,
        userMePersonal,
        alarmSetting,
        changePassword,
        readableAtom: {
            myInfo,
            myInfoPerson,
            isMyInfoLoading,
            isSNSConnectLoading,
            isSNSDisconnectLoading,
            isMyInfoPersonalLoading,
            isAlarmSettingLoading,
            isChangePasswordLoading
        } 
    }
};




export default useUserInfo;