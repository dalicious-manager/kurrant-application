import { useFocusEffect, useNavigation } from "@react-navigation/native";
import milliseconds from "date-fns/esm/fp/milliseconds/index";
import { is } from "date-fns/locale";
import { useAtom } from "jotai";
import { atomWithReset } from "jotai/utils";
import React, { useCallback, useEffect, useLayoutEffect, useRef,useState } from "react";
import { Alert, Dimensions, Image, Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import styled from "styled-components";

import DeleteIcon from '../../../../../assets/icons/MealCart/delete.svg';
import Question from '../../../../../assets/icons/MealCart/question.svg';
import X from "../../../../../assets/icons/MealCart/x.svg";
import Minus from "../../../../../assets/icons/MealDetail/minus.svg";
import PlusIcon from "../../../../../assets/icons/MealDetail/plus.svg";
import { loadMealCart } from "../../../../../biz/useShoppingBasket/Fetch";
import useShoppingBasket from "../../../../../biz/useShoppingBasket/hook";
import { isQuantityAtom } from "../../../../../biz/useShoppingBasket/store";
import BottomModal from '../../../../../components/BottomModal';
import Button from '../../../../../components/Button';
import NoMealButton from '../../../../../components/Button';
import Count from "../../../../../components/Count";
import KeyboardAvoiding from "../../../../../components/KeyboardAvoiding";
import Typography from "../../../../../components/Typography";
import { formattedMonthDay } from "../../../../../utils/dateFormatter";
import withCommas from "../../../../../utils/withCommas";
import {PAGE_NAME as PaymentPageName} from '../../Payment/Main';

const windowHeight = Dimensions.get('window').height;
export const PAGE_NAME = 'MEAL_CART_PAGE';
const Pages = () => {

    const navigation = useNavigation();
    const bodyRef = useRef();
    
    const [focus,setFocus] = useState(false);
    const [id, setId] = useState(null);
    const { isLoadMeal,isQuantity,loadMeal, deleteMeal,setLoadMeal } = useShoppingBasket();
    
    const [ modalVisible, setModalVisible ] = useState(false);
    const [ modalVisible2, setModalVisible2 ] = useState(false);
    //console.log(isLoadMeal)
    useFocusEffect(
        useCallback(() => {
          // Do something when the screen is focused
            console.log('들어옴')

          return () => {
            // Do something when the screen is unfocused
            // Useful for cleanup functions
            console.log('나감')
          };
       
        }, [])
      );
     const arr = isLoadMeal.map(m => m.id);
    
     const quantity = isLoadMeal.map(m => m.count);
    //console.log(quantity)


    
     
    const pointButton = () => {
        setModalVisible(true);
    }
    const fundButton = () => {
        setModalVisible2(true);
    }

    const addHandle = (productId) => {
        const addQty = isLoadMeal.map(p => {
            if (productId === p.id){
                return {...p, count:p.count + 1}
        } else return p ; 
        });
 
        setLoadMeal(addQty);
        
    }

    const substractHandle = (productId) => {
        const substracQty = isLoadMeal.map(p => {
            if (productId === p.id){
                return {...p, count:( p.count <= 1? 1:p.count - 1)}
        } else return p ; 
        });
        
        setLoadMeal(substracQty);
        
        
    }
    
    const totalCount = isLoadMeal.map(p => p.count).reduce((acc,cur) => {
        return acc + cur
    });

    const totalPrice = isLoadMeal.map(p => p.count * p.price).reduce((acc,cur) => {
        return acc + cur
    });
    // const totalCount = 1200;
    // const totalPrice = 1200000;
    
    const focusPress = () => {
        setFocus(true);
      };
    const blurPress = () => {
        setFocus(false);
      };

    const changeText = (number,pi) => {
        
        const addQty = isLoadMeal.map(p => {
            if (pi === p.id){
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
        } catch(err) {
            console.log(err)
        }
    }

    // useEffect(()=>{
    //     async function getLoadMeal(){
    //         await loadMeal();
    //     }
    //     getLoadMeal();
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // },[]);

    const propsId = (mealId) => {
        setId(mealId)
    };



    

    return (
        <SafeView>
            {isLoadMeal.length === 0 && <EmptyView>
                <NoMealText>아직 담은 식사가 없어요!</NoMealText>
                <NoMealButtonWrap>
                    <NoMealButton size={'button38'} label={'식사 담으러가기'} type={'white'} text={'Button09SB'}/>
                </NoMealButtonWrap>
            </EmptyView>}
            <ScrollViewWrap showsVerticalScrollIndicator={false}>
                {isLoadMeal?.map((l,idx) => {
                    const price = l.price * l.count;
                    return (
                        <Wrap key={idx}>
                            <ContentHeader>
                                <DiningName>{formattedMonthDay(l.date)} {l.diningType}</DiningName>
                                <Pressable onPress={()=>{deleteButton(l.id)}}><DeleteIcon/></Pressable>
                            </ContentHeader>
                            <ContentWrap>
                            <MealImage source={{uri:'https://cdn.mindgil.com/news/photo/202004/69068_2873_1455.jpg'}}/>
                                <View>
                                    <MealName>[{l.makers}] {l.name}</MealName>
                                    {/* 할인 적용 되면  */}
                                    {/* <SalePriceWrap>
                                        <PointBoldText>20%</PointBoldText>
                                    <Price>{withCommas(el.price)}원</Price>
                                    </SalePriceWrap>
                                    <SalePrice>{withCommas(el.price)}원</SalePrice> */}
                                    <Price>{withCommas(price)}원</Price>
                                </View>
                            <CountWrap>                                
                                    <Count
                                    cart
                                    onPressEvent={() => {bodyRef.current.focus(); focusPress();propsId(l.id)}} 
                                    // count={count} 
                                    addHandle={addHandle}
                                    substractHandle={substractHandle}
                                    quantity={l.count}
                                    id={l.id}
                                />
                                </CountWrap>
                            </ContentWrap>
                        </Wrap>
                    )
                })}
                {isLoadMeal.length !== 0 && 
            
                <PaymentWrap>
                    <PaymentView>
                        <PaymentText>총 상품금액</PaymentText>
                        <PaymentText>{withCommas(totalPrice)}원</PaymentText>
                    </PaymentView>
                    <PaymentView >
                        <PressableView onPress={fundButton}>
                            <PaymentText >회사 지원금 사용 금액</PaymentText>
                            <QuestionIcon />
                         </PressableView>
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
                        <PressableView onPress={pointButton}>
                            <PaymentText>포인트 사용금액</PaymentText>
                            <QuestionIcon />
                        </PressableView>
                        <PointWrap>
                            <PointInputWrap>
                                <PointInput keyboardType="number-pad" />
                                <XIcon/>
                            </PointInputWrap>
                            <PointUnitText>P</PointUnitText>
                        </PointWrap>
                    </PaymentView>
                    <PaymentView>
                        <TotalPriceTitle>총 결제금액</TotalPriceTitle>
                        <TotalPrice>10,000 원</TotalPrice>
                    </PaymentView>
                </PaymentWrap>
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
            
           
            <ButtonWrap focus={focus}>
                <Button label={`총 ${totalCount}개 결제하기`} type={'yellow'} onPressEvent={()=>{navigation.navigate(PaymentPageName)}}/>
            </ButtonWrap>
             
            <BottomModal modalVisible={modalVisible2} setModalVisible={setModalVisible2} title={'지원금이란?'} description={'고객님의 회사에서 지원하는 지원금입니다. 결제시 사용 가능한 최대 금액으롱 자동 적용됩니다.'} buttonTitle1={'확인했어요'} buttonType1={'grey7'} onPressEvent1={closeModal}/>
            <BottomModal modalVisible={modalVisible} setModalVisible={setModalVisible} title={'포인트란?'} description={'고객님의 회사에서 지원하는 식사 지원금 및 구독 메뉴 취소시 적립되는 환불 포인트입니다. 결제시 사용 가능한 최대 금액으로 자동 적용됩니다.'} buttonTitle1={'확인했어요'} buttonType1={'grey7'} onPressEvent1={closeModal}/>
                    
            </SafeView>
    )

}

export default Pages;

const SafeView = styled.SafeAreaView`
background-color:${props => props.theme.colors.grey[0]};
flex:1;
padding-bottom:50px;
`;
const ScrollViewWrap = styled.ScrollView`

 
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
margin:0px 28px;
`;

export const MealImage = styled.Image`
width:45px;
height:45px;
border-radius:7px;
margin-right:12px;
`;

export const PointBoldText = styled(Typography).attrs({text:'Body05SB'})`
color: ${props => props.theme.colors.green[500]};
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

`;
export const PaymentView = styled.View`
flex-direction:row;
justify-content:space-between;
margin:0px 28px;
padding-bottom:16px;
`;

const NoMealButtonWrap = styled.View`
padding:0px 120px;
`;

const EmptyView = styled.View`
justify-content:center;
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