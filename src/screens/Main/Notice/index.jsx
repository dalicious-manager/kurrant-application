import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import styled, {useTheme} from 'styled-components/native';
import PublicNotice, {
  PAGE_NAME as PublicNoticePageName,
} from '~pages/Main/MyPage/Notice/PublicNotice';
import SpotNotice, {
  PAGE_NAME as SpotNoticePageName,
} from '~pages/Main/MyPage/Notice/SpotNotice';

import {useGetNoticeDetail} from '../../../hook/useNotice';

export const SCREEN_NAME = 'S_MAIN__NOTICE';

const Tab = createMaterialTopTabNavigator();

const Screen = ({route}) => {
  const from = route?.params?.from;
  const noticeId = route?.params?.id;

  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      initialRouteName={
        from === 'public' ? PublicNoticePageName : SpotNoticePageName
      }
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
        initialParams={{id: noticeId, from: from}}
        name={PublicNoticePageName}
        component={PublicNotice}
        options={{
          tabBarLabel: '전체 공지',
          tabBarLabelStyle: {
            fontSize: 15,
            lineHeight: 21,
            fontFamily: 'Pretendard-Regular',
          },
        }}
      />
      <Tab.Screen
        name={SpotNoticePageName}
        component={SpotNotice}
        options={{
          tabBarLabel: '스팟 공지',
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
