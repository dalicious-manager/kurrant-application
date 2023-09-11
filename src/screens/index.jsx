import messaging from '@react-native-firebase/messaging';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import React, {useCallback, useEffect} from 'react';
import {NativeModules, Platform, StatusBar, StyleSheet} from 'react-native';
import {Alert} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import Main from './Main';
import useSseStart from '../utils/sse/sseLogics/useSseStart';

const Root = createNativeStackNavigator();

const Screen = () => {
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('dark-content');
      Platform.OS === 'android' && StatusBar.setBackgroundColor('transparent');
      Platform.OS === 'android' && StatusBar.setTranslucent(true);
    }, []),
  );

  // useSseStart();

  return (
    <SafeAreaProvider>
      <Root.Navigator>
        <Root.Group screenOptions={{headerShown: false}}>
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
