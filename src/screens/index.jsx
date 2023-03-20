import messaging from '@react-native-firebase/messaging';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAtom} from 'jotai';
import React, {useCallback, useEffect} from 'react';
import {Platform, StatusBar, StyleSheet} from 'react-native';
import {Alert} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';

import SignUpComplate, {
  PAGE_NAME as SignUpComplatePageName,
} from '~pages/Main/Login/SignUp/SignUpComplate';

import {PAGE_NAME as BuyMealPageName} from '~pages/Main/Bnb/BuyMeal/Main';

import {pageNameAtom} from '../atoms/store';

import Main from './Main';
import BackButton from '../components/BackButton';

const Root = createNativeStackNavigator();

const Screen = () => {
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('dark-content');
      Platform.OS === 'android' && StatusBar.setBackgroundColor('transparent');
      Platform.OS === 'android' && StatusBar.setTranslucent(true);
    }, []),
  );

  return (
    <SafeAreaProvider>
      <Root.Navigator>
        <Root.Group screenOptions={{headerShown: false}}>
          {/* <Root.Screen
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
          /> */}

          <Root.Screen name="ROOT" component={Main} style={styles.rootView} />
        </Root.Group>
      </Root.Navigator>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
  },
});

export default Screen;
