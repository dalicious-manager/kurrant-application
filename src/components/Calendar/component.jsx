import { useNavigation } from '@react-navigation/native';
import { addDays, eachWeekOfInterval, subDays,eachDayOfInterval,format, daysInYear } from 'date-fns';
import {ko} from 'date-fns/locale';
import { useAtom, useAtomValue } from 'jotai';
import React, { useEffect, useRef, useState } from 'react';
import { Pressable, View ,Text} from 'react-native';
import PagerView from 'react-native-pager-view';
import styled from 'styled-components/native';

import { weekAtom } from '../../biz/useBanner/store';
import useFoodDaily from '../../biz/useDailyFood/hook';
import useFoodDetail from '../../biz/useFoodDetail/hook';
import useOrderMeal from '../../biz/useOrderMeal/hook';
import { isUserMeAtom } from '../../biz/useUserInfo/store';
import {PAGE_NAME as MealMainPageName} from '../../pages/Main/Bnb/Meal/Main';
import { formattedDate, formattedWeekDate } from '../../utils/dateFormatter';
import Button from '../CalendarButton';
import Typography from '../Typography';
import { getCircleColor, getTodayColor, getFontStyle } from './style';

/**
 *
 * @param {} props
 * @param { 'grey2' | 'grey7' } props.type 
 * @param { 'grey2' | 'white' } props.color
 * @param { 'Body05R' | 'Body06R'} props.size
 * @returns
 */
 


const Component = ({
    BooleanValue, 
    type ='grey7', 
    color ='grey2', 
    size ='Body06R',
    onPressEvent,
    onPressEvent2,
    onPressEvent3,
    daily,
    meal,
    margin = '0px'
}) => {
  const navigation = useNavigation();
    const pager = useRef();
    const today = new Date()
    const weekly = useAtomValue(weekAtom);
    const {isDailyFood,dailyFood} = useFoodDaily();
    const {isOrderMeal,orderMeal} = useOrderMeal();
    // const {isDailyfood, dailyFood} = useFoodDetail();
    // const [touched,setTouched] = useState();
    const [currentPress,setCurrentPress] = useState(null);
    const [chk,setChk] = useState(0);
    
    // 파라미터 보낼 날짜
    const startDate = formattedWeekDate(weekly[0][0]);
    const endDate = formattedWeekDate(weekly[0].slice(-1)[0]);
  
  
    // useEffect(()=>{
    //     async function loadOrderMeal(){
    //       await orderMeal();
    //     }
    //     loadOrderMeal();
      
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    //   },[]);

   const selectedPress = (day) => {
      setCurrentPress(day)
   }

      // const dayPress = (day) => {
      //   setFilter(isOrderMeal?.filter(x => x.date === day));
      // };
      // console.log(filter)

      
    const onPageScroll = (e) => {
      const { position } = e.nativeEvent;
        setChk(position)
    } 

   const dayPress = async (propsDay) =>{
        
        try {
            await dailyFood('123',propsDay);
            
        }catch(err){
            console.log(err)
        }
    }
      
    
  return (
    <React.Fragment>
     {BooleanValue && daily ? <Button pager={pager} daily chk={chk} /> : <></>}
     {BooleanValue && meal ? <Button pager={pager} meal chk={chk}  /> : <></>}
     
     <PagerViewWrap ref={pager} initialPage={0} pageMargin={22} onPageScroll={(e) => {onPageScroll(e)}} margins={margin}>
    {weekly.map((week,i) => {
        return (
            <View key={i}>
                <Wrap>
                    {week.map((day) => {
                      
                        const txt = format(day,'EEE',{locale:ko});
                        const now = (day.toDateString() === today.toDateString());
                        const pressDay = (formattedDate(day));
                        const propsDay = (formattedWeekDate(day));
                        // const lastDay = (day.toISOString().substring(0,10) < today.toISOString().substring(0,10))
                        const lastDay = (day.toLocaleDateString() < today.toLocaleDateString());
                        const order = isOrderMeal?.find(x => x.date === propsDay);
                        
                        const orderCount = order && order.orderItemDtoList;
                        const set = new Set(orderCount?.map((x) => x.diningType));
                        const newArr = [...set].length;
                      
                        
                        return (
                        <DaysWrap key={day}>
                            <Day lastDay={lastDay} color={color} size={size}>{txt}</Day>
                            <TodayCircle now={now} type={type} currentPress={currentPress} day={day}>
                              {/* onPressEvent: Home, onPressEvent2: BuyMeal, onPressEvent3: Meal  */}
                              {onPressEvent && 
                                <Pressable onPress={()=>navigation.reset({ routes: [{name:MealMainPageName,params:{data:pressDay}}]})}>
                                <Day color={color} lastDay={lastDay} now={now} size={size}>{day.getDate()}</Day>
                                </Pressable>
                              }
                              {onPressEvent2 && 
                                <Pressable onPress={()=>{ selectedPress(day); onPressEvent2(propsDay)}}>
                                <Day color={color} lastDay={lastDay} now={now} size={size}>{day.getDate()}</Day>
                                </Pressable>
                              }
                              {onPressEvent3 && 
                                <Pressable onPress={()=>{ selectedPress(day); onPressEvent3(propsDay)}}>
                                <Day color={color} lastDay={lastDay} now={now} size={size}>{day.getDate()}</Day>
                                </Pressable>
                              }
                            </TodayCircle>
                            {order && (
                              <DotWrap>
                                {Array.from(Array(newArr),(x,idx) => (
                                  <Dot key={idx} lastDay={lastDay}/>
                                )) }
                              </DotWrap>
                            )}
                        </DaysWrap>
                        )
                    })}
                </Wrap>
        </View>
        )
    })}
    </PagerViewWrap>
    </React.Fragment>
  );
};

export default Component;

const PagerViewWrap = styled(PagerView)`
flex:1;
margin:${({margins}) => margins && margins};
`;

const Wrap = styled.View`
flex-direction:row;
justify-content:space-between;
margin-top:16px;
`;

const DaysWrap = styled.View`
align-items:center;
`;

const TodayCircle = styled.View`
width:24px;
height:24px;
border-radius:50px;
margin-top:3px;
align-items:center;
justify-content:center;
background-color:${({currentPress, day}) => currentPress === day ? '#E4E3E7' : 'white'};
 ${({ type, now }) => now && getCircleColor(type)};
`;

const DotWrap = styled.View`
flex-direction:row;
justify-content:center;

`;

const Dot = styled.View`
width:5px;
height:5px;
border-radius:50px;
background-color:${({theme,lastDay}) => lastDay ? theme.colors.grey[5] : theme.colors.grey[2]};
margin:4px 2px 0px 2px;
`;


const Day = styled(Typography).attrs({text:'Body06R'})`
color:${({ lastDay,theme }) => lastDay ? theme.colors.grey[5] : theme.colors.grey[2]};
${({ color, now }) => now && getTodayColor(color)};
${({ size }) => getFontStyle(size)};
`;
