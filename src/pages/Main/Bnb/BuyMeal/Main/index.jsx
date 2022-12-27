// import Slider from '@react-native-community/slider';
import {Slider} from '@miblanchard/react-native-slider';
import { useNavigation } from '@react-navigation/native';
import { useAtomValue } from 'jotai';
import React, { useRef, forwardRef,useState, useEffect } from 'react';
import {useForm} from 'react-hook-form';
import { Image, SafeAreaView, ScrollView, Text, View, TouchableOpacity ,ImageBackground, Pressable,Dimensions, StyleSheet} from "react-native";
import PagerView from 'react-native-pager-view';
import styled from 'styled-components';

import CartIcon from '../../../../../assets/icons/BuyMeal/cartBlur.svg';
import useFoodDaily from '../../../../../biz/useDailyFood/hook';
import { isUserInfoAtom, isUserMeAtom } from '../../../../../biz/useUserInfo/store';
import Balloon from '../../../../../components/Balloon';
import Button from '../../../../../components/Button';
import Calendar from '../../../../../components/Calendar';
import Label from '../../../../../components/Label';
import MembershipBar from '../../../../../components/MembershipBar';
import Typography from '../../../../../components/Typography';
import { formattedDate, formattedWeekDate } from '../../../../../utils/dateFormatter';
import withCommas from '../../../../../utils/withCommas';
import {PAGE_NAME as MealCartPageName} from '../../MealCart/Main';
import {PAGE_NAME as MealDetailPageName} from '../../MealDetail/Main';

export const PAGE_NAME = 'BUY_MEAL_PAGE';

const screenHeight = Dimensions.get('window').height;

const Pages = () => {
    
    const navigation = useNavigation();
    const diningRef = useRef();

    const [focus,setFocus] = useState(1);
    
    const [sliderValue, setSliderValue] = useState(1);
    const [currentPage, setCurrentPage] = useState(0);
    const {isDailyFood, isMorningFood,isLunchFood,isDinnerFood, dailyFood} = useFoodDaily();
    const { balloonEvent, BalloonWrap } = Balloon();
    const userMembership = useAtomValue(isUserInfoAtom);
    console.log(isLunchFood)
    const DININGTYPE = ['아침','점심','저녁'];
    const daily = true;
    
    const date = formattedWeekDate(new Date()); // 오늘
    // const todayMeal = mealInfo?.filter((m) => m.date === date);
    // const selectDate = mealInfo?.filter((m) => m.date === touchDate);
    const spotId = 1;
    
    useEffect(()=>{
        async function loadDailyFood(){
            await dailyFood(spotId,date);
        }
        loadDailyFood();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
   
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
        }
    }

    return (
        <SafeView>
            <ScrollView showsVerticalScrollIndicator={false}>
                {userMembership?.isMembership && <MembershipBar/>}
                
                <CalendarWrap>
                    <Calendar BooleanValue type={'grey2'} color={'white'} size={'Body05R'} onPressEvent2={dayPress} daily={daily} margin={'0px 28px'} />
                </CalendarWrap>
               
                
            </ScrollView>
            <BalloonWrap message={'장바구니에 담았어요'}  horizontal={'right'} size={'B'} location={{top:'10px', right:'5px'}}/>
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
flex:1;
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
margin:0px 24px;
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