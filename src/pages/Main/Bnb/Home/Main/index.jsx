import React from 'react';
import {useForm} from 'react-hook-form';
import { SafeAreaView, Text, View ,ScrollView,Dimensions,Image,Platform,StyleSheet} from 'react-native';
import styled, {css} from 'styled-components/native';

import ArrowIcon from '../../../../../assets/icons/Home/arrowDown.svg';
import BellIcon from '../../../../../assets/icons/Home/bell.svg';
import CalendarIcon from '../../../../../assets/icons/Home/calendar.svg';
import CatorIcon from '../../../../../assets/icons/Home/cator.svg';
import CsIcon from '../../../../../assets/icons/Home/cs.svg';
import MarketIcon from '../../../../../assets/icons/Home/market.svg';
import MembershipIcon from '../../../../../assets/icons/Home/membership.svg';
import Button from '../../../../../components/Button';
import CheckButton from '../../../../../components/Button';
import Calendar from '../../../../../components/Calendar';
import Typography from '../../../../../components/Typography';
import {PAGE_NAME as BuyMealPageName} from '../../BuyMeal/Main';

// const todos = [
//   { id: 1, text: '샤워하기' },
//   { id: 2, text: '기술 공부하기'},
//   { id: 3, text: '독서하기' },
//   { id: 4, text: '샤워하기' },
//   { id: 5, text: '기술 공부하기' },
//   { id: 6, text: '독서하기' },
//   { id: 7, text: '샤워하기' },
//   { id: 8, text: '기술 공부하기' },
//   { id: 9, text: '독서하기' },
//   { id: 10, text: '샤워하기'},
//   { id: 11, text: '기술 공부하기' },
//   { id: 12, text: '독서하기' },
// ];
export const PAGE_NAME = 'P_MAIN__BNB__HOME';

const screenWidth = Dimensions.get('window').width;

const Pages = ({navigation}) => {
  const test = (e) => {
    let updateScroll = e.nativeEvent.contentOffset.y;
    //console.log("스크롤 움직임",updateScroll);
  }


  return (
    <SafeView>
      <Wrap>
        <BarWrap>
          <SpotName>
          <SpotNameText>팁스타운 1층</SpotNameText>
          <ArrowIcon/>
          </SpotName>
          <Icons>
            <BellIcon/>
            <CsIcon/>
          </Icons>
        </BarWrap>
      </Wrap>
      <ScrollView onScroll={test} scrollEventThrottle={0} showsVerticalScrollIndicator={false}>
        <LargeTitle>김달리님 안녕하세요!</LargeTitle>
  
        <MainWrap>
          {/* 식사 없을시 */}
          <NoMealInfo>
            <GreyTxt>오늘은 배송되는 식사가 없어요</GreyTxt>
          </NoMealInfo>
          {/* 메뉴 수령 그림자 styles.shadow */}
          <MealInfoWrap style={styles.shadow}>
            <MealInfo>
              <MealImage source={{uri:'https://cdn.mindgil.com/news/photo/202004/69068_2873_1455.jpg'}}/>
              <MealText>
                <View>
                  <CaptionTitle>점심</CaptionTitle>
                  <View>
                    <MealTxt>훈제오리 애플시나몬 샐러드(L)</MealTxt>
                  </View>
                </View>
                <MealCount>
                  <GreyTxt>2개</GreyTxt>
                </MealCount>
              </MealText>
          </MealInfo>
          </MealInfoWrap> 
        </MainWrap>  
        {/* 오늘의 식사 시간 지나면 나오는 View */}
          <MealCheckWrap>
            <MealCheckText>
              메뉴 확인 후 수령하셨나요?
            </MealCheckText>
            <MealCheckButton>
              <MealCheckButtonText>
                네, 확인했어요
              </MealCheckButtonText>
            </MealCheckButton>
          </MealCheckWrap>
         <Wrap>
         <MainWrap>
          <MealCalendar>
            <MealCalendarTitle>
              <CalendarIcon/>
              <TitleText>식사일정</TitleText>
            </MealCalendarTitle>
            <Calendar/>
          </MealCalendar>
          <MenbershipBanner>
            <MembershipImage source={require('../../../../../assets/images/membership.png')} resizeMode='stretch'/>
            <MembershipText>멤버십 가입하고 <PointText>20%할인</PointText> 받기</MembershipText>
          </MenbershipBanner>
          
          <CatorWrap>
            <Cator>
              <CatorIcon/>
              <TitleText>케이터링</TitleText>
            </Cator>
            <CountWrap>
              <Count>2</Count>
              <CountText>건</CountText>
            </CountWrap>
          </CatorWrap>
          <MembershipWrap>
            <Membership>
              <MembershipIcon/>
              <TitleText>멤버십</TitleText>
            </Membership>
            <CountWrap>
              <Count>2</Count>
              <CountText>건</CountText>
            </CountWrap>
          </MembershipWrap>
          <MarketWrap>
            <Market>
              <MarketIcon/>
              <TitleText>마켓 상품</TitleText>
            </Market>
            <CountWrap>
              <Count>2</Count>
              <CountText>건</CountText>
            </CountWrap>
          </MarketWrap>
        </MainWrap>
        </Wrap>   
          </ScrollView>
        
      <ButtonWrap>
          <Button label={'식사 구매하기'} type={'yellow'} icon={'plus'} onPressEvent={()=>{navigation.navigate(BuyMealPageName)}}/>
      </ButtonWrap>
      
        
        
        
    </SafeView>
  )
};

const styles = StyleSheet.create({
  shadow:{
    zIndex:999,
    // ios
    shadowColor: "#5A1EFF",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,

    // android
    elevation: 10,
  }
})

export default Pages;

const BoxWrap = css`
  width:100%;
  height:64px;
  border-radius:14px;
  background-color:${props => props.theme.colors.grey[0]};
  margin-bottom:16px;
  padding: 16px;
  
`;

const BarDisplay = css`
flex-direction:row;
justify-content:space-between;
`;

const Display = css`
flex-direction:row;
align-items:center;

`;

const SafeView = styled.SafeAreaView`
background-color:${props => props.theme.colors.grey[8]};
`;

const Wrap = styled.View`

//padding: 0px 24px;
//margin: 0px 24px;

`;
const BarWrap = styled.View`
${BarDisplay};
margin:10px 0px;
padding:0px 24px;
`;

const SpotName = styled.View`
${Display};
`;

const Icons = styled.View`
${BarDisplay};
width:68px;
`;

const MainWrap = styled.View`
align-items:center;
/* padding:24px 0px; */
margin:0px 24px;
`;

const MealInfoWrap = styled.View`
${Display};
height:64px;
border-radius:14px;
background-color:${props => props.theme.colors.grey[0]};
margin-bottom:16px;
padding: 16px;
justify-content:space-between;
padding-left:0px;


`;

const NoMealInfo = styled.View`
${BoxWrap};
${Display};
justify-content:center;

`;

const MealInfo = styled.View`
flex-direction:row;
justify-content:center;
align-items:center;
`;

const MealImage = styled.Image`
width:64px;
height:64px;
border-top-left-radius: 14px;
border-bottom-left-radius: 14px;
`;

const MealText = styled.View`
  margin-left:16px;
  flex-direction: row;
  flex:1;
  justify-content: space-between;
`;

const MealCount = styled.View`
  align-self:flex-end;
`;

const MealCalendar = styled.View`
${BoxWrap};
height:128px;
//padding:15px 16px;

`;

const MealCheckButton = styled.Pressable`
justify-self:flex-start;
height:28px;
background-color:${props => props.theme.colors.purple[500]};
padding:3.5px 12px;
border-radius:20px;
margin-bottom:16px;

`;

const MealCalendarTitle = styled.View`
${Display};
`;

const MembershipWrap = styled.View`
${BoxWrap};
${Display};
justify-content:space-between;
`;

const Membership = styled.View`
flex-direction:row;

`;

const MenbershipBanner = styled.View`
width:100%;
height:64px;
margin-bottom:16px;
/* justify-content:center;
align-items:center; */
`;

const MembershipImage = styled.Image`
width:100%;
height:64px;
border-radius:14px;
position:relative;

`;

const CatorWrap = styled.View`
${BoxWrap};
${Display};
justify-content:space-between;
`;

const Cator = styled.View`
flex-direction:row;
align-items:center;
`;

const MarketWrap = styled.View`
${BoxWrap};
${Display};
justify-content:space-between;
`;

const Market = styled.View`
flex-direction:row;
`;

const TitleText = styled(Typography).attrs({text:'Body05SB'})`
margin-left:14px;
color:${props => props.theme.colors.grey[2]};
`;

const CountWrap = styled.View`
flex-direction:row;
align-items:center;

`;

const ButtonWrap = styled.View`
position:absolute;
bottom:55px;
margin:0px 24px;


`;

const MealCheckWrap = styled.View`
justify-content:center;
align-items:center;

`;


// text
const LargeTitle = styled(Typography).attrs({text:'LargeTitle'})`
color:${props => props.theme.colors.grey[1]};
margin-top:40px;
margin-bottom:20px;
padding:0px 24px;
`;

const SemiBoldTxt = styled(Typography).attrs({text:'Body05SB'})`
color:${props => props.theme.colors.grey[2]};
`;

const MealTxt = styled(Typography).attrs({text:'Body06R'})`
color:${props => props.theme.colors.grey[2]};
`;

const GreyTxt = styled(Typography).attrs({text:'Body06R'})`
color:${props => props.theme.colors.grey[5]};
`;

const PointText = styled(Typography).attrs({text:'Body05SB'})`
color: ${props => props.theme.colors.green[500]};
`;

const SpotNameText = styled(Typography).attrs({text:'BottomButtonSB'})`
color:${props => props.theme.colors.grey[2]};
`;

const CaptionTitle = styled(Typography).attrs({text:'CaptionSB'})`
color:${props => props.theme.colors.grey[2]};
`;

const Count = styled(Typography).attrs({text:'Title03SB'})`
color:${props => props.theme.colors.grey[1]};
`;

const CountText = styled(Typography).attrs({text:'Body05R'})`
color:${props => props.theme.colors.grey[5]};
margin-left:4px;
`;

const MembershipText = styled(SemiBoldTxt)`
position:absolute;
left:24px;
top:20px;
`;

const MealCheckText = styled(Typography).attrs({text:'Body05SB'})`
color:${props => props.theme.colors.grey[1]};
margin-bottom:4px;
`;

const MealCheckButtonText = styled(Typography).attrs({text:'Button09SB'})`
color:${props => props.theme.colors.grey[0]};
`;

