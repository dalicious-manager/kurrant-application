/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, { useEffect, useState } from "react";
import { Alert, Pressable, ScrollView, StatusBar } from "react-native";
import styled, { useTheme } from 'styled-components/native';

import ArrowRightIcon from "~assets/icons/Arrow/arrowRight.svg";
import useUserMe from '~biz/useUserMe';
import { SettingIcon } from '~components/Icon';
import Typography from '~components/Typography';
import Wrapper from '~components/Wrapper';
import {PAGE_NAME as TermOfServicePageName } from '~pages/Main/MyPage/TermOfService'


import { PAGE_NAME as CompanyInfoPageName } from '../../../MyPage/CompanyInfo';


import { PAGE_NAME as MembershipIntroPageName } from '../../../../Membership/MembershipIntro';
import { PAGE_NAME as MembershipInfoPageName } from '../../../../Membership/MembershipInfo';
import { PAGE_NAME as FAQPageName } from '../../../MyPage/FAQ';
import { PAGE_NAME as PersonalInfoPageName } from '../../../MyPage/PersonalInfo';
import { PAGE_NAME as MealPageName } from '../../Meal/Main';
import { PAGE_NAME as MealCartPageName } from '../../MealCart/Main';
import { PAGE_NAME as LoginPageName } from '../../../Login/Login';
import { SCREEN_NAME as NoticeScreenName } from '../../../../../screens/Main/Notice';
import { SCREEN_NAME as PurchaseHistoryName } from '../../../../../screens/Main/PurchaseHistory';
import ListBox from './ListBox';
import ListContainer from './ListContainer';
import MembershipBox from './MembershipBox';
import SkeletonUI from './SkeletonUI';
import VersionCheck from "react-native-version-check";
import { useCallback } from 'react';
import useUserInfo from '../../../../../biz/useUserInfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAuth from '../../../../../biz/useAuth';


export const PAGE_NAME = 'P_MAIN__BNB__MORE';

const Pages = () => {
  const themeApp = useTheme();
  const navigation = useNavigation();
  const { userMe,userMePersonal, readableAtom:{myInfo,isMyInfoLoading}} = useUserMe();
  const {readableAtom:{userRole}} = useAuth()
  const [versionChecked ,setVersionChecked] = useState(false);
  const currentVersion =VersionCheck.getCurrentVersion();
  const {isUserInfo} = useUserInfo();
  const getData = async()=>{
    VersionCheck.getLatestVersion().then((latestVersion)=>{
      if(currentVersion === latestVersion) setVersionChecked(true);
      else setVersionChecked(false);
    }); 
    await userMe();
    userMePersonal();
  }
  useFocusEffect(
    useCallback(()=>{
      console.log(myInfo);
      if (userRole==="ROLE_GUEST") {
        Alert.alert("로그인이 필요합니다", "해당 기능은 로그인 이후 사용할수 있습니다.",[
          {
            text:'취소',
            onPress:() => {navigation.goBack()},
            
          },
          {
            text:'확인',
            onPress:async() => {
              await AsyncStorage.clear();
              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: LoginPageName,
                  },
                ],
              })
            },
            style:'destructive'
          }
        ])
      
    }
    },[])
  )
  useEffect(()=>{
    console.log(userRole,"test")
  if (userRole !== "ROLE_GUEST") {    
    getData();
  }
    
  },[])
  if(isMyInfoLoading && !myInfo){
    return <SkeletonUI />
  }
  return (
    <Container>
      <Wrapper paddingTop={24}>
        <ScrollView>
          {/* <GourmetTestButton>
            <Typography text='CaptionSB' textColor={themeApp.colors.blue[500]}>나의 미식타입 테스트 </Typography>
            <ArrowRight/>
          </GourmetTestButton> */}
          {myInfo 
          ? <LoginBox>
              <LoginIdBox>              
                {/* <AvatarBackground source={AvatarNon} resizeMode={'stretch'}>
                  {myInfo.gourmetType !== null && <Image imagePath={{uri:'https://asset.kurrant.co/img/common/soup.png'}} scale={1.0} styles={{width:25,height:22}}/>}
                </AvatarBackground> */}
                <Typography text='Title02SB' textColor={themeApp.colors.grey[2]}>{isUserInfo.name}님</Typography>
              </LoginIdBox>
              <Pressable onPress={()=> navigation.navigate(PersonalInfoPageName)}>
                <SettingIcon height={16} width={8}/>
              </Pressable>
            </LoginBox>
          : <LoginBox onPress={async()=>
              {
                await AsyncStorage.clear();
                navigation.reset({
                  index: 0,
                  routes: [
                    {
                      name: LoginPageName,
                    },
                  ],
                })
              }
            }>
              <Typography text='Title02SB' textColor={themeApp.colors.grey[2]}>로그인 </Typography>
              <ArrowRightLogin height={16} width={8}/>
            </LoginBox>}
        
            <MembershipBox isMembership={isUserInfo?.isMembership} membershipPeriod={myInfo?.membershipPeriod}/>
          {/* 포인트 활성시
            <PointBox point={41030}/> 
          */}
          <InfomationContainer>            
            <InfomationBox>
              <InfomationText text={'Title02SB'} textColor={themeApp.colors.grey[5]}>0</InfomationText>
              <InfomationLabel text={'CaptionR'} textColor={themeApp.colors.grey[5]}>준비중</InfomationLabel>
            </InfomationBox>
            <InfomationBox>
              <InfomationText text={'Title02SB'} textColor={themeApp.colors.grey[5]}>0</InfomationText>
              <InfomationLabel text={'CaptionR'} textColor={themeApp.colors.grey[5]}>준비중</InfomationLabel>
            </InfomationBox>
            <InfomationBox onPress={()=>navigation.navigate(MealPageName)}>
              <InfomationText text={'Title02SB'} textColor={themeApp.colors.grey[2]}>{myInfo?.dailyMealCount || 0}</InfomationText>
              <InfomationLabel text={'CaptionR'} textColor={themeApp.colors.grey[2]}>식사일정</InfomationLabel>
            </InfomationBox>
          </InfomationContainer>
          <Line />
          <ListContainer title='이용 내역'>
            <ListBox title='식사 일정' routeName={MealPageName}/>
            <ListBox title='장바구니' routeName={MealCartPageName} />
            {/* <ListBox title='장바구니(마켓)' /> */}
            {/* <ListBox title='찜목록' /> */}
            <ListBox title='구매 내역' routeName={PurchaseHistoryName}/>
            {/* <ListBox title='리뷰 관리' description={`모두 작성시 최대 `} effect={<Typography test={'CaptionR'} textColor={themeApp.colors.blue[500]}>500P</Typography>} /> */}
            <ListBox title='커런트 멤버십' routeName={isUserInfo?.isMembership ? MembershipInfoPageName : MembershipIntroPageName}/>
            {/* <ListBox title='커런트 포인트' /> */}
          </ListContainer>
          <ListContainer title='알림'>
            <ListBox title='공지사항' routeName={NoticeScreenName} />
            <ListBox title='약관 및 개인 정보' routeName={TermOfServicePageName}/>
          </ListContainer>
          <ListContainer title='문의하기'>
            <ListBox title='고객센터'  routeName={FAQPageName}/>
            <ListBox title='회사 정보'  routeName={CompanyInfoPageName}/>
          </ListContainer>
          <ListContainer title='버전 정보'>
            <ListBox title='앱 버전' isVersion={true} isArrow={false} latestVersion={versionChecked} currentVersion={currentVersion}/>
          </ListContainer>
        </ScrollView>
      </Wrapper>
      </Container>
  )
}

export default Pages;

const GourmetTestButton = styled.Pressable`
  flex-direction: row;
  align-items: center;
  margin-left: 24px;
  margin-right: 24px;
`
const Container = styled.SafeAreaView`
  flex: 1;
  padding-top:${Math.round(StatusBar.currentHeight)}px ;
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
const LoginIdBox = styled.Pressable`
  flex-direction: row;
  align-items: center;
`
const ArrowRightLogin = styled(ArrowRightIcon).attrs({strokeWidth:2 })`
  color:${props => props.theme.colors.grey[2]};
  margin: 4px 8px;
`;
const ArrowRight = styled(ArrowRightIcon)`
  color:${props => props.theme.colors.blue[500]};
 
`;

const AvatarBackground =  styled.ImageBackground`
  width: 34px;
  height: 34px;
  margin-right: 4px;
  justify-content: center;
  align-items: center;
`
const Line = styled.View`
  width: 100%;
  height: 6px;
  background-color: ${({theme}) => theme.colors.grey[8]};
  margin-top: 4px;
`;

const InfomationContainer = styled.View`
  margin: 12px 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
const InfomationBox = styled.Pressable`
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