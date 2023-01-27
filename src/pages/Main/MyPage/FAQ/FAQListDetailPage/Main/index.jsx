import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect } from "react";
import styled, { useTheme } from "styled-components/native";
import {Linking} from "react-native";
import Typography from "~components/Typography";
import Wrapper from "~components/Wrapper";
import Button from "../../../../../../components/Button";

export const PAGE_NAME = "P__MY_PAGE__FAQ_DETAIL"

const kakaoURL = 'https://pf.kakao.com/_uAxixjxb';
const Pages =  ({route})=>{
    const themeApp = useTheme();
    const {FAQData} = route?.params;

    
    return(
        <Wrapper paddingTop={13}>
            <TitleBox>
                <Typography text={'Title02SB'} textColor={themeApp.colors.grey[2]}>{FAQData?.question}</Typography>
            </TitleBox>
            <Contents>
                <Typography>
                    {FAQData?.answer}
                </Typography>
            </Contents>
            <InquiryBox>
                <Typography text={"Button10R"} textColor={themeApp.colors.grey[4]}>직접 문의를 원하시나요?</Typography>
                <TitleBtnBox>
                    <Button size="button38" label={'1:1문의하기  '} type={'grey7'} text={'Button09SB'} onPressEvent={() => {Linking.openURL(`${kakaoURL}`)}} />
                </TitleBtnBox>
            </InquiryBox>
        </Wrapper>
    )
}


export default Pages;

const TitleBox = styled.View`
    padding: 13px 24px;
    margin-bottom: 7px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`
const Contents = styled.View`
    padding: 24px;

`
const InquiryBox =styled.View`
    padding: 0px 24px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`
const TitleBtnBox = styled.View`
    width: 106px;
    align-items: center;
    text-align: center;
    justify-content: center;
`