import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import styled from 'styled-components/native';

import Wrapper from "~components/Wrapper";

import ListBox from "../../ListBox";
import { PAGE_NAME as MarketingAgreePageName} from "../MarketingAgree";
export const PAGE_NAME = "P__MY_PAGE__NOTIFICATION_SETTING"
const Pages = ()=>{
   const form = useForm();
   const toggleData=[{
    isToggle:true,
    toggleName:'isMarketingAlarmAgree',
    toggleAgree:false,
    toggleEvent:(name)=>alarmAgree(name)
   },{
    isToggle:true,
    toggleName:'isOrderAlarmAgree',
    toggleAgree:false,
    toggleEvent:(name)=>alarmAgree(name)
   }]
   const alarmAgree = (name)=>{
    const data = form.watch(name);
    console.log(name,data);
   }
    return(
        <Wrapper paddingTop={24}>
            <FormProvider {...form}>
                <ListBox title="혜택 및 소식 알림" toggle={toggleData[0]} isArrow={false}/>
                <ListBox title="주문 알림" toggle={toggleData[1]} isArrow={false}/>
                <ListBox title="마케팅 정보 수신 동의" description="동의함" routeName={MarketingAgreePageName}/>
            </FormProvider>
        </Wrapper>  
    )
}

export default Pages;

