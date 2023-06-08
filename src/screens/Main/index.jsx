/* eslint-disable no-dupe-keys */
/* eslint-disable import/order */
import {useNavigation, useRoute} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAtom} from 'jotai';
import React from 'react';
import {useEffect} from 'react';
import {Alert, View} from 'react-native';
import {
  RESULTS,
  checkNotifications,
  openSettings,
  requestNotifications,
} from 'react-native-permissions';
import styled from 'styled-components';

import AppleSignup, {
  PAGE_NAME as AppleSignupPageName,
} from '~pages/Main/Login/AppleSignup';
import EmailLoginModal, {
  PAGE_NAME as EmailLoginModalModalPageName,
} from '~pages/Main/Login/EmailLogin';
import FindUser, {
  PAGE_NAME as FindUserPageName,
} from '~pages/Main/Login/FindUser';
import ChagePassword, {
  PAGE_NAME as ChagePasswordPageName,
} from '~pages/Main/Login/FindUser/ChagePassword';
import FindId, {
  PAGE_NAME as FindIdPageName,
} from '~pages/Main/Login/FindUser/FindId';
import FindIdComplate, {
  PAGE_NAME as FindIdComplatePageName,
} from '~pages/Main/Login/FindUser/FindId/FindIdComplate';
import FindPassword, {
  PAGE_NAME as FindPasswordPageName,
} from '~pages/Main/Login/FindUser/FindPassword';
import LoginMainModal, {
  PAGE_NAME as LoginMainModalPageName,
} from '~pages/Main/Login/Login';
import SignUp, {PAGE_NAME as SignUpPageName} from '~pages/Main/Login/SignUp';
import SignUpComplate, {
  PAGE_NAME as SignUpComplatePageName,
} from '~pages/Main/Login/SignUp/SignUpComplate';
import FAQ, {PAGE_NAME as FAQPageName} from '~pages/Main/MyPage/FAQ';
import FAQListPage, {
  PAGE_NAME as FAQListPageName,
} from '~pages/Main/MyPage/FAQ/FAQListPage';
import PersonalInfo, {
  PAGE_NAME as PersonalInfoPageName,
} from '~pages/Main/MyPage/PersonalInfo';
import ConnectedSNS, {
  PAGE_NAME as ConnectedSNSPageName,
} from '~pages/Main/MyPage/PersonalInfo/pages/ConnectedSNS';
import EmailSetting, {
  PAGE_NAME as EmailSettingPageName,
} from '~pages/Main/MyPage/PersonalInfo/pages/EmailSetting';
import MarketingAgree, {
  PAGE_NAME as MarketingAgreePageName,
} from '~pages/Main/MyPage/PersonalInfo/pages/MarketingAgree';
import NotificationSetting, {
  PAGE_NAME as NotificationSettingPageName,
} from '~pages/Main/MyPage/PersonalInfo/pages/NotificationSetting';
import PasswordSetting, {
  PAGE_NAME as PasswordSettingPageName,
} from '~pages/Main/MyPage/PersonalInfo/pages/PasswordSetting';
import PhoneNumberSetting, {
  PAGE_NAME as PhoneNumberSettingPageName,
} from '~pages/Main/MyPage/PersonalInfo/pages/PhoneNumberSetting';
import TermOfService, {
  PAGE_NAME as TermOfServicePageName,
} from '~pages/Main/MyPage/TermOfService';
import Privacy, {
  PAGE_NAME as PrivacyPageName,
} from '~pages/Main/MyPage/TermOfService/Privacy';
import Term, {
  PAGE_NAME as TermPageName,
} from '~pages/Main/MyPage/TermOfService/Term';
import MembershipInfo, {
  PAGE_NAME as MembershipInfoPageName,
} from '~pages/Membership/MembershipInfo';
import MembershipUsagedetails, {
  PAGE_NAME as MembershipUsagedetailsPageName,
} from '~pages/Membership/MembershipInfo/MembershipUsageDetails';
import MembershipIntro, {
  PAGE_NAME as MembershipIntroPageName,
} from '~pages/Membership/MembershipIntro';
import MembershipJoin, {
  PAGE_NAME as MembershipJoinPageName,
} from '~pages/Membership/MembershipJoin';
import MembershipJoinComplate, {
  PAGE_NAME as MembershipJoinComplatePageName,
} from '~pages/Membership/MembershipJoin/MembershipJoinComplate';
import MembershipJoinPayments, {
  PAGE_NAME as MembershipJoinPaymentsPageName,
} from '~pages/Membership/MembershipJoin/MembershipJoinPayments';
import MemebershipPaymentManage, {
  PAGE_NAME as MemebershipPaymentManagePageName,
} from '~pages/Membership/MembershipJoin/MemebershipPaymentManage';
import MembershipTerminate, {
  PAGE_NAME as MembershipTerminatePageName,
} from '~pages/Membership/MembershipTerminate';
import MembershipTerminateComplate, {
  PAGE_NAME as MembershipTerminateComplatePageName,
} from '~pages/Membership/MembershipTerminate/MembershipTerminateComplate';

//import CloseIcon from '../../assets/icons/Group/close.svg';
import BnbScreen, {SCREEN_NAME as BnbScreenName} from './Bnb';
import Notice, {SCREEN_NAME as NoticeScreenName} from './Notice';
import PaymentsManage, {
  SCREEN_NAME as PaymentsManageScreenName,
} from './PaymentsManage';
import PurchaseHistory, {
  SCREEN_NAME as PurchaseHistoryScreenName,
} from './PurchaseHistory';
import RegisterCard, {
  SCREEN_NAME as RegisterCardScreenName,
} from './RegisterCard';
import Review, {SCREEN_NAME as ReviewScreenName} from './Review';
import CreateReviewPage1, {
  SCREEN_NAME as CreateReviewPage1ScreenName,
} from './Review/CreateReview/Page1';
import CreateReviewPage2, {
  SCREEN_NAME as CreateReviewPage2ScreenName,
  SCREEN_NAME2 as EditReviewPage2ScreenName,
} from './Review/CreateReview/Page2';
import ReportReview, {
  PAGE_NAME as ReportReviewPageName,
} from './Review/ReportReview';
import {isLoginLoadingAtom} from '../../biz/useAuth/store';
import useBoard from '../../biz/useBoard';
import BackButton from '../../components/BackButton';
import Badge from '../../components/Badge';
import ShoppingCart from '../../components/BasketButton';
import CloseIcon from '../../components/CloseButton';
import CloseButton from '../../components/CloseButton';
import {
  DeleteIcon,
  NotifySettingIcon,
  SettingIcon,
} from '../../components/Icon';
import GroupCreateApartmnet, {
  PAGE_NAME as GroupCreateApartmentPageName,
} from '../../pages/Group/GroupApartment';
import ApartmentApplicationCheck, {
  PAGE_NAME as ApartmentApplicationCheckPageName,
} from '../../pages/Group/GroupApartment/ApartmentApplicationCheck';
import ApartMentApplicationDetail, {
  PAGE_NAME as ApartmentApplicationDetailPageName,
} from '../../pages/Group/GroupApartment/ApartmentApplicationCheck/Pages/DetailPage';
import ApartMentApplicationEtc, {
  PAGE_NAME as ApartmentApplicationEtcPageName,
} from '../../pages/Group/GroupApartment/ApartmentApplicationCheck/Pages/DetailPage/EtcPage';
import ApartMentApplicationReject, {
  PAGE_NAME as ApartmentApplicationRejectPageName,
} from '../../pages/Group/GroupApartment/ApartmentApplicationCheck/Pages/RejectPage';
import ApartmnetApplicitionFirst, {
  PAGE_NAME as ApartmentApplicationFirstPageName,
} from '../../pages/Group/GroupApartment/GroupApartmentApplication/FirstPage';
import ApartmnetApplicitionLast, {
  PAGE_NAME as ApartmentApplicationLastPageName,
} from '../../pages/Group/GroupApartment/GroupApartmentApplication/LastPage';
import ApartmnetApplicitionSecond, {
  PAGE_NAME as ApartmentApplicationSecondPageName,
} from '../../pages/Group/GroupApartment/GroupApartmentApplication/SecondPage';
import ApartmentApplicationPostCode, {
  PAGE_NAME as AprtmentApplicationPostcodePageName,
} from '../../pages/Group/GroupApartment/GroupApartmentApplication/SecondPage/Pages';
import ApartmnetApplicitionThird, {
  PAGE_NAME as ApartmentApplicationThirdPageName,
} from '../../pages/Group/GroupApartment/GroupApartmentApplication/ThirdPage';
import ApartmentApplicationInformation, {
  PAGE_NAME as ApartmentApplicationInformationPageName,
} from '../../pages/Group/GroupApartment/GroupApartmentApplication/ThirdPage/Pages';
import ApartmentSearch, {
  PAGE_NAME as ApartmentSearchPageName,
} from '../../pages/Group/GroupApartment/SearchApartment';
import ApartmentAdd, {
  PAGE_NAME as ApartmentAddPageName,
} from '../../pages/Group/GroupApartment/SearchApartment/AddApartment';
import ApartmentAddDetail, {
  PAGE_NAME as ApartmentAddDetailPageName,
} from '../../pages/Group/GroupApartment/SearchApartment/AddApartment/DetailAddress';
import ApartmentAddHo, {
  PAGE_NAME as ApartmentAddDetailHoPageName,
} from '../../pages/Group/GroupApartment/SearchApartment/AddApartment/DetailHo';
import GroupCreateCorporations, {
  PAGE_NAME as GroupCreateCorporationsPageName,
} from '../../pages/Group/GroupCorporations';
import CorporationApplicationDetail, {
  PAGE_NAME as CorporationApplicationDetailPageName,
} from '../../pages/Group/GroupCorporations/CorporationApplicationCheck/DetailPage';
import CorporationApplicationEtc, {
  PAGE_NAME as CorporationApplicationEtcPageName,
} from '../../pages/Group/GroupCorporations/CorporationApplicationCheck/DetailPage/EtcPage';
import CorporationApplicationReject, {
  PAGE_NAME as CorporationApplicationRejectPageName,
} from '../../pages/Group/GroupCorporations/CorporationApplicationCheck/RejectPage';
import CorporationApplicationFirst, {
  PAGE_NAME as CorporationtApplicationFirstPageName,
} from '../../pages/Group/GroupCorporations/CorporationsApplication/FirstPage';
import CorporationApplicitionFourth, {
  PAGE_NAME as CorporationApplicationFourthPageName,
} from '../../pages/Group/GroupCorporations/CorporationsApplication/FourthPage';
import CorporationApplicationSpot, {
  PAGE_NAME as CorporationApplicationSpotPageName,
} from '../../pages/Group/GroupCorporations/CorporationsApplication/FourthPage/Pages';
import CorporationApplicationSpotPostCode, {
  PAGE_NAME as CorporationApplicationSpotPostCodePageName,
} from '../../pages/Group/GroupCorporations/CorporationsApplication/FourthPage/Pages/map';
import CorporationApplicitionLast, {
  PAGE_NAME as CorporationApplicationLastPageName,
} from '../../pages/Group/GroupCorporations/CorporationsApplication/LastPage';
import CorporationApplicationSecond, {
  PAGE_NAME as CorporationtApplicationSecondPageName,
} from '../../pages/Group/GroupCorporations/CorporationsApplication/SecondPage';
import CorporationApplicationPostCode, {
  PAGE_NAME as CorporationApplicationPostcodePageName,
} from '../../pages/Group/GroupCorporations/CorporationsApplication/SecondPage/Pages';
import CorporationApplicitionThird, {
  PAGE_NAME as CorporationApplicationThirdPageName,
} from '../../pages/Group/GroupCorporations/CorporationsApplication/ThirdPage';
import CorporaionApplicationMealInformation, {
  PAGE_NAME as CorporationApplicationInformationMealPageName,
} from '../../pages/Group/GroupCorporations/CorporationsApplication/ThirdPage/Pages';
import GroupCreate, {
  PAGE_NAME as GroupCreateMainPageName,
} from '../../pages/Group/GroupCreate';
import GroupCreateComplete, {
  PAGE_NAME as GroupCreateCompletePageName,
} from '../../pages/Group/GroupCreate/CreateComplete';
import GroupManage, {
  PAGE_NAME as GroupManagePageName,
} from '../../pages/Group/GroupManage';
import GroupManageDetail, {
  PAGE_NAME as GroupManageDetailPageName,
} from '../../pages/Group/GroupManage/DetailPage';
import BuyMeal, {
  PAGE_NAME as BuyMealPageName,
} from '../../pages/Main/Bnb/BuyMeal/Main';
import MealCart, {
  PAGE_NAME as MealCartPageName,
} from '../../pages/Main/Bnb/MealCart/Main';
import MealDetail, {
  PAGE_NAME as MealDetailPageName,
} from '../../pages/Main/Bnb/MealDetail/Main';
import MealDetailInformation, {
  PAGE_NAME as MealInformationPageName,
} from '../../pages/Main/Bnb/MealDetail/Page';
import DefaultPaymentManage, {
  PAGE_NAME as DefaultPaymentManagePageName,
} from '../../pages/Main/Bnb/Payment/DefaultPaymentManage';
import Payment, {
  PAGE_NAME as PaymentPageName,
} from '../../pages/Main/Bnb/Payment/Main';
import MealPayment, {
  PAGE_NAME as MealPaymentPageName,
} from '../../pages/Main/Bnb/Payment/MealPayment';
import CompanyInfo, {
  PAGE_NAME as CompanyInfoPageName,
} from '../../pages/Main/MyPage/CompanyInfo';
import Credit, {
  PAGE_NAME as CreditPageName,
} from '../../pages/Main/MyPage/Credit';

// 리뷰
import CreateReviewPage1, {
  SCREEN_NAME as CreateReviewPage1ScreenName,
} from './Review/CreateReview/Page1';
import CreateReviewPage2, {
  SCREEN_NAME as CreateReviewPage2ScreenName,
  SCREEN_NAME2 as EditReviewPage2ScreenName,
} from './Review/CreateReview/Page2';

import Review, {SCREEN_NAME as ReviewScreenName} from './Review';

import ReportReview, {
  PAGE_NAME as ReportReviewPageName,
} from './Review/ReportReview';

import {PAGE_NAME as ReviewPageName} from '../../pages/Main/MyPage/Review';
import {PAGE_NAME as WrittenReviewPageName} from '../../pages/Main/MyPage/WrittenReview';
// 식단 리포트

import DietRepoMain, {
  PAGE_NAME as DietRepoMainPageName,
} from '../../pages/Main/Bnb/DietRepo/Main';
import DietRepoHistory, {
  PAGE_NAME as DietRepoHistoryPageName,
} from '../../pages/Main/Bnb/DietRepo/History';
import DietRepoAddDiet, {
  PAGE_NAME as DietRepoAddDietPageName,
} from '../../pages/Main/Bnb/DietRepo/AddDiet';
import DietRepoAddMyDiet, {
  PAGE_NAME as DietRepoAddMyDietPageName,
} from '../../pages/Main/Bnb/DietRepo/AddMyDiet';

// 리뷰 및 재신 개인
import {
  FAQListDetailPage,
  FAQListDetailPageName,
} from '../../pages/Main/MyPage/FAQ/FAQListDetailPage';
import NoticeDetail, {
  PAGE_NAME as NoticeDetailPageName,
} from '../../pages/Main/MyPage/Notice/NoticeDetail';
import PayCheckPassword, {
  PAGE_NAME as PayCheckPasswordPageName,
} from '../../pages/Main/MyPage/PersonalInfo/pages/PayCheckPassword';
import PayCheckPasswordCheck, {
  PAGE_NAME as PayCheckPasswordCheckPageName,
} from '../../pages/Main/MyPage/PersonalInfo/pages/PayCheckPasswordCheck';
import PayCheckEmail, {
  PAGE_NAME as PayCheckEmailPageName,
} from '../../pages/Main/MyPage/PersonalInfo/pages/PayCheckPasswordEmail';
import PayCheckPasswordPay, {
  PAGE_NAME as PayCheckPasswordPayPageName,
} from '../../pages/Main/MyPage/PersonalInfo/pages/PayCheckPasswordPay';
import PayEmailSetting, {
  PAGE_NAME as PayEmailSettingPageName,
} from '../../pages/Main/MyPage/PersonalInfo/pages/PayEmailSetting';
import RePayCheckPassword, {
  PAGE_NAME as RePayCheckPasswordPageName,
} from '../../pages/Main/MyPage/PersonalInfo/pages/RePayCheckPassword';
import RePayCheckPasswordCheck, {
  PAGE_NAME as RePayCheckPasswordCheckPageName,
} from '../../pages/Main/MyPage/PersonalInfo/pages/RePayCheckPasswordCheck';
import RePayCheckEmail, {
  PAGE_NAME as RePayCheckEmailPageName,
} from '../../pages/Main/MyPage/PersonalInfo/pages/RePayCheckPasswordEmail';
import {PointMainPage, PointMainPageName} from '../../pages/Main/MyPage/Point';
import {
  PurchaseDetailPage,
  PurchaseDetailPageName,
} from '../../pages/Main/MyPage/PurchaseHistory/Detail';
import {PAGE_NAME as ReviewPageName} from '../../pages/Main/MyPage/Review';
import ReviewCloseIcon from '../../pages/Main/MyPage/Review/Component/ReviewCloseIcon';
import {PAGE_NAME as WrittenReviewPageName} from '../../pages/Main/MyPage/WrittenReview';
import NotificationCenter, {
  PAGE_NAME as NotificationCenterName,
} from '../../pages/NotificationCenter';
import SplashPage, {PAGE_NAME as SplashPageName} from '../../pages/Splash';

// map
import SpotType, {PAGE_NAME as SpotTypePage} from '../../pages/Spots/SpotType';
import MySpotMap, {PAGE_NAME as MySpotMapPage} from '../../pages/Map/MySpotMap';
import ShareSpotMap, {
  PAGE_NAME as ShareSpotMapPage,
} from '../../pages/Map/ShareSpotMap';
import SearchResult, {
  PAGE_NAME as MapSearchResult,
} from '../../pages/Map/SearchResult';
import MySpotDetail, {
  PAGE_NAME as MySpotDetailPage,
} from '../../pages/Spots/mySpot/DetailAddress';
import NotDelivery, {
  PAGE_NAME as NotDeliveryPage,
} from '../../pages/Spots/mySpot/NotDelivery';
import Complete, {
  PAGE_NAME as CompletePage,
} from '../../pages/Spots/components/Complete';
import PrivateInfo, {
  PAGE_NAME as PrivateInfoPage,
} from '../../pages/Spots/privateSpot/PrivateInfo';
import ApplySpot, {
  PAGE_NAME as ApplySpotPage,
} from '../../pages/Spots/shareSpot/ApplySpot';
import ShareSpotList, {
  PAGE_NAME as ShareSpotListPage,
} from '../../pages/Spots/shareSpot/ShareSpotList';
import RegisterSpotMap, {
  PAGE_NAME as RegisterSpotMapPage,
} from '../../pages/Map/RegisterSpotMap';
import SpotGuide, {
  PAGE_NAME as SpotGuidePage,
} from '../../pages/Spots/spotGuide/SpotGuide';
import InviteSpot, {
  PAGE_NAME as InviteSpotPage,
} from '../../pages/Spots/spotGuide/InviteSpot';
import MySpotDelivery, {
  PAGE_NAME as MySpotDeliveryPage,
} from '../../pages/Spots/mySpot/Delivery';

const MainRoot = createNativeStackNavigator();

const Screen = () => {
  const [isLoginLoading] = useAtom(isLoginLoadingAtom);
  const {deleteAlarm} = useBoard();
  const navigation = useNavigation();
  return (
    <MainRoot.Navigator initialRouteName={SplashPageName}>
      <MainRoot.Group screenOptions={{presentation: 'fullScreenModal'}}>
        <MainRoot.Screen
          name={LoginMainModalPageName}
          component={LoginMainModal}
          options={{
            headerLeft: () => <BackButton mode="modal" />,
            headerShown: true,
            headerShadowVisible: false,
            headerTransparent: true,
            title: '',
          }}
        />
        <MainRoot.Screen
          name={SignUpPageName}
          component={SignUp}
          options={{
            headerShown: true,
            headerShadowVisible: false,
            title: '회원가입',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
            // headerLeft: () => <BackButton margin={[10, 0]} />,
            headerLeft: () => <CloseIcon margin={[10, 0]} />,
          }}
        />
        <MainRoot.Screen
          name={AppleSignupPageName}
          component={AppleSignup}
          options={{
            headerShown: true,
            headerShadowVisible: false,
            title: '회원가입',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
            headerLeft: () => <BackButton margin={[10, 0]} />,
          }}
        />
        <MainRoot.Screen
          name={SignUpComplatePageName}
          component={SignUpComplate}
          options={{
            headerShown: true,
            headerShadowVisible: false,
            title: '회원가입',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
            headerLeft: () => <BackButton margin={[10, 0]} />,
          }}
        />
        <MainRoot.Screen
          name={FindUserPageName}
          component={FindUser}
          options={{
            headerShown: true,
            headerShadowVisible: false,
            title: '아이디/비밀번호 찾기',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
            headerLeft: () => <BackButton margin={[10, 0]} />,
          }}
        />
        <MainRoot.Screen
          name={FindIdPageName}
          component={FindId}
          options={{
            headerShown: true,
            headerShadowVisible: false,
            title: '아이디/비밀번호 찾기',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
            headerLeft: () => <BackButton margin={[10, 0]} />,
          }}
        />
        <MainRoot.Screen
          name={FindIdComplatePageName}
          component={FindIdComplate}
          options={{
            headerShown: true,
            headerShadowVisible: false,
            title: '아이디/비밀번호 찾기',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
            headerLeft: () => <BackButton margin={[10, 0]} />,
          }}
        />
        <MainRoot.Screen
          name={FindPasswordPageName}
          component={FindPassword}
          options={{
            headerShown: true,
            headerShadowVisible: false,
            title: '아이디/비밀번호 찾기',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
            headerLeft: () => <BackButton margin={[10, 0]} />,
          }}
        />
        <MainRoot.Screen
          name={ChagePasswordPageName}
          component={ChagePassword}
          options={{
            headerShown: true,
            headerShadowVisible: false,
            title: '아이디/비밀번호 찾기',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
            headerLeft: () => <BackButton margin={[10, 0]} />,
          }}
        />

        <MainRoot.Screen
          name={EmailLoginModalModalPageName}
          component={EmailLoginModal}
          options={{
            headerShown: true,
            headerShadowVisible: false,
            title: '',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
            headerLeft: () => <BackButton margin={[10, 0]} />,
          }}
        />
      </MainRoot.Group>
      {/* BNB */}
      <MainRoot.Group>
        <MainRoot.Screen
          name={BnbScreenName}
          component={BnbScreen}
          options={{headerShown: false}}
        />
      </MainRoot.Group>
      <MainRoot.Group>
        <MainRoot.Screen
          name={SplashPageName}
          component={SplashPage}
          options={{headerShown: false}}
        />
      </MainRoot.Group>
      {/* 카드 등록 */}
      <MainRoot.Group>
        <MainRoot.Screen
          name={RegisterCardScreenName}
          component={RegisterCard}
          options={{
            headerShown: true,
            title: '카드 등록',
            headerTitleAlign: 'center',
            headerShadowVisible: false,
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
            headerLeft: () => <BackButton margin={[10, 0]} />,
          }}
        />
      </MainRoot.Group>
      <MainRoot.Group>
        <MainRoot.Screen
          name={PayCheckPasswordPageName}
          component={PayCheckPassword}
          options={{
            headerShown: true,
            title: '결제 비밀번호 설정',
            headerTitleAlign: 'center',
            headerShadowVisible: false,
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
            headerLeft: () => <BackButton margin={[10, 0]} />,
          }}
        />
      </MainRoot.Group>
      <MainRoot.Group>
        <MainRoot.Screen
          name={PayEmailSettingPageName}
          component={PayEmailSetting}
          options={{
            headerShown: true,
            title: '이메일/비밀번호 설정',
            headerTitleAlign: 'center',
            headerShadowVisible: false,
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
            headerLeft: () => <BackButton margin={[10, 0]} />,
          }}
        />
      </MainRoot.Group>
      <MainRoot.Group>
        <MainRoot.Screen
          name={PayCheckPasswordCheckPageName}
          component={PayCheckPasswordCheck}
          options={{
            headerShown: true,
            title: '결제 비밀번호 설정',
            headerTitleAlign: 'center',
            headerShadowVisible: false,
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
            headerLeft: () => <BackButton margin={[10, 0]} />,
          }}
        />
      </MainRoot.Group>
      <MainRoot.Group>
        <MainRoot.Screen
          name={PayCheckEmailPageName}
          component={PayCheckEmail}
          options={{
            headerShown: true,
            title: '이메일 인증',
            headerTitleAlign: 'center',
            headerShadowVisible: false,
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
            headerLeft: () => <BackButton margin={[10, 0]} />,
          }}
        />
      </MainRoot.Group>
      <MainRoot.Group>
        <MainRoot.Screen
          name={RePayCheckPasswordPageName}
          component={RePayCheckPassword}
          options={{
            headerShown: true,
            title: '결제 비밀번호 설정',
            headerTitleAlign: 'center',
            headerShadowVisible: false,
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
            headerLeft: () => <BackButton margin={[10, 0]} />,
          }}
        />
      </MainRoot.Group>

      <MainRoot.Group>
        <MainRoot.Screen
          name={RePayCheckPasswordCheckPageName}
          component={RePayCheckPasswordCheck}
          options={{
            headerShown: true,
            title: '결제 비밀번호 설정',
            headerTitleAlign: 'center',
            headerShadowVisible: false,
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
            headerLeft: () => <BackButton margin={[10, 0]} />,
          }}
        />
      </MainRoot.Group>
      <MainRoot.Group>
        <MainRoot.Screen
          name={RePayCheckEmailPageName}
          component={RePayCheckEmail}
          options={{
            headerShown: true,
            title: '결제 비밀번호 재설정',
            headerTitleAlign: 'center',
            headerShadowVisible: false,
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
            headerLeft: () => <BackButton margin={[10, 0]} />,
          }}
        />
      </MainRoot.Group>
      <MainRoot.Group>
        <MainRoot.Screen
          name={PayCheckPasswordPayPageName}
          component={PayCheckPasswordPay}
          options={{
            headerShown: true,
            title: '결제 비밀번호 입력',
            headerTitleAlign: 'center',
            headerShadowVisible: false,
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
            headerLeft: () => <BackButton margin={[10, 0]} />,
          }}
        />
      </MainRoot.Group>
      {/* 결제수단 관리 */}
      <MainRoot.Group>
        <MainRoot.Screen
          name={PaymentsManageScreenName}
          component={PaymentsManage}
          options={{
            headerShown: true,
            title: '결제수단 관리',
            headerTitleAlign: 'center',
            headerShadowVisible: false,
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
            headerLeft: () => <BackButton margin={[10, 0]} />,
          }}
        />
      </MainRoot.Group>

      {/* 구매 내역 */}
      <MainRoot.Group>
        <MainRoot.Screen
          name={PurchaseHistoryScreenName}
          component={PurchaseHistory}
          options={{
            headerShown: true,
            title: '구매내역',
            headerTitleAlign: 'center',
            headerShadowVisible: false,
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
            headerLeft: () => <BackButton margin={[10, 0]} />,
          }}
        />
        <MainRoot.Screen
          name={PurchaseDetailPageName}
          component={PurchaseDetailPage}
          options={{
            headerShown: true,
            title: '상세정보',
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
            headerLeft: () => <BackButton mode="modal" />,
          }}
        />
      </MainRoot.Group>
      {/* 공지사항 */}
      <MainRoot.Group>
        <MainRoot.Screen
          name={NoticeScreenName}
          component={Notice}
          options={{
            headerShown: true,
            title: '공지사항',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
            headerShadowVisible: false,
            headerLeft: () => <BackButton margin={[10, 0]} />,
          }}
        />
        <MainRoot.Screen
          name={NoticeDetailPageName}
          component={NoticeDetail}
          options={{
            headerShown: true,
            title: '공지사항',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
            headerShadowVisible: false,
            headerLeft: () => <BackButton margin={[10, 0]} />,
          }}
        />
      </MainRoot.Group>
      {/* 알림센터 */}
      <MainRoot.Group>
        <MainRoot.Screen
          name={NotificationCenterName}
          component={NotificationCenter}
          options={{
            headerShown: true,
            title: '알림 센터',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
            headerShadowVisible: false,
            headerLeft: () => <BackButton margin={[10, 0]} />,
            headerRight: () => (
              <>
                <DeleteTxt
                  style={{marginRight: 4}}
                  onPress={() => {
                    Alert.alert('알림 삭제', '모든 알림을 삭제하시겠어요?', [
                      {
                        text: '취소',
                        onPress: () => console.log('cancel pressed'),
                        style: 'destructive',
                      },
                      {
                        text: '삭제',
                        onPress: () => {
                          try {
                            deleteAlarm();
                          } catch (err) {
                            console.log(err);
                          }
                        },
                      },
                    ]);
                  }}>
                  <DeleteIcon />
                </DeleteTxt>
                <DeleteTxt>
                  <NotifySettingIcon
                    onPressEvent={async () => {
                      await checkNotifications().then(async ({status}) => {
                        if (status !== RESULTS.GRANTED) {
                          if (
                            status === RESULTS.BLOCKED ||
                            status === RESULTS.DENIED
                          ) {
                            Alert.alert(
                              '알림 권한 설정',
                              '알림을 설정 하기 위해서는 권한 설정이 필요합니다.',
                              [
                                {
                                  text: '확인',
                                  onPress: () => {
                                    openSettings().catch(() =>
                                      console.warn('알림설정 화면 이동 오류'),
                                    );
                                  },
                                  style: 'cancel',
                                },
                                {
                                  text: '취소',
                                  onPress: () => {},
                                  style: 'cancel',
                                },
                              ],
                            );
                          } else {
                            await requestNotifications([
                              'alert',
                              'badge',
                              'sound',
                              'providesAppSettings',
                            ]).then(({status, settings}) => {
                              if (status === RESULTS.BLOCKED) {
                                console.log(settings, 'notificationCenter');
                                // openSettings().catch(() => console.warn('cannot open settings'));
                              }
                            });
                          }
                        } else {
                          navigation.navigate(NotificationSettingPageName);
                        }
                      });
                    }}
                  />
                </DeleteTxt>
              </>
            ),
          }}
        />
      </MainRoot.Group>
      {/* 식사구매 */}
      <MainRoot.Group>
        <MainRoot.Screen
          name={BuyMealPageName}
          component={BuyMeal}
          options={{
            headerShown: true,
            title: '식사 구매하기',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
            headerShadowVisible: false,
            headerLeft: () => <BackButton margin={[10, 0]} />,
            headerRight: () => (
              <>
                <ShoppingCart margin={[0, 10]} />
                <Badge />
              </>
            ),
          }}
        />
      </MainRoot.Group>
      {/* 상세페이지 */}
      <MainRoot.Group>
        <MainRoot.Screen
          name={MealDetailPageName}
          component={MealDetail}
          options={{
            headerShown: true,

            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
            headerShadowVisible: false,
            // headerLeft: () => <BackButton margin={[10,0]}/>,
            // headerRight: () => <ShoppingCart/>
          }}
        />
      </MainRoot.Group>
      {/* 상세페이지-알레르기정보 */}
      <MainRoot.Group>
        <MainRoot.Screen
          name={MealInformationPageName}
          component={MealDetailInformation}
          options={{
            headerShown: true,
            title: '알레르기/원산지 정보',
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
            headerLeft: () => <BackButton margin={[10, 0]} />,
          }}
        />
      </MainRoot.Group>
      {/* 장바구니 */}
      <MainRoot.Group>
        <MainRoot.Screen
          name={MealCartPageName}
          component={MealCart}
          options={{
            headerShown: true,
            title: '장바구니',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
            headerShadowVisible: false,

            headerLeft: () => <BackButton margin={[10, 0]} />,
          }}
        />
      </MainRoot.Group>
      {/* 결제페이지 */}
      <MainRoot.Group>
        <MainRoot.Screen
          name={PaymentPageName}
          component={Payment}
          options={{
            headerShown: true,
            title: '주문',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerLeft: () => <BackButton margin={[10, 0]} />,
          }}
        />
        <MainRoot.Screen
          name={MealPaymentPageName}
          component={MealPayment}
          options={{
            headerShown: false,
            title: '결제',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerLeft: () => <BackButton margin={[10, 0]} />,
          }}
        />
        <MainRoot.Screen
          name={DefaultPaymentManagePageName}
          component={DefaultPaymentManage}
          options={{
            headerShown: true,
            title: '기본 결제수단',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerLeft: () => <BackButton margin={[10, 0]} />,
          }}
        />
      </MainRoot.Group>
      {/* MYPAGE */}
      <MainRoot.Group>
        <MainRoot.Screen
          name={TermOfServicePageName}
          component={TermOfService}
          options={{
            headerShown: true,
            title: '약관 및 개인 정보',
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
            headerLeft: () => <BackButton margin={[10, 0]} />,
          }}
        />
        <MainRoot.Screen
          name={ReviewScreenName}
          component={Review}
          options={{
            headerShown: true,
            title: '리뷰 관리',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
            headerShadowVisible: false,
            headerLeft: () => <BackButton margin={[10, 0]} />,
          }}
        />

        <MainRoot.Screen
          name={TermPageName}
          component={Term}
          options={{
            headerShown: true,
            title: '이용 약관',
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 21,
            },
            headerLeft: () => <BackButton margin={[10, 0]} />,
          }}
        />
        <MainRoot.Screen
          name={PrivacyPageName}
          component={Privacy}
          options={{
            headerShown: true,
            title: '개인 정보 수집 약관',
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 21,
            },
            headerLeft: () => <BackButton margin={[10, 0]} />,
          }}
        />
        <MainRoot.Screen
          name={FAQPageName}
          component={FAQ}
          options={{
            headerShown: true,
            title: '고객센터',
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 21,
            },
            headerLeft: () => <BackButton margin={[10, 0]} />,
          }}
        />

        <MainRoot.Screen
          name={CompanyInfoPageName}
          component={CompanyInfo}
          options={{
            headerShown: true,
            title: '회사 정보',
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 21,
            },
            headerLeft: () => <BackButton margin={[10, 0]} />,
          }}
        />
        <MainRoot.Screen
          name={CreditPageName}
          component={Credit}
          options={{
            headerShown: true,
            title: '크레딧',
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 21,
            },
            headerLeft: () => <CloseButton />,
          }}
        />
        <MainRoot.Screen
          name={FAQListPageName}
          component={FAQListPage}
          options={{
            headerShown: true,
            title: '',
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 21,
            },
            headerLeft: () => <BackButton margin={[10, 0]} />,
          }}
        />
        <MainRoot.Screen
          name={FAQListDetailPageName}
          component={FAQListDetailPage}
          options={{
            headerShown: true,
            title: '고객센터',
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 21,
            },
            headerLeft: () => <BackButton margin={[10, 0]} />,
          }}
        />
        <MainRoot.Screen
          name={PersonalInfoPageName}
          component={PersonalInfo}
          options={{
            headerShown: true,
            title: '개인 정보',
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
            headerLeft: () => <BackButton margin={[10, 0]} />,
          }}
        />
        <MainRoot.Screen
          name={ConnectedSNSPageName}
          component={ConnectedSNS}
          options={{
            headerShown: true,
            title: 'SNS 계정 연결',
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
            headerLeft: () => <BackButton margin={[10, 0]} />,
          }}
        />
        <MainRoot.Screen
          name={NotificationSettingPageName}
          component={NotificationSetting}
          options={{
            headerShown: true,
            title: '알림 설정',
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
            headerLeft: () => <BackButton margin={[10, 0]} />,
          }}
        />
        <MainRoot.Screen
          name={PhoneNumberSettingPageName}
          component={PhoneNumberSetting}
          options={{
            headerShown: true,
            title: '휴대폰 번호 변경',
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
            headerLeft: () => <BackButton margin={[10, 0]} />,
          }}
        />
        <MainRoot.Screen
          name={PasswordSettingPageName}
          component={PasswordSetting}
          options={{
            headerShown: true,
            title: '비밀번호 변경하기',
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
            headerLeft: () => <BackButton margin={[10, 0]} />,
          }}
        />
        <MainRoot.Screen
          name={EmailSettingPageName}
          component={EmailSetting}
          options={{
            headerShown: true,
            title: '이메일/비밀번호 설정',
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
            headerLeft: () => <BackButton margin={[10, 0]} />,
          }}
        />

        <MainRoot.Screen
          name={MarketingAgreePageName}
          component={MarketingAgree}
          options={{
            headerShown: true,
            title: '마케팅 정보 수신 동의',
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
            headerLeft: () => <BackButton margin={[10, 0]} />,
          }}
        />
      </MainRoot.Group>
      {/* MEMBERSHIP */}
      <MainRoot.Group>
        <MainRoot.Screen
          name={MembershipIntroPageName}
          component={MembershipIntro}
          options={{
            headerShown: true,
            title: '멤버십 가입',
            headerShadowVisible: false,
            // headerTransparent: true,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
            headerLeft: () => <BackButton margin={[10, 0]} />,
          }}
        />
        <MainRoot.Screen
          name={MembershipJoinPageName}
          component={MembershipJoin}
          options={{
            headerShown: true,
            title: '멤버십 가입',
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
            headerLeft: () => <BackButton margin={[10, 0]} />,
          }}
        />
        <MainRoot.Screen
          name={MembershipJoinPaymentsPageName}
          component={MembershipJoinPayments}
          options={{
            headerShown: true,
            title: '멤버십 가입',
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
            headerLeft: () => <BackButton margin={[10, 0]} />,
          }}
        />
        <MainRoot.Screen
          name={MembershipJoinComplatePageName}
          component={MembershipJoinComplate}
          options={{
            headerShown: true,
            title: '멤버십 가입',
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
            headerLeft: () => <BackButton margin={[10, 0]} />,
          }}
        />
        <MainRoot.Screen
          name={MembershipInfoPageName}
          component={MembershipInfo}
          options={{
            headerShown: true,
            title: '멤버십',
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
            headerLeft: () => <BackButton margin={[10, 0]} />,
          }}
        />
        <MainRoot.Screen
          name={MembershipUsagedetailsPageName}
          component={MembershipUsagedetails}
          options={{
            headerShown: true,
            title: '멤버십 이용내역',
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
            headerLeft: () => <BackButton margin={[10, 0]} />,
          }}
        />
        <MainRoot.Screen
          name={MemebershipPaymentManagePageName}
          component={MemebershipPaymentManage}
          options={{
            headerShown: true,
            title: '멤버십 결제수단',
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
            headerLeft: () => <BackButton margin={[10, 0]} />,
          }}
        />
        <MainRoot.Screen
          name={MembershipTerminatePageName}
          component={MembershipTerminate}
          options={{
            headerShown: true,
            title: '멤버십 해지',
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
            headerLeft: () => <BackButton margin={[10, 0]} />,
          }}
        />
        <MainRoot.Screen
          name={MembershipTerminateComplatePageName}
          component={MembershipTerminateComplate}
          options={{
            headerShown: true,
            title: '멤버십 해지',
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
            headerLeft: () => <BackButton margin={[10, 0]} />,
          }}
        />
      </MainRoot.Group>

      {/* LOGIN */}

      {/* 그룹/스팟 */}
      <MainRoot.Group>
        <MainRoot.Screen
          name={GroupCreateMainPageName}
          component={GroupCreate}
          options={{
            headerStyle: {
              backgroundColor: '#F5F5F5',
            },
            headerShown: true,
            headerShadowVisible: false,
            title: '',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
            headerLeft: () => <CloseIcon isSpot={true} />,
          }}
        />
        {/* 아파트 스팟 신청 */}
        <MainRoot.Screen
          name={GroupCreateApartmentPageName}
          component={GroupCreateApartmnet}
          options={{
            headerTransparent: true,
            headerShown: true,
            headerShadowVisible: false,
            title: '',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },

            headerLeft: () => <BackButton margin={[10, 0]} />,
          }}
        />
        <MainRoot.Screen
          name={ApartmentApplicationFirstPageName}
          component={ApartmnetApplicitionFirst}
          options={{
            headerShown: true,
            headerShadowVisible: false,
            title: '신청자 정보',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },

            // headerLeft: () => <BackButton margin={[10,0]}/>,
          }}
        />
        <MainRoot.Screen
          name={ApartmentApplicationSecondPageName}
          component={ApartmnetApplicitionSecond}
          options={{
            headerShown: true,
            headerShadowVisible: false,
            title: '기본 정보',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },

            headerLeft: () => <BackButton margin={[10, 0]} />,
          }}
        />
        <MainRoot.Screen
          name={ApartmentApplicationThirdPageName}
          component={ApartmnetApplicitionThird}
          options={{
            headerShown: true,
            headerShadowVisible: false,
            title: '기본 정보',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },

            headerLeft: () => <BackButton margin={[10, 0]} />,
          }}
        />
        <MainRoot.Screen
          name={ApartmentApplicationLastPageName}
          component={ApartmnetApplicitionLast}
          options={{
            headerShown: true,
            headerShadowVisible: false,
            title: '기타옵션',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },

            headerLeft: () => <BackButton margin={[10, 0]} />,
          }}
        />
        <MainRoot.Screen
          name={ApartmentApplicationInformationPageName}
          component={ApartmentApplicationInformation}
          options={{
            headerShown: true,
            headerShadowVisible: false,
            title: '아침 식사 정보',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },

            headerLeft: () => <CloseIcon />,
          }}
        />
        <MainRoot.Screen
          name={AprtmentApplicationPostcodePageName}
          component={ApartmentApplicationPostCode}
          options={{
            headerShown: true,
            headerShadowVisible: false,
            title: '주소 검색',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },

            headerLeft: () => <BackButton margin={[10, 0]} />,
          }}
        />

        <MainRoot.Screen
          name={ApartmentApplicationRejectPageName}
          component={ApartMentApplicationReject}
          options={{
            headerShown: true,
            headerShadowVisible: false,
            title: '',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },

            headerLeft: () => <CloseIcon margin={[10, 0]} />,
          }}
        />
        <MainRoot.Screen
          name={ApartmentApplicationDetailPageName}
          component={ApartMentApplicationDetail}
          options={{
            headerShown: true,
            headerShadowVisible: false,
            title: '신청 정보',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },

            headerLeft: () => <BackButton margin={[10, 0]} />,
          }}
        />
        <MainRoot.Screen
          name={ApartmentApplicationEtcPageName}
          component={ApartMentApplicationEtc}
          options={{
            headerShown: true,
            headerShadowVisible: false,
            title: '',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },

            headerLeft: () => <BackButton margin={[10, 0]} />,
          }}
        />
        <MainRoot.Screen
          name={GroupCreateCompletePageName}
          component={GroupCreateComplete}
          options={{
            headerShown: false,
            headerShadowVisible: false,
            title: '',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },

            headerLeft: () => <BackButton margin={[10, 0]} />,
          }}
        />
        <MainRoot.Screen
          name={ApartmentSearchPageName}
          component={ApartmentSearch}
          options={{
            headerShown: true,
            headerShadowVisible: false,
            title: '스팟 찾기',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },

            headerLeft: () => <BackButton margin={[10, 0]} />,
          }}
        />
      </MainRoot.Group>
      {/* 프라이빗 스팟 스팟 신청 */}
      <MainRoot.Group>
        <MainRoot.Screen
          name={GroupCreateCorporationsPageName}
          component={GroupCreateCorporations}
          options={{
            headerTransparent: true,
            headerShown: true,
            headerShadowVisible: false,
            title: '',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },

            headerLeft: () => <BackButton margin={[10, 0]} />,
          }}
        />
        <MainRoot.Screen
          name={CorporationtApplicationFirstPageName}
          component={CorporationApplicationFirst}
          options={{
            headerShown: true,
            headerShadowVisible: false,
            title: '담당자 정보',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },

            headerLeft: () => <BackButton margin={[10, 0]} />,
          }}
        />
        <MainRoot.Screen
          name={CorporationtApplicationSecondPageName}
          component={CorporationApplicationSecond}
          options={{
            headerShown: true,
            headerShadowVisible: false,
            title: '기본 정보',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },

            headerLeft: () => <BackButton margin={[10, 0]} />,
          }}
        />
        <MainRoot.Screen
          name={CorporationApplicationPostcodePageName}
          component={CorporationApplicationPostCode}
          options={{
            headerShown: true,
            headerShadowVisible: false,
            title: '',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },

            headerLeft: () => <BackButton margin={[10, 0]} />,
          }}
        />
        <MainRoot.Screen
          name={CorporationApplicationThirdPageName}
          component={CorporationApplicitionThird}
          options={{
            headerShown: true,
            headerShadowVisible: false,
            title: '식사 정보',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
            headerLeft: () => <BackButton margin={[10, 0]} />,
          }}
        />
        <MainRoot.Screen
          name={CorporationApplicationInformationMealPageName}
          component={CorporaionApplicationMealInformation}
          options={{
            headerShown: true,
            headerShadowVisible: false,
            title: '',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
            // headerLeft: () => <BackButton margin={[10,0]}/>
          }}
        />
        <MainRoot.Screen
          name={CorporationApplicationFourthPageName}
          component={CorporationApplicitionFourth}
          options={{
            headerShown: true,
            headerShadowVisible: false,
            title: '스팟 정보 등록',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
            headerLeft: () => <BackButton margin={[10, 0]} />,
          }}
        />
        <MainRoot.Screen
          name={CorporationApplicationSpotPageName}
          component={CorporationApplicationSpot}
          options={{
            headerShown: true,
            headerShadowVisible: false,
            title: '스팟 생성',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
            headerLeft: () => <CloseIcon margin={[10, 0]} />,
          }}
        />
        <MainRoot.Screen
          name={CorporationApplicationSpotPostCodePageName}
          component={CorporationApplicationSpotPostCode}
          options={{
            headerShown: true,
            headerShadowVisible: false,
            title: '주소 검색',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
            headerLeft: () => <CloseIcon margin={[10, 0]} />,
          }}
        />
        <MainRoot.Screen
          name={CorporationApplicationLastPageName}
          component={CorporationApplicitionLast}
          options={{
            headerShown: true,
            headerShadowVisible: false,
            title: '기타 옵션',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
            headerLeft: () => <BackButton margin={[10, 0]} />,
          }}
        />

        <MainRoot.Screen
          name={CorporationApplicationDetailPageName}
          component={CorporationApplicationDetail}
          options={{
            headerShown: true,
            headerShadowVisible: false,
            title: '신청 정보',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },

            headerLeft: () => <BackButton margin={[10, 0]} />,
          }}
        />
        <MainRoot.Screen
          name={CorporationApplicationRejectPageName}
          component={CorporationApplicationReject}
          options={{
            headerShown: true,
            headerShadowVisible: false,
            title: '',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },

            headerLeft: () => <CloseIcon margin={[10, 0]} />,
          }}
        />
        <MainRoot.Screen
          name={ApartmentApplicationCheckPageName}
          component={ApartmentApplicationCheck}
          options={{
            headerShown: true,
            headerShadowVisible: false,
            title: '스팟 신청 내역',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },

            headerLeft: () => <CloseIcon margin={[10, 0]} />,
          }}
        />
        <MainRoot.Screen
          name={CorporationApplicationEtcPageName}
          component={CorporationApplicationEtc}
          options={{
            headerShown: true,
            headerShadowVisible: false,
            title: '',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },

            headerLeft: () => <BackButton margin={[10, 0]} />,
          }}
        />
      </MainRoot.Group>
      {/* 그룹/스팟 관리 */}
      <MainRoot.Group>
        <MainRoot.Screen
          name={GroupManagePageName}
          component={GroupManage}
          options={{
            headerShown: false,
            headerShadowVisible: false,
            title: '내스팟',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },

            headerLeft: () => <CloseIcon margin={[10, 0]} />,
          }}
        />
        <MainRoot.Screen
          name={GroupManageDetailPageName}
          component={GroupManageDetail}
          options={{
            headerShown: true,
            headerShadowVisible: false,
            title: '스팟 관리',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },

            // headerLeft: () => {
            //   <Pressable onPress={()=>navigation.navigate(SCREEN_NAME)}>
            //     <CloseIcon />
            // </Pressable>
            // },
          }}
        />
        <MainRoot.Screen
          name={ApartmentAddPageName}
          component={ApartmentAdd}
          options={{
            headerShown: true,
            headerShadowVisible: false,
            title: '',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
            headerLeft: () => <BackButton margin={[10, 0]} />,
          }}
        />
        <MainRoot.Screen
          name={ApartmentAddDetailPageName}
          component={ApartmentAddDetail}
          options={{
            headerShown: true,
            headerShadowVisible: false,
            title: '세부 주소',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
            headerLeft: () => <BackButton margin={[10, 0]} />,
          }}
        />
        <MainRoot.Screen
          name={ApartmentAddDetailHoPageName}
          component={ApartmentAddHo}
          options={{
            headerShown: true,
            headerShadowVisible: false,
            title: '상세 배송지',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
            headerLeft: () => <BackButton margin={[10, 0]} />,
          }}
        />
      </MainRoot.Group>

      {/* 리뷰작성 및 수정 */}

      <MainRoot.Group>
        <MainRoot.Screen
          name={CreateReviewPage1ScreenName}
          component={CreateReviewPage1}
          options={{
            headerShown: true,
            title: '리뷰 작성',

            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
            headerShadowVisible: false,
            headerLeft: () => <ReviewCloseIcon />,
          }}
        />

        <MainRoot.Screen
          name={PointMainPageName}
          component={PointMainPage}
          options={{
            headerShown: true,
            headerShadowVisible: false,
            title: '포인트',

            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
            headerShadowVisible: false,

            headerLeft: () => <BackButton margin={[10, 0]} />,
          }}
        />

        <MainRoot.Screen
          name={CreateReviewPage2ScreenName}
          component={CreateReviewPage2}
          options={{
            headerShown: true,
            title: '리뷰 작성',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
            headerShadowVisible: false,
            headerLeft: () => (
              <ReviewCloseIcon
                alertCallback={() => {
                  Alert.alert(
                    `작성 종료`,
                    `작성중인 내용이 삭제됩니다 \n리뷰작성을 종료하시겠어요?`,
                    [
                      {
                        text: '아니요',
                        onPress: () => {
                          return;
                        },
                        style: 'cancel',
                      },
                      {
                        text: `작성종료`,
                        onPress: () => {
                          navigation.pop(2);
                          return;
                        },

                        style: 'destructive',
                      },
                    ],
                  );
                }}
              />
            ),
          }}
        />

        <MainRoot.Screen
          name={EditReviewPage2ScreenName}
          component={CreateReviewPage2}
          options={{
            headerShown: true,
            title: '리뷰 수정',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
            headerShadowVisible: false,
            headerLeft: () => (
              <ReviewCloseIcon
                alertCallback={() => {
                  Alert.alert(
                    '수정 종료',
                    '수정중인 내용이 삭제됩니다 \n수정작성을 종료하시겠어요?',
                    [
                      {
                        text: '아니요',
                        onPress: () => {
                          return;
                        },
                        style: 'cancel',
                      },
                      {
                        text: '수정종료',
                        onPress: () => {
                          navigation.navigate(WrittenReviewPageName, {
                            screen: ReviewScreenName,
                            params: {
                              tabIndex: 1,
                            },
                          });

                          return;
                        },

                        style: 'destructive',
                      },
                    ],
                  );
                }}
              />
            ),
          }}
        />
      </MainRoot.Group>

      {/* 리뷰 신고  */}

      <MainRoot.Group>
        <MainRoot.Screen
          name={ReportReviewPageName}
          component={ReportReview}
          options={{
            headerShown: true,
            title: '신고하기',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
            headerShadowVisible: false,
            headerLeft: () => <ReviewCloseIcon />,
          }}
        />
      </MainRoot.Group>

      {/* 식단 리포트 */}

      <MainRoot.Group>
        <MainRoot.Screen
          name={DietRepoMainPageName}
          component={DietRepoMain}
          options={{
            headerShown: true,
            title: '식단 리포트',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
            headerShadowVisible: false,
            headerLeft: () => <BackButton />,
          }}
        />
        <MainRoot.Screen
          name={DietRepoHistoryPageName}
          component={DietRepoHistory}
          options={{
            headerShown: true,
            title: '식사 히스토리',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
            headerShadowVisible: false,
            headerLeft: () => <BackButton />,
          }}
        />
        <MainRoot.Screen
          name={DietRepoAddDietPageName}
          component={DietRepoAddDiet}
          options={{
            headerShown: true,
            title: '식사 추가',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
            headerShadowVisible: false,
            headerLeft: () => <BackButton />,
          }}
        />
        <MainRoot.Screen
          name={DietRepoAddMyDietPageName}
          component={DietRepoAddMyDiet}
          options={{
            headerShown: true,
            title: '내 음식 추가',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
            headerShadowVisible: false,
            headerLeft: () => <BackButton />,
          }}
        />
      </MainRoot.Group>

      <MainRoot.Group>
        <MainRoot.Screen
          name={MySpotMapPage}
          component={MySpotMap}
          options={{
            headerLeft: () => <BackButton margin={[10, 0]} />,
            headerShown: true,
            headerShadowVisible: false,
            //headerTransparent: true,
            title: '주소 설정',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
          }}
        />
        <MainRoot.Screen
          name={ShareSpotMapPage}
          component={ShareSpotMap}
          options={{
            headerLeft: () => <BackButton margin={[10, 0]} />,
            headerShown: true,
            headerShadowVisible: false,
            //headerTransparent: true,
            title: '공유 스팟 찾기',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
          }}
        />
        <MainRoot.Screen
          name={ShareSpotListPage}
          component={ShareSpotList}
          options={{
            headerLeft: () => <BackButton margin={[10, 0]} />,
            headerShown: true,
            headerShadowVisible: false,
            //headerTransparent: true,
            title: '공유 스팟 찾기',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
          }}
        />
        <MainRoot.Screen
          name={MapSearchResult}
          component={SearchResult}
          options={{
            headerLeft: () => <BackButton margin={[10, 0]} />,
            headerShown: true,
            headerShadowVisible: false,
            //headerTransparent: true,
            // title: '주소 검색',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
          }}
        />
        <MainRoot.Screen
          name={MySpotDetailPage}
          component={MySpotDetail}
          options={{
            headerLeft: () => <BackButton margin={[10, 0]} />,
            headerShown: true,
            headerShadowVisible: false,
            //headerTransparent: true,
            title: '상세 주소 입력',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
          }}
        />
        <MainRoot.Screen
          name={SpotTypePage}
          component={SpotType}
          options={{
            headerLeft: () => <BackButton margin={[10, 0]} />,
            headerShown: false,
            headerShadowVisible: false,
            //headerTransparent: true,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
          }}
        />
        <MainRoot.Screen
          name={NotDeliveryPage}
          component={NotDelivery}
          options={{
            headerLeft: () => <BackButton margin={[10, 0]} />,
            headerShown: false,
            headerShadowVisible: false,
            //headerTransparent: true,

            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
          }}
        />
        <MainRoot.Screen
          name={CompletePage}
          component={Complete}
          options={{
            headerLeft: () => <BackButton margin={[10, 0]} />,
            headerShown: false,
            headerShadowVisible: false,
            //headerTransparent: true,

            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
          }}
        />
        <MainRoot.Screen
          name={PrivateInfoPage}
          component={PrivateInfo}
          options={{
            headerLeft: () => <BackButton margin={[10, 0]} />,
            headerShown: true,
            headerShadowVisible: false,
            title: '',
          }}
        />
        <MainRoot.Screen
          name={ApplySpotPage}
          component={ApplySpot}
          options={{
            headerLeft: () => <BackButton margin={[10, 0]} />,
            headerShown: true,
            headerShadowVisible: false,
            //headerTransparent: true,
            title: '스팟/시간 신청',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
          }}
        />
        <MainRoot.Screen
          name={RegisterSpotMapPage}
          component={RegisterSpotMap}
          options={{
            headerLeft: () => <BackButton margin={[10, 0]} />,
            headerShown: true,
            headerShadowVisible: false,
            //headerTransparent: true,
            title: '신규 스팟 신청',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
          }}
        />
        <MainRoot.Screen
          name={SpotGuidePage}
          component={SpotGuide}
          options={{
            headerLeft: () => <BackButton margin={[10, 0]} />,
            headerShown: false,
            headerShadowVisible: false,
            //headerTransparent: true,
            title: '',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
          }}
        />
        <MainRoot.Screen
          name={InviteSpotPage}
          component={InviteSpot}
          options={{
            headerLeft: () => <BackButton margin={[10, 0]} />,
            headerShown: false,
            headerShadowVisible: false,
            //headerTransparent: true,
            title: '',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
          }}
        />
        <MainRoot.Screen
          name={MySpotDeliveryPage}
          component={MySpotDelivery}
          options={{
            headerLeft: () => <BackButton margin={[10, 0]} />,
            headerShown: true,
            headerShadowVisible: false,
            //headerTransparent: true,
            title: '기본 배송 시간 설정',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
          }}
        />
      </MainRoot.Group>
    </MainRoot.Navigator>
  );
};

export default Screen;

const DeleteTxt = styled.Pressable`
  margin-right: -6px;
  flex-direction: row;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  /* background-color: gold; */
`;
