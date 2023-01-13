import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { useAtom } from 'jotai';
import React from 'react';
import {  Alert } from 'react-native';
import styled from 'styled-components';

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
import SignUp, {
  PAGE_NAME as SignUpPageName,
} from '~pages/Main/Login/SignUp';
import SignUpComplate, {
  PAGE_NAME as SignUpComplatePageName,
} from '~pages/Main/Login/SignUp/SignUpComplate';
import FAQ, {
  PAGE_NAME as FAQPageName,
} from '~pages/Main/MyPage/FAQ';
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
import PaymentManage, {
  PAGE_NAME as PaymentManagePageName,
} from '~pages/Main/MyPage/PersonalInfo/pages/PaymentManage';
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
import MembershipTerminate, {
  PAGE_NAME as MembershipTerminatePageName,
} from '~pages/Membership/MembershipTerminate';
import MembershipTerminateComplate, {
  PAGE_NAME as MembershipTerminateComplatePageName,
} from '~pages/Membership/MembershipTerminate/MembershipTerminateComplate';

// eslint-disable-next-line import/order

//import CloseIcon from '../../assets/icons/Group/close.svg';
import useShoppingBasket from '../../biz/useShoppingBasket/hook';
import BackButton from '../../components/BackButton';
import Badge from '../../components/Badge';
import ShoppingCart from '../../components/BasketButton';
import CloseIcon from '../../components/CloseButton';
import Typography from '../../components/Typography';
import GroupCreateApartmnet, {PAGE_NAME as GroupCreateApartmentPageName} from '../../pages/Group/GroupApartment';
import ApartmentApplicationCheck, {PAGE_NAME as ApartmentApplicationCheckPageName} from '../../pages/Group/GroupApartment/ApartmentApplicationCheck';
import ApartMentApplicationDetail, {PAGE_NAME as ApartmentApplicationDetailPageName} from '../../pages/Group/GroupApartment/ApartmentApplicationCheck/Pages/DetailPage';
import ApartMentApplicationEtc, {PAGE_NAME as ApartmentApplicationEtcPageName} from '../../pages/Group/GroupApartment/ApartmentApplicationCheck/Pages/DetailPage/EtcPage';
import ApartMentApplicationReject, {PAGE_NAME as ApartmentApplicationRejectPageName} from '../../pages/Group/GroupApartment/ApartmentApplicationCheck/Pages/RejectPage';
import ApartmnetApplicitionFirst, {PAGE_NAME as ApartmentApplicationFirstPageName} from '../../pages/Group/GroupApartment/GroupApartmentApplication/FirstPage';
import ApartmnetApplicitionLast, {PAGE_NAME as ApartmentApplicationLastPageName} from '../../pages/Group/GroupApartment/GroupApartmentApplication/LastPage';
import ApartmnetApplicitionSecond, {PAGE_NAME as ApartmentApplicationSecondPageName} from '../../pages/Group/GroupApartment/GroupApartmentApplication/SecondPage';
import ApartmentApplicationPostCode,{PAGE_NAME as AprtmentApplicationPostcodePageName} from '../../pages/Group/GroupApartment/GroupApartmentApplication/SecondPage/Pages';
import ApartmnetApplicitionThird, {PAGE_NAME as ApartmentApplicationThirdPageName} from '../../pages/Group/GroupApartment/GroupApartmentApplication/ThirdPage';
import ApartmentApplicationInformation, { PAGE_NAME as ApartmentApplicationInformationPageName} from '../../pages/Group/GroupApartment/GroupApartmentApplication/ThirdPage/Pages';
import ApartmentSearch, {PAGE_NAME as ApartmentSearchPageName} from '../../pages/Group/GroupApartment/SearchApartment';
import ApartmentAdd,{PAGE_NAME as ApartmentAddPageName} from '../../pages/Group/GroupApartment/SearchApartment/AddApartment';
import ApartmentAddDetail,{PAGE_NAME as ApartmentAddDetailPageName} from '../../pages/Group/GroupApartment/SearchApartment/AddApartment/DetailAddress';
import GroupCreateCorporations,{PAGE_NAME as GroupCreateCorporationsPageName} from '../../pages/Group/GroupCorporations';
import CorporationApplicationDetail, {PAGE_NAME as CorporationApplicationDetailPageName} from '../../pages/Group/GroupCorporations/CorporationApplicationCheck/DetailPage';
import CorporationApplicationEtc, {PAGE_NAME as CorporationApplicationEtcPageName} from '../../pages/Group/GroupCorporations/CorporationApplicationCheck/DetailPage/EtcPage';
import CorporationApplicationReject, {PAGE_NAME as CorporationApplicationRejectPageName} from '../../pages/Group/GroupCorporations/CorporationApplicationCheck/RejectPage';
import CorporationApplicationFirst, {PAGE_NAME as CorporationtApplicationFirstPageName} from '../../pages/Group/GroupCorporations/CorporationsApplication/FirstPage';
import CorporationApplicitionFourth, {PAGE_NAME as CorporationApplicationFourthPageName} from '../../pages/Group/GroupCorporations/CorporationsApplication/FourthPage';
import CorporationApplicationSpot,{PAGE_NAME as CorporationApplicationSpotPageName} from '../../pages/Group/GroupCorporations/CorporationsApplication/FourthPage/Pages';
import CorporationApplicationSpotPostCode, {PAGE_NAME as CorporationApplicationSpotPostCodePageName} from '../../pages/Group/GroupCorporations/CorporationsApplication/FourthPage/Pages/map';
import CorporationApplicitionLast, {PAGE_NAME as CorporationApplicationLastPageName} from '../../pages/Group/GroupCorporations/CorporationsApplication/LastPage';
import CorporationApplicationSecond, {PAGE_NAME as CorporationtApplicationSecondPageName} from '../../pages/Group/GroupCorporations/CorporationsApplication/SecondPage';
import CorporationApplicationPostCode,{PAGE_NAME as CorporationApplicationPostcodePageName} from '../../pages/Group/GroupCorporations/CorporationsApplication/SecondPage/Pages';
import CorporationApplicitionThird, {PAGE_NAME as CorporationApplicationThirdPageName} from '../../pages/Group/GroupCorporations/CorporationsApplication/ThirdPage';
import CorporaionApplicationMealInformation, { PAGE_NAME as CorporationApplicationInformationMealPageName} from '../../pages/Group/GroupCorporations/CorporationsApplication/ThirdPage/Pages';
import GroupCreate, {PAGE_NAME as GroupCreateMainPageName} from '../../pages/Group/GroupCreate';
import GroupCreateComplete, {PAGE_NAME as GroupCreateCompletePageName} from '../../pages/Group/GroupCreate/CreateComplete';
import GroupManage, {PAGE_NAME as GroupManagePageName} from '../../pages/Group/GroupManage';
import GroupManageDetail, {PAGE_NAME as GroupManageDetailPageName} from '../../pages/Group/GroupManage/DetailPage';
import BuyMeal, {PAGE_NAME as BuyMealPageName} from '../../pages/Main/Bnb/BuyMeal/Main';
import MealCart, {PAGE_NAME as MealCartPageName} from '../../pages/Main/Bnb/MealCart/Main';
import MealDetail, {PAGE_NAME as MealDetailPageName} from '../../pages/Main/Bnb/MealDetail/Main'; 
import MealDetailInformation, {PAGE_NAME as MealInformationPageName} from '../../pages/Main/Bnb/MealDetail/Page';
import Payment, {PAGE_NAME as PaymentPageName} from '../../pages/Main/Bnb/Payment/Main';
import BnbScreen, {SCREEN_NAME as BnbScreenName} from './Bnb';
import RegisterCard, {SCREEN_NAME as RegisterCardScreenName} from './RegisterCard';
// Pages > Exchange
// Pages > IndexCard
// Pages > Information
// Pages > Investment
// Pages > Statement




const MainRoot = createNativeStackNavigator();

const Screen = () => {
  const {allDeleteMeal,setLoadMeal} = useShoppingBasket();

  return (
    <MainRoot.Navigator  >
      <MainRoot.Group screenOptions={{presentation: 'fullScreenModal'}}>
        <MainRoot.Screen
          name={LoginMainModalPageName}
          component={LoginMainModal}
          options={{
            headerLeft: () => <BackButton mode="modal" />,
            headerShown: false,
            headerShadowVisible: false,
            headerTransparent:true,
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
            headerTitleStyle:{
              fontFamily:'Pretendard-SemiBold',
              fontSize:14,
              lineHeight:22
            },
            headerLeft: () => <BackButton />,
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
            headerTitleStyle:{
              fontFamily:'Pretendard-SemiBold',
              fontSize:14,
              lineHeight:22
            },
            headerLeft: () => <BackButton />,
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
            headerTitleStyle:{
              fontFamily:'Pretendard-SemiBold',
              fontSize:14,
              lineHeight:22
            },
            headerLeft: () => <BackButton />,
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
            headerTitleStyle:{
              fontFamily:'Pretendard-SemiBold',
              fontSize:14,
              lineHeight:22
            },
            headerLeft: () => <BackButton />,
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
            headerTitleStyle:{
              fontFamily:'Pretendard-SemiBold',
              fontSize:14,
              lineHeight:22
            },
            headerLeft: () => <BackButton />,
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
            headerTitleStyle:{
              fontFamily:'Pretendard-SemiBold',
              fontSize:14,
              lineHeight:22
            },
            headerLeft: () => <BackButton />,
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
            headerTitleStyle:{
              fontFamily:'Pretendard-SemiBold',
              fontSize:14,
              lineHeight:22
            },
            headerLeft: () => <BackButton />,
          }}
        />
         
         <MainRoot.Screen
          name={EmailLoginModalModalPageName}
          component={EmailLoginModal}
          options={{
            headerShown: false,
            headerShadowVisible: false,
            title: '',
            headerTitleAlign: 'center',
            headerTitleStyle:{
              fontFamily:'Pretendard-SemiBold',
              fontSize:14,
              lineHeight:22
            },
            headerLeft: () => <BackButton />,
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
      {/* 카드 등록 */}
      <MainRoot.Group>
        <MainRoot.Screen
          name={RegisterCardScreenName}
          component={RegisterCard}
          options={{headerShown: true,title:"카드 등록",
          headerTitleAlign: 'center',
          headerTitleStyle:{
            fontFamily:'Pretendard-SemiBold',
            fontSize:14,
            lineHeight:22,
          },
          headerLeft: () => <BackButton />,
        }}
        />
      </MainRoot.Group>
      {/* 식사구매 */}
      <MainRoot.Group>
        <MainRoot.Screen
          name={BuyMealPageName}
          component={BuyMeal}
          options={{headerShown: true,
            title:'식사 구매하기',
            headerTitleAlign: 'center',
            headerTitleStyle:{
              fontFamily:'Pretendard-SemiBold',
              fontSize:14,
              lineHeight:22,
            },
            headerShadowVisible: false,
            headerLeft: () => <BackButton margin={[10,0]}/>,
            headerRight:() => (
              <>
              <ShoppingCart margin={[0,10]}/>
              <Badge/>
              </>
            )
          }}
        />
      </MainRoot.Group>
      {/* 상세페이지 */}
      <MainRoot.Group>
        <MainRoot.Screen
          name={MealDetailPageName}
          component={MealDetail}
          options={{headerShown: true,
            
            headerTitleAlign: 'center',
            headerTitleStyle:{
              fontFamily:'Pretendard-SemiBold',
              fontSize:14,
              lineHeight:22
            },
            
            // headerLeft: () => <BackButton />,
            // headerRight: () => <ShoppingCart/>
          }}
        />
      </MainRoot.Group>
      {/* 상세페이지-알레르기정보 */}
      <MainRoot.Group>
        <MainRoot.Screen
          name={MealInformationPageName}
          component={MealDetailInformation}
          options={{headerShown: true,
            title:'알레르기/원산지 정보',
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTitleStyle:{
              fontFamily:'Pretendard-SemiBold',
              fontSize:14,
              lineHeight:22
            },
            headerLeft: () => <BackButton />,
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
            title:'장바구니',
            headerTitleAlign: 'center',
            headerTitleStyle:{
              fontFamily:'Pretendard-SemiBold',
              fontSize:14,
              lineHeight:22
            },
            headerShadowVisible: false,
            
            headerLeft: () => <BackButton margin={[10,0]}/>,
            headerRight: () => <DeleteTxt onPress={()=>{Alert.alert(
              '전체 삭제',
              '메뉴를 모두 삭제하시겠어요?',
              [
                {
                  text:'아니요',
                  onPress:() => console.log('cancel pressed'),
                  style:'destructive'
                },
                {
                  text:'삭제',
                  onPress:() => {
                    try {
                      allDeleteMeal();
                      setLoadMeal([]);
                    }catch(err){
                      console.log(err)
                    }
                  }
                }
              ]
            )}}>전체삭제</DeleteTxt>
          }}
        />
      </MainRoot.Group>
      {/* 결제페이지 */}
      <MainRoot.Group>
        <MainRoot.Screen
          name={PaymentPageName}
          component={Payment}
          options={{headerShown: true,
            title:'주문',
            headerTitleStyle:{
              fontFamily:'Pretendard-SemiBold',
              fontSize:14,
              lineHeight:22
            },
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerLeft: () => <BackButton margin={[10,0]}/>,
          }}
        />
      </MainRoot.Group>
      {/* MYPAGE */}
      <MainRoot.Group >
        <MainRoot.Screen
          name={TermOfServicePageName}
          component={TermOfService}
          options={{headerShown: true,
            title:'약관 및 개인 정보',
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTitleStyle:{
              fontFamily:'Pretendard-SemiBold',
              fontSize:14,
              lineHeight:22
            },
            headerLeft: () => <BackButton />,
          }}
        />
        <MainRoot.Screen
          name={TermPageName}
          component={Term}
          options={{headerShown: true,
            title:'이용 약관',
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTitleStyle:{
              fontFamily:'Pretendard-SemiBold',
              fontSize:17,
              lineHeight:21
            },
            headerLeft: () => <BackButton />,
          }}
        />
        <MainRoot.Screen
          name={PrivacyPageName}
          component={Privacy}
          options={{headerShown: true,
            title:'개인 정보 수집 약관',
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTitleStyle:{
              fontFamily:'Pretendard-SemiBold',
              fontSize:17,
              lineHeight:21
            },
            headerLeft: () => <BackButton />,
          }}
        />
        <MainRoot.Screen
          name={FAQPageName}
          component={FAQ}
          options={{headerShown: true,
            title:'고객센터',
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTitleStyle:{
              fontFamily:'Pretendard-SemiBold',
              fontSize:17,
              lineHeight:21
            },
            headerLeft: () => <BackButton />,
          }}
        />
        <MainRoot.Screen
          name={FAQListPageName}
          component={FAQListPage}
          options={{headerShown: true,
            title:'회원정보',
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTitleStyle:{
              fontFamily:'Pretendard-SemiBold',
              fontSize:17,
              lineHeight:21
            },
            headerLeft: () => <BackButton />,
          }}
        />
        <MainRoot.Screen
          name={PersonalInfoPageName}
          component={PersonalInfo}
          options={{headerShown: true,
            title:'개인 정보',
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTitleStyle:{
              fontFamily:'Pretendard-SemiBold',
              fontSize:14,
              lineHeight:22
            },
            headerLeft: () => <BackButton />,
          }}
        />
        <MainRoot.Screen
          name={ConnectedSNSPageName}
          component={ConnectedSNS}
          options={{headerShown: true,
            title:'SNS 계정 연결',
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTitleStyle:{
              fontFamily:'Pretendard-SemiBold',
              fontSize:14,
              lineHeight:22
            },
            headerLeft: () => <BackButton />,
          }}
        />
        <MainRoot.Screen
          name={NotificationSettingPageName}
          component={NotificationSetting}
          options={{headerShown: true,
            title:'알림 설정',
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTitleStyle:{
              fontFamily:'Pretendard-SemiBold',
              fontSize:14,
              lineHeight:22
            },
            headerLeft: () => <BackButton />,
          }}
        />
        <MainRoot.Screen
          name={PhoneNumberSettingPageName}
          component={PhoneNumberSetting}
          options={{headerShown: true,
            title:'휴대폰 번호 변경',
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTitleStyle:{
              fontFamily:'Pretendard-SemiBold',
              fontSize:14,
              lineHeight:22
            },
            headerLeft: () => <BackButton />,
          }}
        />
        <MainRoot.Screen
          name={PasswordSettingPageName}
          component={PasswordSetting}
          options={{headerShown: true,
            title:'비밀번호 변경하기',
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTitleStyle:{
              fontFamily:'Pretendard-SemiBold',
              fontSize:14,
              lineHeight:22
            },
            headerLeft: () => <BackButton />,
          }}
        />
        <MainRoot.Screen
          name={EmailSettingPageName}
          component={EmailSetting}
          options={{headerShown: true,
            title:'이메일/비밀번호 설정',
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTitleStyle:{
              fontFamily:'Pretendard-SemiBold',
              fontSize:14,
              lineHeight:22
            },
            headerLeft: () => <BackButton />,
          }}
        />
        <MainRoot.Screen
          name={PaymentManagePageName}
          component={PaymentManage}
          options={{headerShown: true,
            title:'결제수단 관리',
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTitleStyle:{
              fontFamily:'Pretendard-SemiBold',
              fontSize:14,
              lineHeight:22
            },
            headerLeft: () => <BackButton />,
          }}
        />
        <MainRoot.Screen
          name={MarketingAgreePageName}
          component={MarketingAgree}
          options={{headerShown: true,
            title:'마케팅 정보 수신 동의',
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTitleStyle:{
              fontFamily:'Pretendard-SemiBold',
              fontSize:14,
              lineHeight:22
            },
            headerLeft: () => <BackButton />,
          }}
        />
      </MainRoot.Group>
      {/* MEMBERSHIP */}
      <MainRoot.Group>
        <MainRoot.Screen
          name={MembershipIntroPageName}
          component={MembershipIntro}
          options={{headerShown: false,
            title:'멤버십 가입',
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTitleStyle:{
              fontFamily:'Pretendard-SemiBold',
              fontSize:14,
              lineHeight:22
            },
            headerLeft: () => <BackButton />,
          }}
        />
        <MainRoot.Screen
          name={MembershipJoinPageName}
          component={MembershipJoin}
          options={{headerShown: true,
            title:'멤버십 가입',
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTitleStyle:{
              fontFamily:'Pretendard-SemiBold',
              fontSize:14,
              lineHeight:22
            },
            headerLeft: () => <BackButton />,
          }}
        />
        <MainRoot.Screen
          name={MembershipJoinPaymentsPageName}
          component={MembershipJoinPayments}
          options={{headerShown: true,
            title:'멤버십 가입',
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTitleStyle:{
              fontFamily:'Pretendard-SemiBold',
              fontSize:14,
              lineHeight:22
            },
            headerLeft: () => <BackButton />,
          }}
        />
        <MainRoot.Screen
          name={MembershipJoinComplatePageName}
          component={MembershipJoinComplate}
          options={{headerShown: true,
            title:'멤버십 가입',
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTitleStyle:{
              fontFamily:'Pretendard-SemiBold',
              fontSize:14,
              lineHeight:22
            },
            headerLeft: () => <BackButton />,
          }}
        />
        <MainRoot.Screen
          name={MembershipInfoPageName}
          component={MembershipInfo}
          options={{headerShown: true,
            title:'멤버십',
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTitleStyle:{
              fontFamily:'Pretendard-SemiBold',
              fontSize:14,
              lineHeight:22
            },
            headerLeft: () => <BackButton />,
          }}
        />
        <MainRoot.Screen
          name={MembershipUsagedetailsPageName}
          component={MembershipUsagedetails}
          options={{headerShown: true,
            title:'멤버십 이용내역',
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTitleStyle:{
              fontFamily:'Pretendard-SemiBold',
              fontSize:14,
              lineHeight:22
            },
            headerLeft: () => <BackButton />,
          }}
        />
        <MainRoot.Screen
          name={MembershipTerminatePageName}
          component={MembershipTerminate}
          options={{headerShown: true,
            title:'멤버십 해지',
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTitleStyle:{
              fontFamily:'Pretendard-SemiBold',
              fontSize:14,
              lineHeight:22
            },
            headerLeft: () => <BackButton />,
          }}
        />
        <MainRoot.Screen
          name={MembershipTerminateComplatePageName}
          component={MembershipTerminateComplate}
          options={{headerShown: true,
            title:'멤버십 해지',
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTitleStyle:{
              fontFamily:'Pretendard-SemiBold',
              fontSize:14,
              lineHeight:22
            },
            headerLeft: () => <BackButton />,
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
              headerStyle:{
                backgroundColor:'#F5F5F5'
              },
              headerShown: false,
              headerShadowVisible: false,
              title: '',
              headerTitleAlign: 'center',
              headerTitleStyle:{
                fontFamily:'Pretendard-SemiBold',
                fontSize:14,
                lineHeight:22
              },
               headerLeft: () => <CloseIcon/>,
            }}
          />
          {/* 아파트 스팟 신청 */}
          <MainRoot.Screen
            name={GroupCreateApartmentPageName}
            component={GroupCreateApartmnet}
            options={{
              headerShown: true,
              headerShadowVisible: false,
              title: '',
              headerTitleAlign: 'center',
              headerTitleStyle:{
                fontFamily:'Pretendard-SemiBold',
                fontSize:14,
                lineHeight:22
              },
              
              headerLeft: () => <BackButton />,
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
              headerTitleStyle:{
                fontFamily:'Pretendard-SemiBold',
                fontSize:14,
                lineHeight:22
              },
              
              headerLeft: () => <BackButton />,
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
              headerTitleStyle:{
                fontFamily:'Pretendard-SemiBold',
                fontSize:14,
                lineHeight:22
              },
              
              headerLeft: () => <BackButton />,
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
              headerTitleStyle:{
                fontFamily:'Pretendard-SemiBold',
                fontSize:14,
                lineHeight:22
              },
              
              headerLeft: () => <BackButton />,
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
              headerTitleStyle:{
                fontFamily:'Pretendard-SemiBold',
                fontSize:14,
                lineHeight:22
              },
              
              headerLeft: () => <BackButton />,
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
              headerTitleStyle:{
                fontFamily:'Pretendard-SemiBold',
                fontSize:14,
                lineHeight:22
              },
              
              headerLeft: () => <CloseIcon/>,
            }}
          />
            <MainRoot.Screen
            name={AprtmentApplicationPostcodePageName}
            component={ApartmentApplicationPostCode}
            options={{
              headerShown: true,
              headerShadowVisible: false,
              title:'주소 검색',
              headerTitleAlign: 'center',
              headerTitleStyle:{
                fontFamily:'Pretendard-SemiBold',
                fontSize:14,
                lineHeight:22
              },
              
              headerLeft: () => <BackButton />,
            }}
          />
          
          <MainRoot.Screen
            name={ApartmentApplicationRejectPageName}
            component={ApartMentApplicationReject}
            options={{
              headerShown: true,
              headerShadowVisible: false,
              title:'',
              headerTitleAlign: 'center',
              headerTitleStyle:{
                fontFamily:'Pretendard-SemiBold',
                fontSize:14,
                lineHeight:22
              },
              
              headerLeft: () => <CloseIcon margin={[10,0]}/>,
            }}
          />
          <MainRoot.Screen
            name={ApartmentApplicationDetailPageName}
            component={ApartMentApplicationDetail}
            options={{
              headerShown: true,
              headerShadowVisible: false,
              title:'신청 정보',
              headerTitleAlign: 'center',
              headerTitleStyle:{
                fontFamily:'Pretendard-SemiBold',
                fontSize:14,
                lineHeight:22
              },
              
              headerLeft: () => <BackButton margin={[10,0]}/>,
            }}
          />
          <MainRoot.Screen
            name={ApartmentApplicationEtcPageName}
            component={ApartMentApplicationEtc}
            options={{
              headerShown: true,
              headerShadowVisible: false,
              title:'',
              headerTitleAlign: 'center',
              headerTitleStyle:{
                fontFamily:'Pretendard-SemiBold',
                fontSize:14,
                lineHeight:22
              },
              
              headerLeft: () => <BackButton margin={[10,0]}/>,
            }}
          />
          <MainRoot.Screen
            name={GroupCreateCompletePageName}
            component={GroupCreateComplete}
            options={{
              headerShown: false,
              headerShadowVisible: false,
              title:'',
              headerTitleAlign: 'center',
              headerTitleStyle:{
                fontFamily:'Pretendard-SemiBold',
                fontSize:14,
                lineHeight:22
              },
              
              headerLeft: () => <BackButton margin={[10,0]}/>,
            }}
          />
          <MainRoot.Screen
            name={ApartmentSearchPageName}
            component={ApartmentSearch}
            options={{
              headerShown: true,
              headerShadowVisible: false,
              title:'우리 아파트 검색',
              headerTitleAlign: 'center',
              headerTitleStyle:{
                fontFamily:'Pretendard-SemiBold',
                fontSize:14,
                lineHeight:22
              },
              
              headerLeft: () => <BackButton margin={[10,0]}/>,
            }}
          />
      </MainRoot.Group>
      {/* 기업 스팟 신청 */}
      <MainRoot.Group>
        <MainRoot.Screen
          name={GroupCreateCorporationsPageName}
          component={GroupCreateCorporations}
          options={{
            headerShown: true,
            headerShadowVisible: false,
            title:'',
            headerTitleAlign: 'center',
            headerTitleStyle:{
              fontFamily:'Pretendard-SemiBold',
              fontSize:14,
              lineHeight:22
            },
            
            headerLeft: () => <BackButton margin={[10,0]}/>
          }}
          />
        <MainRoot.Screen
          name={CorporationtApplicationFirstPageName}
          component={CorporationApplicationFirst}
          options={{
            headerShown: true,
            headerShadowVisible: false,
            title:'담당자 정보',
            headerTitleAlign: 'center',
            headerTitleStyle:{
              fontFamily:'Pretendard-SemiBold',
              fontSize:14,
              lineHeight:22
            },
            
            headerLeft: () => <BackButton margin={[10,0]}/>
          }}
          />
        <MainRoot.Screen
          name={CorporationtApplicationSecondPageName}
          component={CorporationApplicationSecond}
          options={{
            headerShown: true,
            headerShadowVisible: false,
            title:'기본 정보',
            headerTitleAlign: 'center',
            headerTitleStyle:{
              fontFamily:'Pretendard-SemiBold',
              fontSize:14,
              lineHeight:22
            },
            
            headerLeft: () => <BackButton margin={[10,0]}/>
          }}
          />
        <MainRoot.Screen
          name={CorporationApplicationPostcodePageName}
          component={CorporationApplicationPostCode}
          options={{
            headerShown: true,
            headerShadowVisible: false,
            title:'',
            headerTitleAlign: 'center',
            headerTitleStyle:{
              fontFamily:'Pretendard-SemiBold',
              fontSize:14,
              lineHeight:22
            },
            
            headerLeft: () => <BackButton margin={[10,0]}/>
          }}
          />
        <MainRoot.Screen
          name={CorporationApplicationThirdPageName}
          component={CorporationApplicitionThird}
          options={{
            headerShown: true,
            headerShadowVisible: false,
            title:'식사 정보',
            headerTitleAlign: 'center',
            headerTitleStyle:{
              fontFamily:'Pretendard-SemiBold',
              fontSize:14,
              lineHeight:22
            },
            headerLeft: () => <BackButton margin={[10,0]}/>
          }}
          />
        <MainRoot.Screen
          name={CorporationApplicationInformationMealPageName}
          component={CorporaionApplicationMealInformation}
          options={{
            headerShown: true,
            headerShadowVisible: false,
            title:'',
            headerTitleAlign: 'center',
            headerTitleStyle:{
              fontFamily:'Pretendard-SemiBold',
              fontSize:14,
              lineHeight:22
            },
            headerLeft: () => <BackButton margin={[10,0]}/>
          }}
          />
          <MainRoot.Screen
          name={CorporationApplicationFourthPageName}
          component={CorporationApplicitionFourth}
          options={{
            headerShown: true,
            headerShadowVisible: false,
            title:'식사 정보',
            headerTitleAlign: 'center',
            headerTitleStyle:{
              fontFamily:'Pretendard-SemiBold',
              fontSize:14,
              lineHeight:22
            },
            headerLeft: () => <BackButton margin={[10,0]}/>
          }}
          />
          <MainRoot.Screen
          name={CorporationApplicationSpotPageName}
          component={CorporationApplicationSpot}
          options={{
            headerShown: true,
            headerShadowVisible: false,
            title:'스팟 생성',
            headerTitleAlign: 'center',
            headerTitleStyle:{
              fontFamily:'Pretendard-SemiBold',
              fontSize:14,
              lineHeight:22
            },
            headerLeft: () => <CloseIcon margin={[10,0]}/>
          }}
          />
          <MainRoot.Screen
          name={CorporationApplicationSpotPostCodePageName}
          component={CorporationApplicationSpotPostCode}
          options={{
            headerShown: true,
            headerShadowVisible: false,
            title:'주소 검색',
            headerTitleAlign: 'center',
            headerTitleStyle:{
              fontFamily:'Pretendard-SemiBold',
              fontSize:14,
              lineHeight:22
            },
            headerLeft: () => <CloseIcon margin={[10,0]}/>
          }}
          />
          <MainRoot.Screen
          name={CorporationApplicationLastPageName}
          component={CorporationApplicitionLast}
          options={{
            headerShown: true,
            headerShadowVisible: false,
            title:'기타 옵션',
            headerTitleAlign: 'center',
            headerTitleStyle:{
              fontFamily:'Pretendard-SemiBold',
              fontSize:14,
              lineHeight:22
            },
            headerLeft: () => <BackButton margin={[10,0]}/>
          }}
          />
  
           <MainRoot.Screen
            name={CorporationApplicationDetailPageName}
            component={CorporationApplicationDetail}
            options={{
              headerShown: true,
              headerShadowVisible: false,
              title:'신청 정보',
              headerTitleAlign: 'center',
              headerTitleStyle:{
                fontFamily:'Pretendard-SemiBold',
                fontSize:14,
                lineHeight:22
              },
              
              headerLeft: () => <BackButton margin={[10,0]}/>,
            }}
          />
          <MainRoot.Screen
            name={CorporationApplicationRejectPageName}
            component={CorporationApplicationReject}
            options={{
              headerShown: true,
              headerShadowVisible: false,
              title:'',
              headerTitleAlign: 'center',
              headerTitleStyle:{
                fontFamily:'Pretendard-SemiBold',
                fontSize:14,
                lineHeight:22
              },
              
              headerLeft: () => <CloseIcon margin={[10,0]}/>,
            }}
          />
          <MainRoot.Screen
              name={ApartmentApplicationCheckPageName}
              component={ApartmentApplicationCheck}
              options={{
                headerShown: true,
                headerShadowVisible: false,
                title:'스팟 신청 내역',
                headerTitleAlign: 'center',
                headerTitleStyle:{
                  fontFamily:'Pretendard-SemiBold',
                  fontSize:14,
                  lineHeight:22
                },
                
                headerLeft: () => <CloseIcon margin={[10,0]}/>,
              }}
            />
            <MainRoot.Screen
            name={CorporationApplicationEtcPageName}
            component={CorporationApplicationEtc}
            options={{
              headerShown: true,
              headerShadowVisible: false,
              title:'',
              headerTitleAlign: 'center',
              headerTitleStyle:{
                fontFamily:'Pretendard-SemiBold',
                fontSize:14,
                lineHeight:22
              },
              
              headerLeft: () => <BackButton margin={[10,0]}/>,
            }}
          />
          
      </MainRoot.Group>
      {/* 그룹/스팟 관리 */}
      <MainRoot.Group >
        <MainRoot.Screen
          name={GroupManagePageName}
          component={GroupManage}
          options={{
            headerShown: false,
            headerShadowVisible: false,
            title:'내그룹',
            headerTitleAlign: 'center',
            headerTitleStyle:{
              fontFamily:'Pretendard-SemiBold',
              fontSize:14,
              lineHeight:22
            },
            
            headerLeft: () => <CloseIcon margin={[10,0]}/>,
          }}
        />
        <MainRoot.Screen
          name={GroupManageDetailPageName}
          component={GroupManageDetail}
          options={{
            headerShown: true,
            headerShadowVisible: false,
            title:'그룹/스팟 관리',
            headerTitleAlign: 'center',
            headerTitleStyle:{
              fontFamily:'Pretendard-SemiBold',
              fontSize:14,
              lineHeight:22
            },
            
            headerLeft: () => <CloseIcon margin={[10,0]}/>,
          }}
        />
      <MainRoot.Screen
          name={ApartmentAddPageName}
          component={ApartmentAdd}
          options={{
            headerShown: true,
            headerShadowVisible: false,
            title:'',
            headerTitleAlign: 'center',
            headerTitleStyle:{
              fontFamily:'Pretendard-SemiBold',
              fontSize:14,
              lineHeight:22
            },
            headerLeft: () => <BackButton margin={[10,0]}/>
          }}
        />
      <MainRoot.Screen
          name={ApartmentAddDetailPageName}
          component={ApartmentAddDetail}
          options={{
            headerShown: true,
            headerShadowVisible: false,
            title:'세부 주소',
            headerTitleAlign: 'center',
            headerTitleStyle:{
              fontFamily:'Pretendard-SemiBold',
              fontSize:14,
              lineHeight:22
            },
            headerLeft: () => <BackButton margin={[10,0]}/>
          }}
        />
      </MainRoot.Group>

      
    </MainRoot.Navigator>
  );
};

export default Screen;

const DeleteTxt = styled(Typography).attrs({text:'Button09R'})`
color:${({theme}) => theme.colors.grey[2]};
margin-right:10px;
`;
