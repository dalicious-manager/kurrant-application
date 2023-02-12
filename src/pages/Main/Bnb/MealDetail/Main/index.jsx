
import { useNavigation } from "@react-navigation/native";
import React, { useState, useRef, useEffect, useLayoutEffect} from "react";
import { View , StatusBar, Dimensions,Text, Alert} from "react-native";
import styled from "styled-components";
import analytics from '@react-native-firebase/analytics';
import LinearGradient from "react-native-linear-gradient";
import InfoIcon from "../../../../../assets/icons/MealDetail/info.svg";
import FastImage from "react-native-fast-image";
import StartIcon from '../../../../../assets/icons/star.svg';
import useFoodDetail from "../../../../../biz/useFoodDetail/hook";
import useShoppingBasket from "../../../../../biz/useShoppingBasket/hook";
import BackButton from "../../../../../components/BackButton";
import Badge from "../../../../../components/Badge";
import Balloon from '../../../../../components/Balloon';
import ShoppingCart from "../../../../../components/BasketButton";
import BottomModal from "../../../../../components/BottomModal";
import Button from '../../../../../components/ButtonExtendable';
import MoreButton from '../../../../../components/ButtonMore';
import KeyboardAvoiding from "../../../../../components/KeyboardAvoiding";
import Label from '../../../../../components/Label';
import Modal from '../../../../../components/Modal';
import ReviewPage from '../../../../../components/ReviewPage';
import Typography from "../../../../../components/Typography";
import withCommas from "../../../../../utils/withCommas";
import {PAGE_NAME as MealInformationPageName} from '../../MealDetail/Page';
import Skeleton from '../Skeleton';
import AsyncStorage from "@react-native-async-storage/async-storage";
import useAuth from "../../../../../biz/useAuth";

export const PAGE_NAME = 'MEAL_DETAIL_PAGE';
const {width} = Dimensions.get('screen');
const Pages = ({route}) => {
    
    const bodyRef = useRef();
    const navigation = useNavigation();
    const { balloonEvent, BalloonWrap } = Balloon();
    const [modalVisible,setModalVisible] = useState(false);
    const [focus,setFocus] = useState(false);
    const [count, setCount] = useState(1);
    const [scroll,setScroll] = useState(0);
    const {isFoodDetail,isFoodDetailLoading,foodDetail} = useFoodDetail();
    const {readableAtom:{userRole}}=useAuth()
    const {addMeal,loadMeal,isLoadMeal} = useShoppingBasket();

    const headerTitle = isFoodDetail?.name;
    const dailyFoodId = route.params.dailyFoodId;
    const closeModal = () => {
        setModalVisible(false)
    }
    console.log(dailyFoodId,'id')
    // foodId 넘겨줘야함 
    useEffect(()=>{
        async function loadFoodDetail(){
            const foodData = await foodDetail(dailyFoodId);
            await loadMeal();
            const data = await analytics().logSelectContent({
                content_type: foodData.makersName,
                item_id: foodData.name,
              })
            const data2 = await analytics().logEvent('food_detail', {
                id: dailyFoodId,
                name :foodData.name,
                makers:foodData.makersName
              })
            
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
        if (userRole === "ROLE_GUEST") {
            return  Alert.alert("로그인이 필요합니다", "해당 기능은 로그인 이후 사용할수 있습니다.",[
              {
                text:'취소',
                onPress:() => {},
                
              },
              {
                text:'확인',
                onPress:async() => {
                  await AsyncStorage.clear();
                  navigation.reset({
                    index: 0,
                    routes: [
                      {
                        name: LoginPageName,
                      },
                    ],
                  })
                },
                style:'destructive'
              }
            ])
          }
        const duplication = isLoadMeal?.map((v)=>v.cartDailyFoodDtoList.map(el => el.cartDailyFoods.some(c => c.dailyFoodId === dailyFoodId))).flat()
        
        if(duplication?.includes(true)){
            setModalVisible(true);
        }else{
            try {
                 await addToCart();
                
             } catch(err){
                 console.log(err)
        }
    }
}
    const addToCart = async () =>{
        
            try {
                await addMeal([{
                     "dailyFoodId":dailyFoodId,
                     "count":count,
                 }]);
                 balloonEvent();
                // await loadMeal();
                 } catch(err){
                     console.log(err)
                     throw err
                 }
               closeModal();  
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

    const totalDiscountRate = (isFoodDetail?.membershipDiscountedRate) + (isFoodDetail?.makersDiscountedRate) + (isFoodDetail?.periodDiscountedRate);
    
    const discountPrice = (isFoodDetail?.membershipDiscountedPrice) + (isFoodDetail?.makersDiscountedPrice) + (isFoodDetail?.periodDiscountedPrice)
    
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
                    <FastImage source={{uri:`${isFoodDetail?.image}`,priority:FastImage.priority.high}} 
                    style={{
                        maxWidth: width,
                        height:380,
                        
                    }}
                    >
                        <FilterImage
                        colors={["rgba(0, 0, 0, 0.45)",'rgba(7, 7, 8, 0.25)', 'rgba(255, 255, 255, 0)','rgba(255, 255, 255, 0) ']}
                        />
                    </FastImage>
                <Content>
                    <View>
                        <MakersName>{isFoodDetail?.makersName}</MakersName>
                        <MealTitle>{isFoodDetail?.name}</MealTitle>
                        <Line>
                            {/* <ReviewWrap>
                                <StartIcon/>
                                <ReviewPoint>4.0</ReviewPoint>
                                <ReviewCount>(132)</ReviewCount>
                            </ReviewWrap> */}
                            <InformationWrap
                            onPress={()=>{navigation.navigate(MealInformationPageName,{data:isFoodDetail?.origins})}}
                            >
                                <InformationText>알레르기/원산지</InformationText>
                            </InformationWrap>
                        </Line>
                        <MealDsc>{isFoodDetail?.description}</MealDsc>
                        
                        {isFoodDetail?.spicy !== 'NULL' && <Label label={`${isFoodDetail?.spicy}`}/>}
                        <PriceTitleWrap>
                            <PriceTitle>최종 판매가</PriceTitle>
                            <ModalWrap>
                                <Modal 
                                id={dailyFoodId}
                                price={isFoodDetail?.price} 
                                membershipDiscountedPrice={isFoodDetail?.membershipDiscountedPrice} 
                                membershipDiscountedRate={isFoodDetail?.membershipDiscountedRate}
                                makersDiscountedPrice={isFoodDetail?.makersDiscountedPrice}
                                makersDiscountedRate={isFoodDetail?.makersDiscountedRate}
                                periodDiscountedPrice={isFoodDetail?.periodDiscountedPrice}
                                periodDiscountedRate={isFoodDetail?.periodDiscountedRate}
                                totalDiscountRate={totalDiscountRate}
                                discountPrice={discountPrice}
                                />
                            </ModalWrap>
                        </PriceTitleWrap>
                        <PriceWrap> 
                            {totalDiscountRate !== 0 && <Percent>{(totalDiscountRate)}%</Percent>}
                            {totalDiscountRate !== 0 && <SalePrice>{withCommas((isFoodDetail?.price)-(discountPrice))}원</SalePrice>}
                            
                            {totalDiscountRate === 0 && <NoSalePrice>{withCommas(isFoodDetail?.price)}원</NoSalePrice>}
                            {totalDiscountRate !== 0 && <Price>{withCommas(isFoodDetail?.price)}원</Price>}
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
                                <InfoText>{isFoodDetail?.membershipDiscountedRate}%</InfoText>
                            </InfoTextWrap>
                            <InfoTextWrap>
                                <Info>판매자 할인</Info>
                                <InfoText>{isFoodDetail?.makersDiscountedRate}%</InfoText>
                            </InfoTextWrap>
                            <InfoTextWrap>
                                <Info>기간 할인</Info>
                                <InfoText>{isFoodDetail?.periodDiscountedRate}%</InfoText>
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
                                <InfoText>15,000(50개 마다 부과)</InfoText>
                            </InfoTextWrap>
                            <InfoTextWrap>
                                <Info>개별 배송</Info>
                                <InfoText>2,200원(5개 마다 부과)</InfoText>
                            </InfoTextWrap>
                            <InfoTextWrap>
                                <Info>멤버십 회원</Info>
                                <InfoText>무료 배송</InfoText>
                            </InfoTextWrap>
                        </InfoTextView>
                    </InfoWrap>
                </Content>
                
                {/* 리뷰자리 */}
                {/* <Content >
                    <View>
                    <ReviewPage/>
                    </View>
                </Content>
                <MoreButton/> */}
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
                        price={(isFoodDetail?.price)-(discountPrice)} 
                        onPressEvent2={()=>{addCartPress()}}
                        onPressEvent={() => {bodyRef.current.focus(); focusPress()}} 
                        count={count} 
                        capacity={isFoodDetail?.capacity}
                        increasePress={increasePress}
                        decreasePress={decreasePress}
                    />
                </ButtonWrap>}
                <BalloonWrap message={'장바구니에 담았어요'}  horizontal={'right'} size={'B'} location={{top:'96px', right:'14px'}}/>
                <BottomModal modalVisible={modalVisible} setModalVisible={setModalVisible} 
                                    title={`장바구니에 ${'\n'}동일 날짜/시간의 메뉴가 있어요.`} 
                                    description={'그래도 추가하시겠어요?'} 
                                    buttonTitle1={'아니요'} buttonType1='grey7' 
                                    buttonTitle2={'추가'} buttonType2='yellow' 
                                    onPressEvent1={closeModal} onPressEvent2={()=>addToCart()}/>
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

const FilterImage = styled(LinearGradient)`
max-width:${width}px;
height:380px;


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
margin-bottom:8px;
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
margin-bottom:12px;
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
/* width:100%; */
align-items:center;

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

const NoSalePrice = styled(SalePrice)``;

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
width:30%;
`;

const MessageView = styled.View`
flex-direction:row;
align-items:center;
width:40%;
text-align:center;
position: relative;
`;

const InfoText = styled(Typography).attrs({text:'CaptionR'})`
color:${props => props.theme.colors.grey[4]};
margin-bottom:4px;
width:50%;
text-align:right;
`;

const Test = styled(Typography).attrs({text:'CaptionR'})`
color:${props => props.theme.colors.grey[4]};
width:50%;
`;