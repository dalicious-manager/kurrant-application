import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import React, { useLayoutEffect } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import styled, { useTheme } from 'styled-components/native';

import ArrowRightIcon from "~assets/icons/Arrow/arrowRight.svg";
import PointIcon from "~assets/icons/pointIcon.svg";

import { MembershipJoin } from '../../../../../assets';
import Image from '../../../../../components/Image';
import Typography from '../../../../../components/Typography';
import Wrapper from '../../../../../components/Wrapper';
import ListBox from './ListBox';
import ListContainer from './ListContainer';
import PointBox from './PointBox';

export const PAGE_NAME = 'P_MAIN__BNB__MORE';

const Pages = ({navigation, route}) => {
  const themeApp = useTheme();
  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName !== 'MyPage') { //MyPage이외의 화면에 대해 tabBar none을 설정한다.
      navigation.setOptions({tabBarStyle: {display: 'none'}});
    } else {
      navigation.setOptions({tabBarStyle: {display: undefined}});
    }
  }, [navigation, route]);
  return (
      <Wrapper paddingTop={24}>
        <ScrollView>
          <GourmetTestButton><Typography text='CaptionSB' textColor={themeApp.colors.blue[500]}>나의 미식타입 테스트 </Typography><ArrowRight/></GourmetTestButton>
          <LoginBox>
            <Typography text='Title02SB' textColor={themeApp.colors.grey[2]}>로그인 </Typography><ArrowRightLogin height={16} width={8}/>
          </LoginBox>
          <MembershipBox source={MembershipJoin} resizeMode={'stretch'}>
            <MembershipText text={'Body05SB'} textColor={themeApp.colors.neutral[0]}>멤버십 가입하고 
            <MembershipEffectText text={'Body05SB'} textColor={themeApp.colors.yellow[500]}> 20%할인</MembershipEffectText> 받기</MembershipText>            
          </MembershipBox>
          {/* 포인트 활성시
            <PointBox point={41030}/> 
          */}
          <InfomationContainer>
            <InfomationBox>
              <InfomationText text={'Title02SB'} textColor={themeApp.colors.grey[2]}>7</InfomationText>
              <InfomationLabel text={'CaptionR'} textColor={themeApp.colors.grey[2]}>구매후기</InfomationLabel>
            </InfomationBox>
            <InfomationBox>
              <InfomationText text={'Title02SB'} textColor={themeApp.colors.grey[2]}>...</InfomationText>
              <InfomationLabel text={'CaptionR'} textColor={themeApp.colors.grey[2]}>찜목록<InfomationCaption textColor={themeApp.colors.grey[5]}>(준비중)</InfomationCaption></InfomationLabel>
            </InfomationBox>
            <InfomationBox>
              <InfomationText text={'Title02SB'} textColor={themeApp.colors.grey[2]}>10</InfomationText>
              <InfomationLabel text={'CaptionR'} textColor={themeApp.colors.grey[2]}>식사일정</InfomationLabel>
            </InfomationBox>
          </InfomationContainer>
          <Line />
          <ListContainer title='이용 내역'>
            <ListBox title='식사 일정' />
            <ListBox title='장바구니(식사)' />
            <ListBox title='장바구니(마켓)' />
            <ListBox title='찜목록' />
            <ListBox title='구매 내역' />
            <ListBox title='리뷰 관리' description={`모두 작성시 최대 `} effect={<Typography test={'CaptionR'} textColor={themeApp.colors.blue[500]}>500P</Typography>} />
            <ListBox title='커런트 멤버십' />
            <ListBox title='커런트 포인트' />
          </ListContainer>
          <ListContainer title='알림'>
            <ListBox title='공지사항' />
            <ListBox title='약관 및 개인 정보' />
          </ListContainer>
          <ListContainer title='문의하기'>
            <ListBox title='고객센터' />
          </ListContainer>
          <ListContainer title='버전 정보'>
            <ListBox title='앱 버전' isVersion={true} isArrow={false}/>
          </ListContainer>
        </ScrollView>
      </Wrapper>
  )
}

export default Pages;

const GourmetTestButton = styled.Pressable`
  flex-direction: row;
  align-items: center;
  margin-left: 24px;
  margin-right: 24px;
`
const LoginBox = styled.Pressable`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
  margin-bottom: 19px;
  margin-left: 24px;
  margin-right: 24px;
`
const ArrowRightLogin = styled(ArrowRightIcon).attrs({strokeWidth:2 })`
  color:${props => props.theme.colors.grey[2]};
  margin: 4px 8px;
`;
const ArrowRight = styled(ArrowRightIcon)`
  color:${props => props.theme.colors.blue[500]};
 
`;
const MembershipBox = styled.ImageBackground`
  margin-bottom: 7px;
  margin-left: 24px;
  margin-right: 24px;
`

const Line = styled.View`
  width: 100%;
  height: 6px;
  background-color: ${({theme}) => theme.colors.grey[8]};
  margin-top: 4px;
`;
const MembershipText = styled(Typography)`
  z-index: 1;
  padding: 23px 20px;
`
const MembershipEffectText = styled(Typography)`

`
const InfomationContainer = styled.View`
  margin: 12px 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
const InfomationBox = styled.View`
  align-items: center;
  justify-content: center;
  
  flex: 1;
  margin-left: 4px;
  margin-right: 4px;
  border-width: 1px;
  border-color: ${({theme})=>theme.colors.grey[8]};
  border-radius: 7px;
  height: 76px;
`
const InfomationText = styled(Typography)`

`

const InfomationLabel = styled(Typography)`
  
`

const InfomationCaption = styled(Typography)`
  font-size: 10px;
  font-family: 'Pretendard-Regular';
`