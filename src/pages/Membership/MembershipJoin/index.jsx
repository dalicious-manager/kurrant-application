
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {  Alert, ScrollView } from "react-native";
import styled from "styled-components/native";

import useMembership from "../../../biz/useMembership";
import useUserInfo from "../../../biz/useUserInfo";
import useUserMe from "../../../biz/useUserMe";
import Check from "../../../components/Check";
import Form from "../../../components/Form";
import { CommentsIcon, DeliveryFreeIcon, DiscountIcon, PointIcon } from "../../../components/Icon";
import Typography from "../../../components/Typography";
import Wrapper from "../../../components/Wrapper";
import MembershipButton from "./MembershipButton";
import { PAGE_NAME as MembershipJoinPaymentsPageName} from "./MembershipJoinPayments";
import SubtractBox from "./SubtractBox";


export const PAGE_NAME = "P__MEMBERSHIP__JOIN"
const Pages= ()=>{
    const signUpCheck = useForm();
    const navigation = useNavigation();
    const membershipProduct = useMembership();
    const {isUserInfo} = useUserInfo();
    const [membershipData, setMembershipData] = useState();
    const {alarmLookup,getCardList,alarmSetting,readableAtom:{alarm,isAlarmSettingLoading}} = useUserMe();

    const signUpCheck1 = signUpCheck.watch('signUpCheck1')
    const signUpCheck2 = signUpCheck.watch('signUpCheck2')
    const signUpCheck3 = signUpCheck.watch('signUpCheck3')
    const signUpCheck4 = signUpCheck.watch('signUpCheck4')
    const checkAll = () => {
        signUpCheck.setValue('signUpCheck1', signUpCheck.watch('signUpCheckAll'))
        signUpCheck.setValue('signUpCheck2', signUpCheck.watch('signUpCheckAll'))
        signUpCheck.setValue('signUpCheck3', signUpCheck.watch('signUpCheckAll'))
        signUpCheck.setValue('signUpCheck4', signUpCheck.watch('signUpCheckAll'))
        
    };
    const getMembershipData = useCallback(async()=>{
        const {data} = await membershipProduct.getMembershipProduct();
        setMembershipData(data.reverse());
    },[membershipProduct])
    console.log(signUpCheck.watch());

    const  handleSubmit = async(period) => {
        
        if(signUpCheck1&&
            signUpCheck2&&
            signUpCheck3){
                if(signUpCheck4){
                    await alarmSetting({'isMarketingAlarmAgree':true,'isOrderAlarmAgree' : alarm.isOrderAlarmAgree ,"isMarketingInfoAgree": alarm.isMarketingInfoAgree,})
                }else if (!signUpCheck4){
                    await alarmSetting({'isMarketingAlarmAgree':false,'isOrderAlarmAgree' : alarm.isOrderAlarmAgree ,"isMarketingInfoAgree": alarm.isMarketingInfoAgree,})
                }
                navigation.navigate(MembershipJoinPaymentsPageName,{
                    period:period ==="월간구독" ? 'month':'yaers',
                    membershipData:period ==="월간구독" ? membershipData[1]:membershipData[0],
                });
        }else{
            Alert.alert("필수동의사항에 동의해주세요.");
        }   
    };
    const handleSubmitError = () => {
        try {
        console.log("에러");
        } catch (error) {
        console.log(error);
        }
    };

    const disabledCheck =
        signUpCheck1 &&
        signUpCheck2 &&
        signUpCheck3 ;

    useFocusEffect(  
        useCallback(() => {
            getMembershipData()
            getCardList();
            navigation.setOptions({
                tabBarLabelStyle:{fontSize:15,lineHeight:21,fontFamily:'Pretendard-SemiBold',}
            })
        return () => {
            navigation.setOptions({
                tabBarLabelStyle:{fontSize:15,lineHeight:21,fontFamily: 'Pretendard-Regular',}
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])
    );
    return(
        <Wrapper>
            <ScrollView>
            <TitleContainer>
                <Title>
                    {isUserInfo.name}님을 위한 특별한 혜택
                </Title>
                <Description>
                    지금 신청하면 다양한 혜택을 누릴 수 있어요!
                </Description>
                <SubTitle>
                    멤버십 혜택
                </SubTitle>
            </TitleContainer>
            <SubtractWrapper>
                <SubtractView>
                    <SubtractBox text={"정기식사 배송비 무료"}>
                        <DeliveryFreeIcon />
                    </SubtractBox>
                </SubtractView>
                <SubtractView>
                    <SubtractBox text={"정기식사, 마켓 상품 최대 20% 할인"}>
                        <DiscountIcon />
                    </SubtractBox>
                </SubtractView>
                <SubtractView>
                    <SubtractBox text={"정기식사, 마켓 상품 리뷰 등록 시\n추가 포인트 적립(준비중)"} disabled={true}>
                        <CommentsIcon />
                    </SubtractBox>
                </SubtractView>
                <SubtractView>
                    <SubtractBox text={"마켓 상품 구매 시 포인트 적립(준비중)"} disabled={true} >
                        <PointIcon />
                    </SubtractBox>
                </SubtractView>
            </SubtractWrapper>
            <Form form={signUpCheck}>
                <CheckWrap>
                    <Check
                        name="signUpCheckAll"
                        onPressEvents={checkAll}
                        
                    >
                        <TitleLabel>모두 동의합니다.<LabelCation>(선택사항 포함)</LabelCation></TitleLabel> 
                    </Check>
                    <Line />
                    <Check
                        name="signUpCheck1"
                    >
                        <Label>(필수) 멤버십 정기결제에 동의합니다.</Label>
                    </Check>
                    <Check
                        name="signUpCheck2"
                    >
                        <Label>(필수) <EffectLabel onPress={()=>console.log('이용약관')}>이용약관</EffectLabel>에 동의합니다.</Label>
                    </Check>
                    <Check
                        name="signUpCheck3"
                    >
                        <Label>(필수) <EffectLabel onPress={()=>console.log('결제 및 멤버십 유의사항')}>결제 및 멤버십 유의사항</EffectLabel>에 동의합니다.</Label>
                    </Check>
                    <Check
                        name="signUpCheck4" 
                    >
                        <Label>(선택) 멤버십 혜택 및 프로모션 알림에 동의합니다.</Label>
                    </Check>              
                </CheckWrap>
                <ButtonContainer>
                    {membershipData?.map((membership)=>{
                        return <ButtonBox key={membership.membershipSubscriptionType}>
                        <MembershipButton label={membership.membershipSubscriptionType} isSale={membership.discountRate} payments={membership.price} dicountPayments={membership.discountedPrice} onPressEvent={disabledCheck ? ()=>handleSubmit(membership.membershipSubscriptionType): ()=>handleSubmitError()} />  
                    </ButtonBox> 
                    })}             
                </ButtonContainer>
            </Form>

            </ScrollView>
            
        </Wrapper>
    )
}

export default Pages;

const SubtractView = styled.View`
    margin-bottom: 15px;
`
const TitleContainer = styled.View`
    padding-left: 24px;
    padding-right: 24px;
`
const Line = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${({theme}) => theme.colors.grey[8]};
  margin: 8px 0 24px;
`;
const CheckWrap = styled.View`
    margin-top: 24px;
    padding-left: 24px;
    padding-right: 24px;
    margin-bottom: 15px;  
`;
const Label = styled(Typography).attrs({ text:'Body06R' })`
  color: ${({ theme }) => theme.colors.grey[4]};
`;
const TitleLabel = styled(Typography).attrs({ text:'Body05SB' })`
  color: ${({ theme }) => theme.colors.grey[4]};
`;
const EffectLabel = styled(Typography).attrs({text:'Body06SB'})`
    text-decoration-line: underline;
`
const LabelCation = styled(Typography).attrs({ text:'CaptionR' })`
  color: ${({ theme }) => theme.colors.grey[4]};
`;
const Title = styled(Typography).attrs({text:'Title02SB'})`
    margin-top: 40px;
    margin-bottom: 5px;
    color:${({theme})=> theme.colors.grey[2]};
`;


const SubTitle = styled(Typography).attrs({text:'Title02SB'})`
    margin-top: 40px;
    color:${({theme})=> theme.colors.grey[2]};
`;

const Description = styled(Typography).attrs({text:'Body06R'})`
    margin-bottom: 5px;
    color:${({theme})=> theme.colors.grey[4]};
`;
const SubtractWrapper = styled.View`
    padding: 24px;
    padding-bottom: 9px;
    border-bottom-width:6px;
    border-bottom-color: ${({theme})=> theme.colors.grey[8]};;
`;
const ButtonBox = styled.View`
    padding-left: 24px;
    padding-right: 24px;
    margin-top: 9px;
    margin-bottom: 9px;
`
const ButtonContainer = styled.View`
    padding-bottom: 24px;
`
