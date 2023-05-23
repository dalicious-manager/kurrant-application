import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import styled, {useTheme} from 'styled-components/native';
import RegisterCorpCard, {
  PAGE_NAME as RegisterCorpCardPageName,
} from '~pages/Main/MyPage/PersonalInfo/pages/PaymentManage/RegisterCorpCardPage';
import RegisterPersonalCard, {
  PAGE_NAME as RegisterPersonalCardPageName,
} from '~pages/Main/MyPage/PersonalInfo/pages/PaymentManage/RegisterPersonalCardPage';

export const SCREEN_NAME = 'S_MAIN__REGISTER_CARD';

const Tab = createMaterialTopTabNavigator();

const Screen = ({route}) => {
  const theme = useTheme();
  const params = route.params;
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: {
          backgroundColor: theme.colors.grey[1],
          height: 2,
        },
        tabBarActiveTintColor: theme.colors.grey[2],
        tabBarInactiveTintColor: theme.colors.grey[2],
        tabBarStyle: {backgroundColor: '#ffffff', height: 50},
      }}>
      <Tab.Screen
        name={RegisterPersonalCardPageName}
        component={RegisterPersonalCard}
        initialParams={{
          defaultType: params?.defaultType || 0,
        }}
        options={{
          tabBarLabel: '개인카드',
          tabBarLabelStyle: {
            fontSize: 15,
            lineHeight: 21,
            fontFamily: 'Pretendard-Regular',
          },
        }}
      />
      <Tab.Screen
        name={RegisterCorpCardPageName}
        component={RegisterCorpCard}
        initialParams={{
          defaultType: params?.defaultType || 0,
        }}
        options={{
          tabBarLabel: '법인카드',
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
