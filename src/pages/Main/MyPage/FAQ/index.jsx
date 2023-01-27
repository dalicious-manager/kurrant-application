import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import styled, { useTheme } from "styled-components/native";
import {Linking} from "react-native";
import Button from "~components/Button";
import Typography from "~components/Typography";
import Wrapper from "~components/Wrapper";
import useFAQ from "../../../../biz/useFAQ";

import {PAGE_NAME as FAQListPageName } from "./FAQListPage"
import ListBox from "./ListBox";

export const PAGE_NAME = "P__MY_PAGE__FAQ"
const kakaoURL = 'https://pf.kakao.com/_uAxixjxb';
const Pages =  ()=>{
    const themeApp = useTheme();
    const navigation = useNavigation();
    const {getFAQ,readableAtom:{FAQ,FAQTitle}} = useFAQ();
   
    useEffect(()=>{
        const getFAQList =async()=>{
            await getFAQ();
        }
        getFAQList();
    },[])
    return(
        <Wrapper paddingTop={24}>
            <TitleBox>
                <Typography text={'Title02SB'} textColor={themeApp.colors.grey[2]}>커런트 고객센터</Typography>
                <TitleBtnBox>
                    <Button size="button38" label={'1:1문의하기  '} type={'grey7'} text={'Button09SB'} onPressEvent={() => {Linking.openURL(`${kakaoURL}`)}}/>
                </TitleBtnBox>
            </TitleBox>
            <DescriptionBox>
                <Typography text={'Body06R'} textColor={themeApp.colors.grey[4]}>고객센터는 08:00~17:00 운영됩니다.{'\n'}접수된 문의는 평균 30분 이내 답변드립니다.</Typography>
            </DescriptionBox>
            <Line /> 
            <FAQBox>
                <Typography text={'Title02SB'} textColor={themeApp.colors.grey[2]}>FAQ</Typography>
            </FAQBox>
            {FAQTitle?.map((v)=>{
                return <ListBox key={v.titleNo} title={v.title} onPressEvent={()=>navigation.navigate(FAQListPageName,{
                    page:v.titleNo
                })}/>
            })}
            
            {/* <ListBox title="서비스 이용" onPressEvent={()=>navigation.navigate(FAQListPageName,{
                page:"service"
            })}/>
            <ListBox title="주문 및 변경" onPressEvent={()=>navigation.navigate(FAQListPageName,{
                page:"order"
            })}/>
            <ListBox title="배송" onPressEvent={()=>navigation.navigate(FAQListPageName,{
                page:"delivery"
            })}/>
            <ListBox title="취소 및 환불" onPressEvent={()=>navigation.navigate(FAQListPageName,{
                page:"refund"
            })}/> */}
        </Wrapper>
    )
}


export default Pages;

const TitleBox = styled.View`
    margin: 8px 0px;
    padding: 0px 24px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`
const TitleBtnBox = styled.View`
    min-width: 106px;
    max-width: 110px;
    margin-left: 82px;
    align-items: center;
    text-align: center;
    justify-content: center;
`
const DescriptionBox = styled.View`
    margin: 24px;
    margin-top: 33px;
`
const Line = styled.View`
    width: 100%;
    height: 12px;
    background-color: ${({theme})=> theme.colors.grey[8]};
`
const FAQBox = styled.View`
    padding: 16px 24px;
`