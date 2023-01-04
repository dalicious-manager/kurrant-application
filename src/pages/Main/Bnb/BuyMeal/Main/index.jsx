// import Slider from '@react-native-community/slider';
import {Slider} from '@miblanchard/react-native-slider';
import { useNavigation } from '@react-navigation/native';
import { useAtomValue } from 'jotai';
import React, { useRef, forwardRef,useState, useEffect, useLayoutEffect } from 'react';
import {useForm} from 'react-hook-form';
import { Image, SafeAreaView, ScrollView, Text, View, TouchableOpacity ,ImageBackground, Pressable,Dimensions, StyleSheet} from "react-native";
import PagerView from 'react-native-pager-view';
import styled from 'styled-components';

import CartIcon from '../../../../../assets/icons/BuyMeal/cartBlur.svg';
import StarIcon from '../../../../../assets/icons/BuyMeal/smallStar.svg';
import SoldOutStarIcon from '../../../../../assets/icons/BuyMeal/soldOutStar.svg';
import useFoodDaily from '../../../../../biz/useDailyFood/hook';
import useShoppingBasket from '../../../../../biz/useShoppingBasket/hook';
import { isUserInfoAtom, isUserMeAtom } from '../../../../../biz/useUserInfo/store';
import Badge from '../../../../../components/Badge';
import Balloon from '../../../../../components/Balloon';
import ShoppingCart from '../../../../../components/BasketButton';
import BottomModal from '../../../../../components/BottomModal';
import Button from '../../../../../components/Button';
import Calendar from '../../../../../components/Calendar';
import Label from '../../../../../components/Label';
import MembershipBar from '../../../../../components/MembershipBar';
import Typography from '../../../../../components/Typography';
import { formattedDate, formattedWeekDate } from '../../../../../utils/dateFormatter';
import withCommas from '../../../../../utils/withCommas';
import {PAGE_NAME as MealCartPageName} from '../../MealCart/Main';
import {PAGE_NAME as MealDetailPageName} from '../../MealDetail/Main';
import SkeletonUI from '../Skeleton';

export const PAGE_NAME = 'BUY_MEAL_PAGE';

const screenHeight = Dimensions.get('window').height;

const Pages = () => {
    
    const navigation = useNavigation();
    const diningRef = useRef();

    const [focus,setFocus] = useState(1);
    const [modalVisible,setModalVisible] = useState(false);
    const [sliderValue, setSliderValue] = useState(1);
    const [currentPage, setCurrentPage] = useState(0);
    const {isDailyFood, isMorningFood,isLunchFood,isDinnerFood, dailyFood, isDailyFoodLoading} = useFoodDaily();
    const {addMeal ,isLoadMeal, loadMeal , setLoadMeal} = useShoppingBasket();
    const { balloonEvent, BalloonWrap } = Balloon();
    const userMembership = useAtomValue(isUserInfoAtom);
    //console.log(isDailyFood,'daily')
    const DININGTYPE = ['아침','점심','저녁'];
    const daily = true;
    const date = formattedWeekDate(new Date()); // 오늘
    // const todayMeal = mealInfo?.filter((m) => m.date === date);
    // const selectDate = mealInfo?.filter((m) => m.date === touchDate);
    const spotId = 1; // 스팟 생성 전 이어서 임의로 줌
    
    const onPageScroll = (e) => {
        const { position } = e.nativeEvent;
        
            setSliderValue(position);
            setFocus(position);
         } 

    const dayPress = async (selectedDate) =>{
        
        try {
            await dailyFood(spotId,selectedDate);
        }catch(err){
            console.log(err)
            throw err
        }
    }

    const openModal = () =>{
        setModalVisible(true)
    }

    const closeModal = () => {
        setModalVisible(false)
    }

    //
   
    //console.log(duplication)

    useEffect(()=>{
        async function loadDailyFood(){
            try {
                await dailyFood(spotId,date);
                await loadMeal();
            }catch (err) {
                console.log(err.toString())
            }
        }
        loadDailyFood();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);


    const addCartPress = async (id,day,type) =>{
        const diningType = type === 'MORNING' ? 1 : type === 'LUNCH' ? 2 : 3;
        const duplication = isLoadMeal.some((item) => item.dailyFoodId === id)
        
        if(duplication){
            setModalVisible(true)
        }else {
            try {
                await addMeal({
                     "dailyFoodId":id,
                     "count":1,
                     "serviceDate":day,
                     "diningType":diningType
                 });
                 await loadMeal();
                 await balloonEvent();
                 } catch(err){
                     console.log(err)
                     throw err
                 }
        }
        
    }

    const addToCart = async (id,day,type) =>{
        const diningType = type === 'MORNING' ? 1 : type === 'LUNCH' ? 2 : 3;
            try {
                await addMeal({
                     "dailyFoodId":id,
                     "count":1,
                     "serviceDate":day,
                     "diningType":diningType
                 });
                 await loadMeal();
                 await balloonEvent();
                 } catch(err){
                     console.log(err)
                     throw err
                 }
               closeModal();    
    }


    return (
        <SafeView>
            
                {userMembership?.isMembership && <MembershipBar/>}
                <ScrollView showsVerticalScrollIndicator={false}>
                <CalendarWrap>
                    <Calendar BooleanValue type={'grey2'} color={'white'} size={'Body05R'} onPressEvent2={dayPress} daily={daily} margin={'0px 28px'} />
                </CalendarWrap>
                
                <PagerViewWrap>
                    <ProgressWrap>
                        <ProgressInner>
                            <Slider
                                value={sliderValue}
                                onValueChange={(e) => setSliderValue(...e)}
                                minimumValue={0}
                                maximumValue={2}
                                maximumTrackTintColor="#343337"
                                minimumTrackTintColor="#343337"
                                onSlidingComplete={(e) => {diningRef.current.setPage(...e); setFocus(...e)}}
                                step={1}
                                trackStyle={styles.trackStyle}
                                thumbStyle={styles.thumbStyle}
                            />
                            <Progress>
                                {DININGTYPE.map((btn,i) => 
                                    <Pressable key={i} onPress={() => {diningRef.current.setPage(i);setSliderValue(i);setFocus(i)}}>
                                        <ProgressText focus={focus} index={i}>{btn}</ProgressText>
                                    </Pressable>
                                )}
                            </Progress>
                        </ProgressInner>
                    </ProgressWrap>


                    {isDailyFoodLoading ? <SkeletonUI/> : <Pager ref={diningRef} initialPage={1} onPageSelected={(e) => {onPageScroll(e)}}>
                        <View>
                            {/* 아침 */}
                            {isMorningFood.length === 0 && <NoServieceView>
                                <NoServiceText>서비스 운영일이 아니예요</NoServiceText>
                            </NoServieceView>}
                            {isMorningFood?.map((m,i) => 
                            <Contents key={i}
                            spicy={m.spicy}
                            disabled={m.isSoldOut}
                            onPress={(e)=>{navigation.navigate(MealDetailPageName,{foodId:m.foodId,type:m.diningType,date:m.serviceDate,dateFoodId:m.id});e.stopPropagation()}}>
                                <ContentsText>
                                    <MakersName soldOut={m.isSoldOut}>[{m.makers}]</MakersName>
                                    <MealName soldOut={m.isSoldOut}>{m.name}</MealName>
                                    <MealDsc soldOut={m.isSoldOut} numberOfLines={2} ellipsizeMode="tail">{m.description}</MealDsc>
                                    <Price soldOut={m.isSoldOut}>{withCommas(m.price)}원</Price>
                                    {m.spicy !== undefined && 
                                    <LabelWrap>
                                        {m.isSoldOut ? <Label label={`${m.spicy}`} type={'soldOut'}/> : <Label label={`${m.spicy}`}/>}
                                    </LabelWrap>
                                    }
                                </ContentsText>

                                <MealImageWrap>
                                    {m.isSoldOut && <BlurView/>}
                                    <MealImage source={{uri:'https://cdn.mindgil.com/news/photo/202004/69068_2873_1455.jpg'}}/>
                                    
                                    {!m.isSoldOut && (
                                        <CartIconWrap onPress={()=>{balloonEvent(); addCartPress(m.id,m.serviceDate,m.diningType)}}>
                                            <CartIcon/>
                                        </CartIconWrap>
                                    )}
                                </MealImageWrap>
                                    {m.isSoldOut && <SoldOut soldOut={m.isSoldOut}>품절됐어요</SoldOut>}
                                    <BottomModal modalVisible={modalVisible} setModalVisible={setModalVisible} 
                                    title={`장바구니에 ${'\n'}동일 날짜/시간의 메뉴가 있어요.`} 
                                    description={'그래도 추가하시겠어요?'} 
                                    buttonTitle1={'아니요'} buttonType1='grey7' 
                                    buttonTitle2={'추가'} buttonType2='yellow' 
                                    onPressEvent1={closeModal} onPressEvent2={()=>addToCart(m.id,m.serviceDate,m.diningType)}/>
                            </Contents>
                            )}
                        </View>
                        <View>
                            {/* 점심 */}
                            {isLunchFood.length === 0 && <NoServieceView>
                                <NoServiceText>서비스 운영일이 아니예요</NoServiceText>
                            </NoServieceView>}
                            {isLunchFood?.map((l,i)=>
                            <Contents key={i}
                            spicy={l.spicy}
                            disabled={l.isSoldOut}
                            onPress={(e)=>{navigation.navigate(MealDetailPageName,{foodId:l.foodId,type:l.diningType,date:l.serviceDate,dailyFoodId:l.id});e.stopPropagation()}}>
                                <ContentsText>
                                    <MakersName soldOut={l.isSoldOut}>[{l.makers}]</MakersName>
                                    <MealName soldOut={l.isSoldOut}>{l.foodName}</MealName>
                                    <MealDsc soldOut={l.isSoldOut} numberOfLines={2} ellipsizeMode="tail">{l.description}</MealDsc>
                                    <Price soldOut={l.isSoldOut}>{withCommas(l.price)}원</Price>
                                    {l.spicy !== undefined && 
                                    <LabelWrap>
                                        <Label label={`${l.spicy}`}/>
                                    </LabelWrap>
                                    }
                                </ContentsText>

                                <MealImageWrap>
                                    {l.isSoldOut && <BlurView/>}
                                    <MealImage source={{uri:'https://cdn.mindgil.com/news/photo/202004/69068_2873_1455.jpg'}}/>
                                    {!l.isSoldOut && (
                                        <CartIconWrap onPress={()=>{balloonEvent(); addCartPress(l.id,l.serviceDate,l.diningType)}}>
                                            <CartIcon/>
                                        </CartIconWrap>
                                    )}
                                </MealImageWrap>
                                    {l.isSoldOut && <SoldOut soldOut={l.isSoldOut}>품절됐어요</SoldOut>}
                                    <BottomModal modalVisible={modalVisible} setModalVisible={setModalVisible} 
                                    title={`장바구니에 ${'\n'}동일 날짜/시간의 메뉴가 있어요.`} 
                                    description={'그래도 추가하시겠어요?'} 
                                    buttonTitle1={'아니요'} buttonType1='grey7' 
                                    buttonTitle2={'추가'} buttonType2='yellow' 
                                    onPressEvent1={closeModal} onPressEvent2={()=>addToCart(l.id,l.serviceDate,l.diningType)}/>
                            </Contents>

                            )}
                        </View>
                        <View>
                            {/* 저녁 */}
                            {isDinnerFood.length === 0 && <NoServieceView>
                                <NoServiceText>서비스 운영일이 아니예요</NoServiceText>
                            </NoServieceView>}
                            {isDinnerFood?.map((d,i) => 
                            <Contents key={i}
                            spicy={d.spicy}
                            disabled={d.isSoldOut}
                            onPress={(e)=>{navigation.navigate(MealDetailPageName,{foodId:d.foodId,type:d.diningType,date:d.serviceDate,dailyFoodId:d.id});e.stopPropagation()}}>
                                <ContentsText>
                                    {/* <MakersName soldOut={d.isSoldOut}>[{d.makers}]</MakersName> */}
                                    <MakersName soldOut={d.isSoldOut}>[메이커스]</MakersName>
                                    <MealName soldOut={d.isSoldOut}>{d.foodName}</MealName>
                                    {/* <MealDsc soldOut={d.isSoldOut} numberOfLines={2} ellipsizeMode="tail">
                                        {d.description}
                                    </MealDsc> */}
                                    <MealDsc soldOut={d.isSoldOut} numberOfLines={2} ellipsizeMode="tail">
                                        테스트용 메뉴설명 테스트용 메뉴설명 테스트용 메뉴설명
                                    </MealDsc>
                                    {d.spicy !== undefined && 
                                        <LabelWrap>
                                            <Label label={`${d.spicy}`}/>
                                        </LabelWrap>
                                    }
                                    {/* <Price soldOut={d.isSoldOut}>{withCommas(d.price)}원</Price> */}
                                    <Price soldOut={d.isSoldOut}>{withCommas(8500)}원</Price>
                                    {/* 멤버십 가입시 변동 될 UI */}
                                    {/* <PriceWrap>
                                        <PercentText soldOut={d.isSoldOut}>20%</PercentText>
                                        <Price soldOut={d.isSoldOut}>8,500원</Price>
                                        <OriginPrice soldOut={d.isSoldOut}>10,500원</OriginPrice>
                                    </PriceWrap>
                                    <ReviewWrap>
                                        <ReviewText>
                                            {d.isSoldOut ?  <SoldOutStarIcon/> : <StarIcon/>}
                                            <ReviewText soldOut={d.isSoldOut}>4.0</ReviewText>
                                            <ReviewCount soldOut={d.isSoldOut}>(132)</ReviewCount>
                                        </ReviewText>
                                    </ReviewWrap> */}

                                </ContentsText>

                                <MealImageWrap>
                                    {d.isSoldOut && <BlurView/>}
                                    <MealImage source={{uri:'https://cdn.mindgil.com/news/photo/202004/69068_2873_1455.jpg'}}/>
                                    <CartIconWrap onPress={()=>{addCartPress(d.id,d.serviceDate,d.diningType)}}>
                                        <CartIcon/>
                                    </CartIconWrap>
                                </MealImageWrap>
                                    {d.isSoldOut && <SoldOut soldOut={d.isSoldOut}>품절됐어요</SoldOut>}
                                    <BottomModal modalVisible={modalVisible} setModalVisible={setModalVisible} 
                                    title={`장바구니에 ${'\n'}동일 날짜/시간의 메뉴가 있어요.`} 
                                    description={'그래도 추가하시겠어요?'} 
                                    buttonTitle1={'아니요'} buttonType1='grey7' 
                                    buttonTitle2={'추가'} buttonType2='yellow' 
                                    onPressEvent1={closeModal} onPressEvent2={()=>addToCart(d.id,d.serviceDate,d.diningType)}/>
                            </Contents>
                            )}
                        </View>
                    </Pager> }
                </PagerViewWrap>
                
            </ScrollView>
            <BalloonWrap message={'장바구니에 담았어요'}  horizontal={'right'} size={'B'} location={{top:'8px', right:'14px'}}/>
            <ButtonWrap>
                <Button label={'장바구니 보기'} type={'yellow'} onPressEvent={()=>{navigation.navigate(MealCartPageName)}}/>
            </ButtonWrap>
        </SafeView>
        
    )
}
const styles = StyleSheet.create({
    trackStyle:{
        backgroundColor:'black',
        width:87,
        height:2,
        borderRadius:50
    },
    thumbStyle:{
        width:16,
        height:16,
        backgroundColor:'white',
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
});

export default Pages;

const SafeView = styled.View` 
background-color:${props => props.theme.colors.grey[0]};

`;

export const CalendarWrap = styled.View`

height:120px;
border-bottom-color: ${props => props.theme.colors.grey[8]};
border-bottom-width: 1px;
width:100%;
`;

const PagerViewWrap = styled.View`
height:${screenHeight}px;
`;

const ProgressWrap = styled.View`
flex-direction:row;
align-items:center;
justify-content:center;
`;

const ProgressInner = styled.View`
align-items:center;
`;

const Progress = styled.View`
flex-direction:row;
justify-content:space-between;
width:111px;
`;

const ProgressBar = styled.View`
width:87px;
height:2px;
margin:9px 0px;
background-color:${props => props.theme.colors.grey[2]};
`;

const ProgressCircle = styled.View`
width:16px;
height:16px;
border-radius:50px;
background-color:${props => props.theme.colors.grey[0]};
position:absolute;
`;

const Pager = styled(PagerView)`
flex:1;
`;

const Contents = styled.Pressable`
padding: ${({spicy}) => spicy ? '24px 0px 12px 0px': '24px 0px 28px 0px'};
margin: 0px 28px;
flex-direction:row;
/* padding:24px 0px 28px 0px; */
justify-content:space-between;
border-bottom-color: ${props => props.theme.colors.grey[8]};
border-bottom-width: 1px;
align-items:center;


`;

const BlurView = styled.View`
position:absolute;
width:107px;
height:107px;
border-radius:7px;
left:0px;
background-color:#ffffffCC;
z-index:999;
`;


const LabelWrap = styled.View`
margin-top: 6px;
    
`;


const ContentsText = styled.View`
width:60%;
`;

const MealImageWrap = styled.View`
//height:107px;
position:relative;
`;

const MealImage = styled.Image`
width:107px;
height:107px;
border-radius:7px;
`;

const CartIconWrap = styled.Pressable`
width:40px;
height:40px;
background:rgba(255, 255, 255, 0.7);
backdrop-filter: blur(4px);
border-radius:50px;
align-items:center;
justify-content:center;
position:absolute;
bottom:8px;
right:8px;
`;

const PriceWrap = styled.View`
flex-direction:row;
margin-top:4px;
margin-bottom:6px;
`;



const SoldOut = styled(Typography).attrs({text:'Title04SB'})`
position:absolute;
top:60%;
right:15px;
color:${props => props.theme.colors.grey[4]};
z-index:1000;
`;
const ButtonWrap = styled.View`
position:absolute;
bottom:35px;
margin:0px 48px;
`;


const ReviewWrap = styled.View`
flex-direction:row;
align-items:center;
text-align:center;
`;


export const MakersName = styled(Typography).attrs({text:'Body05R'})`
    color:${({theme,soldOut}) => soldOut? theme.colors.grey[6] : theme.colors.grey[2]};
`;

export const MealName = styled(Typography).attrs({text:'Body05SB'})`
color:${({theme,soldOut}) => soldOut? theme.colors.grey[6] : theme.colors.grey[2]};
`;

const Price = styled(MakersName)`
    color:${({theme,soldOut}) => soldOut? theme.colors.grey[6] : theme.colors.grey[2]};
`;

const MealDsc = styled(Typography).attrs({text:'CaptionR'})`
    color:${({theme,soldOut}) => soldOut? theme.colors.grey[6] : theme.colors.grey[4]};
`;

const ProgressText = styled(Typography).attrs({text:'CaptionSB'})`
    color:${({theme,focus, index}) => focus === index ? theme.colors.grey[2] : theme.colors.grey[5]};
`;

const PercentText = styled(Typography).attrs({text:'Body05R'})`
    color:${({theme,soldOut}) => soldOut? theme.colors.grey[6] :'#DD5257'};
    margin-right:4px;
`;

const OriginPrice = styled(Typography).attrs({text:'Body06R'})`
 color:${({theme,soldOut}) => soldOut? theme.colors.grey[6] : theme.colors.grey[5]};
text-decoration:line-through;
text-decoration-color:${({theme,soldOut}) => soldOut? theme.colors.grey[6] : theme.colors.grey[5]};
margin-left:6px;
`;

const ReviewText =styled(Typography).attrs({text:'SmallLabel'})`
color:${({theme,soldOut}) => soldOut? theme.colors.grey[6] :theme.colors.grey[2]};

`;

const ReviewCount =styled(Typography).attrs({text:'SmallLabel'})`
color:${({theme,soldOut}) => soldOut? theme.colors.grey[6] :theme.colors.grey[4]};
`;

const NoServiceText = styled(Typography).attrs({text:'Body05R'})`
color:${({theme}) => theme.colors.grey[5]};
`;

const NoServieceView = styled.View`
/* justify-content:center;
align-items:center;
flex:1; */
position:absolute;
top:30%;
left:30%;
`;