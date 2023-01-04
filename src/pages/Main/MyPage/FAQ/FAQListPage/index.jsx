import { useNavigation } from "@react-navigation/native";
import React from "react";
import styled, { useTheme } from "styled-components/native";

import Button from "~components/Button";
import Typography from "~components/Typography";
import Wrapper from "~components/Wrapper";

import ListBox from "../ListBox";
export const PAGE_NAME = "P__MY_PAGE__FAQ__LIST"

const listData = {
  profile: {
    title:"회원 정보 관련 문의 FAQ",
    contents:["회원정보를 바꾸고싶어요","회원 탈퇴를 하고 싶어요.", "회원 탈퇴 후 동일한 아이디로 재가입이 가능한가요?", "SNS 계정으로 로그인 할 수 있나요?", "외국인도 회원가입이 가능한가요?"]
},
  service: {
    title:"서비스 이용 관련 문의 FAQ",
    contents:["기업 중식 배송 서비스 지역이 어떻게 되나요?", "기업에 커런트 서비스를 도입하고 싶어요."],
},
  order: {
    title:"주문 및 변경 관련 문의 FAQ",
    contents:["주문 마감시간은 언제인가요?", "메뉴취소 및 변경은 어디서 하나요?", "주문 마감시간 내에 점심 주문을 못했어요! 추가가 될까요?", "한번에 여러 일정을 구매할 수 있나요?","점심메뉴는 언제 업로드 되나요?","수령확인을 눌러버렸어요."],
},
  delivery: {
    title:"배송 관련 문의 FAQ",
    contents:["배송 스팟을 변경하고 싶어요"],
},
  refund: {
    title:"취소 및 환불 관련 문의 FAQ",
    contents:["주문 취소하고 싶어요.","음식이 상한거 같아요.", "메뉴를 취소, 환불처리 했는데 아직 카드가 취소되지 않았어요."],
},
}




const Pages =  ({route})=>{
    const themeApp = useTheme();
    const {page} = route?.params;
    console.log(page)
    const navigation = useNavigation();
    return(
        <Wrapper paddingTop={13}>
            <TitleBox>
                <Typography text={'Title02SB'} textColor={themeApp.colors.grey[2]}>{listData[page]?.title}</Typography>
            </TitleBox>
            {listData[page].contents && listData[page]?.contents.map((v)=>{
                return(
                    <ListBox key={v} title={v}/>
                )
            })}
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
const TitleBtnBox = styled.View`
    min-width: 106px;
    max-width: 110px;
    margin-left: 82px;
    align-items: center;
    text-align: center;
    justify-content: center;
`
