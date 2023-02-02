import { useNavigation } from "@react-navigation/native";
import { useAtomValue } from "jotai";
import React, { useEffect, useState } from "react";
import { ScrollView, View ,Alert, Pressable} from "react-native";
import styled from "styled-components";

import Plus from "../../../../../assets/icons/Home/plus.svg";
import { weekAtom } from "../../../../../biz/useBanner/store";
import useOrderMeal from "../../../../../biz/useOrderMeal";
import LabelButton from "../../../../../components/ButtonMeal";
import Calendar from "../../../../../components/Calendar";
import Typography from "../../../../../components/Typography";
import { formattedMonthDay, formattedWeekDate } from "../../../../../utils/dateFormatter";
import { CalendarWrap, MakersName, MealName } from "../../BuyMeal/Main";
import {PAGE_NAME as BuyMealPageName} from '../../BuyMeal/Main';
import {PAGE_NAME as LoginPageName} from '../../../Login/Login';
import FastImage from "react-native-fast-image";
import {PAGE_NAME as MealDetailPageName} from "../../MealDetail/Main";
export const PAGE_NAME = 'P_MAIN__BNB__MEAL';

const Pages = ({route}) => {
  
  
  const data = route?.params?.data === undefined ? '' : route.params.data;
  const navigation = useNavigation();
  // const mealInfo = useAtomValue(isOrderMealAtom);
  const meal = true;
  const [touchDate,setTouchDate] = useState(data);
  const weekly = useAtomValue(weekAtom);
  const {isOrderMeal,orderMeal} = useOrderMeal();
  
  const startDate = formattedWeekDate(weekly[0][0]);
  const endDate = formattedWeekDate(weekly[0].slice(-1)[0]);
  
 console.log(touchDate,'touchDate')
  useEffect(()=>{
    async function loadDailyFood(){
      await orderMeal(startDate,endDate);
  }
  try {
    loadDailyFood();
  } catch (error) {
    if(error.toString().replace("Error:",'').trim() === '403'){
      navigation.reset({
        index: 0,
        routes: [
          {
            name: LoginPageName,
          },
        ],
      })
    }
    
  }
  
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const date = formattedWeekDate(new Date());
  const todayMeal = isOrderMeal?.filter((m) => m.serviceDate === date);
  const selectDate = isOrderMeal?.filter((m) => m.serviceDate === touchDate);
  const test = isOrderMeal?.filter((m) => console.log(m.serviceDate === touchDate,'22323'));
  // const loadData = weekly.map((w,i) => w.filter(x => console.log(formattedWeekDate(x))));

  const pressDay = (day) => {
    setTouchDate(day??data);
  }

  const cancelMealPress = () =>{
    Alert.alert(
      "메뉴 취소",
      "메뉴를 취소하시겠어요?",
      [
        {
          text:'아니요',
          onPress:() => {},
          
        },
        {
          text:'메뉴 취소',
          onPress:() => {},
          style:'destructive'
        }
      ]
    )
  };

  const changeMealPress = () =>{
    Alert.alert(
      "메뉴 변경",
      "현재 메뉴 취소 후 진행됩니다.\n 메뉴를 취소하시겠어요?",
      [
        {
          text:'아니요',
          onPress:() => {},
          
        },
        {
          text:'메뉴 취소',
          onPress:() => {},
          style:'destructive'
        }
      ]
    )
  }


  return (
    <SafeView>
      <ScrollView>
        <CalendarView>
          <Calendar  BooleanValue type={'grey2'} color={'white'} size={'Body05R'} onPressEvent2={pressDay}  meal={meal} margin={'0px 28px'}/>
        </CalendarView>
        
        <MealWrap>
        {touchDate ? 
        (<>
          {selectDate.map((s,index) => 
            <View key={index} >
                <DiningTimeWrap >
                  <DiningTime>{formattedMonthDay(s.serviceDate)} {s.diningType}</DiningTime>
                </DiningTimeWrap>
              {s.orderItemDtoList?.map((sm,idx) => 
              
                <MealContentWrap key={idx}>
                  <FastImage source={{uri:`${sm.image}`,priority:FastImage.priority.high}}
                    style={{
                        width:107,
                        height:107,
                        borderRadius:7
                    }}
                    />
                  <Content>
                    <MakersName>[{sm.makers}]</MakersName>
                    <MealName>{sm.name}</MealName>
                    <DeliveryAddress>{sm.groupName}・{sm.spotName}</DeliveryAddress>
                    <CountText>{sm.count}개</CountText>
                  </Content>
                  <CancleBtnWrap >
                    <LabelButton label={"취소"} onPressEvent={cancelMealPress}/>
                  </CancleBtnWrap>
                  <MealChangeWrap>
                    <LabelButton label={"메뉴변경"} onPressEvent={changeMealPress}/>
                  </MealChangeWrap>
              </MealContentWrap>
              
              )}
          </View>
        )}
        </>) : 
        (
          <>
          {todayMeal && todayMeal.map((m,i) => 
            <View key={i} >
                <DiningTimeWrap >
                  <DiningTime>{formattedMonthDay(m.serviceDate)} {m.diningType}・오늘</DiningTime>
                </DiningTimeWrap>
              {m.orderItemDtoList?.map((el,idx) => 
              
                <MealContentWrap key={idx}>
                  <FastImage source={{uri:`${el.image}`,priority:FastImage.priority.high}}
                    style={{
                        width:107,
                        height:107,
                        borderRadius:7
                    }}
                    />
                  <Content onPress={()=>navigation.navigate(MealDetailPageName,{dailyFoodId:el.dailyFoodId})}>
                    <MakersName>[{el.makers}]</MakersName>
                    <MealName>{el.name}</MealName>
                    <DeliveryAddress>{el.groupName}・{el.spotName}</DeliveryAddress>
                    <CountText>{el.count}개</CountText>
                  </Content>
                  <CancleBtnWrap>
                    <LabelButton label={"취소"} onPressEvent={cancelMealPress}/>
                  </CancleBtnWrap>
                  <MealChangeWrap>
                    <LabelButton label={"메뉴변경"} onPressEvent={changeMealPress}/>
                  </MealChangeWrap>
              </MealContentWrap>
              
              )}
              
          </View>
          )}
          </>
        )}
        </MealWrap>
      </ScrollView>
        { (todayMeal?.length === 0 && selectDate?.length === 0) && <NoMealWrap><NoMealText>주문한 메뉴가 없어요</NoMealText></NoMealWrap>}
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


const MealContentWrap = styled.View`
flex-direction:row;
border-bottom-color:${props => props.theme.colors.grey[8]};
border-bottom-width:1px;
padding:24px 0px;
min-height:131px;
`;
const DiningTimeWrap = styled.View`
padding-top:22px;
`;

const DiningTime = styled(Typography).attrs({text:'CaptionR'})`
color:${props => props.theme.colors.grey[4]};
`;

const Content = styled.Pressable`
margin-left:16px;
width:50%;
align-self:flex-start;
`;

const MealChangeWrap = styled.Pressable`
position:absolute;
right:0;
bottom:24px;
`;

const CancleBtnWrap = styled(MealChangeWrap)`
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

const CountText = styled(Typography).attrs({text:'CaptionR'})`
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

const DeliveryAddress = styled(Typography).attrs({text:'Button10R'})`
color:${({theme}) => theme.colors.grey[5]};
`;