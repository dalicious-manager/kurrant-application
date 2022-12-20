import React, {useState} from "react";
import {useForm} from 'react-hook-form';
import { View, Text ,SafeAreaView, ScrollView , Pressable, FlatList} from "react-native";
import styled from "styled-components";

import ArrowDownIcon from '../../../../../assets/icons/Arrow/arrowDown.svg';
import ArrowRightIcon from '../../../../../assets/icons/Arrow/arrowRight.svg';
import QuestionIcon from '../../../../../assets/icons/MealCart/question.svg';
import PayError from "../../../../../assets/icons/Payment/payError.svg";
import According from '../../../../../components/Accordion';
import BottomModal from "../../../../../components/BottomModal";
import Button from '../../../../../components/Button';
import Check from "../../../../../components/Check";
import Form from "../../../../../components/Form";
import Typography from "../../../../../components/Typography";
import { ButtonWrap, ContentWrap, CountWrap, DiningName, MealImage, MealName, PaymentText, PaymentView,PointBoldText,PointText, Price, SalePrice, SalePriceWrap, TotalPrice, TotalPriceTitle, Wrap } from "../../MealCart/Main";

export const PAGE_NAME = 'PAYMENT_PAGE';

const Pages = () => {

    const agreeCheck = useForm();
    const [show,setShow] = useState(false);
    const [ modalVisible, setModalVisible ] = useState(false);

    const PressButton = () => {
        setModalVisible(true);
    }


    return (
        <SafeArea>
            <ViewScroll>
            <BorderWrap>
                <Container>
                    <DeliveryTextWrap>
                        <DeliveryTitle>배송지</DeliveryTitle>
                        <DeliveryText>현대카드스튜디오블랙 7층 키친</DeliveryText>
                    </DeliveryTextWrap>
                    <DeliveryTextWrap>
                        <DeliveryTitle>배송 일시</DeliveryTitle>
                        <DeliveryText>2022년 4월 21 - 2022년 5월 21일</DeliveryText>
                    </DeliveryTextWrap>
                    <View>
                        <DeliveryTitle>주문자 정보</DeliveryTitle>
                        <DeliveryText>이대희(01012345678)</DeliveryText>
                    </View>
                </Container>
                
            </BorderWrap>
            <BorderWrap>
                <Container>
                    <MealInfo onPress={() => setShow(!show)}>
                        <Title>주문 상품 정보</Title>
                        <ArrowDownIcon/>
                    </MealInfo>
                    
                </Container>
                {show && <ProductInfo> 
                    <OrderWrap>
                    <View>
                        <DiningName>4월 21일(월) 점심</DiningName>
                    </View>
                    <ContentWrap>
                        <MealImage source={{uri:'https://cdn.mindgil.com/news/photo/202004/69068_2873_1455.jpg'}}/>
                            <View>
                                <MealName>[폴어스] 리코타 치즈 샐러드</MealName>
                                <SalePriceWrap>
                                    <PointBoldText>20%</PointBoldText>
                                    <Price>8,500원</Price>
                                </SalePriceWrap>
                                <SalePrice>8,500원</SalePrice>
                            </View>
                            <CountWrap>
                                <CountText>수량: 1개</CountText>
                            </CountWrap>
                    </ContentWrap>
                </OrderWrap>
                <OrderWrap>
                <View>
                    <DiningName>4월 21일(월) 점심</DiningName>
                </View>
                <ContentWrap>
                    <MealImage source={{uri:'https://cdn.mindgil.com/news/photo/202004/69068_2873_1455.jpg'}}/>
                        <View>
                            <MealName>[폴어스] 리코타 치즈 샐러드</MealName>
                            <SalePriceWrap>
                                <PointBoldText>20%</PointBoldText>
                                <Price>8,500원</Price>
                            </SalePriceWrap>
                            <SalePrice>8,500원</SalePrice>
                        </View>
                        <CountWrap>
                            <CountText>수량: 1개</CountText>
                        </CountWrap>
                </ContentWrap>
            </OrderWrap>
            </ProductInfo>
                }
            </BorderWrap>
            <BorderWrap>
                <PriceTitle>
                    <Title>최종 결제금액</Title>
                </PriceTitle>
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
                    <Container>
                        <Title>결제 수단</Title>
                        <DeliveryTitle>카드 결제시 등록한 카드로 결제가 진행됩니다.</DeliveryTitle>
                    <Card>
                        {/* <CardText>결제 카드 등록</CardText> */}
                        <CardText>현대카드(1234)</CardText>
                        <PayInfoWrap>
                            <PayInfo>
                                <PayError/>
                                <PayText>결제불가</PayText>
                            </PayInfo>
                            <ArrowRight/>
                        </PayInfoWrap>
                    </Card>
                    
                    </Container>
                    
                </BorderWrap>
                <FormWrap>
                    
                        <Form form={agreeCheck}>
                            <Check name="agreeCheck" >
                                <Label>구매 조건 확인 및 결제 진행 필수 동의</Label>
                            </Check>
                        </Form>
                </FormWrap>
                </ViewScroll>
                <ButtonWrap>
                    <Button label='총 21개 결제하기' onPressEvent={PressButton}/>
                </ButtonWrap>
                <BottomModal  modalVisible={modalVisible} setModalVisible={setModalVisible} title='결제수단 등록이 필요해요' description='최초 1회 등록으로 편리하게 결제할 수 있어요' buttonTitle1='결제 카드 등록하기' buttonType1='yellow'/>
        </SafeArea>
    )
}

export default Pages;

const SafeArea = styled.SafeAreaView`
flex:1;
background-color:${props => props.theme.colors.grey[0]};
`;

const ViewScroll = styled.ScrollView`
margin-bottom:35px;

`;
const Label = styled(Typography).attrs({ text:'Body06R' })`
  color: ${({ theme }) => theme.colors.grey[4]};
`;
const BorderWrap = styled.View`
border-bottom-color: ${props => props.theme.colors.grey[8]};
border-bottom-width: 6px;
padding:24px 0px;
`;

const Container = styled.View`
margin:0px 28px;
`;

const FormWrap = styled.View`
margin: 24px 28px;
`;

const DeliveryTextWrap = styled.View`
margin-bottom:12px;
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

const PriceTitle = styled(PaymentView)`
margin-bottom:24px;
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


const OrderWrap = styled(Wrap)`

`;

const CountText = styled(Typography).attrs({text:'Body05R'})`
color:${props => props.theme.colors.grey[4]};
`;

const MealInfo = styled.Pressable`
flex-direction:row;
justify-content:space-between;
align-items:center;

`;

const ProductInfo = styled.View`
margin-top:16px;
`;

const ArrowRight = styled(ArrowRightIcon)`
color:${props => props.theme.colors.grey[4]};
margin-left:8px;
`;

const PayInfoWrap = styled.View`
flex-direction:row;
align-items:center;
text-align:center;
`;

const PayInfo = styled.View`
flex-direction:row;
align-items:center;
height:56px;
`;

const PayText = styled(Typography).attrs({text:'Body06R'})`
color:${props => props.theme.colors.red[500]};
margin-left:4px;
`;