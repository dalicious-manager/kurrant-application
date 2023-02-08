import { StackActions, useNavigation } from "@react-navigation/native";
import React, {useRef, useState,useEffect, forwardRef} from "react";
import {useForm} from 'react-hook-form';
import { View, Alert,Text, Platform,KeyboardAvoidingView,NativeModules,TouchableWithoutFeedback} from "react-native";
import styled from "styled-components";

import FastImage from "react-native-fast-image";
import ArrowUpIcon from '../../../../../assets/icons/Payment/arrow.svg';
import ArrowDownIcon from '../../../../../assets/icons/Payment/arrowDown.svg';
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
import { ButtonWrap, ContentWrap,DiningName, MealImage, MealName, PaymentText, PaymentView,PointBoldText,PointInput,PointInputWrap,PointText, PointUnitText, PointWrap, PressableView, Price, QuestionIcon, SalePrice, SalePriceWrap, TotalPrice, TotalPriceTitle, XIcon } from "../../MealCart/Main";
import useKeyboardEvent from "../../../../../hook/useKeyboardEvent";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import useUserMe from "../../../../../biz/useUserMe";
import {SCREEN_NAME as RegisterCardPageName} from '../../../../../screens/Main/RegisterCard';
import { PurchaseDetailPageName } from "../../../../../pages/Main/MyPage/PurchaseHistory/Detail";
import { PAGE_NAME as DefaultPaymentManagePageName } from "../DefaultPaymentManage";

export const PAGE_NAME = 'PAYMENT_PAGE';

const Pages = ({route}) => {
  
    const [test,setTest] = useState();
    const { StatusBarManager } = NativeModules;
    const navigation = useNavigation();
    const agreeCheck = useForm();
    const pointRef = useRef();
    const [show,setShow] = useState(false);
    const [ modalVisible, setModalVisible ] = useState(false);
    const [ modalVisible2, setModalVisible2 ] = useState(false);
    const [ modalVisible3, setModalVisible3 ] = useState(false);
    const [statusBarHeight, setStatusBarHeight] = useState(0);
    const [point,setPoint] = useState(0);
    const [pointShow,setPointShow] = useState(false)
    const {isLoadMeal,orderMeal,loadMeal,setQuantity} = useShoppingBasket();
    const {isUserInfo} = useUserInfo();
    const {readableAtom:{selectDefaultCard}}= useUserMe();
    const inputRef = useRef(null);
    const {totalCount,
        totalMealPrice,
        membershipDiscountPrice,
        makersDiscountPrice,
        periodDiscountPrice,
        supportPrice,
        deliveryFee,
        totalDiscountPrice,
        discountPrice,
        totalPrice,
        selected,
        name,
        spotName,
        clientType,
        usedSupportPrice
        } = route.params
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
        setModalVisible3(false);
        
    };

    const keyboardStatus = useKeyboardEvent();
    
    const handleEventPayments = ()=>{
        if(agreeCheck.watch(agreeCheck).agreeCheck){
            if(selectDefaultCard.length === 0){
                PressButton();
            }else{
                orderPress(selected)
            }
          
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

    
    

    const clearInput = () => {
        inputRef.current.setNativeProps({ text: ''  }); 
    }

        
    useEffect(()=>{
        Platform.OS === 'ios' ? StatusBarManager.getHeight((statusBarFrameData) => {
            setStatusBarHeight(statusBarFrameData.height)
        }) : null
    }, []);

    const confirmPress = () =>{
        
        setPointShow(false);
    }

    const onBlurPress = (e)=> {
        e.preventDefault();
      };

    const registerCard = () =>{
        navigation.navigate(RegisterCardPageName,{defaultType:1});
        setModalVisible(false);
    }
    const spotFilter = isLoadMeal.filter(el => el.spotId === selected);
    
    const arr = spotFilter.map(el => {
        return {cartDailyFoodDtoList:[...el.cartDailyFoodDtoList.map(v => {
            return {
                ...v, cartDailyFoods:[...v.cartDailyFoods.filter(food => {
                    return (
                        food.status !== 2
                    )
                })
                ]
            }
        })]}
    })
    
    const arrs = arr.reduce((acc,cur) => {

        return acc.concat(cur)
    })
   // body 값 최종
    const lastArr = arrs.cartDailyFoodDtoList.filter(el => el.cartDailyFoods.length !== 0);

    // 배송일자 계산
    const date = spotFilter?.map(el => el.cartDailyFoodDtoList.map(v => v.serviceDate)).flat();
    
    const deliveryStart = date.reduce((prev,curr) => {
        return new Date(prev).getTime() <= new Date(curr).getTime() ? prev : curr;
    });

    const deliveryEnd = date.reduce((prev,curr) => {
        return new Date(prev).getTime() <= new Date(curr).getTime() ? curr : prev;
    });
    
    const orderPress = async (spotId) => {
        const data = {
            'spotId':spotId,
            "cardId": selectDefaultCard[0]?.id,
            'cartDailyFoodDtoList':lastArr,
            'totalPrice':totalPrice,
            'supportPrice':usedSupportPrice,
            'deliveryFee':deliveryFee,
            'userPoint': isUserInfo.point

        }
        
        try {
            const res = await orderMeal(spotId,data);
            console.log(res);
            loadMeal();
            // setLoadMeal([])           
            const resetAction = StackActions.popToTop();
            navigation.dispatch(resetAction); 
            navigation.navigate(PurchaseDetailPageName,{
                id:res.data
            })
        }catch (err){
            console.log(err)
        }
    }

    return (
        <SafeArea>
            
            <ViewScroll onBlur={onBlurPress}>
            <BorderWrap>
                <Container>
                    <DeliveryTextWrap>
                        <DeliveryTitle>배송지</DeliveryTitle>
                        <DeliveryText>{spotName[0]?.text}</DeliveryText>
                    </DeliveryTextWrap>
                    <DeliveryTextWrap>
                        <DeliveryTitle>배송 일시</DeliveryTitle>
                        <DeliveryText>{formattedDate(deliveryStart,'년월일')} - {formattedDate(deliveryEnd,'년월일')}</DeliveryText>
                    </DeliveryTextWrap>
                    <View>
                        <DeliveryTitle>주문자 정보</DeliveryTitle>
                        <DeliveryText>{isUserInfo?.name}{isUserInfo.phone === null ? '' : `(${isUserInfo.phone})`}</DeliveryText>
                    </View>
                </Container>
                
            </BorderWrap>
            <BorderWrap>
                <Container>
                    <MealInfo onPress={() => setShow(!show)}>
                        <Title>주문 상품 정보</Title>
                        {show ?  <ArrowUpIcon/> : <ArrowDownIcon/> }
                       
                    </MealInfo>
                    
                </Container>
                {show && <ProductInfo>
                {isLoadMeal?.map((el,idx) => {
                    
                    return (
                        <React.Fragment key={idx}>
                            {(selected === el.spotId) && el.cartDailyFoodDtoList.map((m,i) => {
                                const arr = m.cartDailyFoods.filter(v => v.status !== 2);
                               // const borderLast = arr[arr.length - 1];
                                
                                return (
                                    <OrderWrap key={i}>
                                        
                                        {arr.map((meal,index) => {
                                           
                                           const price = meal.price * meal.count;
                                           const mealDiscountPrice = meal.membershipDiscountPrice + meal.makersDiscountPrice + meal.periodDiscountPrice;
                                           const mealDiscountRate = meal.membershipDiscountRate + meal.makersDiscountRate + meal.periodDiscountRate;
                                           return (
                                               <React.Fragment key={index}>
                                                   <ContentHeader>
                                                       <DiningName>{formattedMonthDay(m.serviceDate)} {m.diningType}</DiningName>
                                                   </ContentHeader>
                                               <ContentsWrap >
                                                   <FastImage source={{uri:`${meal.image}`,priority:FastImage.priority.high}}
                                                   style={{
                                                       width:45,
                                                       height:45,
                                                       borderRadius:7,
                                                       marginRight:12,
                                                   }}
                                                   />
                                                   <MealNameView>
                                                       <MealName numberOfLines={1} ellipsizeMode="tail">[{meal.makers}] {meal.name} </MealName>
                                                       
                                                       <PriceView>
                                                       <Price>{withCommas(meal.price - mealDiscountPrice)}원</Price>
                                                       {mealDiscountPrice !== 0 && <SalePrice>{withCommas(price)}원</SalePrice>}
                                                       </PriceView>
                                                       
                                                   </MealNameView>
                                                   
                                                   <CountWrap>
                                                       <CountText>수량: {meal.count}개</CountText>
                                                   </CountWrap>
                                                   
                                               </ContentsWrap>
                                               <Border/>
                                               </React.Fragment>
                                           )
                                       })}
                                    </OrderWrap>
                                )
                            })}
                        </React.Fragment>
                    )
                })}
                </ProductInfo>}
            </BorderWrap>
            <BorderWrap>
                <PriceTitle>
                    <Title>최종 결제금액</Title>
                </PriceTitle>
                    <PaymentView>
                        <PaymentText>총 상품금액</PaymentText>
                        <PaymentText>{withCommas(totalMealPrice)}원</PaymentText>
                    </PaymentView>
                    {clientType[0]?.clientStatus === 1 && <PaymentView>
                        <PressableView onPress={fundButton}>
                            <PaymentText>회사 지원금 사용 금액</PaymentText>
                            <QuestionIcon/>
                         </PressableView>
                         <PaymentText> {supportPrice === 0 ? 0 : discountPrice < supportPrice ? `-${withCommas(discountPrice)}` : `-${withCommas(supportPrice)}`} 원</PaymentText>
                    </PaymentView>}
                    <PaymentView>
                        <PaymentText>총 할인금액</PaymentText>
                        <PaymentText>{totalDiscountPrice === 0 ? 0 : `- ${withCommas(totalDiscountPrice)}`} 원</PaymentText>
                    </PaymentView>
                        <DiscountView>
                            <Bar/>
                            <DiscountTextWrap>
                                <DiscountTextView>
                                    <DiscountText>멤버십 할인금액</DiscountText>
                                    <DiscountText>{membershipDiscountPrice === 0 ? 0 : withCommas(membershipDiscountPrice)} 원</DiscountText>
                                </DiscountTextView>
                                <DiscountTextView>
                                    <DiscountText>판매자 할인금액</DiscountText>
                                    <DiscountText>{makersDiscountPrice === 0 ? 0 : withCommas(makersDiscountPrice)} 원</DiscountText>
                                </DiscountTextView>
                                <DiscountTextView>
                                    <DiscountText>기간 할인금액</DiscountText>
                                    <DiscountText>{periodDiscountPrice === 0 ? 0 : withCommas(periodDiscountPrice) }원</DiscountText>
                                </DiscountTextView>
                            </DiscountTextWrap>
                        </DiscountView>
                    <PaymentView>
                        <PaymentText>배송비</PaymentText>
                        <PaymentText>{deliveryFee === 0 ? 0 : withCommas(deliveryFee)}원</PaymentText>
                    </PaymentView>
                    {/* <PaymentView>
                        <PressableView onPress={pointButton}>
                            <PaymentText>포인트 사용금액</PaymentText>
                            <QuestionIcon />
                        </PressableView>
                        
                            <PointWrap>
                                <Text>- </Text>
                                <PointInputWrap>
                                    <PointInput keyboardType="number-pad" ref={inputRef} 
                                    defaultValue={isUserInfo.point === 0 ? '0' : withCommas(isUserInfo.point.toString())}
                                    onChange={(text)=>setPoint(text)}
                                    />
                                    <XIcon onPress={clearInput}/>
                                </PointInputWrap>
                                <PointUnitText>P</PointUnitText>
                            </PointWrap>
                        
                      </PaymentView> */}
                      {/* <UserPointView>
                            <UserPointText>잔여 {isUserInfo.point === 0 ? 0 : withCommas(isUserInfo.point)}P</UserPointText>
                      </UserPointView> */}
                      <PaymentView>
                            <TotalPriceTitle>총 결제금액</TotalPriceTitle>
                            <TotalPrice>{withCommas(totalPrice)} 원</TotalPrice>
                      </PaymentView>
                </BorderWrap>
                <BorderWrap>
                    <Container>
                        <Title>결제 수단</Title>
                        <DeliveryTitle>카드 결제시 등록한 카드로 결제가 진행됩니다.</DeliveryTitle>
                        {selectDefaultCard[0]?.id  ? 
                            selectDefaultCard.map((card)=>{
                            return (
                                <Card 
                                key={card.id}
                                onPress={() =>
                                    navigation.navigate(DefaultPaymentManagePageName)
                                  }
                                  >
                                {/* <CardText>결제 카드 등록</CardText> */}
                                <CardText>{card.cardCompany}카드({card.cardNumber?.toString().slice(-4)})</CardText>
                                {/* <PayInfoWrap>
                                    <PayInfo>
                                    <PayError />
                                    <PayText>결제불가</PayText>
                                    </PayInfo>
                                    <ArrowRight />
                                </PayInfoWrap> */}
                                <ArrowRight />
                                </Card>
                            )
                            }) : 
                            <Card
                                onPress={() =>
                                    navigation.navigate(DefaultPaymentManagePageName)
                                }
                            >
                                <CardText>결제 카드 등록</CardText>              
                                <ArrowRight />
                            </Card>
                        }
                    
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
                <KeyContainer
                    keyboardVerticalOffset={Platform.OS === "ios" && statusBarHeight+44}
                    behavior={Platform.OS === "ios" ? "padding" : "height"} >
                    {keyboardStatus.isKeyboardActivate && <TouchableWithoutFeedback>
                        <KeyboardInner ref={pointRef}>
                            <Pressable onPress={()=>console.log('3343')}>
                                <PointApply>완료</PointApply>
                            </Pressable>
                        </KeyboardInner>
                    </TouchableWithoutFeedback>}
                </KeyContainer>
                {/* ;handleEventPayments() */}
                {!keyboardStatus.isKeyboardActivate && <ButtonWrap>
                    <Button label={`총 ${totalCount}개 결제하기`} onPressEvent={()=>{handleEventPayments()}}/>
                </ButtonWrap>}
                <BottomModal modalVisible={modalVisible3} setModalVisible={setModalVisible3} title={'지원금이란?'} description={'고객님의 회사에서 지원하는 지원금입니다. \n 결제시 사용 가능한 최대 금액으로 자동 적용됩니다.'} buttonTitle1={'확인했어요'} buttonType1={'grey7'} onPressEvent1={closeModal}/>
                <BottomModal  modalVisible={modalVisible} setModalVisible={setModalVisible} title='결제수단 등록이 필요해요' description='최초 1회 등록으로 편리하게 결제할 수 있어요' buttonTitle1='결제 카드 등록하기' buttonType1='yellow' onPressEvent1={registerCard}/>
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

const Card = styled.Pressable`
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

const KeyContainer = styled.KeyboardAvoidingView`
  /* flex: 1; */
  position: relative;
`

const InnerView = styled.View`
flex-direction:row;
`;

const KeyboardInner = styled.View`
width:100%;
padding:8px 20px;
flex-direction:row;
background-color:${({theme}) => theme.colors.grey[8]};
justify-content:flex-end;
`;

const PointApply = styled(Typography).attrs({text:'Body05R'})`
color:${({theme}) => theme.colors.blue[500]};
`;

const PriceView = styled.View`
flex-direction:row;
`;

const ContentHeader = styled.View`
flex-direction:row;
justify-content:space-between;
align-items:center;

`;

const ContentsWrap = styled(ContentWrap)`
padding-bottom:24px;
`;

const CountWrap = styled.View`
position:absolute;
right:0px;
bottom:0px;
`;