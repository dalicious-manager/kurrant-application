import messaging from '@react-native-firebase/messaging';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAtom } from 'jotai';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import {Alert} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';

import { PAGE_NAME as BuyMealPageName } from '~pages/Main/Bnb/BuyMeal/Main';

import { pageNameAtom } from '../atoms/store';
import Main from './Main';
const Root = createNativeStackNavigator();

const Screen = () => {
  
  return (
    <SafeAreaProvider>      
        <Root.Navigator>
          <Root.Group screenOptions={{ headerShown: false }}>
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
