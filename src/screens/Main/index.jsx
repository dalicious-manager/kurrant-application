import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import BackButton from '../../components/BackButton';
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
        <MainRoot.Screen
          name={LoginMainModalPageName}
          component={LoginMainModal}
          options={{
            headerLeft: () => <BackButton mode="modal" />,
            headerShown: false,
            headerShadowVisible: false,
            title: '',
          }}
        />
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
