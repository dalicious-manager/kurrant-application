import { useNavigation } from "@react-navigation/native";
import React, {useRef, useState} from "react";
import {useForm} from 'react-hook-form';
import { View, Alert} from "react-native";
import KeyboardAvoidingView from "react-native/Libraries/Components/Keyboard/KeyboardAvoidingView";
import styled from "styled-components";

import FastImage from "react-native-fast-image";
import ArrowDownIcon from '../../../../../assets/icons/Arrow/arrowDown.svg';
import ArrowRightIcon from '../../../../../assets/icons/Arrow/arrowRight.svg';
import PayError from "../../../../../assets/icons/Payment/payError.svg";
import useShoppingBasket from "../../../../../biz/useShoppingBasket/hook";
import useUserInfo from "../../../../../biz/useUserInfo";
import BottomModal from "../../../../../components/BottomModal";
import Button from '../../../../../components/Button';
import Check from "../../../../../components/Check";
import Form from "../../../../../components/Form";
import Typography from "../../../../../components/Typography";
import { formattedDate, formattedMonthDay } from "../../../../../utils/dateFormatter";
import withCommas from "../../../../../utils/withCommas";
import { ButtonWrap, ContentWrap, CountWrap, DiningName, MealImage, MealName, PaymentText, PaymentView,PointBoldText,PointInput,PointInputWrap,PointText, PointUnitText, PointWrap, PressableView, Price, QuestionIcon, SalePrice, SalePriceWrap, TotalPrice, TotalPriceTitle, Wrap, XIcon } from "../../MealCart/Main";

export const PAGE_NAME = 'PAYMENT_PAGE';

const Pages = ({route}) => {
  console.log(route.params)
    const navigation = useNavigation();
    const agreeCheck = useForm();
    const [show,setShow] = useState(false);
    const [ modalVisible, setModalVisible ] = useState(false);
    const [ modalVisible2, setModalVisible2 ] = useState(false);
    const [ modalVisible3, setModalVisible3 ] = useState(false);
    const {isLoadMeal} = useShoppingBasket();
    const {isUserInfo} = useUserInfo();
    const inputRef = useRef();
    const {deliveryFee, discountPrice, membershipPrice,periodDiscountPrice,supportPrice,totalCount,totalMealPrice,totalPrice } = route.params
    
    const PressButton = () => {
        setModalVisible(true);
    }

    const pointButton = () => {
        setModalVisible2(true);
    }

    const fundButton = () => {
        setModalVisible3(true);
    }

    const closeModal = () => {
        setModalVisible2(false);
        
    };


    const handleEventPayments = ()=>{
        console.log(agreeCheck.watch(agreeCheck).agreeCheck);
        if(agreeCheck.watch(agreeCheck).agreeCheck){
            console.log('동의함');
            PressButton();
          //navigation.navigate(MembershipJoinComplatePageName)
        }else{
            Alert.alert(
                '동의가 필요합니다',
                '결제 진행 필수사항에 동의해주세요',
                [
                    {
                        text:'확인'
                    }
                ]
            )
        }        
      }

    const date = isLoadMeal.map(el => el.serviceDate);
    
    const deliveryStart = date.reduce((prev,curr) => {
        return new Date(prev).getTime() <= new Date(curr).getTime() ? prev : curr;
    });

    const deliveryEnd = date.reduce((prev,curr) => {
        return new Date(prev).getTime() <= new Date(curr).getTime() ? curr : prev;
    });

    const clearInput = () => {
        inputRef.current.setNativeProps({ text: ''  }); 
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
                        <DeliveryText>{formattedDate(deliveryStart,'년월일')} - {formattedDate(deliveryEnd,'년월일')}</DeliveryText>
                    </DeliveryTextWrap>
                    <View>
                        <DeliveryTitle>주문자 정보</DeliveryTitle>
                        <DeliveryText>{isUserInfo?.name}(01012345678)</DeliveryText>
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
                       {isLoadMeal?.map((meal,idx) => {
                        const borderLast = isLoadMeal[isLoadMeal.length -1];
                         const price = meal.price * meal.count;
                         const mealDiscountPrice = ((meal.price * meal.count) - ((meal.price * meal.count) * meal.discountRate)) - meal.supportPrice;
                        return (
                            <OrderWrap key={idx} idx={idx}>
                            <View>
                                <DiningName>{formattedMonthDay(meal.serviceDate)} {meal.diningType}</DiningName>
                            </View>
                            <ContentWrap>

                            <FastImage source={{uri:`${meal.img}`,priority:FastImage.priority.high}}
                                style={{
                                    width:45,
                                    height:45,
                                    borderRadius:7,
                                    marginRight:12,
                                }}
                                />
                                    <MealNameView>
                                        <MealName numberOfLines={1} ellipsizeMode="tail">[{meal.makers.name}] {meal.name} </MealName>
                                        {/* 할인 적용 되면  */}
                                        <SalePriceWrap>
                                            <PointBoldText>{(meal.discountRate)*100}%</PointBoldText>
                                        <Price>{withCommas(mealDiscountPrice)}원</Price>
                                        </SalePriceWrap>
                                        {/* 할인 전 가격 */}
                                        <SalePrice>{withCommas(price)}원</SalePrice>
                                        {/* 할인 하나도 없을 때 */}
                                        {/* <Price>{withCommas(price)}원</Price> */}
                                    </MealNameView>
                                    <CountWrap>
                                        <CountText>수량: {meal.count}개</CountText>
                                    </CountWrap>
                            </ContentWrap>
                            {!(borderLast === meal) && <Border/>}
                            
                            </OrderWrap>
                        )
                       })}
                    </ProductInfo>
                    }
            </BorderWrap>
            <BorderWrap>
                <PriceTitle>
                    <Title>최종 결제금액</Title>
                </PriceTitle>
                    <PaymentView>
                        <PaymentText>총 상품금액</PaymentText>
                        {/* <PaymentText>{withCommas(totalMealPrice)}원</PaymentText> */}
                    </PaymentView>
                    <PaymentView>
                        <PressableView onPress={fundButton}>
                            <PaymentText>회사 지원금 사용 금액</PaymentText>
                            <QuestionIcon/>
                         </PressableView>
                         {/* <PaymentText>-{supportPrice === 0 ? 0 : withCommas(supportPrice)}원</PaymentText> */}
                    </PaymentView>
                    <PaymentView>
                        <PaymentText>총 할인금액</PaymentText>
                        <PaymentText>-10,000원</PaymentText>
                    </PaymentView>
                        <DiscountView>
                            <Bar/>
                            <DiscountTextWrap>
                                <DiscountTextView>
                                    <DiscountText>멤버십 할인금액</DiscountText>
                                    {/* <DiscountText>{membershipPrice === 0 ? 0 : withCommas(membershipPrice)}원</DiscountText> */}
                                </DiscountTextView>
                                <DiscountTextView>
                                    <DiscountText>판매자 할인금액</DiscountText>
                                    {/* <DiscountText>{discountPrice === 0 ? 0 : withCommas(discountPrice)}원</DiscountText> */}
                                </DiscountTextView>
                                <DiscountTextView>
                                    <DiscountText>기간 할인금액</DiscountText>
                                    {/* <DiscountText>{periodDiscountPrice === 0 ? 0 : withCommas(periodDiscountPrice)}원</DiscountText> */}
                                </DiscountTextView>
                            </DiscountTextWrap>
                        </DiscountView>
                    <PaymentView>
                        <PaymentText>배송비</PaymentText>
                        {/* <PaymentText>{deliveryFee === 0 ? 0 : withCommas(deliveryFee)}원</PaymentText> */}
                    </PaymentView>
                    <PaymentView>
                        <PressableView onPress={pointButton}>
                            <PaymentText>포인트 사용금액</PaymentText>
                            <QuestionIcon />
                        </PressableView>
                        <KeyboardAvoidingView>
                            <PointWrap>
                                <PointInputWrap>
                                    <PointInput keyboardType="number-pad" ref={inputRef}/>
                                    <XIcon onPress={clearInput}/>
                                </PointInputWrap>
                                <PointUnitText>P</PointUnitText>
                            </PointWrap>
                        </KeyboardAvoidingView>
                      </PaymentView>
                      <UserPointView>
                            {/* <UserPointText>잔여 {isUserInfo.point === 0 ? 0 : withCommas(isUserInfo.point)}P</UserPointText> */}
                      </UserPointView>
                      <PaymentView>
                            <TotalPriceTitle>총 결제금액</TotalPriceTitle>
                            {/* <TotalPrice>{withCommas(totalPrice)} 원</TotalPrice> */}
                      </PaymentView>
                </BorderWrap>
                <BorderWrap>
                    <Container>
                        <Title>결제 수단</Title>
                        <DeliveryTitle>카드 결제시 등록한 카드로 결제가 진행됩니다.</DeliveryTitle>
                    <Card>
                        <NoPayInfoWrap>
                            <CardText>결제 카드 등록</CardText>
                            <ArrowRight/>
                        </NoPayInfoWrap>
                        {/* <CardText>현대카드(1234)</CardText> */}
                        {/* <PayInfoWrap>
                            <PayInfo>
                                <PayError/>
                                <PayText>결제불가</PayText>
                            </PayInfo>
                            <ArrowRight/>
                        </PayInfoWrap> */}
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
                    <Button label={`총 ${totalCount}개 결제하기`} onPressEvent={()=>{handleEventPayments()}}/>
                </ButtonWrap>
                <BottomModal modalVisible={modalVisible3} setModalVisible={setModalVisible3} title={'지원금이란?'} description={'고객님의 회사에서 지원하는 지원금입니다. \n 결제시 사용 가능한 최대 금액으로 자동 적용됩니다.'} buttonTitle1={'확인했어요'} buttonType1={'grey7'} onPressEvent1={closeModal}/>
                <BottomModal  modalVisible={modalVisible} setModalVisible={setModalVisible} title='결제수단 등록이 필요해요' description='최초 1회 등록으로 편리하게 결제할 수 있어요' buttonTitle1='결제 카드 등록하기' buttonType1='yellow'/>
                <BottomModal modalVisible={modalVisible2} setModalVisible={setModalVisible2} title={'포인트란?'} description={'고객님의 회사에서 지원하는 식사 지원금 및 구독 메뉴 취소시 적립되는 환불 포인트입니다. 결제시 사용 가능한 최대 금액으로 자동 적용됩니다.'} buttonTitle1={'확인했어요'} buttonType1={'grey7'} onPressEvent1={closeModal}/>
        </SafeArea>
    )
}

export default Pages;

const SafeArea = styled.View`
flex:1;
background-color:${props => props.theme.colors.grey[0]};
padding-bottom:60px;
`;

const ViewScroll = styled.ScrollView`
flex:1;

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
margin:0px 24px;
`;

const FormWrap = styled.View`
margin: 24px;
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


const OrderWrap = styled.View`
flex:1;
position:relative;
margin:0px 24px;
`;

const Border = styled.View`
background-color:${props => props.theme.colors.grey[8]};
height:1px;
margin:24px 0px;
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

const NoPayInfoWrap = styled.View`
flex-direction:row;
align-items:center;
text-align:center;
justify-content:space-between;
width:100%;
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

const MealNameView = styled.View`
width:80%;
`;

const UserPointView = styled.View`
flex-direction:row;
justify-content:flex-end;
margin:0px 24px;
`;

const UserPointText = styled(Typography).attrs({text:'SmallLabel'})`
color:${({theme}) => theme.colors.grey[4]};
margin-bottom:24px;
`;

const Bar = styled.View`
background-color:${({theme}) => theme.colors.grey[7]};
height:62px;
width:3px;

`;

const DiscountText = styled(Typography).attrs({text:'CaptionR'})`
color:${({theme}) => theme.colors.grey[5]};
`;

const DiscountView = styled.View`
flex-direction:row;
margin:0px 24px 16px 32px;
`;

const DiscountTextWrap = styled.View`
justify-content:space-between;
padding-left:12px;
width:100%;

`;

const DiscountTextView = styled.View`
flex-direction:row;
justify-content:space-between;

`;