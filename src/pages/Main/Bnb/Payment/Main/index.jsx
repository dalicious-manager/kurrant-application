import React from "react";
import {useForm} from 'react-hook-form';
import { View, Text ,SafeAreaView, ScrollView} from "react-native";
import styled from "styled-components";

import ArrowIcon from '../../../../../assets/icons/Arrow/arrowDown.svg';
import QuestionIcon from '../../../../../assets/icons/MealCart/question.svg';
import Button from '../../../../../components/Button';
import Check from "../../../../../components/Check";
import Form from "../../../../../components/Form";
import Typography from "../../../../../components/Typography";
import { PaymentText, PaymentView,PointText, TotalPrice, TotalPriceTitle } from "../../MealCart/Main";

export const PAGE_NAME = 'PAYMENT_PAGE';

const Pages = () => {

    const agreeCheck = useForm();

    return (
        <SafeArea>
            <ScrollView>
            <BorderWrap>
                <Wrap>
                    <View>
                        <DeliveryTitle>배송지</DeliveryTitle>
                        <DeliveryText>현대카드스튜디오블랙 7층 키친</DeliveryText>
                    </View>
                    <View>
                        <DeliveryTitle>배송 일시</DeliveryTitle>
                        <DeliveryText>2022년 4월 21 - 2022년 5월 21일</DeliveryText>
                    </View>
                    <View>
                        <DeliveryTitle>주문자 정보</DeliveryTitle>
                        <DeliveryText>이대희(01012345678)</DeliveryText>
                    </View>
                </Wrap>
                
            </BorderWrap>
            <BorderWrap>
                <Wrap>
                    <Title>주문 상품 정보</Title>
                </Wrap>
            </BorderWrap>
            <BorderWrap>
                <PaymentView>
                    <Title>최종 결제금액</Title>
                </PaymentView>
                    <PaymentView>
                        <PaymentText>총 상품금액</PaymentText>
                        <PaymentText>10,000 원</PaymentText>
                    </PaymentView>
                    <PaymentView>
                        <PaymentText>회사 지원금 사용 금액
                            <QuestionIcon/>
                         </PaymentText>
                         <PaymentText>10,000 원</PaymentText>
                    </PaymentView>
                    <PaymentView>
                        <PaymentText>구독 할인 금액</PaymentText>
                        <PaymentText><PointText>20,000</PointText> 원</PaymentText>
                    </PaymentView>
                    <PaymentView>
                        <PaymentText>배송비</PaymentText>
                        <PaymentText>0 원</PaymentText>
                    </PaymentView>
                    <PaymentView>
                        <PaymentText>포인트 사용금액
                            <QuestionIcon/>
                        </PaymentText>
                    </PaymentView>
                    <PaymentView>
                        
                        <TotalPriceTitle>총 결제금액</TotalPriceTitle>
                        <TotalPrice>10,000 원</TotalPrice>
                    </PaymentView>
                </BorderWrap>
                <BorderWrap>
                    <Wrap>
                        <Title>결제 수단</Title>
                        <DeliveryTitle>카드 결제시 등록한 카드로 결제가 진행됩니다.</DeliveryTitle>
                    <Card>
                        <CardText>결제 카드 등록</CardText>
                        <ArrowIcon/>
                    </Card>
                    
                    </Wrap>
                    
                </BorderWrap>
                <FormWrap>
                    
                        <Form form={agreeCheck}>
                            <Check name="agreeCheck" label="구매 조건 확인 및 결제 진행 필수 동의"/>
                        </Form>
                </FormWrap>
                </ScrollView>
                <Button label='총 21개 결제하기'/>
        </SafeArea>
    )
}

export default Pages;

const SafeArea = styled.SafeAreaView`
flex:1;
background-color:${props => props.theme.colors.grey[0]};
`;

const BorderWrap = styled.View`
border-bottom-color: ${props => props.theme.colors.grey[8]};
border-bottom-width: 6px;
padding:24px 0px;
`;

const Wrap = styled.View`
margin:0px 28px;
`;

const FormWrap = styled.View`
margin: 24px 28px;
`;

const Title = styled(Typography).attrs({text:'Body05SB'})`
color:${props => props.theme.colors.grey[2]};
`;

const DeliveryTitle = styled(Typography).attrs({text:'Body06R'})`
color:${props => props.theme.colors.grey[4]};
`;

const DeliveryText = styled(Typography).attrs({text:'Body05R'})`
color:${props => props.theme.colors.grey[2]};
`;

const Card = styled.View`
height:56px;
width:100%;
border:1px solid ${props => props.theme.colors.grey[7]};
border-radius:14px;
flex-direction:row;
justify-content:space-between;
align-items:center;
margin-top:12px;
padding:17px 24px;
`;

const CardText = styled(Typography).attrs({text:'Body05R'})`
color:${props => props.theme.colors.grey[2]};
`;

const CheckBox = styled(Check)`
margin-top:24px;
`;