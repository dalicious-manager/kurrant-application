import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import styled, {useTheme} from 'styled-components/native';

import {
  CatorHistoryPage,
  CatorHistoryPageName,
} from '../../../pages/Main/MyPage/PurchaseHistory/Cator';
import {
  EverythingHistoryPageName,
  EverythingHistoryPage,
} from '../../../pages/Main/MyPage/PurchaseHistory/Everything';
import {
  MarketHistoryPage,
  MarketHistoryPageName,
} from '../../../pages/Main/MyPage/PurchaseHistory/Market';
import {
  MealHistoryPage,
  MealHistoryPageName,
} from '../../../pages/Main/MyPage/PurchaseHistory/Meal';

export const SCREEN_NAME = 'S_MAIN__PURCHASE_HISTORY';

const Tab = createMaterialTopTabNavigator();

const Screen = () => {
  const theme = useTheme();
  const navigation = useNavigation();

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
        name={EverythingHistoryPageName}
        component={EverythingHistoryPage}
        options={{
          tabBarLabel: '전체',
          tabBarLabelStyle: {
            fontSize: 15,
            lineHeight: 21,
            fontFamily: 'Pretendard-Regular',
          },
        }}
      />
      <Tab.Screen
        name={MealHistoryPageName}
        component={MealHistoryPage}
        options={{
          tabBarLabel: '식사',
          tabBarLabelStyle: {
            fontSize: 15,
            lineHeight: 21,
            fontFamily: 'Pretendard-Regular',
          },
        }}
      />
      <Tab.Screen
        name={CatorHistoryPageName}
        component={CatorHistoryPage}
        options={{
          tabBarLabel: '케이터링',
          tabBarLabelStyle: {
            fontSize: 15,
            lineHeight: 21,
            fontFamily: 'Pretendard-Regular',
          },
        }}
      />
      <Tab.Screen
        name={MarketHistoryPageName}
        component={MarketHistoryPage}
        options={{
          tabBarLabel: '마켓',
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
