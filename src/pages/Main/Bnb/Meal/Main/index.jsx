import { useNavigation } from "@react-navigation/native";
import { useAtomValue } from "jotai";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, View ,Image, Pressable} from "react-native";
import { makeShareable } from "react-native-reanimated/lib/reanimated2/core";
import styled from "styled-components";

import Plus from "../../../../../assets/icons/Home/plus.svg";
import { weekAtom } from "../../../../../biz/useBanner/store";
import useOrderMeal from "../../../../../biz/useOrderMeal";
import { isOrderDinnerAtom, isOrderLunchAtom, isOrderMealAtom, isOrderMorningAtom } from "../../../../../biz/useOrderMeal/store";
import Button from "../../../../../components/Button";
import Calendar from "../../../../../components/Calendar";
import Typography from "../../../../../components/Typography";
import { formattedDate, formattedDateBtn, formattedWeekDate } from "../../../../../utils/dateFormatter";
import { CalendarWrap, MakersName, MealName } from "../../BuyMeal/Main";
import {PAGE_NAME as BuyMealPageName} from '../../BuyMeal/Main';

export const PAGE_NAME = 'P_MAIN__BNB__MEAL';

const Pages = ({route}) => {
  // const {data} = route.params;
console.log(route)
  const navigation = useNavigation();
  const mealInfo = useAtomValue(isOrderMealAtom);
  const meal = true;
  const [touchDate,setTouchDate] = useState();
  const weekly = useAtomValue(weekAtom);
  const {isOrderMeal,orderMeal} = useOrderMeal();

  const startDate = formattedWeekDate(weekly[0][0]);
  const endDate = formattedWeekDate(weekly[0].slice(-1)[0]);

  useEffect(()=>{
    async function loadDailyFood(){
      await orderMeal(startDate,endDate);
  }
  loadDailyFood();
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const date = formattedWeekDate(new Date());
  const todayMeal = mealInfo?.filter((m) => m.date === date);
  const selectDate = mealInfo?.filter((m) => m.date === touchDate);
  // const loadData = weekly.map((w,i) => w.filter(x => console.log(formattedWeekDate(x))));

  const pressDay = (day) => {
    console.log(day)
  }

  
  return (
    <SafeView>
      <ScrollView>
        <CalendarView>
          <Calendar  BooleanValue type={'grey2'} color={'white'} size={'Body05R'} onPressEvent3={pressDay}  meal={meal} margin={'0px 28px'}/>
        </CalendarView>
        
        <MealWrap>
        {/* {touchDate ? 
        (<>
          {selectDate.map((s,index) => 
            <React.Fragment key={index}>
              {s.orderItemDtoList.map((sm,idx) => 
              <React.Fragment key={idx}>
                <DiningTimeWrap >
                  <DiningTime>{s.date} {sm.diningType}・오늘</DiningTime>
                </DiningTimeWrap>
                <MealContentWrap >
                  <View>
                    <MealImage source={{uri:'https://cdn.mindgil.com/news/photo/202004/69068_2873_1455.jpg'}}/>
                  </View>
                  <Content>
                    <MakersName>[{sm.makers}]</MakersName>
                    <MealName>{sm.name}</MealName>
                    <CountText>{sm.count}개</CountText>
                  </Content>
                  <ReviewBtnWrap>
                    <ReviewText>리뷰작성</ReviewText>
                  </ReviewBtnWrap>
              </MealContentWrap>
              </React.Fragment>
              )}
          </React.Fragment>
        )}
        </>) : 
        (
          <>
          {todayMeal && todayMeal.map((m,i) => 
            <React.Fragment key={i}>
              {m.orderItemDtoList.map((meal,idx) => 
              <React.Fragment key={idx}>
                <DiningTimeWrap >
                  <DiningTime>{m.date} {meal.diningType}・오늘</DiningTime>
                </DiningTimeWrap>
                <MealContentWrap >
                  <View>
                    <MealImage source={{uri:'https://cdn.mindgil.com/news/photo/202004/69068_2873_1455.jpg'}}/>
                  </View>
                  <Content>
                    <MakersName>[{meal.makers}]</MakersName>
                    <MealName>{meal.name}</MealName>
                    <CountText>{meal.count}개</CountText>
                  </Content>
                  <ReviewBtnWrap>
                    <ReviewText>리뷰작성</ReviewText>
                  </ReviewBtnWrap>
              </MealContentWrap>
              </React.Fragment>
              )}
              
          </React.Fragment>
          )}
          </>
        )} */}
        </MealWrap>
      </ScrollView>
        {/* { selectDate.length === 0 && <NoMealWrap><NoMealText>주문한 메뉴가 없어요</NoMealText></NoMealWrap>} */}
      <ButtonWrap>
        <PlusButton onPress={()=>{navigation.navigate(BuyMealPageName)}}>
            <PlusIcon/>
        </PlusButton>
      </ButtonWrap>
    </SafeView>
  )
}

export default Pages;

const SafeView = styled.SafeAreaView`
background-color:${props => props.theme.colors.grey[0]};
flex:1;
`;

const CalendarView = styled(CalendarWrap)`

`;

const MealWrap = styled.View`
margin:0px 24px 24px 24px;
//padding-bottom:24px;
position:relative;
`;
const MealImage = styled.Image`
width:107px;
height:107px;
border-radius:7px;
`;

const MealContentWrap = styled.View`
flex-direction:row;
border-bottom-color:${props => props.theme.colors.grey[8]};
border-bottom-width:1px;
padding:28px 0px;
`;
const DiningTimeWrap = styled.View`
padding-top:22px;
`;

const DiningTime = styled(Typography).attrs({text:'CaptionR'})`
color:${props => props.theme.colors.grey[4]};
`;

const Content = styled.View`
margin-left:16px;
`;

const ReviewBtnWrap = styled.Pressable`
width:77px;
height:32px;
border:1px solid ${props => props.theme.colors.grey[7]}; 
border-radius:100px;
background-color:${props => props.theme.colors.grey[0]};
align-items:center;
justify-content:center;
position:absolute;
right:0;
bottom:28px;
margin-left:6px;
`;

const CancleBtnWrap = styled(ReviewBtnWrap)`
right:83px;
`;

const ButtonWrap = styled.View`
margin:0px 20px 0px 0px;

`;

const PlusButton = styled.Pressable`
width:56px;
height:56px;
border-radius:100px;
background-color:${props => props.theme.colors.yellow[500]};
position:absolute;
bottom:26px;
right:0;
`;
const PlusIcon = styled(Plus)`
position:absolute;
bottom:20px;
left:18px;

`;
const ReviewText = styled(Typography).attrs({text:'Button10SB'})`
color:${props => props.theme.colors.grey[3]};
`;

const CountText= styled(Typography).attrs({text:'CaptionR'})`
color:${props => props.theme.colors.grey[5]};
`;

const NoMealWrap = styled.View`
align-items:center;
justify-content:center;
height:80%;

`;

const NoMealText = styled(Typography).attrs({text:'Body05R'})`
color:${props => props.theme.colors.grey[5]};
`;