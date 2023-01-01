import { useNavigation } from "@react-navigation/native";
import { useAtom } from "jotai";
import React from "react";
import { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ActivityIndicator } from "react-native";
import styled, { useTheme } from 'styled-components/native';

import Toast from "~components/Toast";
import Wrapper from "~components/Wrapper";

import useUserMe from "../../../../../../biz/useUserMe";
import { alarmAtom } from "../../../../../../biz/useUserMe/store";
import ListBox from "../../ListBox";
import { PAGE_NAME as MarketingAgreePageName} from "../MarketingAgree";
export const PAGE_NAME = "P__MY_PAGE__NOTIFICATION_SETTING"
const Pages = ()=>{
   const form = useForm();
   const {alarmLookup,alarmSetting,readableAtom:{alarm,isAlarmSettingLoading}} = useUserMe();
   const navigation = useNavigation();
   const [toggleData ,setToggleData] = useState([])
   const [agree,setAgree] = useState(false)
    const {watch}= form;
    const themeApp = useTheme();
    const {toastEvent, ToastWrap} = Toast();

    
   const alarmAgree = useCallback(async()=>{
        const marketingAlarm = watch('marketingAlarm');
        const orderAlarm = watch('orderAlarm');
        await alarmSetting({'isMarketingAlarmAgree':marketingAlarm,'isOrderAlarmAgree' : orderAlarm ,"isMarketingInfoAgree": false,})
        setAgree(marketingAlarm || orderAlarm);
        if(marketingAlarm || orderAlarm){
            toastEvent()
        }
        // await getAlarm();
   // eslint-disable-next-line react-hooks/exhaustive-deps
   },[])
   const getAlarm = useCallback(async()=>{
    
    const result = await alarmLookup();
    setToggleData([{
        isToggle:true,
        toggleName:'marketingAlarm',
        toggleEvent:(name)=>alarmAgree(name)
       },{
        isToggle:true,
        toggleName:'orderAlarm',
        toggleEvent:(name)=>alarmAgree(name)
       },{
        isToggle:true,
        toggleName:'marketingAgree',
        toggleEvent:(name)=>alarmAgree(name)
       }])
       setAgree(result.data.marketingAgree || result.data.orderAlarm);
   // eslint-disable-next-line react-hooks/exhaustive-deps
   },[])
   const isLoading = isAlarmSettingLoading
    useEffect(()=>{        
        const willFocusSubscription = navigation.addListener('focus', () => {
            toastEvent();
            getAlarm();
        });    
        return willFocusSubscription; 
    },[getAlarm, navigation, toastEvent])
    return(
        <Wrapper paddingTop={24}>
            <FormProvider {...form}>
                <ListBox title="혜택 및 소식 알림" toggle={toggleData[0]}  toggleAgree={alarm.isMarketingAlarmAgree} isArrow={false}/>
                <ListBox title="주문 알림" toggle={toggleData[1]} toggleAgree={alarm.isOrderAlarmAgree}  isArrow={false}/>
                <ListBox title="마케팅 정보 수신 동의" description={ agree ? "동의함": "철회함"} routeName={MarketingAgreePageName}/>
            </FormProvider>
            <ToastWrap message={`${alarm.marketingAgreedDateTime}\n커런트 마케팅 정보 수신에 동의했어요.`} isBottom={true}/>
            {isLoading && <LoadingBox>
        <ActivityIndicator size={'large'} color={themeApp.colors.yellow[500]}/>
      </LoadingBox>}
        </Wrapper>  
    )
}

export default Pages;

const LoadingBox = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 99;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: white;
  opacity: 0.8;
`