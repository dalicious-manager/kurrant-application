import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { Dimensions, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styled, { css, useTheme } from "styled-components/native";
import Typography from "../../../../../../components/Typography";
import Wrapper from "../../../../../../components/Wrapper";

import usePurchaseHistory from "../../../../../../biz/usePurchaseHistory";
import DateOrderItemContainer from "./components/DateOrderItemContainer";
import { purchaseMealAtom } from "../../../../../../biz/usePurchaseHistory/store";
import { useAtom } from "jotai";
import Skeleton from "../../Skeleton";
import { formattedWeekDate } from "../../../../../../utils/dateFormatter";
import { CalendarIcon } from "../../../../../../components/Icon";
import DatePicker from "@react-native-community/datetimepicker";

export const PAGE_NAME = 'P_MAIN__MEAL__HISTORY';

const Pages = () => {
  const navigation = useNavigation();
  const themeApp = useTheme();
  const [,setMealPurchase] = useAtom(purchaseMealAtom);
  const [startDate, setStartDate] = useState(startDate || new Date());
  const [showDateModal, setShowDateModal] = useState(false);
  const [endDate, setEndDate] = useState(endDate || new Date());
  const [showDateModal2, setShowDateModal2] = useState(false);

  const onChangeDate = (event,date,setModal,setSelected) => {
    if (Platform.OS === 'android') {
      setModal(false);
    }
    
    setSelected(date);
  };

const confirmPress = (setModal) =>{    
  setModal(false);
}

  const [searchDate , setSearchDate] = useState([
    {id:0,text:"1주일", isActive:true},
    {id:1,text:"1개월", isActive:false},
    {id:2,text:"3개월", isActive:false},
    {id:3,text:"조건검색", isActive:false}
  ]);
  const {getPurchaseHistoryMeal, readAbleAtom:{mealPurchase,isMealPurchaseLoading}} = usePurchaseHistory();
  const selectDate = (date)=>{
    if(!isMealPurchaseLoading){
      const setDate = searchDate.map((item) => item.id === date.id ? { ...item, isActive: true} : { ...item, isActive: false})
      setSearchDate(setDate)
    }
  }
  useFocusEffect(
    useCallback(() => {
        navigation.setOptions({
            tabBarLabelStyle:{fontSize:15,lineHeight:21,fontFamily:'Pretendard-SemiBold',}
        })
      return () => {
        navigation.setOptions({
            tabBarLabelStyle:{fontSize:15,lineHeight:21,fontFamily: 'Pretendard-Regular',}
        })
    }
    }, [])
  );
  const ShowCalendar = (selected,onChange,confirm,setModal,setSelected)=>{
    return <React.Fragment>
               {Platform.OS === 'ios' && <IosButton>
                   <Pressable onPress={()=>{setModal(false)}}>
                       <Cancel>취소</Cancel>
                   </Pressable>
                   <Pressable onPress={confirm}>
                       <Confirm>완료</Confirm>
                   </Pressable>
               </IosButton>}
               <DatePicker
               value={selected}
               display="spinner"
               onChange={(event,date)=>onChange(event,date,setModal,setSelected)}
               locale='ko-KR'
               />
               
           </React.Fragment>
   }
  const onPressCondition = async()=>{
    const body = {
      startDate:startDate, endDate:endDate
    }
    await getPurchaseHistoryMeal(body);     
  }
  useEffect(()=>{
    const purchaseHistory =async()=>{
      await getPurchaseHistoryMeal();     
    } 
    const selectDate = searchDate.filter((v)=> v.isActive === true);
    console.log(selectDate[0])
    if(selectDate[0].id !== 3){
      purchaseHistory();
    }else{
      setMealPurchase({});
    }
  },[searchDate])
  return (
    
    <Container>
      <Wrapper>
        <DateTab>
          {searchDate.map((v)=>{
            return (
              <DateButton isActive={v.isActive} key={v.id} onPress={()=>selectDate(v)}>
                <DateText text={v.isActive? "Button10SB" : "Button10R"} isActive={v.isActive}>{v.text}</DateText>
              </DateButton>
            )
          })}
        </DateTab>
        {searchDate.find((v)=> v.id === 3).isActive && 
          <ConditionSearch>
            <DateSelectedBox>
              <DateSelectButton onPress={()=>setShowDateModal(true)}>
                <DateSelectedText text="CaptionR" textColor={themeApp.colors.grey[2]}>{formattedWeekDate(startDate,". ")}</DateSelectedText>
                <CalendarIcon />
              </DateSelectButton>
              <Bridge>
                <Typography text="CaptionR">-</Typography>
              </Bridge>
              <DateSelectButton onPress={()=>setShowDateModal2(true)}>
                <DateSelectedText text="CaptionR" textColor={themeApp.colors.grey[2]}>{formattedWeekDate(endDate,". ")}</DateSelectedText>
                <CalendarIcon />
              </DateSelectButton>
            </DateSelectedBox>
            <SubmitButton>
              <Typography text="Button10SB" textColor={themeApp.colors.grey[3]} onPress={onPressCondition}>
                검색
              </Typography>
            </SubmitButton>
          </ConditionSearch>}
        {isMealPurchaseLoading ? <Skeleton />:mealPurchase?.length > 0
        ? <ScrollViewBox>
        {mealPurchase?.map((v,i)=>{
          console.log(v);
          return <DateOrderItemContainer key={`${v.orderDate}${i}`} itemIndex={i} purchase={v} date={v.orderDate} />
        })}
        </ScrollViewBox> 
        : <NothingContainer>
            <Typography text={"Body05R"} textColor={themeApp.colors.grey[5]}>주문 내역이 없어요</Typography>
          </NothingContainer>}
        
      </Wrapper>
      {showDateModal && (
          ShowCalendar(startDate,onChangeDate,confirmPress,setShowDateModal,setStartDate)
      )}
      {showDateModal2 && (
          ShowCalendar(endDate,onChangeDate,confirmPress,setShowDateModal2,setEndDate)
      )}
    </Container>
    
  )
}

export default Pages;

const DateTab = styled.View`
  flex-direction: row;
  border-bottom-color :${({theme})=> theme.colors.grey[8]};
  border-bottom-width: 1px;
  padding: 8px 20px;
`;

const DateButton = styled.Pressable`
  border-radius: 4px;
  padding: 6.5px 12px;  
  margin: 0px 4px;
  ${({isActive})=>{
    if(isActive){
      return css`
        background-color: ${({theme})=> theme.colors.neutral[0]};
        border: 1px solid ${({theme})=> theme.colors.grey[2]};
        box-sizing: border-box;
      `
    }else{
      return css`
        background-color: ${({theme})=> theme.colors.grey[8]};
        border: 1px solid ${({theme})=> theme.colors.grey[8]};
        box-sizing: border-box;
      `
    }
  }}
`
const ConditionSearch = styled.View`
  width: 100%;
  flex-direction:row;
  padding: 8px 24px;
  border-bottom-color: ${({theme})=> theme.colors.grey[8]};
  border-bottom-width: 1px;
  align-items: center;
  justify-content: space-between;
`
const DateSelectedBox = styled.View`
  flex-direction:row;
  align-items: center;
`
const DateText = styled(Typography)`
  ${({isActive})=>{
    if(isActive){
      return css`
        color: ${({theme})=> theme.colors.grey[2]};;
      `
    }else{
      return css`
        color: ${({theme})=> theme.colors.grey[5]};;
      `
    }
  }}
`
const NothingContainer  = styled.View`
  flex:1;
  align-items: center;
  justify-content: center;
`
const Container = styled(SafeAreaView)`
  flex: 1;
`;
const ScrollViewBox = styled(ScrollView)`
  flex: 1;
`;

const Bridge = styled.View`
  margin: 0px 4px;
`
const DateSelectButton = styled.Pressable`
  flex-direction: row;
  min-width: 123px;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;
  border: 1px solid ${({theme})=> theme.colors.grey[7]};
  padding: 8px;
  padding-left: 12px;
`
const DateSelectedText = styled(Typography)`
  margin-right: 22px;
`
const SubmitButton = styled.Pressable`
  border-radius: 100px;
  padding: 6.5px 16px;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({theme})=> theme.colors.grey[7]};  
`