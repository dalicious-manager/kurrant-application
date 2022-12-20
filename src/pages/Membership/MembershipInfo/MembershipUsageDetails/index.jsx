import { useNavigation } from "@react-navigation/native";
import React from "react";
import {    ScrollView } from "react-native";
import styled, { useTheme } from "styled-components/native";

import Typography from "~components/Typography";

import Label from "../../../../components/Label";



export const PAGE_NAME = "P__MEMBERSHIP__USAGE__DETAIL"
const Pages= ()=>{
    const themeApp = useTheme();
    
  
    return(
          <>
            <ScrollView>
              <Container>
              {/** 타이틀 영역 */}
              <MembershipTitleBox>
                <MembershipTitle text={'Title03SB'} textColor={themeApp.colors.grey[2]}>김달리님의 멤버십 이용내역</MembershipTitle>
                <MembershipDescription text={'Body06R'} textColor={themeApp.colors.grey[4]}>커런트 멤버십 이용에 감사드립니다.
                </MembershipDescription>
              </MembershipTitleBox>

              <Line />
              {/** 주문 상품 정보 */}
              <ProductInfoContainer >
                <SubscriptionBox>
                    <TextBox>
                        <Label size="labelM" type="blue" label="월간구독"/>
                        <Typography text={'Body05SB'} textColor={themeApp.colors.grey[2]}>12,000 원</Typography>
                    </TextBox>
                    <TextBox>
                        <Typography text={'Body06R'} textColor={themeApp.colors.grey[2]}>기간</Typography>
                        <Typography text={'Body06R'} textColor={themeApp.colors.grey[2]}>2022.01.02 ~ 2022.02.01</Typography>
                    </TextBox>
                    <TextBox>
                        <Typography text={'Body06R'} textColor={themeApp.colors.grey[2]}>총 이용기간</Typography>
                        <Typography text={'Body06R'} textColor={themeApp.colors.grey[2]}>50 개월</Typography>
                    </TextBox>
                </SubscriptionBox>
              </ProductInfoContainer>

             
                </Container>
            </ScrollView>
           
          </>
        
    )
}

export default Pages;

const Container = styled.View`  
    background-color: white;
`

const MembershipTitle = styled(Typography)`
  margin-bottom: 5px;
`
const MembershipTitleBox = styled.View`
  margin: 24px;
  margin-top: 40px;
`
const MembershipDescription = styled(Typography)`
`
const Line = styled.View`
  width: 100%;
  height: 6px;
  background-color: ${({theme}) => theme.colors.grey[8]};
`;

const ProductInfoContainer = styled.View`
`

const SubscriptionBox = styled.View`
    margin: 24px;
    margin-bottom: 0px;
    padding-bottom: 8px;
    border-bottom-color:${({theme})=> theme.colors.grey[8]} ;
    border-bottom-width: 1px;
`
const TextBox = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 16px;
`