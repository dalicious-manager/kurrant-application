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
import { isUserMeAtom } from '../../../../../biz/useUserMe/store';
import Balloon from '../../../../../components/Balloon';
import Button from '../../../../../components/Button';
import Calendar from '../../../../../components/Calendar';
import Label from '../../../../../components/Label';
import MembershipBar from '../../../../../components/MembershipBar';
import Typography from '../../../../../components/Typography';
import { formattedDate } from '../../../../../utils/dateFormatter';
import withCommas from '../../../../../utils/withCommas';
import {PAGE_NAME as MealCartPageName} from '../../MealCart/Main';
import {PAGE_NAME as MealDetailPageName} from '../../MealDetail/Main';

export const PAGE_NAME = 'BUY_MEAL_PAGE';

const screenHeight = Dimensions.get('window').height;

const Pages = () => {
    
    const navigation = useNavigation();
    const diningRef = useRef();
    
    const [focus,setFocus] = useState(1);
    const [touchDate, setTouchDate] = useState(null);
    const [sliderValue, setSliderValue] = useState(1);
    const [currentPage, setCurrentPage] = useState(0);
    const {isDailyFood, isMorningFood,isLunchFood,isDinnerFood, dailyFood} = useFoodDaily();
    const { balloonEvent, BalloonWrap } = Balloon();
    const userMembership = useAtomValue(isUserMeAtom);
    
    
    const DININGTYPE = ['아침','점심','저녁'];
    
    const date = formattedDate(new Date());
    // const todayMeal = mealInfo?.filter((m) => m.date === date);
    // const selectDate = mealInfo?.filter((m) => m.date === touchDate);

    useEffect(()=>{
        async function loadDailyFood(){
            await dailyFood();
        }

        loadDailyFood();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    
    const onPageScroll = (e) => {
        const { position } = e.nativeEvent;
        
            setSliderValue(position);
            setFocus(position);
         } 

    // const dayPress = async () =>{
    //     try {
    //         await dailyFood();
    //     }catch(err){
    //         console.log(err)
    //     }
    // }
    // console.log(isMorningFood)

    
    return (
        <SafeView>
            <ScrollView showsVerticalScrollIndicator={false}>
                {userMembership[0].membership && <MembershipBar/>}
                
                <CalendarWrap>
                    <Calendar BooleanValue type={'grey2'} color={'white'} size={'Body05R'} setTouchDate={setTouchDate} onPressEvent2/>
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
                    <Pager ref={diningRef} initialPage={1} onPageSelected={(e) => {onPageScroll(e)}}>
                        <View>
                            {/* 아침 */}
                            {isMorningFood?.map((m,i) => 
                            <Contents key={i}
                            spicy={m.spicy}
                            disabled={m.isSoldOut}
                            onPress={(e)=>{navigation.navigate(MealDetailPageName);e.stopPropagation()}}
                            >
                                <ContentsText>
                                    <MakersName soldOut={m.isSoldOut}>[{m.makers}]</MakersName>
                                    <MealName soldOut={m.isSoldOut}>{m.name}</MealName>
                                    <MealDsc soldOut={m.isSoldOut} numberOfLines={2} ellipsizeMode="tail">{m.description}</MealDsc>
                                    <Price soldOut={m.isSoldOut}>{withCommas(m.price)}원</Price>
                                    {m.spicy !== null && 
                                    <LabelWrap>
                                        {m.isSoldOut ? <Label label={`${m.spicy}`} type={'soldOut'}/> : <Label label={`${m.spicy}`}/>}
                                    </LabelWrap>
                                    }
                                </ContentsText>
                                    
                                <MealImageWrap>
                                    {m.isSoldOut && <BlurView/>}
                                    <MealImage source={{uri:'https://cdn.mindgil.com/news/photo/202004/69068_2873_1455.jpg'}}/>
                                    
                                    {!m.isSoldOut && (
                                        <CartIconWrap onPress={()=>{alert('장바구니임')}}>
                                            <CartIcon/>
                                        </CartIconWrap>
                                    )}
                                </MealImageWrap>
                                    {m.isSoldOut && <SoldOut soldOut={m.isSoldOut}>품절됐어요</SoldOut>}
                            </Contents>
                            )}
                        </View>
                        <View>
                            {/* 점심 */}
                            {isLunchFood?.map((l,i)=>
                            <Contents key={i}
                            spicy={l.spicy}
                            disabled={l.isSoldOut}
                            onPress={(e)=>{navigation.navigate(MealDetailPageName);e.stopPropagation()}}>
                                <ContentsText>
                                    <MakersName soldOut={l.isSoldOut}>[{l.makers}]</MakersName>
                                    <MealName soldOut={l.isSoldOut}>{l.name}</MealName>
                                    <MealDsc soldOut={l.isSoldOut} numberOfLines={2} ellipsizeMode="tail">{l.description}</MealDsc>
                                    <Price soldOut={l.isSoldOut}>{withCommas(l.price)}원</Price>
                                    {l.spicy !== null && 
                                    <LabelWrap>
                                        <Label label={`${l.spicy}`}/>
                                    </LabelWrap>
                                    }
                                </ContentsText>
                                    
                                <MealImageWrap>
                                    {l.isSoldOut && <BlurView/>}
                                    <MealImage source={{uri:'https://cdn.mindgil.com/news/photo/202004/69068_2873_1455.jpg'}}/>
                                    {!l.isSoldOut && (
                                        <CartIconWrap onPress={balloonEvent}>
                                            <CartIcon/>
                                        </CartIconWrap>
                                    )}
                                </MealImageWrap>
                                    {l.isSoldOut && <SoldOut soldOut={l.isSoldOut}>품절됐어요</SoldOut>}
                            </Contents>
                            
                            )}
                        </View>
                        <View>
                            {/* 저녁 */}
                            {isDinnerFood?.map((d,i) => 
                            <Contents key={i}
                            spicy={d.spicy}
                            disabled={d.isSoldOut}
                            onPress={(e)=>{navigation.navigate(MealDetailPageName);e.stopPropagation()}}>
                                <ContentsText>
                                    <MakersName soldOut={d.isSoldOut}>[{d.makers}]</MakersName>
                                    <MealName soldOut={d.isSoldOut}>{d.name}</MealName>
                                    <MealDsc soldOut={d.isSoldOut} numberOfLines={2} ellipsizeMode="tail">{d.description}</MealDsc>
                                    {d.spicy !== null && 
                                        <LabelWrap>
                                            <Label label={`${d.spicy}`}/>
                                        </LabelWrap>
                                    }
                                    <Price soldOut={d.isSoldOut}>{withCommas(d.price)}원</Price>
                                    
                                </ContentsText>
                                    
                                <MealImageWrap>
                                    {d.isSoldOut && <BlurView/>}
                                    <MealImage source={{uri:'https://cdn.mindgil.com/news/photo/202004/69068_2873_1455.jpg'}}/>
                                    <CartIconWrap onPress={()=>{alert('장바구니임')}}>
                                        <CartIcon/>
                                    </CartIconWrap>
                                </MealImageWrap>
                                    {d.isSoldOut && <SoldOut soldOut={d.isSoldOut}>품절됐어요</SoldOut>}
                            </Contents>
                            )}
                        </View>
                    </Pager> 
                </PagerViewWrap>
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
margin:0px 28px;
height:120px;
border-bottom-color: ${props => props.theme.colors.grey[8]};
border-bottom-width: 1px;
//background-color:gold;
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

const MealDsc = styled(Typography).attrs({text:'CaptionR'})`
color:${({theme,soldOut}) => soldOut? theme.colors.grey[6] : theme.colors.grey[4]};

`;

const Price = styled(MakersName)`
    color:${({theme,soldOut}) => soldOut? theme.colors.grey[6] : theme.colors.grey[2]};
`;

const ProgressText = styled(Typography).attrs({text:'CaptionSB'})`
    color:${({theme,focus, index}) => focus === index ? theme.colors.grey[2] : theme.colors.grey[5]};
`;