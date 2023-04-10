import messaging from '@react-native-firebase/messaging';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useAtom, useAtomValue} from 'jotai';
import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, Alert, StatusBar} from 'react-native';
import styled, {css} from 'styled-components/native';

import MembersIcon from '../../../../../assets/icons/Home/membersIcon.svg';
import ArrowIcon from '../../../../../assets/icons/Home/arrowDown.svg';
import BellIcon from '../../../../../assets/icons/Home/bell.svg';
import CalendarIcon from '../../../../../assets/icons/Home/calendar.svg';
import CsIcon from '../../../../../assets/icons/Home/cs.svg';
import MembershipIcon from '../../../../../assets/icons/Home/membership.svg';
import PlusIcon from '../../../../../assets/icons/Home/plus.svg';
import {weekAtom} from '../../../../../biz/useBanner/store';
import useGroupSpots from '../../../../../biz/useGroupSpots/hook';
import useOrderMeal from '../../../../../biz/useOrderMeal';
import useUserInfo from '../../../../../biz/useUserInfo';
import Balloon from '../../../../../components/BalloonHome';
import BottomSheetSpot from '../../../../../components/BottomSheetSpot';
import Calendar from '../../../../../components/Calendar';
import Typography from '../../../../../components/Typography';
import {formattedWeekDate} from '../../../../../utils/dateFormatter';
import {formattedMealFoodStatus} from '../../../../../utils/statusFormatter';
import {PAGE_NAME as GroupCreateMainPageName} from '../../../../Group/GroupCreate';
import {PAGE_NAME as BuyMealPageName} from '../../BuyMeal/Main';
import SkeletonUI from '../../Home/Skeleton';
import {PAGE_NAME as MealMainPageName} from '../../Meal/Main';
import {PAGE_NAME as LoginPageName} from '../../../Login/Login';
import {PAGE_NAME as NotificationCenterName} from '../../../../NotificationCenter';
import {
  getStorage,
  setStorage,
  removeItemFromStorage,
} from '../../../../../utils/asyncStorage';
import {PAGE_NAME as GroupSelectPageName} from '../../../../Group/GroupManage/index';
import {PAGE_NAME as GroupManagePageName} from '../../../../Group/GroupManage/DetailPage';
import Toast from '../../../../../components/Toast';
import {PAGE_NAME as ApartRegisterSpotPageName} from '../../../../Group/GroupApartment/SearchApartment/AddApartment/DetailAddress';
import {PAGE_NAME as MembershipIntro} from '../../../../Membership/MembershipIntro';
import {BespinMembers, FoundersMembers} from '../../../../../assets';
import {PAGE_NAME as FAQListDetailPageName} from '../../../MyPage/FAQ';
import {PAGE_NAME as CreateGroupPageName} from '../../../../../pages/Group/GroupCreate';
import {PAGE_NAME as MembershipInfoPageName} from '../../../../Membership/MembershipInfo';
import {PAGE_NAME as RegisterInfoPage1PageName} from '../../../../RegisterInfo/Start';
import useShoppingBasket from '../../../../../biz/useShoppingBasket/hook';
import FastImage from 'react-native-fast-image';
import useFoodDaily from '../../../../../biz/useDailyFood/hook';
import useAuth from '../../../../../biz/useAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalAnnouncement from '../../../../../components/ModalAnnouncement/Component';
import useGetAnnouncements from '../../../../../biz/useGetHomeAnnouncements/hook';
import useMembership from '../../../../../biz/useMembership';
import {isCancelSpotAtom} from '../../../../../biz/useGroupSpots/store';

import MealInfoComponent from './MealInfoComponent/MealInfoComponent';

export const PAGE_NAME = 'P_MAIN__BNB__HOME';
const Pages = () => {
  const navigation = useNavigation();

  const [isVisible, setIsVisible] = useState(true);
  const weekly = useAtomValue(weekAtom);
  const {isUserInfo, userInfo, isUserInfoLoading, isUserSpotStatus} =
    useUserInfo();
  const {
    saveFcmToken,
    readableAtom: {userRole, fcmToken},
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
  const {
    getMembershipHistory,
    readableAtom: {membershipHistory},
  } = useMembership();
  const {loadMeal} = useShoppingBasket();
  const {dailyFood, isServiceDays} = useFoodDaily();
  const [modalVisible, setModalVisible] = useState(false);

  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState();
  const [eventSpot, setEventSpot] = useState(false);
  const [eventSpotLoading, setEventSpotLoading] = useState(false);
  const [isCancelSpot, setIsCancelSpot] = useAtom(isCancelSpotAtom);
  const toast = Toast();
  const VISITED_NOW_DATE = Math.floor(new Date().getDate());
  const nextWeek = weekly[1].map(el => formattedWeekDate(el));
  const mealCheck = isOrderMeal?.map(el => {
    return el.serviceDate;
  });
  const intersection = nextWeek.filter(x => mealCheck?.includes(x));

  // 홈 전체 공지사항

  // const {getAnnouncements, announcements, announcementModalVisible} =
  //   useGetAnnouncements();

  // useEffect(() => {
  //   // 공지사항 이용하기
  //   // 0: 비활성 공지 보기
  //   // 1: 활성 공지 보기
  //   // 2: 팝업 공지보기
  //   // 3: 스팟 공지보기(스팟 공지는 스팟아이디를 두번째 인자로 추가해줘야 볼 수 있음)
  //   getAnnouncements(2);
  // }, []);

  // //팝업
  // const [announcementHandle, setAnnouncementHandle] = useState();

  // useEffect(() => {
  //   const yes = {};

  //   announcements.forEach(v => {
  //     yes[v.id] = true;
  //   });

  //   console.log(yes);

  //   setAnnouncementHandle(yes);
  // }, [announcements]);

  // useEffect(() => {
  //   console.log('랄랄라1');
  //   console.log(announcements);
  //   console.log(announcements.length);
  // }, [announcements]);

  // useEffect(() => {
  //   removeItemFromStorage('announcementsClickedDates');
  // }, []);

  // 회원 정보 입력

  const goToUserInfoTrue = true;

  useEffect(() => {
    if (goToUserInfoTrue) {
      navigation.navigate(RegisterInfoPage1PageName);
    }
  }, []);

  useEffect(() => {
    const handleShowModal = async () => {
      const VISITED_BEFORE_DATE = await getStorage('balloonTime');

      if (intersection.length === 0) {
        setIsVisible(true);
      }
      if (
        intersection.length === 0 &&
        VISITED_BEFORE_DATE === VISITED_NOW_DATE
      ) {
        setIsVisible(true);
      }
      if (
        intersection.length === 0 &&
        VISITED_BEFORE_DATE !== null &&
        VISITED_BEFORE_DATE !== VISITED_NOW_DATE
      ) {
        setIsVisible(false);
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
  useEffect(() => {
    const getHistory = async () => {
      setEventSpotLoading(true);
      await getMembershipHistory();
      setEventSpotLoading(false);
    };
    getHistory();
  }, [isUserInfo]);
  useFocusEffect(
    useCallback(() => {
      async function loadUser() {
        try {
          const userData = await userInfo();
          if (userData?.email) {
            if (userData?.spotId) {
              const daily = await dailyFood(
                userData?.spotId,
                formattedWeekDate(new Date()),
              );
              if (!(userRole === 'ROLE_GUEST')) {
                await orderMeal(
                  formattedWeekDate(weekly[0][0]),
                  formattedWeekDate(
                    weekly[weekly?.length - 1][weekly[0].length - 1],
                  ),
                );
              }
            }
          }
          return true;
        } catch (error) {
          return false;
        }
      }
      const isTester = async () => {
        const user = loadUser();
        // if (fcmToken) {
        //   saveFcmToken({
        //     token: fcmToken,
        //   });
        // }
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
            //const userStatus = await getStorage('token');
            const userStatus = await getStorage('spotStatus');

            const result = await todayOrderMeal(start[0], end[0]);
            //const getUserStatus = JSON.parse(userStatus).spotStatus;
            const getUserStatus = Number(userStatus);
            if (getUserStatus === 1) {
              navigation.navigate(GroupSelectPageName);
            }
            if (getUserStatus === 2 && !isCancelSpot) {
              console.log(isCancelSpot, 'test');
              navigation.navigate(GroupCreateMainPageName);
            }
            return result;
          };
          try {
            if (!(userRole === 'ROLE_GUEST')) {
              if (user) {
                const data = await status();
                if (data.statusCode === 200) {
                  const group = await userGroupSpotCheck();
                  if (group.statusCode === 200) {
                    await loadMeal();
                  }
                }
              }
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
      try {
        isTester();
      } catch (e) {
        alert(e.toString().replace('error:'));
      }
      console.log(membershipHistory.length);
    }, [isCancelSpot]),
  );

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
  // console.log(isUserInfo, '유저인포');
  // const date = formattedWeekDate(new Date());
  // const todayMeal = isOrderMeal?.filter((m) => m.serviceDate === date);
  //const todayMeal = isOrderMeal?.filter((m) => m.date === date);
  useEffect(() => {
    async function dailys() {
      try {
        if (userSpotId)
          await dailyFood(userSpotId, formattedWeekDate(new Date()));
      } catch (err) {
        console.log(err);
      }
    }
    // dailys();
  }, [userSpotId]);
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
    if (isUserGroupSpotCheck.length !== 0) {
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

  const mockStatus = 10;

  if (isOrderMealLoading || isUserInfoLoading || eventSpotLoading) {
    return <SkeletonUI />;
  }

  return (
    <SafeView
      style={{
        paddingTop: Math.round(StatusBar.currentHeight),
      }}>
      <View>
        {/* 홈 강제 공지사항 띄우기 */}
        {/* {Array.isArray(announcements) &&
          announcements.length > 0 &&
          announcements.map(v => {
            if (announcementHandle[v.id.toString()]) {
              return (
                <ModalAnnouncement
                  key={v.id}
                  data={v}
                  modalVisible={announcementModalVisible}
                  announcementHandle={announcementHandle}
                  setAnnouncementHandle={setAnnouncementHandle}
                />
              );
            } else {
              return;
            }
          })} */}

        <BarWrap>
          <SpotName onPress={PressSpotButton}>
            <SpotNameText>
              {!userGroupName
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
                      <MealInfoComponent m={m} meal={meal} />

                      // <MealInfoWrap
                      //   key={meal.id}
                      //   onPress={() => navigation.navigate(MealMainPageName)}>
                      //   <MealInfo>
                      //     <FastImage
                      //       source={{
                      //         uri: `${meal.image}`,
                      //         priority: FastImage.priority.high,
                      //       }}
                      //       style={{
                      //         width: 64,
                      //         height: 64,
                      //         borderTopLeftRadius: 14,
                      //         borderBottomLeftRadius: 14,
                      //       }}
                      //     />
                      //     <MealText>
                      //       <View>
                      //         <DiningType>{`오늘 ${m.diningType}`}</DiningType>
                      //         <View>
                      //           <MealTxt>{meal.name}</MealTxt>
                      //         </View>
                      //       </View>
                      //       <MealCount>
                      //         <GreyTxt status={meal.orderStatus}>
                      //           {formattedMealFoodStatus(meal.orderStatus)}
                      //         </GreyTxt>
                      //         <GreyTxt>{meal.count}개</GreyTxt>
                      //       </MealCount>
                      //     </MealText>
                      //   </MealInfo>
                      // </MealInfoWrap>
                    );
                  })}
                </React.Fragment>
              );
            })
          )}

          {/* UI만들기용 */}
          <MealInfoComponent
            m={{diningType: '점심'}}
            meal={{
              id: 8169,
              dailyFoodId: 15415,
              name: '하노이 돼지고기와 누들 샐러드',
              orderStatus: 10,
              makers: '라이브볼',
              image:
                'https://kurrant-v1-dev.s3.ap-northeast-2.amazonaws.com/food/0001678239783246/%ED%95%98%EB%85%B8%EC%9D%B4%20%EB%8F%BC%EC%A7%80%EA%B3%A0%EA%B8%B0%EC%99%80%20%EB%88%84%EB%93%A4%20%EC%83%90%EB%9F%AC%EB%93%9C.png',
              count: 1,
              groupName: '달리셔스',
              spotName: '상경빌딩 3F',
            }}
            mockStatus={mockStatus}
          />
          <MealInfoComponent
            m={{diningType: '점심'}}
            meal={{
              id: 8169,
              dailyFoodId: 15415,
              name: '하노이 돼지고기와 누들 샐러드',
              orderStatus: 11,
              makers: '라이브볼',
              image:
                'https://kurrant-v1-dev.s3.ap-northeast-2.amazonaws.com/food/0001678239783246/%ED%95%98%EB%85%B8%EC%9D%B4%20%EB%8F%BC%EC%A7%80%EA%B3%A0%EA%B8%B0%EC%99%80%20%EB%88%84%EB%93%A4%20%EC%83%90%EB%9F%AC%EB%93%9C.png',
              count: 1,
              groupName: '달리셔스',
              spotName: '상경빌딩 3F',
            }}
            mockStatus={mockStatus}
          />

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
          <MealCheckText>메뉴 확인 후 수령하셨나요?</MealCheckText>
          <MealCheckButton>
            <MealCheckButtonText>네, 확인했어요</MealCheckButtonText>
          </MealCheckButton>
        </MealCheckWrap>
        <MealCheckWrap>
          <MealCheckText>식사 맛있게 하셨나요?</MealCheckText>
          <MealCheckButton>
            <MealCheckButtonText>맛 평가하기</MealCheckButtonText>
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
                isServiceDays={isServiceDays}
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
              <MembershipWrap
                onPress={() => navigation.navigate(MembershipInfoPageName)}>
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
            ) : isUserInfo?.email.includes('@bespinglobal.com') &&
              membershipHistory.length < 1 ? (
              <MenbershipBanner
                onPress={() =>
                  navigation.navigate(MembershipIntro, {
                    isFounders: isUserInfo?.leftFoundersNumber > 0,
                  })
                }>
                <MembershipImages source={BespinMembers} resizeMode={'cover'} />
              </MenbershipBanner>
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

      {isVisible && (
        <BalloonWrap>
          <Balloon label="다음주 식사 구매하셨나요?" />
        </BalloonWrap>
      )}

      <ButtonWrap>
        <Button
          onPress={() => {
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

const MealInfoWrapper = styled.View`
  margin-bottom: 16px;
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

const OrderStatusWrap = styled.View`
  align-items: center;
`;
const CommentText = styled(Typography).attrs({text: 'Body05SB'})`
  color: ${props => props.theme.colors.grey[1]};
  margin-bottom: 4px;
`;
const ConfirmPressable = styled.Pressable`
  background-color: ${({theme}) => theme.colors.purple[500]};
  border-radius: 999px;
  height: 28px;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
`;
const ConfirmText = styled(Typography).attrs({text: 'Button09SB'})`
  color: white;
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
  justify-content: flex-end;
  align-items: flex-end;
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

const MembershipWrap = styled.Pressable`
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
  color: ${({theme, status}) =>
    status === 9 ? theme.colors.blue[500] : theme.colors.grey[5]};
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

const BalloonWrap = styled.View`
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
