import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import { Alert, Text } from 'react-native';

import BackButton from '../../components/BackButton';
import ShoppingCart from '../../components/BasketButton';
import BuyMeal, {PAGE_NAME as BuyMealPageName} from '../../pages/Main/Bnb/BuyMeal/Main';
import MealCart, {PAGE_NAME as MealCartPageName} from '../../pages/Main/Bnb/MealCart/Main';
import MealDetail, {PAGE_NAME as MealDetailPageName} from '../../pages/Main/Bnb/MealDetail/Main'; 
import MealDetailInformation, {PAGE_NAME as MealInformationPageName} from '../../pages/Main/Bnb/MealDetail/Page';
import Payment, {PAGE_NAME as PaymentPageName} from '../../pages/Main/Bnb/Payment/Main';
import SelectUserTypePage, {
  PAGE_NAME as SelectUserTypePageName,
} from '../../pages/Main/Bnb/SignUp/SelectUserType';
import EmailLoginModal, {
  PAGE_NAME as EmailLoginModalModalPageName,
} from '../../pages/Main/Modal/EmailLogin';
import LoginMainModal, {
  PAGE_NAME as LoginMainModalPageName,
} from '../../pages/Main/Modal/Login';
import TermsOfServiceModal, {
  PAGE_NAME as TermsOfServiceModalPageName,
} from '../../pages/Main/Modal/SignUp/TermsOfService';
import BnbScreen, {SCREEN_NAME as BnbScreenName} from './Bnb';
// Pages > Exchange
// Pages > IndexCard
// Pages > Information
// Pages > Investment
// Pages > Statement

const MainRoot = createNativeStackNavigator();

const Screen = () => {
  return (
    <MainRoot.Navigator initialRouteName={LoginMainModalPageName}>
      {/* BNB */}
      <MainRoot.Group>
        <MainRoot.Screen
          name={BnbScreenName}
          component={BnbScreen}
          options={{headerShown: false}}
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
            headerShadowVisible: false,
            headerLeft: () => <BackButton />,
            headerRight: () => <ShoppingCart/>
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
            headerLeft: () => <BackButton />,
            headerRight: () => <ShoppingCart/>
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
            headerShadowVisible: false,
            headerLeft: () => <BackButton />,
            headerRight: () => <Text onPress={()=>{Alert.alert(
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
                  onPress:() => console.log('ok pressed')
                }
              ]
            )}}>전체삭제</Text>,
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
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerLeft: () => <BackButton />,
          }}
        />
      </MainRoot.Group>

      
      {/* BNB > SIGN_UP  */}
      <MainRoot.Group>
        <MainRoot.Screen
          name={SelectUserTypePageName}
          component={SelectUserTypePage}
          options={{headerShown: false}}
        />
      </MainRoot.Group>
      {/* MODAL */}
      {/* MODAL > LOGIN */}
      <MainRoot.Group screenOptions={{presentation: 'fullScreenModal'}}>
        {/* <MainRoot.Screen
          name={LoginMainModalPageName}
          component={LoginMainModal}
          options={{
            headerLeft: () => <BackButton mode="modal" />,
            headerShown: false,
            headerShadowVisible: false,
            title: '',
          }}
        /> */}
        <MainRoot.Screen
          name={TermsOfServiceModalPageName}
          component={TermsOfServiceModal}
          options={{
            headerShown: true,
            headerShadowVisible: false,
            title: '',
            headerLeft: () => <BackButton />,
          }}
        />
         <MainRoot.Screen
          name={EmailLoginModalModalPageName}
          component={EmailLoginModal}
          options={{
            headerShown: true,
            headerShadowVisible: false,
            title: '',
            headerLeft: () => <BackButton />,
          }}
        />
      </MainRoot.Group>
    </MainRoot.Navigator>
  );
};

export default Screen;
