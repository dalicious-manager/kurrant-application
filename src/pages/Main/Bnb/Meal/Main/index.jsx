import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { ScrollView, View ,Alert} from "react-native";
import styled from "styled-components";

import Plus from "../../../../../assets/icons/Home/plus.svg";
import useOrderMeal from "../../../../../biz/useOrderMeal";
import LabelButton from "../../../../../components/ButtonMeal";
import Calendar from "../../../../../components/Calendar";
import Typography from "../../../../../components/Typography";
import Toast from "../../../../../components/Toast";
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
  const meal = true;
  const [touchDate,setTouchDate] = useState(data);
  const [show,setShow] = useState(false);
  const {isOrderMeal, refundItem, setOrderMeal} = useOrderMeal();
  const date = formattedWeekDate(new Date());
  const todayMeal = isOrderMeal?.filter((m) => m.serviceDate === date);
  const selectDate = isOrderMeal?.filter((m) => m.serviceDate === touchDate);
  const toast = Toast();

  const pressDay = (day) => {
    setTouchDate(day??data);
  }

  const cancelMealPress = (id) =>{
    const list = isOrderMeal.map(el => {
      return {...el,orderItemDtoList:[...el.orderItemDtoList.filter(v => v.id !== id)]}
    })

    const listArr = list.filter(el => {
      return el.orderItemDtoList.length !== 0
    })
    
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
          onPress: async() => {
            try {
              await refundItem({
                id:id
              })
              setOrderMeal(listArr)
              setShow(true);
              toast.toastEvent();
              setTimeout(()=>{
                setShow(false)
              },2000)
              
            } catch (err) {
              console.log(err)
            }
          },
          style:'destructive'
        }
      ]
    )
  };

  const changeMealPress = (id) =>{
    
    const list = isOrderMeal.map(el => {
      return {...el,orderItemDtoList:[...el.orderItemDtoList.filter(v => v.id !== id)]}
    })

    const listArr = list.filter(el => {
      return el.orderItemDtoList.length !== 0
    })

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
          onPress: async () => {
            try {
              await refundItem({
                id:id
              })
              setOrderMeal(listArr)
              navigation.navigate(BuyMealPageName)
            } catch (err) {
              console.log(err)
            }
          },
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
          {selectDate.map((s,index) => {
            return (
              <View key={index} >
                <DiningTimeWrap >
                  <DiningTime>{formattedMonthDay(s.serviceDate)} {s.diningType}</DiningTime>
                </DiningTimeWrap>
              {s.orderItemDtoList?.map((sm,idx) => {
                return (
                  <MealContentWrap key={idx}>
                    <FastImage source={{uri:`${sm.image}`,priority:FastImage.priority.high}}
                      style={{
                          width:107,
                          height:107,
                          borderRadius:7
                      }}
                      />
                    <Content onPress={()=>navigation.navigate(MealDetailPageName,{dailyFoodId:sm.dailyFoodId})}>
                      <MakersName>[{sm.makers}]</MakersName>
                      <MealName>{sm.name}</MealName>
                      <DeliveryAddress>{sm.groupName}・{sm.spotName}</DeliveryAddress>
                      <CountText>{sm.count}개</CountText>
                      {sm.orderStatus === 7 && <CancelText>취소완료</CancelText>}
                    </Content>
                    <CancleBtnWrap status={sm.orderStatus}>
                      <LabelButton label={"취소"} onPressEvent={()=>cancelMealPress(sm.id)} disabled={(sm.orderStatus === 7) && true}/>
                    </CancleBtnWrap>
                  {sm.orderStatus !== 7 && <MealChangeWrap>
                      <LabelButton label={"메뉴변경"} onPressEvent={()=>changeMealPress(sm.id)}/>
                    </MealChangeWrap>}
                </MealContentWrap>
                )
              }
              
                
              
              )}
          </View>
            )
          }
            
        )}
        </>) : 
        (
          <>
          {todayMeal && todayMeal.map((m,i) => {
            return (
              <View key={i}>
                <DiningTimeWrap >
                  <DiningTime>{formattedMonthDay(m.serviceDate)} {m.diningType}・오늘</DiningTime>
                </DiningTimeWrap>
              {m.orderItemDtoList?.map((el,idx) => {
                return (
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
                    {el.orderStatus === 7 && <CancelText>취소완료</CancelText>}
                  </Content>
                  <CancleBtnWrap status={el.orderStatus}>
                    <LabelButton label={"취소"} onPressEvent={()=>cancelMealPress(el.id)} disabled={el.orderStatus === 7}/>
                  </CancleBtnWrap>
                  {el.orderStatus !== 7 && <MealChangeWrap>
                    <LabelButton label={"메뉴변경"} onPressEvent={()=>changeMealPress(el.id)}/>
                  </MealChangeWrap>}
                </MealContentWrap>
                )
              }
              
                
              
              )}
              
          </View>
            )
          }
            
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
      {show && <toast.ToastWrap message={"메뉴가 취소됐어요"} icon={'checked'}/>}
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
min-height:163px;
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
right: ${({status}) => status === 7 ? '0px' : '83px'};
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

const CancelText = styled(Typography).attrs({test:'Body06R'})`
color:${({theme}) => theme.colors.red[500]};
`;