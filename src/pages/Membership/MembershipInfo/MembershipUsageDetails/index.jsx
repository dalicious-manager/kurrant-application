import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {    ScrollView } from "react-native";
import styled, { useTheme } from "styled-components/native";

import Typography from "~components/Typography";

import useMembership from "../../../../biz/useMembership";
import useUserInfo from "../../../../biz/useUserInfo";
import Label from "../../../../components/Label";
import withCommas from "../../../../utils/withCommas";



export const PAGE_NAME = "P__MEMBERSHIP__USAGE__DETAIL"
const Pages= ()=>{
    const themeApp = useTheme();
    const {getMembershipHistory} = useMembership();
    const {isUserInfo} = useUserInfo();
    const [membershipHistory ,setMebershipHistory] = useState();
    const getData = async()=>{
      const {statusCode,data} = await getMembershipHistory();
      if(statusCode === 200){
        // console.log(data);
        setMebershipHistory(data);
      }
      
    }
    useEffect(()=>{
      getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return(
          <>
            <ScrollView>
              <Container>
              {/** 타이틀 영역 */}
              <MembershipTitleBox>
                <MembershipTitle text={'Title03SB'} textColor={themeApp.colors.grey[2]}>{isUserInfo.name}님의 멤버십 이용내역</MembershipTitle>
                <MembershipDescription text={'Body06R'} textColor={themeApp.colors.grey[4]}>커런트 멤버십 이용에 감사드립니다.
                </MembershipDescription>
              </MembershipTitleBox>

              <Line />
              {/** 주문 상품 정보 */}
              <ProductInfoContainer >
                {membershipHistory?.map((membership,index)=>{
                  return (
                    <SubscriptionBox key={index}>
                        <TextBox>
                            <Label size="labelM" type={membership.membershipSubscriptionType === "월간구독" ? "blue": "green"} label={membership.membershipSubscriptionType}/>
                            <Typography text={'Body05SB'} textColor={themeApp.colors.grey[2]}>{withCommas(membership.discountedPrice)} 원</Typography>
                        </TextBox>
                        <TextBox>
                            <Typography text={'Body06R'} textColor={themeApp.colors.grey[2]}>기간</Typography>
                            <Typography text={'Body06R'} textColor={themeApp.colors.grey[2]}>{`${membership.startDate} ~ ${membership.endDate}`}</Typography>
                        </TextBox>
                        <TextBox>
                            <Typography text={'Body06R'} textColor={themeApp.colors.grey[2]}>총 이용기간</Typography>
                            <Typography text={'Body06R'} textColor={themeApp.colors.grey[2]}>{membership.membershipUsingPeriod} 개월</Typography>
                        </TextBox>
                    </SubscriptionBox>
                  )
                })}
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