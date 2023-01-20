
import messaging from '@react-native-firebase/messaging';
import { useNavigation } from '@react-navigation/native';
import { useAtom, useAtomValue } from 'jotai';
import React, { useEffect, useRef, useState } from 'react';
import {useForm} from 'react-hook-form';
import { SafeAreaView, Text, View ,ScrollView,Dimensions,Image,Platform,StyleSheet, Pressable, Alert} from 'react-native';
import styled, {css} from 'styled-components/native';

import ArrowIcon from '../../../../../assets/icons/Home/arrowDown.svg';
import BellIcon from '../../../../../assets/icons/Home/bell.svg';
import CalendarIcon from '../../../../../assets/icons/Home/calendar.svg';
import CatorIcon from '../../../../../assets/icons/Home/cator.svg';
import CsIcon from '../../../../../assets/icons/Home/cs.svg';
import MarketIcon from '../../../../../assets/icons/Home/market.svg';
import MembershipIcon from '../../../../../assets/icons/Home/membership.svg';
import PlusIcon from '../../../../../assets/icons/Home/plus.svg';
import {weekAtom} from '../../../../../biz/useBanner/store';
import useGroupSpots from '../../../../../biz/useGroupSpots/hook';
import useOrderMeal from '../../../../../biz/useOrderMeal';
import { isOrderMealAtom } from '../../../../../biz/useOrderMeal/store';
import useUserInfo from '../../../../../biz/useUserInfo';
import Balloon from '../../../../../components/BalloonHome';
import BottomSheet from '../../../../../components/BottomSheet/component';
import BottomSheetSpot from '../../../../../components/BottomSheetSpot';
import Calendar from '../../../../../components/Calendar';
import Typography from '../../../../../components/Typography';
import { formattedDate, formattedWeekDate } from '../../../../../utils/dateFormatter';
import {PAGE_NAME as GroupCreateMainPageName} from '../../../../Group/GroupCreate';
import {PAGE_NAME as BuyMealPageName} from '../../BuyMeal/Main';
import SkeletonUI from "../../Home/Skeleton";
import {PAGE_NAME as MealMainPageName} from '../../Meal/Main';
import {PAGE_NAME as NotificationCenterName} from '../../../../NotificationCenter';
import { getStorage } from '../../../../../utils/asyncStorage';
import {PAGE_NAME as GroupSelectPageName} from '../../../../Group/GroupManage/index';
import {PAGE_NAME as GroupManagePageName} from '../../../../Group/GroupManage/DetailPage';
import Toast from '../../../../../components/Toast';
import {PAGE_NAME as ApartRegisterSpotPageName } from '../../../../Group/GroupApartment/SearchApartment/AddApartment/DetailAddress';
import {PAGE_NAME as MembershipIntro} from '../../../../Membership/MembershipIntro';
export const PAGE_NAME = 'P_MAIN__BNB__HOME';

const Pages = () => {
  
    const navigation = useNavigation();

    const [isVisible, setIsVisible] = useState(true);
    const weekly = useAtomValue(weekAtom);
    const {isUserInfo, userInfo , isUserInfoLoading,isUserSpotStatus} = useUserInfo();
    const {userGroupSpotCheck,isUserGroupSpotCheck,userSpotRegister,groupSpotDetail} = useGroupSpots();
    const {isOrderMeal,orderMeal} = useOrderMeal();
    const mealInfo = useAtomValue(isOrderMealAtom);
    const [ modalVisible, setModalVisible ] = useState(false);
    const [data,setData] = useState(null);
    const [selected,setSelected] = useState();
    const toast = Toast();

  useEffect(() => {
    
    const start = weekly.map((s) => {
      const startData = formattedWeekDate(s[0]);
      return (
          startData
      )
    });

    const end = weekly.map((e) => {
        const endData =  formattedWeekDate(e.slice(-1)[0]);
        return (
            endData
        )
    });

    const status = async () => {
       const userStatus = await getStorage('spotStatus');
       const getUserStatus = Number(userStatus);
       console.log(getUserStatus,'userStatus')
      
      if(getUserStatus === 1){
        navigation.navigate(GroupSelectPageName)
      }
      if(getUserStatus === 2){
        navigation.navigate(GroupCreateMainPageName)
      }
    }
  
    async function loadUser(){
      await userInfo();
    }    
    async function loadMeal(){
      await orderMeal(start[0],end[0])
    };
    status();
    loadUser();
    loadMeal();
    userGroupSpotCheck();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  
    useEffect(() => {
  
      // Check whether an initial notification is available
    messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.data,
        );
        navigation.navigate(remoteMessage.data.page)
      }
    });
      
      const unsubscribe = messaging().onMessage(async remoteMessage => {
        Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      });
      
      console.log("메세지 테스트")
      return unsubscribe;
    }, [navigation]);

  // useEffect(()=>{
  //   balloonEvent()
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // },[])
  const anotherSpot = async (id) =>{
    try {

      const res = await userSpotRegister({
        'id':id
      })
      if(res.data === null){
        navigation.navigate(ApartRegisterSpotPageName,{id:id})
      }else{
        
        await userInfo();
        toast.toastEvent();
      }
    }catch(err){
      console.log(err)
    }
  }
  const userName = isUserInfo?.name;
  const userSpot = isUserInfo?.spot;
  const userSpotId = isUserInfo?.spotId;
  const clientId = isUserInfo?.groupId
  const date = formattedWeekDate(new Date());
  const todayMeal = isOrderMeal?.filter((m) => m.serviceDate === date);
  //const todayMeal = isOrderMeal?.filter((m) => m.date === date);
  const PressSpotButton = () => {
    setModalVisible(true);
  }

  const closeBalloon = () => {
    setIsVisible(false)
  }

  const groupManagePress = async() =>{
    try {
      await groupSpotDetail(userSpotId)
      navigation.navigate(GroupManagePageName,{id:userSpotId,clientId:clientId})
    }catch(err){
      console.log(err)
    }
  }

if(isUserInfoLoading){
  return <SkeletonUI/>
}



  return (
    <SafeView>
      {/* <Pressable onPress={() => {navigation.navigate(GroupCreateMainPageName)}}>
        <Text> 임시버튼(그룹/스팟) </Text>
        
      </Pressable> */}
      <View>
        <BarWrap>
          <SpotName>
            <Pressable onPress={PressSpotButton}>
              <SpotNameText>{userSpot}</SpotNameText>
            </Pressable>
          <ArrowIcon/>
          </SpotName>
          <Icons>
            <Pressable onPress={()=>{ navigation.navigate(NotificationCenterName)}}>
              <BellIcon/>
            </Pressable>
            <CsIcon/>
          </Icons>
        </BarWrap>
      </View>
      <ScrollViewWrap scrollEventThrottle={0} showsVerticalScrollIndicator={false}>
        <LargeTitle>{userName}님 안녕하세요!</LargeTitle>
        <MainWrap>
          {todayMeal?.length === 0 ? (
          <NoMealInfo>
            <GreyTxt>오늘은 배송되는 식사가 없어요</GreyTxt>
          </NoMealInfo>  
        ) : todayMeal?.map(m => {
            return (
              <React.Fragment key={m.id}>
                {m.orderItemDtoList.map(meal => {
                  return (
                    <MealInfoWrap key={meal.name}>
                    <MealInfo >
                      <MealImage source={{uri:'https://cdn.mindgil.com/news/photo/202004/69068_2873_1455.jpg'}}/>
                        <MealText>
                          <View>
                            <DiningType>{meal.diningType}</DiningType>
                            <View>
                              <MealTxt>{meal.name}</MealTxt>
                            </View>
                          </View>
                          <MealCount>
                            <GreyTxt>{meal.count}개</GreyTxt>
                          </MealCount>
                        </MealText>
                    </MealInfo>
                    </MealInfoWrap>
                  )
                })}
              </React.Fragment>
              
            )
          }) }
          {/* 메뉴 수령 그림자 styles.shadow */}
          {/* <MealInfoWrap style={styles.shadow}>
            <MealInfo>
              <MealImage source={{uri:'https://cdn.mindgil.com/news/photo/202004/69068_2873_1455.jpg'}}/>
              <MealText>
                <View>
                  <DiningType>점심</DiningType>
                  <View>
                    <MealTxt>훈제오리 애플시나몬 샐러드(L)</MealTxt>
                  </View>
                </View>
                <MealCount>
                  <GreyTxt>2개</GreyTxt>
                </MealCount>
              </MealText>
            </MealInfo>
          </MealInfoWrap>  */}
        </MainWrap>  
        {/* 오늘의 식사 시간 지나면 나오는 View */}
          {/* <MealCheckWrap>
            <MealCheckText>
              메뉴 확인 후 수령하셨나요?
            </MealCheckText>
            <MealCheckButton>
              <MealCheckButtonText>
                네, 확인했어요
              </MealCheckButtonText>
            </MealCheckButton>
          </MealCheckWrap> */}

         <Wrap>
         <MainWrap>
          <MealCalendar>
            <MealCalendarTitle>
              <CalendarIcon/>
              <TitleText>식사일정</TitleText>
            </MealCalendarTitle>
            <Calendar onPressEvent={()=>navigation.navigate(MealMainPageName)} />
          </MealCalendar>

          {!isUserInfo?.isMembership && <MenbershipBanner onPress={()=>navigation.navigate(MembershipIntro)}>
            <MembershipImage source={require('../../../../../assets/images/membership.png')} resizeMode='stretch'/>
            <MembershipText>멤버십 가입하고 <PointText>20%할인</PointText> 받기</MembershipText>
          </MenbershipBanner>}
          
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
          {isUserInfo?.isMembership && <MembershipWrap>
            <Membership>
              <MembershipIcon/>
              <TitleText>멤버십</TitleText>
            </Membership>
            <CountWrap>
              <Count>2</Count>
              <CountText>건</CountText>
            </CountWrap>
          </MembershipWrap>}
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
          </ScrollViewWrap>

      {isVisible && <BalloonWrap>
        <Balloon label='다음주 식사 구매하셨나요?'/>
      </BalloonWrap>}

      <ButtonWrap>
          <Button onPress={()=>{navigation.navigate(BuyMealPageName);closeBalloon()}}>
            <PlusIcon/>
            <ButtonText>식사 구매하기</ButtonText>
          </Button>
      </ButtonWrap>
      <BottomSheetSpot modalVisible={modalVisible} setModalVisible={setModalVisible} 
            title='스팟 선택' data={isUserGroupSpotCheck} selected={selected} setSelected={setSelected} userSpotId={userSpotId}
             onPressEvent={(id)=>{anotherSpot(id)}}
             onPressEvent2={()=>{groupManagePress()}}
             booleanValue
            />
      <toast.ToastWrap message={"스팟이 설정됐어요"} icon={'checked'}/>
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
  //height:64px;
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
flex:1;
background-color:${props => props.theme.colors.grey[8]};

`;

const ScrollViewWrap = styled.ScrollView`
`;
const Wrap = styled.View`
//padding-bottom:100px;

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
min-height:130px;
padding-bottom:10px;
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

const MenbershipBanner = styled.Pressable`
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
bottom:17px;
/* margin:0px 24px; */
width:100%;

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
margin-right:6px;
`;

const DiningType = styled(Typography).attrs({text:'CaptionSB'})`
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

const Button = styled.Pressable`
margin:0px 24px;
background-color:${({theme}) => theme.colors.yellow[500]};
border-radius:100px;

padding:16px 0px;
flex-direction:row;
justify-content:center;
align-items:center;
`;

const ButtonText = styled(Typography).attrs({text:'BottomButtonSB'})`
color:${props => props.theme.colors.grey[1]};
margin-left:8px;
`;

const BalloonWrap = styled.View`
position:absolute;
bottom:80px;
left:28%;
`;