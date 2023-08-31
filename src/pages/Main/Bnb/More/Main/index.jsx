/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React, {useEffect, useState} from 'react';
import {useCallback} from 'react';
import {Alert, Pressable, ScrollView, StatusBar} from 'react-native';
import VersionCheck from 'react-native-version-check';
import styled, {useTheme} from 'styled-components/native';
import ArrowRightIcon from '~assets/icons/Arrow/arrowRight.svg';
import useUserMe from '~biz/useUserMe';
import BottomModal from '~components/BottomModal';
import {SettingIcon} from '~components/Icon';
import Typography from '~components/Typography';
import Wrapper from '~components/Wrapper';
import {PAGE_NAME as DietRepoMainPageName} from '~pages/Main/Bnb/DietRepo/Main';
import {PAGE_NAME as TermOfServicePageName} from '~pages/Main/MyPage/TermOfService';

import ListBox from './ListBox';
import ListContainer from './ListContainer';
import MembershipBox from './MembershipBox';

import SkeletonUI from './SkeletonUI';
import useAuth from '../../../../../biz/useAuth';
import useGroupSpots from '../../../../../biz/useGroupSpots';

// import SseRedDot from '../../../../../utils/sse/SseService/SseRedDot/SseRedDot';

import {PAGE_NAME as testPageName} from '../../../../../jaesin/test';

import PointBox from './PointBox';
import {PAGE_NAME as GroupApplicationCheckPageName} from '../../../../Group/GroupApartment/ApartmentApplicationCheck';

import {SCREEN_NAME as ReviewScreenName} from '../../../../../screens/Main/Review';

import {PAGE_NAME as ReportReviewPageName} from '../../../../../screens/Main/Review/ReportReview';
import useReviewWait from '../../../../../biz/useReview/useReviewWait';
import {
  redeemablePointsAtom,
  totalReviewWaitListAtom,
} from '../../../../../biz/useReview/useReviewWait/store';
import {useGetUserInfo} from '../../../../../hook/useUserInfo';
import {PointMainPageName} from '../../../../../pages/Main/MyPage/Point';
import {SCREEN_NAME as NoticeScreenName} from '../../../../../screens/Main/Notice';
import {SCREEN_NAME as PurchaseHistoryName} from '../../../../../screens/Main/PurchaseHistory';

import {PAGE_NAME as MembershipInfoPageName} from '../../../../Membership/MembershipInfo';
import {PAGE_NAME as MembershipIntroPageName} from '../../../../Membership/MembershipIntro';
import {PAGE_NAME as LoginPageName} from '../../../Login/Login';
import {PAGE_NAME as CompanyInfoPageName} from '../../../MyPage/CompanyInfo';
import {PAGE_NAME as CreditPageName} from '../../../MyPage/Credit';
import {PAGE_NAME as FAQPageName} from '../../../MyPage/FAQ';
import {PAGE_NAME as PersonalInfoPageName} from '../../../MyPage/PersonalInfo';
import {PAGE_NAME as MealPageName} from '../../Meal/Main';
import {PAGE_NAME as MealCartPageName} from '../../MealCart/Main';
import SseRedDot from '../../../../../utils/sse/SseService/SseRedDot/SseRedDot';
import useSse from '../../../../../utils/sse/sseLogics/useSse';
import {PAGE_NAME as RegisterInfoStartPageName} from '~pages/RegisterInfo/Start';
import {View} from 'react-native';
import {RightSkinnyArrow} from '../../../../../components/Icon';
import {
  sseType1Atom,
  sseType2Atom,
} from '../../../../../utils/sse/sseLogics/store';

export const PAGE_NAME = 'P_MAIN__BNB__MORE';

const Pages = ({route}) => {
  const [total] = useAtom(totalReviewWaitListAtom);
  const [redeemablePoints] = useAtom(redeemablePointsAtom);

  const themeApp = useTheme();
  const navigation = useNavigation();
  const {
    userMe,
    userMePersonal,
    readableAtom: {myInfo, isMyInfoLoading},
  } = useUserMe();
  const {isApplicationList, applicationList} = useGroupSpots();
  const [modalVisible2, setModalVisible2] = useState(false);
  const {
    readableAtom: {userRole},
  } = useAuth();

  const {getReviewWait} = useReviewWait();

  const {sseHistory, sseHistoryRefetch} = useSse();
  const [sseType1] = useAtom(sseType1Atom);
  const [sseType2] = useAtom(sseType2Atom);

  useEffect(() => {
    getReviewWait();
  }, []);

  // useEffect(() => {
  //   console.log('획득 가능한 포인트 확인');
  //   console.log(redeemablePoints);
  // }, [redeemablePoints]);

  // useEffect(() => {
  //   console.log('토탈');
  //   console.log(total);
  // }, [total]);

  const [versionChecked, setVersionChecked] = useState(false);
  const currentVersion = VersionCheck.getCurrentVersion();
  const {
    data: {data: isUserInfo},
  } = useGetUserInfo();

  const getData = async () => {
    await userMe();
    await userMePersonal();
    VersionCheck.getLatestVersion().then(latestVersion => {
      if (currentVersion === latestVersion) setVersionChecked(true);
      else setVersionChecked(false);
    });
  };
  useFocusEffect(
    useCallback(() => {
      if (userRole !== 'ROLE_GUEST') {
        getData();
      }
      if (userRole === 'ROLE_GUEST') {
        Alert.alert(
          '로그인이 필요합니다',
          '해당 기능은 로그인 이후 사용할수 있습니다.',
          [
            {
              text: '취소',
              onPress: () => {
                navigation.goBack();
              },
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
    }, []),
  );

  useEffect(() => {
    if (userRole !== 'ROLE_GUEST') {
      if (applicationList) {
        applicationList();
      }
      getData();
    }
  }, []);

  if (!isUserInfo) {
    return <SkeletonUI />;
  }
  return (
    <Container>
      <Wrapper paddingTop={40}>
        <ScrollView>
          {isUserInfo ? (
            <View>
              {/* <RegisterInfoPressable
                onPress={() => {
                  navigation.navigate(RegisterInfoStartPageName);
                }}
                style={{marginLeft: 24}}>
                <ToRegisterInfoText>회원 정보 입력하기 </ToRegisterInfoText>
                <RightSkinnyArrow
                  width={'5px'}
                  height={'9px'}
                  color={themeApp.colors.grey[4]}
                />
              </RegisterInfoPressable> */}
              <LoginBox>
                <LoginIdBox>
                  <Typography
                    text="Title02SB"
                    textColor={themeApp.colors.grey[2]}>
                    {isUserInfo?.nickname ?? isUserInfo?.name}님
                  </Typography>
                </LoginIdBox>
                <Pressable
                  onPress={() => navigation.navigate(PersonalInfoPageName)}>
                  <SettingIcon height={16} width={8} />
                </Pressable>
              </LoginBox>
            </View>
          ) : (
            <LoginBox
              onPress={async () => {
                await AsyncStorage.clear();
                navigation.reset({
                  index: 0,
                  routes: [
                    {
                      name: LoginPageName,
                    },
                  ],
                });
              }}>
              <Typography text="Title02SB" textColor={themeApp.colors.grey[2]}>
                로그인{' '}
              </Typography>
              <ArrowRightLogin height={16} width={8} />
            </LoginBox>
          )}

          <MembershipBox
            isMembership={isUserInfo?.isMembership}
            membershipPeriod={isUserInfo?.membershipUsingPeriod}
            setModalVisible2={setModalVisible2}
          />
          <PointBox point={isUserInfo?.point} />

          <InfomationContainer>
            <InfomationBox
              onPress={() => {
                navigation.navigate(ReviewScreenName);
              }}>
              <SseRedDotType3
                isSse={total > 0}
                position="absolute"
                right="-10px"
                top="0px">
                <InfomationText
                  text={'Title02SB'}
                  textColor={themeApp.colors.grey[2]}>
                  {total}
                </InfomationText>
              </SseRedDotType3>

              <InfomationLabel
                text={'CaptionR'}
                textColor={themeApp.colors.grey[2]}>
                구매후기
              </InfomationLabel>
            </InfomationBox>

            <InfomationBox>
              <InfomationText
                text={'Title02SB'}
                textColor={themeApp.colors.grey[5]}>
                0
              </InfomationText>
              <InfomationLabel
                text={'CaptionR'}
                textColor={themeApp.colors.grey[5]}>
                준비중
              </InfomationLabel>
            </InfomationBox>
            <InfomationBox onPress={() => navigation.navigate(MealPageName)}>
              <InfomationText
                text={'Title02SB'}
                textColor={themeApp.colors.grey[2]}>
                {myInfo?.dailyMealCount || 0}
              </InfomationText>
              <InfomationLabel
                text={'CaptionR'}
                textColor={themeApp.colors.grey[2]}>
                식사일정
              </InfomationLabel>
            </InfomationBox>
          </InfomationContainer>
          <Line />
          <ListContainer title="이용 내역">
            <ListBox title="식사 일정" routeName={MealPageName} />
            <ListBox title="장바구니" routeName={MealCartPageName} />
            {/* <ListBox title='장바구니(마켓)' /> */}
            {/* <ListBox title='찜목록' /> */}
            <ListBox title="구매 내역" routeName={PurchaseHistoryName} />

            <ListBox
              title="리뷰 관리"
              isSse={total > 0 || !!sseHistory?.find(v => v.type === 8)}
              description={redeemablePoints > 0 && `모두 작성시 최대 `}
              effect={
                redeemablePoints > 0 && (
                  <Typography
                    test={'CaptionR'}
                    textColor={themeApp.colors.blue[500]}>
                    {redeemablePoints}P
                  </Typography>
                )
              }
              routeName={ReviewScreenName}
            />

            <ListBox
              title="커런트 멤버십"
              routeName={
                isUserInfo?.isMembership
                  ? MembershipInfoPageName
                  : MembershipIntroPageName
              }
              params={{isFounders: isUserInfo?.leftFoundersNumber > 0}}
            />

            <ListBox title="커런트 포인트" routeName={PointMainPageName} />
            {isApplicationList.length !== 0 && (
              <ListBox
                title="스팟 개설 요청 내역"
                routeName={GroupApplicationCheckPageName}
              />
            )}
            {/* <ListBox title="식단 리포트" routeName={DietRepoMainPageName} /> */}
          </ListContainer>
          <ListContainer title="알림">
            <ListBox
              isSse={
                (!!sseType1.type && !sseType1.read) ||
                !!sseHistory?.find(v => v.type === 1) ||
                (!!sseType2.type && !sseType2.read) ||
                !!sseHistory?.find(v => v.type === 2)

                // !!sseHistory?.find(v => v.type === 1) ||
                // !!sseHistory?.find(v => v.type === 2)
              }
              title="공지사항"
              routeName={NoticeScreenName}
            />

            <ListBox
              title="약관 및 개인 정보"
              routeName={TermOfServicePageName}
            />
          </ListContainer>
          <ListContainer title="문의하기">
            <ListBox title="고객센터" routeName={FAQPageName} />
            <ListBox title="회사 정보" routeName={CompanyInfoPageName} />
          </ListContainer>
          <ListContainer title="버전 정보">
            <ListBox
              title="앱 버전"
              isVersion={true}
              isArrow={false}
              latestVersion={versionChecked}
              currentVersion={currentVersion}
            />
            <ListBox title="크레딧" routeName={CreditPageName} />
          </ListContainer>
        </ScrollView>
      </Wrapper>
      <BottomModal
        modalVisible={modalVisible2}
        setModalVisible={setModalVisible2}
        title={`기업멤버십에 가입되어 있어요.`}
        description={
          '이미 멤버십 혜택이 적용 중이에요.\n개인멤버십 가입을 추가로 진행 할까요?'
        }
        buttonTitle1={'취소'}
        buttonType1="grey7"
        buttonTitle2={'확인'}
        buttonType2="grey2"
        onPressEvent1={() => setModalVisible2(false)}
        onPressEvent2={() => {
          navigation.navigate(MembershipIntroPageName, {
            isFounders: isUserInfo?.data?.leftFoundersNumber > 0,
          });
        }}
      />
    </Container>
  );
};

export default Pages;

const GourmetTestButton = styled.Pressable`
  flex-direction: row;
  align-items: center;
  margin-left: 24px;
  margin-right: 24px;
`;
const Container = styled.SafeAreaView`
  flex: 1;
  padding-top: ${Math.round(StatusBar.currentHeight)}px;
  background-color: white;
`;

const LoginBox = styled.Pressable`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
  margin-bottom: 19px;
  margin-left: 24px;
  margin-right: 24px;
`;
const LoginIdBox = styled.Pressable`
  flex-direction: row;
  align-items: center;
`;
const ArrowRightLogin = styled(ArrowRightIcon).attrs({strokeWidth: 2})`
  color: ${props => props.theme.colors.grey[2]};
  margin: 4px 8px;
`;
const ArrowRight = styled(ArrowRightIcon)`
  color: ${props => props.theme.colors.blue[500]};
`;

const AvatarBackground = styled.ImageBackground`
  width: 34px;
  height: 34px;
  margin-right: 4px;
  justify-content: center;
  align-items: center;
`;
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
`;
const InfomationBox = styled.Pressable`
  align-items: center;
  justify-content: center;

  flex: 1;
  margin-left: 4px;
  margin-right: 4px;
  border-width: 1px;
  border-color: ${({theme}) => theme.colors.grey[8]};
  border-radius: 7px;
  height: 76px;
`;
const InfomationText = styled(Typography)``;

const InfomationLabel = styled(Typography)``;

const InfomationCaption = styled(Typography)`
  font-size: 10px;
  font-family: 'Pretendard-Regular';
`;

const SseRedDotType3 = styled(SseRedDot)``;
const RegisterInfoPressable = styled.Pressable`
  flex-direction: row;
  align-items: center;
`;

const ToRegisterInfoText = styled(Typography).attrs({text: 'Body07CaptionSB'})`
  color: ${({theme}) => theme.colors.grey[4]};
`;
