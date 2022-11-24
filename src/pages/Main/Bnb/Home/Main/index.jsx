import React from 'react';
import { SafeAreaView, Text, View ,ScrollView} from 'react-native';
import styled, {css} from 'styled-components/native';


import ArrowIcon from '../../../../../assets/icons/Home/arrowDown.svg';
import BellIcon from '../../../../../assets/icons/Home/bell.svg';
import CalendarIcon from '../../../../../assets/icons/Home/calendar.svg';
import CatorIcon from '../../../../../assets/icons/Home/cator.svg';
import CsIcon from '../../../../../assets/icons/Home/cs.svg';
import MarketIcon from '../../../../../assets/icons/Home/market.svg';
import MembershipIcon from '../../../../../assets/icons/Home/membership.svg';
import Button from '../../../../../components/Button';
import Calendar from '../../../../../components/Calendar';

export const PAGE_NAME = 'P_MAIN__BNB__HOME';

const Pages = () => {

  const test = (e) => {
    let updateScroll = e.nativeEvent.contentOffset.y;
    //console.log("스크롤 움직임",updateScroll);
  }


  return (
    <SafeAreaView>
      <Wrap>
        <BarWrap>
        <SpotName>
         <Text>팁스타운 1층</Text>
         <ArrowIcon/>
        </SpotName>
        <Icons>
          <BellIcon/>
          <CsIcon/>
        </Icons>
        </BarWrap>

        <ScrollView onScroll={test} scrollEventThrottle={0}>
        <Text>김달리님 안녕하세요!</Text>

      <MainWrap>
        {/* <MealInfo>
          <Text>오늘은 배송되는 식사가 없어요</Text>
        </MealInfo> */}
        <MealInfo>
          <MealInfoWrap>
            <MealImage source={{uri:'https://cdn.mindgil.com/news/photo/202004/69068_2873_1455.jpg'}}/>
            <MealText>
              <View>
                <Text>점심</Text>
                <View>
                  <Text>훈제오리 애플시나몬 샐러드(L)</Text>
                </View>
              </View>
              <MealCount>
                <Text>2개</Text>
              </MealCount>
            </MealText>
         </MealInfoWrap>
        </MealInfo>        
        <MealInfo>
          <MealInfoWrap>
            <MealImage source={{uri:'https://cdn.mindgil.com/news/photo/202004/69068_2873_1455.jpg'}}/>
            <MealText>
              <View>
                <Text>점심</Text>
                <View>
                  <Text>훈제오리 애플시나몬 샐러드(L)</Text>
                </View>
              </View>
              <MealCount>
                <Text>2개</Text>
              </MealCount>
            </MealText>
         </MealInfoWrap>
        </MealInfo>    
        <MealInfo>
          <MealInfoWrap>
            <MealImage source={{uri:'https://cdn.mindgil.com/news/photo/202004/69068_2873_1455.jpg'}}/>
            <MealText>
              <View>
                <Text>점심</Text>
                <View>
                  <Text>훈제오리 애플시나몬 샐러드(L)</Text>
                </View>
              </View>
              <MealCount>
                <Text>2개</Text>
              </MealCount>
            </MealText>
         </MealInfoWrap>
        </MealInfo>
        <MealCalendar>
          <MealCalendarTitle>
            <CalendarIcon/>
            <TitleText>식사일정</TitleText>
          </MealCalendarTitle>
          <Calendar/>
        </MealCalendar>
        <Membership>
          <Text>멤버십 가입하고 <PointText>20%할인</PointText> 받기</Text>
        </Membership>
        <Cator>
          <CatorIcon/>
          <TitleText>케이터링</TitleText>
        </Cator>
        <Membership>
          <MembershipIcon/>
          <TitleText>멤버십</TitleText>
          
        </Membership>
        <Market>
          <MarketIcon/>
          <TitleText>마켓 상품</TitleText>
        </Market>
      </MainWrap>
        </ScrollView>
        <ButtonWrap>
          <Button label={'식사 구매하기'} type={'yellow'} icon={'plus'}/>
        </ButtonWrap>
      </Wrap>
    </SafeAreaView>
  )
};

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

const Wrap = styled.View`
position: relative;
padding: 0px 24px;
height:100%;
background-color:${props => props.theme.colors.grey[100]};
`;

const BarWrap = styled.View`
${BarDisplay}
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
padding:24px 0px;
`;

const MealInfo = styled.View`
${BoxWrap};
${Display};
justify-content:space-between;
padding-left:0px;
`;

const MealInfoWrap = styled.View`
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

const MealCalendarTitle = styled.View`
${Display};
`;

const Membership = styled.View`
${BoxWrap};
${Display};
`;

const PointText = styled.Text`
color: ${props => props.theme.colors.green[500]};
`;

const Cator = styled.View`
${BoxWrap};
${Display};
`;

const Market = styled.View`
${BoxWrap};
${Display};
`;

const TitleText = styled.Text`
margin-left:14px;
`;

const ButtonWrap = styled.View`
position:absolute;
bottom:17px;
left:20px;
right:20px;
`;