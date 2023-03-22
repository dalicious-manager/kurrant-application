import messaging from '@react-native-firebase/messaging';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useAtom, useAtomValue} from 'jotai';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Pressable,
  Alert,
  StatusBar,
} from 'react-native';
import styled, {css} from 'styled-components/native';

import MembersIcon from '../../../../../assets/icons/Home/membersIcon.svg';
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
import {isOrderMealAtom} from '../../../../../biz/useOrderMeal/store';
import useUserInfo from '../../../../../biz/useUserInfo';
import Balloon from '../../../../../components/BalloonHome';
import BottomSheet from '../../../../../components/BottomSheet/component';
import BottomSheetSpot from '../../../../../components/BottomSheetSpot';
import Calendar from '../../../../../components/Calendar';
import Typography from '../../../../../components/Typography';
import {
  formattedDate,
  formattedWeekDate,
} from '../../../../../utils/dateFormatter';
import {PAGE_NAME as GroupCreateMainPageName} from '../../../../Group/GroupCreate';
import {PAGE_NAME as BuyMealPageName} from '../../BuyMeal/Main';
import SkeletonUI from '../../Home/Skeleton';
import {PAGE_NAME as MealMainPageName} from '../../Meal/Main';
import {PAGE_NAME as LoginPageName} from '../../../Login/Login';
import {PAGE_NAME as NotificationCenterName} from '../../../../NotificationCenter';
import {getStorage, setStorage} from '../../../../../utils/asyncStorage';
import {PAGE_NAME as GroupSelectPageName} from '../../../../Group/GroupManage/index';
import {PAGE_NAME as GroupManagePageName} from '../../../../Group/GroupManage/DetailPage';
import Toast from '../../../../../components/Toast';
import {PAGE_NAME as ApartRegisterSpotPageName} from '../../../../Group/GroupApartment/SearchApartment/AddApartment/DetailAddress';
import {PAGE_NAME as MembershipIntro} from '../../../../Membership/MembershipIntro';
import useUserMe from '../../../../../biz/useUserMe';
import {FoundersMembers, Members} from '../../../../../assets';
import {PAGE_NAME as FAQListDetailPageName} from '../../../MyPage/FAQ';
import {PAGE_NAME as CreateGroupPageName} from '../../../../../pages/Group/GroupCreate';
import useShoppingBasket from '../../../../../biz/useShoppingBasket/hook';
import FastImage from 'react-native-fast-image';
import useFoodDaily from '../../../../../biz/useDailyFood/hook';
import useAuth from '../../../../../biz/useAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSseContext} from '../../../../../utils/sse/seeContextApi/sseContext';
import useSse from '../../../../../utils/sse/seeContextApi/sseLogics/useSse';
import {sendDone} from '../../../../../utils/sse/seeContextApi/restApis/getRestApis';

export const PAGE_NAME = 'P_MAIN__BNB__HOME';
const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;
const Pages = () => {
  const {eventSourceMsg, setEventSourceMsg} = useSse();

  useEffect(() => {
    //
    console.log('홈에서 나오는 메세지입니다');
    if (eventSourceMsg) {
      console.log(eventSourceMsg);
      console.log(eventSourceMsg.content);
    }
  }, [eventSourceMsg]);

  const navigation = useNavigation();

  const weekly = useAtomValue(weekAtom);
  const {isUserInfo, userInfo, isUserInfoLoading, isUserSpotStatus} =
    useUserInfo();
  const {
    readableAtom: {userRole},
  } = useAuth();
  const {
    userGroupSpotCheck,
    isUserGroupSpotCheck,
    userSpotRegister,
    groupSpotDetail,
  } = useGroupSpots();
  const {
    isOrderMeal,
    todayMeal,
    orderMeal,
    todayOrderMeal,
    isOrderMealLoading,
  } = useOrderMeal();
  const {loadMeal} = useShoppingBasket();
  const {dailyFood} = useFoodDaily();
  const mealInfo = useAtomValue(isOrderMealAtom);
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState(null);
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState();
  const toast = Toast();

  const VISITED_NOW_DATE = Math.floor(new Date().getDate());
  const nextWeek = weekly[1].map(el => formattedWeekDate(el));
  const mealCheck = isOrderMeal?.map(el => {
    return el.serviceDate;
  });
  const intersection = nextWeek.filter(x => mealCheck?.includes(x));

  useEffect(() => {
    const handleShowModal = async () => {
      const VISITED_BEFORE_DATE = await getStorage('balloonTime');

      if (intersection.length === 0) {
        // setIsVisible(true);
      }
      if (
        intersection.length === 0 &&
        VISITED_BEFORE_DATE === VISITED_NOW_DATE
      ) {
        // setIsVisible(true);
      }
      if (
        intersection.length === 0 &&
        VISITED_BEFORE_DATE !== null &&
        VISITED_BEFORE_DATE !== VISITED_NOW_DATE
      ) {
        // setIsVisible(false);
      }
    };
    handleShowModal();
  }, []);

  const closeBalloon = async () => {
    if (intersection.length === 0) {
      setIsVisible(false);
      const expiry = new Date();
      // +1일 계산
      const expiryDate = expiry.getDate() + 1;
      // 로컬스토리지 저장
      await setStorage('balloonTime', JSON.stringify(expiryDate));
    }
  };

  useFocusEffect(
    useCallback(() => {
      try {
        async function loadUser() {
          const userData = await userInfo();
          dailyFood(userData?.spotId, formattedWeekDate(new Date()));
        }
        async function loadOrderMeal() {
          if (!(userRole === 'ROLE_GUEST'))
            await orderMeal(
              formattedWeekDate(weekly[0][0]),
              formattedWeekDate(
                weekly[weekly?.length - 1][weekly[0].length - 1],
              ),
            );
        }
        loadOrderMeal();
        loadUser();
      } catch (e) {
        console.log(e.toString());
      }
    }, []),
  );
  useEffect(() => {
    const isTester = async () => {
      if (!(userRole === 'ROLE_GUEST')) {
        const start = weekly.map(s => {
          const startData = formattedWeekDate(s[0]);
          return startData;
        });

        const end = weekly.map(e => {
          const endData = formattedWeekDate(e.slice(-1)[0]);
          return endData;
        });

        const status = async () => {
          const userStatus = await getStorage('spotStatus');

          await todayOrderMeal(start[0], end[0]);
          const getUserStatus = Number(userStatus);
          if (getUserStatus === 1) {
            navigation.navigate(GroupSelectPageName);
          }
          if (getUserStatus === 2) {
            navigation.navigate(GroupCreateMainPageName);
          }
        };
        try {
          if (!(userRole === 'ROLE_GUEST')) {
            status();
            userGroupSpotCheck();
            loadMeal();
          }
        } catch (error) {
          if (error.toString().replace('Error:', '').trim() === '403') {
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: LoginPageName,
                },
              ],
            });
          }
        }
      }
    };
    isTester();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          navigation.navigate(remoteMessage.data.page);
        }
      });

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, [navigation]);

  const anotherSpot = async id => {
    try {
      const res = await userSpotRegister({
        id: id,
      });
      console.log(res.data, 'testst');
      if (res.data === null) {
        navigation.navigate(ApartRegisterSpotPageName, {id: id});
      } else {
        await userInfo();
        setShow(true);
        toast.toastEvent();
        setTimeout(() => {
          setShow(false);
        }, 2000);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const userName = isUserInfo?.name;
  const userSpot = isUserInfo?.spot;
  const userGroupName = isUserInfo?.group;
  const userSpotId = isUserInfo?.spotId;
  const clientId = isUserInfo?.groupId;
  // const date = formattedWeekDate(new Date());
  // const todayMeal = isOrderMeal?.filter((m) => m.serviceDate === date);
  //const todayMeal = isOrderMeal?.filter((m) => m.date === date);

  const confirmBalloonClicked = async () => {
    await sendDone(5);
  };

  const PressSpotButton = () => {
    if (userRole === 'ROLE_GUEST') {
      return Alert.alert(
        '로그인이 필요합니다',
        '해당 기능은 로그인 이후 사용할수 있습니다.',
        [
          {
            text: '취소',
            onPress: () => {},
          },
          {
            text: '확인',
            onPress: async () => {
              await AsyncStorage.clear();
              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: LoginPageName,
                  },
                ],
              });
            },
            style: 'destructive',
          },
        ],
      );
    }
    if (userGroupName) {
      setModalVisible(true);
    } else {
      navigation.navigate(CreateGroupPageName);
    }
  };

  const groupManagePress = async () => {
    try {
      await groupSpotDetail(userSpotId);
      navigation.navigate(GroupManagePageName, {
        id: userSpotId,
        clientId: clientId,
      });
    } catch (err) {
      console.log(err);
    }
  };
  if (isOrderMealLoading || isUserInfoLoading) {
    return <SkeletonUI />;
  }

  return (
    <SafeView
      style={{
        paddingTop: Math.round(StatusBar.currentHeight),
      }}>
      <View>
        <BarWrap>
          <SpotName onPress={PressSpotButton}>
            <SpotNameText>
              {userGroupName === null
                ? '스팟을 선택해 주세요'
                : userGroupName?.length + userSpot?.length + 1 > 11
                ? userGroupName + '\n' + userSpot
                : userGroupName + '\u00a0' + userSpot}
            </SpotNameText>

            <ArrowIcon />
          </SpotName>
          <Icons>
            <BellIconPress
              onPress={() => {
                navigation.navigate(NotificationCenterName);
              }}>
              <BellIcon />
            </BellIconPress>
            <CsIconPress
              onPress={() => {
                navigation.navigate(FAQListDetailPageName);
              }}>
              <CsIcon />
            </CsIconPress>
          </Icons>
        </BarWrap>
      </View>
      <ScrollViewWrap
        scrollEventThrottle={0}
        showsVerticalScrollIndicator={false}>
        <LargeTitle>{userName}님 안녕하세요!</LargeTitle>
        <MainWrap>
          {todayMeal?.length === 0 ? (
            <NoMealInfo>
              <GreyTxt>오늘은 배송되는 식사가 없어요</GreyTxt>
            </NoMealInfo>
          ) : (
            todayMeal?.map((m, idx) => {
              return (
                <React.Fragment key={`${m.id} ${idx}`}>
                  {m.orderItemDtoList.map(meal => {
                    return (
                      <MealInfoWrap
                        key={meal.id}
                        onPress={() => navigation.navigate(MealMainPageName)}>
                        <MealInfo>
                          <FastImage
                            source={{
                              uri: `${meal.image}`,
                              priority: FastImage.priority.high,
                            }}
                            style={{
                              width: 64,
                              height: 64,
                              borderTopLeftRadius: 14,
                              borderBottomLeftRadius: 14,
                            }}
                          />
                          <MealText>
                            <View>
                              <DiningType>{`오늘 ${m.diningType}`}</DiningType>
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
                    );
                  })}
                </React.Fragment>
              );
            })
          )}
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
                <CalendarIcon />
                <TitleText>식사일정</TitleText>
              </MealCalendarTitle>
              <Calendar
                onPressEvent={() => navigation.navigate(MealMainPageName)}
              />
            </MealCalendar>
            {/* <CatorWrap>
            <Cator>
              <CatorIcon/>
              <TitleText>케이터링</TitleText>
            </Cator>
            <CountWrap>
              <Count>2</Count>
              <CountText>건</CountText>
            </CountWrap>
          </CatorWrap> */}
            {/* {isUserInfo?.isMembership && <MembershipWrap>
            <Membership>
              <MembershipIcon/>
              <TitleText>멤버십</TitleText>
            </Membership>
            <CountWrap>
              <Count>2</Count>
              <CountText>건</CountText>
            </CountWrap>
          </MembershipWrap>} */}
            {isUserInfo?.isMembership ? (
              <MembershipWrap>
                <Membership>
                  <MembershipIcon />
                  <TitleText>멤버십</TitleText>
                </Membership>
                <View>
                  <MembershipUsing>
                    {isUserInfo?.membershipUsingPeriod}일째 이용중
                  </MembershipUsing>
                  {isUserInfo?.foundersNumber < 5000 && (
                    <MembersWrap>
                      <MembersIcon />
                      <MembersText>
                        {isUserInfo?.foundersNumber}번째 커런트파운더스
                      </MembersText>
                    </MembersWrap>
                  )}
                </View>
              </MembershipWrap>
            ) : isUserInfo?.leftFoundersNumber > 0 ? (
              <MenbershipBanner
                onPress={() =>
                  navigation.navigate(MembershipIntro, {
                    isFounders: isUserInfo?.leftFoundersNumber > 0,
                  })
                }>
                <MembershipImages
                  source={FoundersMembers}
                  resizeMode={'cover'}
                />
              </MenbershipBanner>
            ) : (
              <MenbershipBanner
                onPress={() =>
                  navigation.navigate(MembershipIntro, {
                    isFounders: isUserInfo?.leftFoundersNumber > 0,
                  })
                }>
                <MembershipImage
                  source={require('../../../../../assets/images/membership.png')}
                  resizeMode="stretch"
                />
                <MembershipText>
                  멤버십 가입하고 <PointText>20%할인</PointText> 받기
                </MembershipText>
              </MenbershipBanner>
            )}
            {/* <MarketWrap>
            <Market>
              <MarketIcon/>
              <TitleText>마켓 상품</TitleText>
            </Market>
            <CountWrap>
              <Count>2</Count>
              <CountText>건</CountText>
            </CountWrap>
          </MarketWrap> */}
          </MainWrap>
        </Wrap>
      </ScrollViewWrap>

      {eventSourceMsg.content && (
        <BalloonPressable
          onPress={() => {
            confirmBalloonClicked();
          }}>
          <Balloon label={eventSourceMsg.content} />
        </BalloonPressable>
      )}

      <ButtonWrap>
        <Button
          onPress={async () => {
            await sendDone(5, setEventSourceMsg);
            if (userSpotId) {
              navigation.navigate(BuyMealPageName);
              closeBalloon();
            } else {
              Alert.alert('식사구매', '스팟선택 후 식사를 구매해주세요');
            }
          }}>
          <PlusIcon />
          <ButtonText>식사 구매하기</ButtonText>
        </Button>
      </ButtonWrap>
      <BottomSheetSpot
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title="상세스팟 선택"
        data={isUserGroupSpotCheck}
        selected={selected}
        setSelected={setSelected}
        userSpotId={userSpotId}
        onPressEvent={id => {
          anotherSpot(id);
        }}
        onPressEvent2={() => {
          groupManagePress();
        }}
        booleanValue
      />
      {show && (
        <toast.ToastWrap
          message={'스팟이 설정됐어요'}
          icon={'checked'}
          isHeader={false}
        />
      )}
    </SafeView>
  );
};

const styles = StyleSheet.create({
  shadow: {
    zIndex: 999,
    // ios
    shadowColor: '#5A1EFF',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,

    // android
    elevation: 10,
  },
});

export default Pages;

const BoxWrap = css`
  width: 100%;
  border-radius: 14px;
  background-color: ${props => props.theme.colors.grey[0]};
  margin-bottom: 16px;
  padding: 16px;
`;

const BarDisplay = css`
  flex-direction: row;
  justify-content: space-between;
`;

const Display = css`
  flex-direction: row;
  align-items: center;
`;

const SafeView = styled.SafeAreaView`
  flex: 1;
  background-color: ${props => props.theme.colors.grey[8]};
`;

const ScrollViewWrap = styled.ScrollView``;
const Wrap = styled.View`
  margin-bottom: 100px;
`;
const BarWrap = styled.View`
  ${BarDisplay};
  display: flex;
  margin: 10px 0px;
  padding: 0px 24px;

  align-items: center;
`;

const SpotName = styled.Pressable`
  ${Display};
`;

const Icons = styled.View`
  ${BarDisplay};
  //width: 68px;

  margin-right: -6px;
`;

const MainWrap = styled.View`
  align-items: center;
  /* padding:24px 0px; */
  margin: 0px 24px;
`;

const MealInfoWrap = styled.Pressable`
  ${Display};
  height: 64px;
  border-radius: 14px;
  background-color: ${props => props.theme.colors.grey[0]};
  margin-bottom: 16px;
  padding: 16px;
  justify-content: space-between;
  padding-left: 0px;
`;

const NoMealInfo = styled.View`
  ${BoxWrap};
  ${Display};
  justify-content: center;
`;

const MealInfo = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const MealImage = styled.Image`
  width: 64px;
  height: 64px;
  border-top-left-radius: 14px;
  border-bottom-left-radius: 14px;
`;

const MealText = styled.View`
  margin-left: 16px;
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
`;

const MealCount = styled.View`
  align-self: flex-end;
`;

const MealCalendar = styled.View`
  width: 100%;
  border-radius: 14px;
  background-color: ${props => props.theme.colors.grey[0]};
  margin-bottom: 16px;
  padding: 16px;
  min-height: 130px;
  padding-bottom: 10px;
  //padding:15px 16px;
`;

const MealCheckButton = styled.Pressable`
  justify-self: flex-start;
  height: 28px;
  background-color: ${props => props.theme.colors.purple[500]};
  padding: 3.5px 12px;
  border-radius: 20px;
  margin-bottom: 16px;
`;

const MealCalendarTitle = styled.View`
  ${Display};
`;

const MembershipWrap = styled.View`
  ${Display};
  width: 100%;
  border-radius: 14px;
  background-color: ${props => props.theme.colors.grey[0]};
  margin-bottom: 16px;
  padding: 10px 16px 16px 16px;
  justify-content: space-between;
`;

const Membership = styled.View`
  flex-direction: row;
`;

const MenbershipBanner = styled.Pressable`
  width: 100%;
  height: 64px;
  margin-left: 24px;
  margin-right: 24px;
  margin-bottom: 16px;
  /* justify-content:center;
align-items:center; */
`;

const MembershipImage = styled.Image`
  width: 100%;
  height: 64px;
  border-radius: 14px;
  position: relative;
`;
const MembershipImages = styled.Image`
  width: 100%;
  height: 64px;
  border-radius: 14px;
`;

const CatorWrap = styled.View`
  ${BoxWrap};
  ${Display};
  justify-content: space-between;
`;

const Cator = styled.View`
  flex-direction: row;
  align-items: center;
`;

const MarketWrap = styled.View`
  ${BoxWrap};
  ${Display};
  justify-content: space-between;
`;

const Market = styled.View`
  flex-direction: row;
`;

const TitleText = styled(Typography).attrs({text: 'Body05SB'})`
  margin-left: 14px;
  color: ${props => props.theme.colors.grey[2]};
`;

const CountWrap = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ButtonWrap = styled.View`
  position: absolute;
  bottom: 17px;
  /* margin:0px 24px; */
  width: 100%;
`;

const MealCheckWrap = styled.View`
  justify-content: center;
  align-items: center;
`;

// text
const LargeTitle = styled(Typography).attrs({text: 'LargeTitle'})`
  color: ${props => props.theme.colors.grey[1]};
  margin-top: 40px;
  margin-bottom: 20px;
  padding: 0px 24px;
`;

const SemiBoldTxt = styled(Typography).attrs({text: 'Body05SB'})`
  color: ${props => props.theme.colors.grey[2]};
`;

const MealTxt = styled(Typography).attrs({text: 'Body06R'})`
  color: ${props => props.theme.colors.grey[2]};
`;

const GreyTxt = styled(Typography).attrs({text: 'Body06R'})`
  color: ${props => props.theme.colors.grey[5]};
`;

const PointText = styled(Typography).attrs({text: 'Body05SB'})`
  color: ${props => props.theme.colors.green[500]};
`;

const SpotNameText = styled(Typography).attrs({text: 'BottomButtonSB'})`
  color: ${props => props.theme.colors.grey[2]};
  margin-right: 6px;
`;

const DiningType = styled(Typography).attrs({text: 'CaptionSB'})`
  color: ${props => props.theme.colors.grey[2]};
`;

const Count = styled(Typography).attrs({text: 'Title03SB'})`
  color: ${props => props.theme.colors.grey[1]};
`;

const CountText = styled(Typography).attrs({text: 'Body05R'})`
  color: ${props => props.theme.colors.grey[5]};
  margin-left: 4px;
`;

const MembershipUsing = styled(CountText)`
  align-self: flex-end;
`;
const MembershipText = styled(SemiBoldTxt)`
  position: absolute;
  left: 24px;
  top: 20px;
`;

const MealCheckText = styled(Typography).attrs({text: 'Body05SB'})`
  color: ${props => props.theme.colors.grey[1]};
  margin-bottom: 4px;
`;

const MealCheckButtonText = styled(Typography).attrs({text: 'Button09SB'})`
  color: ${props => props.theme.colors.grey[0]};
`;

const Button = styled.Pressable`
  margin: 0px 24px;
  background-color: ${({theme}) => theme.colors.yellow[500]};
  border-radius: 100px;

  padding: 16px 0px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled(Typography).attrs({text: 'BottomButtonSB'})`
  color: ${props => props.theme.colors.grey[1]};
  margin-left: 8px;
`;

const BalloonPressable = styled.Pressable`
  position: absolute;
  bottom: 80px;
  left: 28%;
`;

const MembersWrap = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({theme}) => theme.colors.purple[100]};
  border: 0.5px solid ${({theme}) => theme.colors.purple[500]};
  border-radius: 7px;
  padding: 2px 6px;
  margin-top: 4px;
`;

const MembersText = styled(Typography).attrs({text: 'SmallLabel'})`
  color: ${({theme}) => theme.colors.purple[500]};
  margin-left: 2px;
`;

const BellIconPress = styled.Pressable`
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  margin-right: 4px;
`;

const CsIconPress = styled.Pressable`
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
`;
