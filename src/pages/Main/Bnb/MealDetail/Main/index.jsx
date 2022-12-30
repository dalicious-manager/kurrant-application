
import { useNavigation } from "@react-navigation/native";
import { useAtom } from "jotai";
import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { View ,Text, Platform,SafeAreaView, StatusBar, TouchableOpacity,NativeModules, Animated,ScrollView, TextInput, TouchableWithoutFeedback, KeyboardAvoidingView, Dimensions} from "react-native";
import styled from "styled-components";

import StartIcon from '../../../../../assets/icons/star.svg';
import useFoodDetail from "../../../../../biz/useFoodDetail/hook";
import useShoppingBasket from "../../../../../biz/useShoppingBasket/hook";
import BackButton from "../../../../../components/BackButton";
import Badge from "../../../../../components/Badge";
import Balloon from '../../../../../components/Balloon';
import ShoppingCart from "../../../../../components/BasketButton";
import Button from '../../../../../components/ButtonExtendable';
import MoreButton from '../../../../../components/ButtonMore';
import KeyboardAvoiding from "../../../../../components/KeyboardAvoiding";
import Label from '../../../../../components/Label';
import Modal from '../../../../../components/Modal';
import ReviewPage from '../../../../../components/ReviewPage';
import Typography from "../../../../../components/Typography";
import { formattedWeekDate } from "../../../../../utils/dateFormatter";
import {PAGE_NAME as MealInformationPageName} from '../../MealDetail/Page';
import Skeleton from '../Skeleton';

export const PAGE_NAME = 'MEAL_DETAIL_PAGE';

const Pages = ({route}) => {
    //console.log(route)
    const bodyRef = useRef();
    const navigation = useNavigation();
    const { balloonEvent, BalloonWrap } = Balloon();
    const [focus,setFocus] = useState(false);
    const [count, setCount] = useState(1);
    const [scroll,setScroll] = useState(0);
    const {isFoodDetail,isFoodDetailLoading,foodDetail} = useFoodDetail();
    const {addMeal,loadMeal} = useShoppingBasket();
    
    const headerTitle = isFoodDetail?.name;
    const foodId = route.params.foodId;
    const type = route.params.type;
    const day = route.params.date;
    
    const diningType = type === 'MORNING' ? 1 : type === 'LUNCH' ? 2 : 3;
    const serviceDate = day[0]+'-'+day[1]+'-'+day[2];
    
    // foodId 넘겨줘야함 
    useEffect(()=>{
        async function loadFoodDetail(){
            await foodDetail(foodId);
            await loadMeal();
        }
        loadFoodDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
   
    useLayoutEffect(()=>{
        navigation.setOptions({   
            headerTransparent: true,
            headerStyle: {
                backgroundColor:`${scroll < 60 ? 'transparent' : 'white'}`
              },
            headerTitle:`${scroll > 60 ? `${headerTitle}`: ''}`,
            headerLeft: () => (scroll > 60 ? <BackButton color={'#343337'} margin={[10,0]}/> : <BackButton color={'white'} margin={[10,0]}/>),
            headerRight: () => (scroll > 60 ?  <View><ShoppingCart color={'#343337'} margin={[0,10]}/><Badge/></View>:<View><ShoppingCart color={'white'} margin={[0,10]}/><Badge/></View> )
          });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[headerTitle,navigation, scroll]);

    const addCartPress = async () =>{
        try {
           await addMeal({
                "foodId":foodId,
                "count":count,
                "serviceDate":serviceDate,
                "diningType":diningType
            });
        } catch(err){
            console.log(err)
        }
    }


    const increasePress = () => {
        setCount(prev => Number(prev) + 1);
      };
    const decreasePress = () => {
        setCount(prev => (prev <= 1 ? 1 : prev - 1));
      };

    const handleScroll = (e) => {
        const scrollY =  e.nativeEvent.contentOffset.y;
        setScroll(scrollY);
        ;
    }

    const focusPress = () => {
        setFocus(true);
      };
    const blurPress = () => {
        setFocus(false);
      };

    const changeText = number => {
        setCount(number);
      };

    const PRICE = 7500;
    let result = PRICE.toLocaleString('ko-KR');

    if(isFoodDetailLoading){
        return  <Skeleton/>
    }
 

    return (
        <>
        <Wrap >
            <ScrollViewWrap
             showsVerticalScrollIndicator={false}
             onScroll = { (e) => handleScroll(e) }
             scrollEventThrottle={16}
            >
                <View style={{marginBottom:150}}>
                    {scroll > 60 ? <StatusBar /> : <StatusBar barStyle='light-content'/>}
                    <MealImage source={{uri:'https://cdn.mindgil.com/news/photo/202004/69068_2873_1455.jpg'}}/>
                <Content>
                    <View>
                        <MakersName>{isFoodDetail?.makers}</MakersName>
                        <MealTitle>{isFoodDetail?.name}</MealTitle>
                        <Line>
                            <ReviewWrap>
                                <StartIcon/>
                                <ReviewPoint>4.0</ReviewPoint>
                                <ReviewCount>(132)</ReviewCount>
                            </ReviewWrap>
                            <InformationWrap
                            onPress={()=>{navigation.navigate(MealInformationPageName,{data:isFoodDetail?.originList})}}
                            >
                                <InformationText>알레르기/원산지</InformationText>
                            </InformationWrap>
                        </Line>
                        {/* <MealDsc>{isFoodDetail?.description}</MealDsc> */}
                        <MealDsc>민지님이 좋아하는 마라샹궈 숙주 푸주 버섯 청경채 배추 땅콩소스 마라마라 마라탕탕</MealDsc>
                        {isFoodDetail?.spicy !== null && <Label label={`${isFoodDetail?.spicy}`}/>}
                        <PriceTitleWrap>
                            <PriceTitle>최종 판매가</PriceTitle>
                            <ModalWrap>
                                <Modal/>
                            </ModalWrap>
                        </PriceTitleWrap>
                        <PriceWrap>
                            <Percent>20%</Percent>
                            <SalePrice>{result}원</SalePrice>
                            <Price>15,000원</Price>
                        </PriceWrap>
                    </View>
                </Content>
                <Content>
                    <InfoWrap>
                        <InfoTitleView>
                            <InfoTitle>할인 내역</InfoTitle>
                        </InfoTitleView>
                        <InfoTextView>
                            <InfoTextWrap>
                                <Info>멤버십 할인</Info>
                                <Info>10%</Info>
                            </InfoTextWrap>
                            <InfoTextWrap>
                                <Info>판매자 할인</Info>
                                <Info>20%</Info>
                            </InfoTextWrap>
                            <InfoTextWrap>
                                <Info>기간 할인</Info>
                                <Info>5%</Info>
                            </InfoTextWrap>
                        </InfoTextView>
                    </InfoWrap>

                    <InfoWrap>
                        <InfoTitleView>
                            <InfoTitle>배송 정보</InfoTitle>
                        </InfoTitleView>
                        <InfoTextView>
                            <InfoTextWrap>
                                <Info>단체 배송</Info>
                                <Info>15,000(50개 마다 부과)</Info>
                            </InfoTextWrap>
                            <InfoTextWrap>
                                <Info>개별 배송</Info>
                                <Info>2,200원(5개 마다 부과)</Info>
                            </InfoTextWrap>
                            <InfoTextWrap>
                                <Info>멤버십 회원</Info>
                                <Info>무료 배송</Info>
                            </InfoTextWrap>
                        </InfoTextView>
                    </InfoWrap>
                </Content>
                
                {/* 리뷰자리 */}
                <Content >
                    <View>
                    <ReviewPage/>
                    </View>
                </Content>
                <MoreButton/>
                </View>
                </ScrollViewWrap>

                <KeyboardAvoiding
                    mealDetail
                    blurPress={blurPress}
                    focus={focus}
                    increasePress={increasePress}
                    decreasePress={decreasePress}
                    bodyRef={bodyRef}
                    changeText={changeText}
                    count={count}
                    value={count.toString()}
                />
                { !focus && 
                <ButtonWrap >
                    <Button 
                        price={PRICE} 
                        onPressEvent2={()=>{addCartPress();balloonEvent()}}
                        onPressEvent={() => {bodyRef.current.focus(); focusPress()}} 
                        count={count} 
                        increasePress={increasePress}
                        decreasePress={decreasePress}
                    />
                </ButtonWrap>}
                <BalloonWrap message={'장바구니에 담았어요'}  horizontal={'right'} size={'B'} location={{top:'96px', right:'14px'}}/>
                
         </Wrap>
               
        </>
    )
}
export default Pages;

const Wrap = styled.View`
background-color:${props => props.theme.colors.grey[0]};
position:relative;
flex:1;


`;

const ScrollViewWrap = styled.ScrollView`
background-color:${props => props.theme.colors.grey[0]};

`;

const Content = styled.View`
border-bottom-color:${props => props.theme.colors.grey[8]};
border-bottom-width:6px;
padding: 24px 24px 16px 24px;
`;

const MealImage = styled.Image`
width:100%;
height:380px;
`;

const Line = styled.View`
flex-direction:row;
justify-content:space-between;
`;

const ReviewWrap = styled.View`
flex-direction:row;
align-items:center;
margin-bottom:10px;
`;

const InformationWrap = styled.Pressable`
border: 1px solid ${props => props.theme.colors.grey[7]};
border-radius: 7px;
padding: 5px 12px 4px 12px;
align-self:flex-start;
`;

const PriceTitleWrap = styled.View`
flex-direction:row;
align-items:center;
margin-top:24px;
`;
const PriceWrap = styled.View`
flex-direction:row;
align-items:center;
text-align:center;
`;

const InfoWrap = styled.View`
flex-direction:row;
`;

const InfoTitleView = styled.View`
width:20%;
`;
const InfoTextView = styled.View`
width:80%;
`;

const InfoTextWrap = styled.View`
flex-direction:row;
justify-content:space-between;
`;

const ButtonWrap = styled.View`
position:absolute;
bottom:35px;
padding:0px 16px;
width:100%;
`;

const countText = styled.TextInput`


`;
const KeypadInput= styled.View`
  height:50px;
  flex-direction:row;
  background-color:${props => props.theme.colors.grey[0]};
  justify-content:space-between;
  align-items:center;
  opacity: ${props => props.focus ? 1: 0 };
  
`;

const ModalWrap = styled.View`
margin-left:2px;
width:20px;
`;
const MakersName = styled(Typography).attrs({text:'Body06SB'})`
color:${props => props.theme.colors.grey[2]};
`;

const MealTitle = styled(Typography).attrs({text:'LargeTitle'})`
color:${props => props.theme.colors.grey[2]};
margin-bottom:8px;
`;

const ReviewPoint = styled(Typography).attrs({text:'Body05SB'})`
color:${props => props.theme.colors.grey[2]};
margin-left:4px;
`;

const ReviewCount = styled(Typography).attrs({text:'Body05R'})`
color:${props => props.theme.colors.grey[2]};
margin-left:4px;
`;

const InformationText = styled(Typography).attrs({text:'ButtonSB'})`
color:${props => props.theme.colors.grey[3]};
`;

const MealDsc = styled(Typography).attrs({text:'Body06R'})`
color:${props => props.theme.colors.grey[4]};
margin-bottom:8px;
`;

const PriceTitle = styled(Typography).attrs({text:'CaptionR'})`
color:${props => props.theme.colors.grey[2]};
`;

export const Percent = styled(Typography).attrs({text:'Title03SB'})`
color:${props => props.theme.colors.red[500]};
margin-right:4px;
`;

const SalePrice = styled(Typography).attrs({text:'Title03SB'})`
color:${props => props.theme.colors.grey[2]};
margin-right:4px;
`;

export const Price = styled(Typography).attrs({text:'Body06R'})`
color:${props => props.theme.colors.grey[5]};
text-decoration:line-through;
text-decoration-color:${props => props.theme.colors.grey[5]};
`;

const InfoTitle = styled(Typography).attrs({text:'CaptionR'})`
color:${props => props.theme.colors.grey[3]};

`;

const Info = styled(Typography).attrs({text:'CaptionR'})`
color:${props => props.theme.colors.grey[4]};
margin-bottom:4px;
`;
