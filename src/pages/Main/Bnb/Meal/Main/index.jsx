import { useNavigation } from "@react-navigation/native";
import React from "react";
import { SafeAreaView, ScrollView, Text, View ,Image, Pressable} from "react-native";
import styled from "styled-components";

import Plus from "../../../../../assets/icons/Home/plus.svg";
import Button from "../../../../../components/Button";
import Calendar from "../../../../../components/Calendar";
import Typography from "../../../../../components/Typography";
import { CalendarWrap, MakersName, MealName } from "../../BuyMeal/Main";
import {PAGE_NAME as BuyMealPageName} from '../../BuyMeal/Main';

export const PAGE_NAME = 'P_MAIN__BNB__MEAL';

const Pages = () => {

  const navigation = useNavigation();

  return (
    <SafeView>
      <ScrollView>
        <CalendarView>
          <Calendar  BooleanValue type={'grey2'} color={'white'} size={'Body05R'}/>
        </CalendarView>
        <MealWrap>
          <DinningTimeWrap>
            <DinningTime>4월 21일(월) 점심・오늘</DinningTime>
          </DinningTimeWrap>
          <MealContentWrap>
            <View>
              <MealImage source={{uri:'https://cdn.mindgil.com/news/photo/202004/69068_2873_1455.jpg'}}/>
            </View>
            <Content>
              <MakersName>[폴어스]</MakersName>
              <MealName>리코타 치즈 샐러드</MealName>
              <CountText>1개</CountText>
            </Content>
            
            {/* <Button label={'리뷰작성'} type={'white'} size={'button32'} text={'Button10SB'} /> */}
            <ReviewBtnWrap>
              <ReviewText>리뷰작성</ReviewText>
            </ReviewBtnWrap>
          </MealContentWrap>
        </MealWrap>
        <MealWrap>
          <DinningTimeWrap>
            <DinningTime>4월 21일(월) 점심・오늘</DinningTime>
          </DinningTimeWrap>
          <MealContentWrap>
            <View>
              <MealImage source={{uri:'https://cdn.mindgil.com/news/photo/202004/69068_2873_1455.jpg'}}/>
            </View>
            <Content>
              <MakersName>[폴어스]</MakersName>
              <MealName>리코타 치즈 샐러드</MealName>
              <CountText>1개</CountText>
            </Content>
            
            {/* <Button label={'리뷰작성'} type={'white'} size={'button32'} text={'Button10SB'} /> */}
            <ReviewBtnWrap>
              <ReviewText>리뷰작성</ReviewText>
            </ReviewBtnWrap>
            <CancleBtnWrap>
              <ReviewText>취소</ReviewText>
            </CancleBtnWrap>
          </MealContentWrap>
        </MealWrap>
      </ScrollView>
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
margin-bottom:24px;
`;

const MealWrap = styled.View`
margin:0px 24px 24px 24px;
border-bottom-color:${props => props.theme.colors.grey[8]};
border-bottom-width:1px;
padding-bottom:24px;
position:relative;
`;
const MealImage = styled.Image`
width:107px;
height:107px;
border-radius:7px;
`;

const MealContentWrap = styled.View`
flex-direction:row;
`;
const DinningTimeWrap = styled.View`
padding-bottom:24px;
`;

const DinningTime = styled(Typography).attrs({text:'CaptionR'})`
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
bottom:0;
margin-left:6px;
`;

const CancleBtnWrap = styled(ReviewBtnWrap)`
right:83px;
`;

const ButtonWrap = styled.View`
margin:0px 20px 26px 0px;

`;

const PlusButton = styled.Pressable`
width:56px;
height:56px;
border-radius:100px;
background-color:${props => props.theme.colors.yellow[500]};
position:absolute;
bottom:0;
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