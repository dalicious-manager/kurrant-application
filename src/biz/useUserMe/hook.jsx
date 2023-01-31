import {useAtom} from 'jotai';

import * as Fetch from './Fetch';
import { 
    isAlarmSettingLoadingAtom,
    isAlarmLookUpLoadingAtom,
    isMyInfoAtom , 
    isMyInfoLoadingAtom ,
    isMyInfoPersonalLoadingAtom,
    isSNSConnectAtom,
    isSNSConnectLoadingAtom,
    isSNSDisconnectLoadingAtom,
    isChangePasswordLoadingAtom,
    isSettingEmailLoadingAtom,
    isSettingPhoneNumberLoadingAtom,
    isCardRegistedLoadingAtom,
    isCardListLoadingAtom,
    isCardSettingLoadingAtom,
    alarmAtom,
    cardListAtom,
    cardSimpleListAtom,
    selectDefaultCardAtom,
    selectMembershipCardAtom,
    isCardDeleteLoadingAtom
} from './store';

const useUserMe = () => {

    const [myInfo,setMyInfo] = useAtom(isMyInfoAtom);
    const [myInfoPerson,setMyInfoPerson] = useAtom(isMyInfoAtom);
    const [isConnected , setConnected] = useAtom(isSNSConnectAtom);
    const [isMyInfoLoading,setMyInfoLoading] = useAtom(isMyInfoLoadingAtom);
    const [isMyInfoPersonalLoading,setMyInfoPersonalLoading] = useAtom(isMyInfoPersonalLoadingAtom);
    const [isSNSConnectLoading,setSNSConnectLoading] = useAtom(isSNSConnectLoadingAtom);
    const [isSNSDisconnectLoading,setSNSDisconnectLoading] = useAtom(isSNSDisconnectLoadingAtom);
    const [isAlarmSettingLoading,setAlarmSettingLoading] = useAtom(isAlarmSettingLoadingAtom);
    const [isAlarmLookUpLoading,setAlarmLookUpLoading] = useAtom(isAlarmLookUpLoadingAtom);
    const [alarm,setAlarm] = useAtom(alarmAtom);
    const [cardList,setCardList] = useAtom(cardListAtom);
    const [selectMembershipCard,setSelectMembershipCard] = useAtom(selectMembershipCardAtom);
    const [selectDefaultCard,setSelectDefaultCard] = useAtom(selectDefaultCardAtom);
    const [cardSimpleList,setCardSimpleList] = useAtom(cardSimpleListAtom);
    const [isChangePasswordLoading,setChangePasswordLoading] = useAtom(isChangePasswordLoadingAtom);
    const [isSettingEmailLoading,setSettingEmailLoading] = useAtom(isSettingEmailLoadingAtom);
    const [isSettingPhoneNumberLoading,setSettingPhoneNumberLoading] = useAtom(isSettingPhoneNumberLoadingAtom);
    const [isCardRegistedLoading,setCardRegistedLoading] = useAtom(isCardRegistedLoadingAtom);
    const [isCardListLoading,setCardListLoading] = useAtom(isCardListLoadingAtom);
    const [isCardSettingLoading,setCardSettingLoading] = useAtom(isCardSettingLoadingAtom);
    const [isCardDeleteLoading,setCardDeleteLoading] = useAtom(isCardDeleteLoadingAtom);

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

    const alarmSetting = async (body,option={}) => {
        try {
            setAlarmSettingLoading(true)
            const res = await Fetch.alarmSetting(
                {
                    ...body
                },
                option
            );          
            // setAlarm(
            //     {
            //         "marketingAgreedDateTime": res.data.marketingAgreedDateTime,
            //         "isMarketingInfoAgree": res.data.marketingAgree,
            //         "isMarketingAlarmAgree": res.data.marketingAlarm,
            //         "isOrderAlarmAgree": res.data.orderAlarm,
            //     }
            // );      
            return res;
        } catch (err) {
            throw err;
        }finally{
            setAlarmSettingLoading(false)
        }
    };

    const alarmLookup = async () => {
        
        try {
            setAlarmLookUpLoading(true)
            const res = await Fetch.alarmLookup();
            setAlarm(
                {
                    "marketingAgreedDateTime": res.data.marketingAgreedDateTime,
                    "isMarketingInfoAgree": res.data.marketingAgree,
                    "isMarketingAlarmAgree": res.data.marketingAlarm,
                    "isOrderAlarmAgree": res.data.orderAlarm,
                }
            );
            return res;
        } catch (err) {
            throw err;
        }finally{
            setAlarmLookUpLoading(false)
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
    const settingEmail = async (body,option={}) => {
        
        try {
            setSettingEmailLoading(true)
            const res = await Fetch.settingEmail( 
                {
                  ...body
                },
                option
            );
            return res;
        } catch (err) {
            throw err;
        }finally{
            setSettingEmailLoading(false)
        }
    };
    const settingPhoneNumber = async (body,option={}) => {
        
        try {
            setSettingPhoneNumberLoading(true)
            const res = await Fetch.settingPhoneNumber( 
                {
                  ...body
                },
                option
            );
            return res;
        } catch (err) {
            throw err;
        }finally{
            setSettingPhoneNumberLoading(false)
        }
    };
    const cardRegisted = async (body,option={}) => {
        
        try {
            setCardRegistedLoading(true)
            const res = await Fetch.cardRegisted({
                ...body
              },
              option
            );
            return res;
        } catch (err) {
            throw err;
        }finally{
            setCardRegistedLoading(false)
        }
    };
    const getCardList = async () => {
        
        try {
            setCardListLoading(true);
            const res = await Fetch.getCardList();
            setCardList(res.data);
            setCardSimpleList(res.data.map((v,idx)=>{
                return {
                    id:v.id,
                    text:`${v.cardCompany}카드(${v.cardNumber?.toString().slice(-4)})`
                }
            }));
            setSelectMembershipCard(res.data?.filter((v)=> v.defaultType === 2 || v.defaultType === 3))
            setSelectDefaultCard(res.data?.filter((v)=> v.defaultType === 1 || v.defaultType === 3))
            return res;
        } catch (err) {
            throw err;
        }finally{
            setCardListLoading(false);
        }
    };
    const cardSetting = async (body,option={}) => {
        
        try {
            setCardSettingLoading(true);
            const res = await Fetch.cardSetting({
                ...body
              },
              option
            );
            if(body.defaultType === 1){
                setCardList(cardList.map((v)=>{
                    if(v.id === body.cardId){
                        let defaultType = 1;
                        if(v.defaultType === 2)defaultType = 3;
                        if(v.defaultType !== 3) return {...v ,defaultType:defaultType}
                        return v                
                    }
                    if(v.defaultType === 3){
                        return {...v ,defaultType:2}
                    }
                    if(v.defaultType === 1){
                        return {...v ,defaultType:0}
                    }
                    return v
                }))
            }else if(body.defaultType === 2){
                setCardList(cardList.map((v)=>{
                    if(v.id === body.cardId){
                        let defaultType = 2;
                        if(v.defaultType === 1)defaultType = 3;
                        if(v.defaultType !== 3) return {...v ,defaultType:defaultType}
                        return v       
                    }
                    if(v.defaultType === 3){
                        return {...v ,defaultType:1}
                    }
                    if(v.defaultType === 2){
                        return {...v ,defaultType:0}
                    }
                    return v
                }))
            }
            return res;
        } catch (err) {
            throw err;
        }finally{
            setCardSettingLoading(false);
        }
    };
    const cardDelete = async (body,option={}) => {
        
        try {
            setCardDeleteLoading(true)
            const res = await Fetch.cardDelete({
                ...body
            },option);
            setCardList(cardList.filter((v)=>{
                return v.id !== body.cardId
            }))
            return res;
        } catch (err) {
            throw err;
        }finally{
            setCardDeleteLoading(false)
        }
    };
    return {
        userMe,
        snsConnect,
        snsDisconnect,
        userMePersonal,
        alarmSetting,
        alarmLookup,
        changePassword,
        settingEmail,
        settingPhoneNumber,
        cardRegisted,
        getCardList,
        cardSetting,
        setCardList,
        cardDelete,
        setSelectMembershipCard,
        setSelectDefaultCard,
        readableAtom: {
            myInfo,
            myInfoPerson,
            isMyInfoLoading,
            isSNSConnectLoading,
            isSNSDisconnectLoading,
            isMyInfoPersonalLoading,
            isAlarmSettingLoading,
            isAlarmLookUpLoading,
            isChangePasswordLoading,
            isSettingEmailLoading,
            isSettingPhoneNumberLoading,
            isCardRegistedLoading,
            isCardListLoading,
            isCardSettingLoading,
            isCardDeleteLoading,
            cardList,
            selectMembershipCard,
            selectDefaultCard,
            cardSimpleList,
            alarm
        } 
    }
};




export default useUserMe;