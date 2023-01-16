import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React, {useLayoutEffect} from 'react';
import styled, {useTheme} from 'styled-components/native';
import Yoyoyo, {hi1, hi2} from '../../../jaesin/Yoyoyo';
export const SCREEN_NAME = 'S_MAIN__REVIEW';

const Tab = createMaterialTopTabNavigator();

const Screen = () => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: {
          backgroundColor: theme.colors.grey[1],
          height: 2,
        },
        tabBarActiveTintColor: theme.colors.grey[2],
        tabBarInactiveTintColor: theme.colors.grey[2],
        tabBarStyle: {backgroundColor: '#ffffff'},
      }}>
      <Tab.Screen
        name={'Yoyoyo'}
        component={Yoyoyo}
        options={{
          tabBarLabel: '리뷰 작성(7)',
          tabBarLabelStyle: {
            fontSize: 15,
            lineHeight: 21,
            fontFamily: 'Pretendard-Regular',
          },
        }}
      />
      <Tab.Screen
        name={'Yoyoyo2'}
        component={Yoyoyo}
        options={{
          tabBarLabel: '작성한 리뷰(1)',
          tabBarLabelStyle: {
            fontSize: 15,
            lineHeight: 21,
            fontFamily: 'Pretendard-Regular',
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default Screen;
