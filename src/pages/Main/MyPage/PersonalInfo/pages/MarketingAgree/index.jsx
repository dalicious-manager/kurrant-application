import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { ActivityIndicator } from "react-native";
import styled, { useTheme } from 'styled-components/native';

import Button from "~components/Button";
import Typography from "~components/Typography";
import Wrapper from "~components/Wrapper";

import useUserMe from "../../../../../../biz/useUserMe";
import { setStorage } from "../../../../../../utils/asyncStorage";

export const PAGE_NAME = "P__MY_PAGE__MARKETING_AGREE"
const Pages = ()=>{

    const {alarmLookup ,alarmSetting,readableAtom:{alarm ,isAlarmLookUpLoading}}=useUserMe();
    const themeApp = useTheme();
    const navigation = useNavigation();
    const alarmData = async()=>{
        await alarmLookup();
        
    }
    const onSetAlarm = async()=>{
        await alarmSetting({'isMarketingAlarmAgree':!(alarm.isMarketingAlarmAgree || alarm.isOrderAlarmAgree),'isOrderAlarmAgree' : !(alarm.isMarketingAlarmAgree || alarm.isOrderAlarmAgree) ,"isMarketingInfoAgree": false,});
        await setStorage("isMarketing",`${!(alarm.isMarketingAlarmAgree || alarm.isOrderAlarmAgree)}`)
        navigation.goBack();
    }
    useEffect(()=>{
        alarmData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    if(isAlarmLookUpLoading){
        return <LoadingBox>
            <ActivityIndicator size={'large'} color={themeApp.colors.yellow[500]}/>
          </LoadingBox>
    }
    return(
        <Wrapper paddingTop={40} paddingHorizontal={20}>
            <TextBox>
                <Typography text={'Body06R'} textColor={'#90909F'}>마케팅 수신 동의{'\n'}
                    1. 광고성 정보의 이용목적{'\n'}
                    커런트가 제공하는 이용자 맞춤형 서비스 및 상품 추천, 각종 경품 행사, 이벤트 등의 광고성 정보를 푸시 등을 통해 이용자에게 제공합니다.{'\n'}{'\n'}
                    - 마케팅 수신 동의는 거부하실 수 있으며 동의 이후에라도 고객의 의사에 따라 동의를 철회할 수 있습니다. 
                    동의를 거부하시더라도 커런트가 제공하는 서비스의 이용에 제한이 되지 않습니다. 단, 할인, 
                    이벤트 및 이용자 맞춤형 상품 추천 등의 마케팅 정보 안내 서비스가 제한됩니다.{'\n'}
                    {'\n'}

                    2. 미동의 시 불이익 사항{'\n'}
                    개인정보보호법 제22조 제5항에 의해 선택정보 사항에 대해서는 동의 거부하시더라도 서비스 이용에 제한되지 않습니다. 
                    단, 할인, 이벤트 및 이용자 맞춤형 상품 추천 등의 마케팅 정보 안내 서비스가 제한됩니다.{'\n'}
                    {'\n'}
                    3. 서비스 정보 수신 동의 철회{'\n'}
                    커런트에서 제공하는 마케팅 정보를 원하지 않을 경우 ‘설정 &gt; 개인정보 &gt; 알림설정’에서 철회를 요청할 수 있습니다.
                    또한 향후 마케팅 활용에 새롭게 동의하고자 하는 경우에는 ‘설정 &gt; 개인정보 &gt; 알림설정’에서 동의하실 수 있습니다.
                </Typography>
            </TextBox>
            <ButtonBox>
                <Button label={alarm.isMarketingAlarmAgree || alarm.isOrderAlarmAgree ?"동의 철회하기" : "동의하고 알림받기"} type={alarm.isMarketingAlarmAgree || alarm.isOrderAlarmAgree ?"grey7" : "yellow"} onPressEvent={onSetAlarm}/>
            </ButtonBox>
        </Wrapper>  
    )
}

export default Pages;

const ButtonBox = styled.View`
    width: 100%;
    position: absolute;
    bottom: 35px;
    left: 20px;
    justify-content: center;
    align-items: center;
`
const TextBox = styled.View`
    padding-left: 4px;
    padding-right: 4px;
`
const LoadingBox = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 99;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: white;
`