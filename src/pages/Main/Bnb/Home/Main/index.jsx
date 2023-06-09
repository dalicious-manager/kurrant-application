/* eslint-disable react-hooks/exhaustive-deps */
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useAtom, useAtomValue} from 'jotai';
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Alert,
  StatusBar,
  AppState,
  Platform,
  Linking,
  Pressable,
  Text,
} from 'react-native';
import Sound from 'react-native-sound';
import VersionCheck from 'react-native-version-check';
import styled, {css} from 'styled-components/native';

import MealInfoComponent from './MealInfoComponent/MealInfoComponent';
import {BespinMembers, FoundersMembers} from '../../../../../assets';
import ArrowIcon from '../../../../../assets/icons/Home/arrowDown.svg';
import BellIcon from '../../../../../assets/icons/Home/bell.svg';
import CalendarIcon from '../../../../../assets/icons/Home/calendar.svg';
import CsIcon from '../../../../../assets/icons/Home/cs.svg';
import MembershipIcon from '../../../../../assets/icons/Home/membership.svg';
import MembersIcon from '../../../../../assets/icons/Home/membersIcon.svg';
import PlusIcon from '../../../../../assets/icons/Home/plus.svg';
import useAuth from '../../../../../biz/useAuth';
import {weekAtom} from '../../../../../biz/useBanner/store';
import useGetOneAnnouncements from '../../../../../biz/useGetHomeAnnouncemetsJustOne/hook';
import useGroupSpots from '../../../../../biz/useGroupSpots/hook';
import {isCancelSpotAtom} from '../../../../../biz/useGroupSpots/store';
import useMembership from '../../../../../biz/useMembership';
import useUserInfo from '../../../../../biz/useUserInfo';
import Balloon from '../../../../../components/BalloonHome';
import BottomSheetSpot from '../../../../../components/BottomSheetSpot';
import Calendar from '../../../../../components/Calendar';
import ModalOneAnnouncement from '../../../../../components/ModalOneAnnouncement/ModalOneAnnouncement';
import Toast from '../../../../../components/Toast';
import Typography from '../../../../../components/Typography';
import {useGetDailyfood} from '../../../../../hook/useDailyfood';
import {useGetOrderMeal} from '../../../../../hook/useOrder';
import {PAGE_NAME as CreateGroupPageName} from '../../../../../pages/Group/GroupCreate';
import {getStorage, setStorage} from '../../../../../utils/asyncStorage';
import {formattedWeekDate} from '../../../../../utils/dateFormatter';
import {mainDimATom, mainDimAtom} from '../../../../../utils/store';
import {PAGE_NAME as ApartRegisterSpotPageName} from '../../../../Group/GroupApartment/SearchApartment/AddApartment/DetailAddress';
import {PAGE_NAME as GroupManagePageName} from '../../../../Group/GroupManage/DetailPage';
import {PAGE_NAME as MembershipInfoPageName} from '../../../../Membership/MembershipInfo';
import {PAGE_NAME as MembershipIntro} from '../../../../Membership/MembershipIntro';
import {PAGE_NAME as NotificationCenterName} from '../../../../NotificationCenter';
import MainDim from '../../../../Spots/spotGuide/MainDim';
import {PAGE_NAME as SpotGuidePageName} from '../../../../Spots/spotGuide/SpotGuide';
import {PAGE_NAME as SpotTypePageName} from '../../../../Spots/SpotType';
import {PAGE_NAME as LoginPageName} from '../../../Login/Login';
import {PAGE_NAME as FAQListDetailPageName} from '../../../MyPage/FAQ';
import {PAGE_NAME as BuyMealPageName} from '../../BuyMeal/Main';
import SkeletonUI from '../../Home/Skeleton';
import {PAGE_NAME as MealMainPageName} from '../../Meal/Main';

const GOOGLE_PLAY_STORE_LINK = 'market://details?id=com.dalicious.kurrant';
// 구글 플레이 스토어가 설치되어 있지 않을 때 웹 링크
const GOOGLE_PLAY_STORE_WEB_LINK =
  'https://play.google.com/store/apps/details?id=com.dalicious.kurrant';
// 애플 앱 스토어 링크
const APPLE_APP_STORE_LINK = 'itms-apps://itunes.apple.com/us/app/id1663407738';
// 애플 앱 스토어가 설치되어 있지 않을 때 웹 링크
const APPLE_APP_STORE_WEB_LINK = 'https://apps.apple.com/us/app/id1663407738';

export const PAGE_NAME = 'P_MAIN__BNB__HOME';
const Pages = () => {
  const navigation = useNavigation();

  const [isVisible, setIsVisible] = useState(true);
  const weekly = useAtomValue(weekAtom);
  const {isUserInfo, userInfo} = useUserInfo();
  const currentVersion = VersionCheck.getCurrentVersion();
  const userName = isUserInfo?.name;
  const userSpot = isUserInfo?.spot;
  const userGroupName = isUserInfo?.group;
  const userSpotId = isUserInfo?.spotId;
  const clientId = isUserInfo?.groupId;
  const {
    saveFcmToken,
    readableAtom: {userRole},
  } = useAuth();
  const {
    userGroupSpotCheck,
    isUserGroupSpotCheck,
    userSpotRegister,
    groupSpotDetail,
  } = useGroupSpots();

  const [coinSound, setCoinSound] = useState(null);

  const loadCoinSound = () => {
    const sound = new Sound(
      require('../../../../../assets/sounds/coin.wav'),
      Platform.OS === 'android'
        ? Sound.MAIN_BUNDLE
        : Sound.MAIN_BUNDLE.bundlePath,
      error => {
        if (error) {
          return;
        }
      },
    );
    setCoinSound(sound);
  };
  const {
    getMembershipHistory,
    readableAtom: {membershipHistory},
  } = useMembership();

  const {data: dailyfoodData, refetch: dailyfoodRefetch} = useGetDailyfood(
    userSpotId,
    formattedWeekDate(new Date()),
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [showDim, setShowDim] = useAtom(mainDimAtom);

  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState();
  const [appState, setAppState] = useState();
  const [eventSpotLoading, setEventSpotLoading] = useState(false);

  const [isCancelSpot, setIsCancelSpot] = useAtom(isCancelSpotAtom);
  const toast = Toast();
  const VISITED_NOW_DATE = Math.floor(new Date().getDate());
  const nextWeek = weekly[1].map(el => formattedWeekDate(el));

  const intersection = nextWeek.filter(x => mealCheck?.includes(x));

  const date = formattedWeekDate(new Date());
  const {data: orderMealList, refetch: orderMealRefetch} = useGetOrderMeal(
    formattedWeekDate(weekly[0][0]),
    formattedWeekDate(
      weekly[weekly?.length - 1][weekly[weekly?.length - 1].length - 1],
    ),
  );
  const mealCheck = orderMealList?.data?.map(el => {
    return el.serviceDate;
  });
  useEffect(() => {
    const getUser = async () => {
      const user = await userInfo();
      if (user.spotId) dailyfoodRefetch();
      else setShowDim(true);
    };
    getUser();
  }, []);
  // 홈 전체 공지사항
  const handlePress = useCallback(async (url, alterUrl) => {
    // 만약 어플이 설치되어 있으면 true, 없으면 false
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // 설치되어 있으면
      await Linking.openURL(url);
    } else {
      // 앱이 없으면
      await Linking.openURL(alterUrl);
    }
  }, []);
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

  // 홈 공지사항 하나만 넣기

  const {
    getOneAnnouncement,
    oneAnnouncement,
    isOneAnnouncementModalVisible,
    setIsOneAnnouncementModalVisible,
  } = useGetOneAnnouncements();

  // useEffect(() => {
  //   removeItemFromStorage('announcementsClickedOneDate');
  // }, []);

  // useEffect(() => {
  //   console.log('아나운스먼트 여기여');
  //   console.log(oneAnnouncement);
  // }, [oneAnnouncement]);

  // 로컬스토리지 확인하기

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
    getOneAnnouncement(2);
    if (coinSound === null) loadCoinSound();
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
      await getMembershipHistory();
    };
    getHistory();
  }, [isUserInfo]);
  useFocusEffect(
    useCallback(() => {
      try {
        orderMealRefetch();
      } catch (e) {
        Alert.alert(e.toString()?.replace('error:'));
      }
    }, [isCancelSpot, appState]),
  );
  const checkPermission = () => {
    messaging()
      .hasPermission()
      .then(enabled => {
        if (enabled) {
          getToken();
        } else {
          requestPermission();
        }
      })
      .catch(error => {});
  };

  //2
  const requestPermission = () => {
    messaging()
      .requestPermission()
      .then(() => {
        getToken();
      })
      .catch(error => {});
  };

  //3
  const getToken = () => {
    messaging()
      .getToken()
      .then(token => {
        if (token) {
          saveFcmToken({
            token: token,
          });
        }
      })
      .catch(error => {});
  };
  useEffect(() => {
    checkPermission();
    // Check whether an initial notification is available
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      if (remoteMessage) {
        if (remoteMessage.data.page !== 'Home') {
          if (remoteMessage.data.page === 'BUY_MEAL_PAGE') {
            return navigation.navigate(remoteMessage.data.page, {
              date: date,
            });
          }
          if (remoteMessage.data.page === 'S_MAIN__REVIEW') {
            navigation.navigate(remoteMessage.data.page, {
              from: 'point',
              id: remoteMessage.data.reviewId,
            });
          }
          if (remoteMessage.data.page === 'P_MAIN__MYPAGE__WRITTENREVIEW') {
            return navigation.navigate('S_MAIN__REVIEW');
          }
          if (remoteMessage.data.page === 'P__MY_PAGE__PUBLIC_NOTICE') {
            return navigation.navigate('S_MAIN__NOTICE', {
              from: 'public',
            });
          }
          if (remoteMessage.data.page === 'P__MY_PAGE__SPOT_NOTICE') {
            return navigation.navigate('S_MAIN__NOTICE', {
              from: 'spot',
            });
          }
          navigation.navigate(remoteMessage.data.page);
        }
      }
    });
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          if (remoteMessage.data.page !== 'Home') {
            if (remoteMessage.data.page === 'BUY_MEAL_PAGE') {
              return navigation.navigate(remoteMessage.data.page, {
                date: date,
              });
            }
            if (remoteMessage.data.page === 'S_MAIN__REVIEW') {
              navigation.navigate(remoteMessage.data.page, {
                from: 'point',
                id: remoteMessage.data.reviewId,
              });
            }
            if (remoteMessage.data.page === 'P_MAIN__MYPAGE__WRITTENREVIEW') {
              return navigation.navigate('S_MAIN__REVIEW');
            }
            if (remoteMessage.data.page === 'P__MY_PAGE__PUBLIC_NOTICE') {
              return navigation.navigate('S_MAIN__NOTICE', {
                from: 'public',
              });
            }
            if (remoteMessage.data.page === 'P__MY_PAGE__SPOT_NOTICE') {
              return navigation.navigate('S_MAIN__NOTICE', {
                from: 'spot',
              });
            }

            navigation.navigate(remoteMessage.data.page);
          }
        }
      });

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
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
      Alert.alert('스팟', err?.toString()?.replace('error: ', ''));
    }
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
    } catch (err) {}
  };
  const handleStatus = e => {
    setAppState(e);
  };
  useEffect(() => {
    const listener = AppState.addEventListener('change', handleStatus);

    return () => {
      listener.remove();
    };
  }, [isUserGroupSpotCheck]);
  useFocusEffect(
    useCallback(() => {
      const getData = async () => {
        await userGroupSpotCheck();
        await VersionCheck.getLatestVersion().then(latestVersion => {
          const regex = /[^0-9]/g;
          const result = currentVersion?.replace(regex, '');
          const result2 = latestVersion?.replace(regex, '');
          if (Number(result) < Number(result2)) {
            Alert.alert(
              '앱 업데이트',
              '최신버전으로 업데이트 되었습니다.\n새로운 버전으로 업데이트 해주세요',
              [
                {
                  text: '확인',
                  onPress: async () => {
                    if (Platform.OS === 'android') {
                      handlePress(
                        GOOGLE_PLAY_STORE_LINK,
                        GOOGLE_PLAY_STORE_WEB_LINK,
                      );
                    } else {
                      handlePress(
                        APPLE_APP_STORE_LINK,
                        APPLE_APP_STORE_WEB_LINK,
                      );
                    }
                  },
                  style: 'destructive',
                },
              ],
            );
          }
        });
      };
      getData();
    }, []),
  );

  useEffect(() => {
    if (isUserInfo?.spotId === null && !showDim) {
      setModalVisible(true);
    }
  }, [showDim]);

  if (!isUserInfo) {
    return <SkeletonUI />;
  }

  return (
    <SafeView
      style={{
        paddingTop: Math.round(StatusBar.currentHeight),
      }}>
      <View>
        {!!oneAnnouncement && (
          <ModalOneAnnouncement
            data={oneAnnouncement}
            modalVisible={isOneAnnouncementModalVisible}
            setModalVisible={setIsOneAnnouncementModalVisible}
          />
        )}

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
          {orderMealList?.data?.filter(order => order.serviceDate === date)
            .length === 0 ? (
            <NoMealInfo>
              <GreyTxt>오늘은 배송되는 식사가 없어요</GreyTxt>
            </NoMealInfo>
          ) : (
            orderMealList?.data?.map((m, idx) => {
              if (m.serviceDate === date)
                return (
                  <React.Fragment key={`${m.id} ${idx}`}>
                    {m.orderItemDtoList.map(meal => {
                      return (
                        <MealInfoComponent
                          m={m}
                          meal={meal}
                          coinSound={coinSound}
                          key={`${meal.id} ${meal.dailyFoodId}`}
                        />
                      );
                    })}
                  </React.Fragment>
                );
            })
          )}
        </MainWrap>

        <Wrap>
          <MainWrap>
            <MealCalendar>
              <MealCalendarTitle>
                <CalendarIcon />
                <TitleText>식사일정</TitleText>
              </MealCalendarTitle>
              <Calendar
                isServiceDays={dailyfoodData?.data?.serviceDays}
                meal={orderMealList?.data}
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

            <Pressable onPress={() => navigation.navigate(SpotGuidePageName)}>
              <Text>스팟 선택 임시 버튼</Text>
            </Pressable>
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
          onPress={async () => {
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
        title="배송 스팟 선택"
        data={isUserGroupSpotCheck?.spotListResponseDtoList}
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
  margin: 0px 24px;
`;

const NoMealInfo = styled.View`
  ${BoxWrap};
  ${Display};
  justify-content: center;
`;

const MealCalendar = styled.View`
  width: 100%;
  border-radius: 14px;
  background-color: ${props => props.theme.colors.grey[0]};
  margin-bottom: 16px;
  padding: 16px;
  min-height: 130px;
  padding-bottom: 10px;
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

const TitleText = styled(Typography).attrs({text: 'Body05SB'})`
  margin-left: 14px;
  color: ${props => props.theme.colors.grey[2]};
`;

const ButtonWrap = styled.View`
  position: absolute;
  bottom: 17px;
  width: 100%;
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
