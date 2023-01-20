import {  useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useLayoutEffect, useRef,useState } from "react";
import { Alert, Dimensions, Image, KeyboardAvoidingView, Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import styled from "styled-components";

import FastImage from "react-native-fast-image";
import DeleteIcon from '../../../../../assets/icons/MealCart/delete.svg';
import Question from '../../../../../assets/icons/MealCart/question.svg';
import X from "../../../../../assets/icons/MealCart/x.svg";
import Minus from "../../../../../assets/icons/MealDetail/minus.svg";
import PlusIcon from "../../../../../assets/icons/MealDetail/plus.svg";
import { loadMealCart } from "../../../../../biz/useShoppingBasket/Fetch";
import useShoppingBasket from "../../../../../biz/useShoppingBasket/hook";
import { isQuantityAtom } from "../../../../../biz/useShoppingBasket/store";
import useUserInfo from "../../../../../biz/useUserInfo";
import BottomModal from '../../../../../components/BottomModal';
import Button from '../../../../../components/Button';
import NoMealButton from '../../../../../components/Button';
import Count from "../../../../../components/Count";
import KeyboardAvoiding from "../../../../../components/KeyboardAvoiding";
import Typography from "../../../../../components/Typography";
import { formattedMonthDay } from "../../../../../utils/dateFormatter";
import withCommas from "../../../../../utils/withCommas";
import {PAGE_NAME as BuyMealPageName} from '../../BuyMeal/Main';
import {PAGE_NAME as PaymentPageName} from '../../Payment/Main';

const windowHeight = Dimensions.get('window').height;

export const PAGE_NAME = 'MEAL_CART_PAGE';
const Pages = () => {

    const navigation = useNavigation();
    const bodyRef = useRef();
    const inputRef = useRef();
    const [focus,setFocus] = useState(false);
    const [id, setId] = useState(null);
    const { isLoadMeal,isQuantity,loadMeal, deleteMeal,setLoadMeal,updateMeal, deliveryFee,userPoint} = useShoppingBasket();
    // const [quantity ,setQuantity] = useState([]);
    const [ modalVisible, setModalVisible ] = useState(false);
    const [ modalVisible2, setModalVisible2 ] = useState(false);
    const {isUserInfo} = useUserInfo();

    // console.log(isLoadMeal,'장바구니')
    // useFocusEffect(
    //     useCallback(() => {
    //         // Do something when the screen is focused
    //         console.log('들어옴')
        

    //         return  () => {
    //         // Do something when the screen is unfocused
    //             if(quantity?.length > 0){
    //                 console.log("나감")
    //                 updateMeal({"updateCartList":quantity});
    //                 // setQuantity({})
    //             }
            
    //         };
    
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [updateMeal])
    // );
    useEffect(()=>{
        async function loadCart(){
            try {
                await loadMeal();
            }catch(err){
                console.log(err.toString())
            }
        }
        loadCart();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
  
    // const quantity = isLoadMeal?.map((v)=>{
    //     return {...v , ...v.cartDailyFoods?.map(m => {
    //         return{
    //             dailyFoodId: m.dailyFoodId,
    //             count: m.count
    //         }
    //      })};
    // })
    const pointButton = () => {
        setModalVisible(true);
    }
    const fundButton = () => {
        setModalVisible2(true);
    }
    
    const addHandle = (productId) => {
        const addQty = isLoadMeal.map((v)=> {
            return {...v, cartDailyFoods:[...v.cartDailyFoods.map((food)=>{
                if(food.dailyFoodId  === productId){
                    return {...food,count:food.count+1}
                }else{
                    return {...food}
                }
            })]
            }
        })
        // console.log(test,'didididi')
        setLoadMeal(addQty);
    }

    const substractHandle = (productId) => {
        const substracQty = isLoadMeal.map((v)=> {
        
            return {...v, cartDailyFoods:[...v.cartDailyFoods.map((food)=>{
                if(food.dailyFoodId  === productId){
                    return {...food,count:( food.count <= 1? 1:food.count - 1)}
                }else{
                    return {...food}
                }
            })]
            }
        })
        // const substracQty = isLoadMeal.map(p => {
        //     if (productId === p.dailyFoodId){
        //         return {...p, count:( p.count <= 1? 1:p.count - 1)}
        // } else return p ; 
        // });
    
        setLoadMeal(substracQty);
     
    }
    // 할인 우선순위 : 1.멤버십 2. 판매자할인 3.기간할인
    const arr = isLoadMeal?.map(p => p.cartDailyFoods).flat()

    const totalCount = arr?.map(p => p.count).reduce((acc,cur) => {
        return acc + cur
    },0);

    const totalMealPrice = arr?.map(p => p.count * p.price).reduce((acc,cur) => {
        return acc + cur
    },0);
  
    // 멤버십 할인 금액
    const membershipPrice = arr?.map(p => (p.membershipDiscountPrice * p.count)).reduce((acc,cur) => {
        return acc + cur
    },0);
    
    // 판매자 할인 금액
    const discountPrice = arr?.map(p => (p.makersDiscountPrice * p.count )).reduce((acc,cur) => {
        return acc + cur
    },0);
    
    // 기간 할인 금액
    const periodDiscountPrice = arr?.map(p => (p.periodDiscountPrice * p.count)).reduce((acc,cur) => {
        return acc + cur
    },0);

    // // 회사 지원금
    const supportPrice = isLoadMeal?.map(p => p.supportPrice).reduce((acc,cur) => {
        return acc + cur
    },0);

    // 총 결제금액
    const totalPrice = totalMealPrice - supportPrice - ( membershipPrice + discountPrice + periodDiscountPrice) + deliveryFee
    
    const focusPress = () => {
        setFocus(true);
      };
    const blurPress = () => {
        setFocus(false);
      };

    const changeText = (number,pi) => {
        
        const addQty = isLoadMeal.map(p => {
            if (pi === p.dailyFoodId){
                return {...p, count:Number(number)}
        } else return p ; 
        });
 
        setLoadMeal(addQty);

      };

    const closeModal = () => {
        setModalVisible(false);
        setModalVisible2(false);
        
    };

    const deleteButton = async (foodId) => {
    
        try {
            await deleteMeal(foodId);
            setLoadMeal(isLoadMeal.filter(t => t.dailyFoodId !== foodId));
            
        } catch(err) {
            console.log(err)
        }
    }

    const propsId = (mealId) => {
        setId(mealId)
    };


    const modifyPress = async () => {
        // try {
        //     await updateMeal({"updateCartList":quantity});
        // } catch(err){
        //     throw new Error ('에러남')
        // }
    }

    const clearInput = () => {
        inputRef.current.setNativeProps({ text: ''  }); 
    }
    // console.log(isLoadMeal)
    return (
        <SafeView>
            {isLoadMeal?.length === 0 && <EmptyView>
                <NoMealText>아직 담은 식사가 없어요!</NoMealText>
                <NoMealButtonWrap>
                    <NoMealButton size={'button38'} label={'식사 담으러가기'} type={'white'} text={'Button09SB'} onPressEvent={()=>{navigation.navigate(BuyMealPageName)}}/>
                </NoMealButtonWrap>
            </EmptyView>}
            <ScrollViewWrap showsVerticalScrollIndicator={false}>
                {isLoadMeal?.map((el,idx) => {
                   return (
                    <Wrap key={idx}>
                        <ContentHeader>
                            <DiningName>{formattedMonthDay(el.serviceDate)} {el.diningType}</DiningName>
                            {/* <Pressable onPress={()=>{deleteButton(l.dailyFoodId)}}><DeleteIcon/></Pressable> */}
                        </ContentHeader>
                        {el.cartDailyFoods.map((food,i) => {
                            const rate = food.membershipDiscountRate + food.makersDiscountRate + food.periodDiscountRate;
                            const membership = food.membershipDiscountPrice === null ? 0 : food.membershipDiscountPrice ;
                            const markers = food.makersDiscountPrice === null ? 0 : food.makersDiscountPrice;
                            const period = food.periodDiscountPrice === null ? 0 : food.periodDiscountPrice ;
                            const discountPrice = membership + markers + period;
                            
                            return (
                                <ContentWrap key={i}>
                                    <FastImage source={{uri:`${food.image}`,priority:FastImage.priority.high}}
                                    style={{
                                        width:45,
                                        height:45,
                                        borderRadius:7,
                                        marginRight:12,
                                    }}
                                    />
                                    <MealNameView>
                                        <MealName numberOfLines={1} ellipsizeMode="tail">[{food.makers}] {food.name}</MealName>
                                        
                                        <SalePriceWrap>
                                            <PointBoldText>{rate}%</PointBoldText>
                                        <Price>{withCommas(((food.price)-(discountPrice))*food.count)}원</Price>
                                        </SalePriceWrap>
                                        <SalePrice>{withCommas((food.price)*food.count)}원</SalePrice>
                                        
                                        
                                    </MealNameView>
                                    <CountWrap>                                
                                            <Count
                                                cart
                                                onPressEvent={() => {bodyRef.current.focus(); focusPress();propsId(food.dailyFoodId)}} 
                                                addHandle={addHandle}
                                                substractHandle={substractHandle}
                                                quantity={food.count}
                                                id={food.dailyFoodId}
                                        />
                                    </CountWrap>
                                </ContentWrap>
                            )
                        })}
                    </Wrap>
                   )
                })}
                {isLoadMeal?.length !== 0 && 
                <View >

                
                <PaymentWrap>
                    <PaymentView>
                        <PaymentText>총 상품금액</PaymentText>
                        <PaymentText>{withCommas(totalMealPrice)}원</PaymentText>
                    </PaymentView>
                    <PaymentView >
                        <PressableView onPress={fundButton}>
                            <PaymentText >회사 지원금 사용 금액</PaymentText>
                            <QuestionIcon/>
                         </PressableView>
                            <PaymentText> {supportPrice === 0 ? 0 : `-${withCommas(supportPrice)}`}원</PaymentText>
                    </PaymentView>
                    <PaymentView>
                        <PaymentText>총 할인금액</PaymentText>
                        <PaymentText>- {withCommas(membershipPrice + discountPrice + periodDiscountPrice)}원</PaymentText>
                    </PaymentView>
                    <PaymentView>
                        <PaymentText>배송비</PaymentText>
                        <PaymentText>{deliveryFee === 0 ? 0 : withCommas(deliveryFee)}원</PaymentText>
                    </PaymentView>
                    <PaymentView>
                        <TotalPriceTitle>총 결제금액</TotalPriceTitle>
                        <TotalPrice>{withCommas(totalPrice)} 원</TotalPrice>
                    </PaymentView>
                    <Border/>
                    <UserPointView>
                        <UserPointText>보유포인트 <UserHavePoint>{isUserInfo.point === 0 ? 0 : withCommas(isUserInfo.point)}P</UserHavePoint>(결제시 적용가능)</UserPointText>
                    </UserPointView>
                </PaymentWrap>
                </View>
                }
            </ScrollViewWrap>
            <KeyboardAvoiding
                mealCart
                blurPress={blurPress}
                focus={focus}
                addHandle={addHandle}
                substractHandle={substractHandle}
                bodyRef={bodyRef}
                changeText={changeText}
                id={id}
            />
            
           
            {isLoadMeal?.length !== 0 && <ButtonWrap focus={focus}>
                <Button label={`총 ${totalCount}개 결제하기`} type={'yellow'} 
                // onPressEvent={()=>{navigation.navigate(PaymentPageName,{
                //     totalCount,totalMealPrice,deliveryFee,periodDiscountPrice,membershipPrice,discountPrice,supportPrice,totalPrice
                // })}}
                />
            </ButtonWrap>}
             
            <BottomModal modalVisible={modalVisible2} setModalVisible={setModalVisible2} title={'지원금이란?'} description={'고객님의 회사에서 지원하는 지원금입니다. \n 결제시 사용 가능한 최대 금액으로 자동 적용됩니다.'} buttonTitle1={'확인했어요'} buttonType1={'grey7'} onPressEvent1={closeModal}/>
            <BottomModal modalVisible={modalVisible} setModalVisible={setModalVisible} title={'포인트란?'} description={'고객님의 회사에서 지원하는 식사 지원금 및 구독 메뉴 취소시 적립되는 환불 포인트입니다. 결제시 사용 가능한 최대 금액으로 자동 적용됩니다.'} buttonTitle1={'확인했어요'} buttonType1={'grey7'} onPressEvent1={closeModal}/>
                    
            </SafeView>
    )

}

export default Pages;

const SafeView = styled.View`
background-color:${props => props.theme.colors.grey[0]};
flex:1;
padding-bottom:60px;

`;
const ScrollViewWrap = styled.ScrollView`
 flex:1;
 //margin-bottom:80px;
`;

export const PressableView = styled.Pressable`
flex-direction:row;
align-items:center;
`;

export const QuestionIcon = styled(Question)`
margin-left:4px;
`;

const ContentHeader = styled.View`
flex-direction:row;
justify-content:space-between;
align-items:center;

`;

export const Wrap = styled.View`
flex:1;
padding:24px 0px;
border-bottom-color: ${props => props.theme.colors.grey[8]};
border-bottom-width: 1px;
position:relative;
margin:0px 24px;
`;

export const MealImage = styled.Image`
width:45px;
height:45px;
border-radius:7px;
margin-right:12px;
`;

export const PointBoldText = styled(Typography).attrs({text:'Body05SB'})`
color: ${props => props.theme.colors.red[500]};
padding-right:4px;
`;

export const ContentWrap = styled.View`
flex-direction:row;
padding-top:12px;
padding:24px 0;
`;

export const Price = styled(Typography).attrs({text:'Body05R'})`
color:${props => props.theme.colors.grey[4]};
`;

export const SalePrice = styled(Typography).attrs({text:'Body06R'})`
text-decoration:line-through;
text-decoration-color:${props => props.theme.colors.grey[5]};
color:${props => props.theme.colors.grey[5]};
`;

export const SalePriceWrap = styled.View`
flex-direction:row;
`;

export const CountWrap = styled.View`
position:absolute;
right:0;
bottom:0;
`;

export const ButtonWrap = styled.View`
position:absolute;
bottom:35px;
margin: 0px 24px;
opacity:${({focus}) => focus ? 0 : 1};
`;

const PaymentWrap = styled.View`
border-top-color: ${props => props.theme.colors.grey[8]};
border-top-width: 6px;
padding-top:24px;
padding-bottom:50px;

`;
export const PaymentView = styled.View`
flex-direction:row;
justify-content:space-between;
margin:0px 24px;
padding-bottom:16px;
`;

const NoMealButtonWrap = styled.View`
padding:0px 120px;
`;

const EmptyView = styled.View`
justify-content:flex-end;
align-items:center;
flex:1;

`;

export const DiningName = styled(Typography).attrs({text:'CaptionR'})`
color:${props => props.theme.colors.grey[2]};
`;
export const MealName = styled(Typography).attrs({text:'Body05SB'})`
color:${props => props.theme.colors.grey[2]};
`;

export const PaymentText = styled(Typography).attrs({text:'Body05R'})`
color:${props => props.theme.colors.grey[4]};
//padding-bottom:16px;
`;

export const PointText = styled(Typography).attrs({text:'Body05R'})`
color: ${props => props.theme.colors.green[500]};
`;

export const TotalPriceTitle = styled(Typography).attrs({text:'Title03SB'})`
color: ${props => props.theme.colors.grey[4]};
`;
export const TotalPrice = styled(Typography).attrs({text:'Title03SB'})`
color: ${props => props.theme.colors.grey[2]};
`;

const NoMealText = styled(Typography).attrs({text:'Body05R'})`
color: ${props => props.theme.colors.grey[5]};
margin-bottom:16px;
`;

const InnerView = styled.View`
flex-direction:row;
align-items:center;
justify-content:space-around;
width:98px;
height:38px;
background-color:${props => props.theme.colors.grey[0]};
border:1px solid ${props => props.theme.colors.grey[6]};
border-radius:7px;
`;

 const IconWrap = styled.Pressable`
padding:5px;
height:100%;
justify-content:center;

`;

const MinusIcon = styled(Minus)`
color:${({disabled,theme}) => disabled === 1 ? theme.colors.grey[6]: theme.colors.grey[2]};
`;

export const PointWrap = styled.View`
flex-direction:row;
justify-content:center;
align-items:center;
`;

export const PointInputWrap = styled.View`
width:115px;
height:38px;
border-radius:7px;
border : 1px solid ${({theme}) => theme.colors.grey[7]};
background-color:${({theme}) => theme.colors.grey[0]};
padding:0px 28px 0px 12px;
flex-direction:row;
text-align:center;
align-items:center;
position: relative;
`;

export const PointInput = styled.TextInput`
flex-direction:row;
width:100%;
`;
export const XIcon = styled(X)`
position:absolute;
right:6px;
`;

export const PointUnitText = styled(Typography).attrs({text:'Title04R'})`
color:${({theme}) => theme.colors.grey[2]};
margin-left:8px;
`;

const MealNameView = styled.View`
width:80%;
`;

const UserPointView = styled.View`
flex-direction:row;
justify-content:flex-end;
margin:0px 24px;
`;

const UserPointText = styled(Typography).attrs({text:'CaptionR'})`
color:${({theme}) => theme.colors.grey[4]};
margin-top:16px;
`;
const UserHavePoint = styled(Typography).attrs({text:'CaptionR'})`
color:${({theme}) => theme.colors.blue[500]};

`;

const Border = styled.View`
background-color:${({theme}) => theme.colors.grey[8]};
/* width:100%; */
height:1px;
margin:0px 24px;

`;