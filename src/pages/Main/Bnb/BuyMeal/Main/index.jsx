import {Slider} from '@miblanchard/react-native-slider';
import { useNavigation } from '@react-navigation/native';
import { useAtomValue } from 'jotai';
import React, { useRef, useState, useEffect } from 'react';
import { ScrollView, View, Pressable,Dimensions, StyleSheet} from "react-native";
import PagerView from 'react-native-pager-view';
import styled from 'styled-components';

import CartIcon from '../../../../../assets/icons/BuyMeal/cartBlur.svg';
import useFoodDaily from '../../../../../biz/useDailyFood/hook';
import useShoppingBasket from '../../../../../biz/useShoppingBasket/hook';
import { isUserInfoAtom } from '../../../../../biz/useUserInfo/store';
import Balloon from '../../../../../components/Balloon';
import BottomModal from '../../../../../components/BottomModal';
import Button from '../../../../../components/Button';
import Calendar from '../../../../../components/Calendar';
import Label from '../../../../../components/Label';
import MembershipBar from '../../../../../components/MembershipBar';
import Typography from '../../../../../components/Typography';
import { formattedWeekDate } from '../../../../../utils/dateFormatter';
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
    const [modalVisible2,setModalVisible2] = useState(false);
    const [modalVisible3,setModalVisible3] = useState(false);
    const [sliderValue, setSliderValue] = useState(1);
    const [selectFood, setSelectFood] = useState()
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
    const isDiningType = (type)=>{
        return type === '아침' ? 1 : type === '점심' ? 2 : 3;
    }
    const openModal = async (diningType) =>{
        // console.log(modalVisible,
        //     modalVisible2,
        //     modalVisible3,)
        if(diningType === 1){
            return await setModalVisible(true)
        }
        if(diningType === 2){
            return await setModalVisible2(true)
        }
        if(diningType === 3){
            return await setModalVisible3(true)
        }
    }

    const closeModal = () => {
        setModalVisible(false);
        setModalVisible2(false)
        setModalVisible3(false)
        
    }
    
   
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
        
        const diningType = isDiningType(type);
        const duplication = isLoadMeal.some((item) => item.dailyFoodId === id);
        
        if(duplication){
            await setSelectFood({
                id:id,
                serviceDate:day,
                diningType:type
            })
            await openModal(diningType)
        }else {
            await addToCart(id,day,type)
        }
        
    }

    const addToCart = async (id,day,type) =>{
        
            try {
                await addMeal({
                     "dailyFoodId":id,
                     "count":1,
                     "serviceDate":day,
                     "diningType":isDiningType(type)
                 });
                 await loadMeal();
                 await balloonEvent();
                 } catch(err){
                     console.log(err)
                     throw err
                 }
               closeModal();    
    }
    
    const BuyMeal = (diningFood) =>{
        const setModal = (type)=>{        
            if(type === isMorningFood){
                return setModalVisible
            }            
            if(type === isLunchFood){
                return setModalVisible2
            }
            if(type === isDinnerFood){
                return setModalVisible3
            }
        }
        const modal = (type)=>{
            if(type === isMorningFood){
                console.log("1",modalVisible)
                return modalVisible
            }            
            if(type === isLunchFood){
                console.log("2",modalVisible2)
                return modalVisible2
            }
            if(type === isDinnerFood){
                console.log("3",modalVisible3)
                return modalVisible3
            }
        }
        return (<View>
            
            {diningFood.length === 0 && <NoServieceView>
                <NoServiceText>서비스 운영일이 아니예요</NoServiceText>
            </NoServieceView>}
            {diningFood.map((m) => {               
            //    console.log(diningFood)
            return <Contents key={m.id}
            spicy={m.spicy}
            disabled={m.isSoldOut}
            onPress={(e)=>{navigation.navigate(MealDetailPageName,{foodId:m.foodId,type:m.diningType,date:m.serviceDate,dailyFoodId:m.id});e.stopPropagation()}}>
                <ContentsText>
                    <MakersName soldOut={m.isSoldOut}>[{m.makersName}]</MakersName>
                    <MealName soldOut={m.isSoldOut}  numberOfLines={1} ellipsizeMode="tail">{m.foodName}</MealName>
                    <MealDsc soldOut={m.isSoldOut} numberOfLines={2} ellipsizeMode="tail">{m.description}</MealDsc>
                    <Price soldOut={m.isSoldOut}>{withCommas(m.price)}원</Price>
                    {m.spicy !== 'NULL' && 
                    <LabelWrap>
                        {m.isSoldOut ? <Label label={`${m.spicy}`} type={'soldOut'}/> : <Label label={`${m.spicy}`}/>}
                    </LabelWrap>
                    }
                </ContentsText>

                <MealImageWrap>
                    {m.isSoldOut && <BlurView/>}
                    <MealImage source={{uri:`${m.img}`}}/>
                    
                    {!m.isSoldOut && (
                        <CartIconWrap onPress={()=>{addCartPress(m.id,m.serviceDate,m.diningType)}}>
                            <CartIcon/>
                        </CartIconWrap>
                    )}
                </MealImageWrap>
                {m.isSoldOut && <SoldOut soldOut={m.isSoldOut}>품절됐어요</SoldOut>}
                
            </Contents>
            })}     
            <BottomModal modalVisible={modal(diningFood)} setModalVisible={setModal(diningFood)} 
                title={`장바구니에 ${'\n'}동일 날짜/시간의 메뉴가 있어요.`} 
                description={'그래도 추가하시겠어요?'} 
                buttonTitle1={'아니요'} buttonType1='grey7' 
                buttonTitle2={'추가'} buttonType2='yellow' 
                onPressEvent1={closeModal} onPressEvent2={()=>addToCart(selectFood.id,selectFood.serviceDate,selectFood.diningType)}/>
        </View>)
                        

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

                    {isDailyFoodLoading ? <SkeletonUI/>: 
                     <Pager ref={diningRef} initialPage={1} onPageSelected={(e) => {onPageScroll(e)}}>

                        {BuyMeal(isMorningFood)}
                        {BuyMeal(isLunchFood)}
                        {BuyMeal(isDinnerFood)}
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