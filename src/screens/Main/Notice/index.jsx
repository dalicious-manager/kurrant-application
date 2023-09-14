import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useLayoutEffect} from 'react';
import styled, {useTheme} from 'styled-components/native';
import PublicNotice, {
  PAGE_NAME as PublicNoticePageName,
} from '~pages/Main/MyPage/Notice/PublicNotice';
import SpotNotice, {
  PAGE_NAME as SpotNoticePageName,
} from '~pages/Main/MyPage/Notice/SpotNotice';

import Typography from '~components/Typography';
import SseRedDot from '../../../utils/sse/SseService/SseRedDot/SseRedDot';

import useSse from '../../../utils/sse/sseLogics/useSse';
import {sseType1Atom, sseType2Atom} from '../../../utils/sse/sseLogics/store';
import {useAtom} from 'jotai';

export const SCREEN_NAME = 'S_MAIN__NOTICE';

const Tab = createMaterialTopTabNavigator();

const Screen = ({route}) => {
  const from = route?.params?.from;
  const noticeId = route?.params?.id;

  const theme = useTheme();
  const navigation = useNavigation();

  // sseType1, sseType2

  const {sseHistory, confirmSseIsRead} = useSse();

  const [sseType1] = useAtom(sseType1Atom);
  const [sseType2] = useAtom(sseType2Atom);

  useEffect(() => {
    return () => {
      confirmSseIsRead({type: 1});
      confirmSseIsRead({type: 2});
    };
  }, []);

  return (
    <Tab.Navigator
      initialRouteName={
        from === 'public' ? SpotNoticePageName : PublicNoticePageName
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
        options={
          //   {
          //   tabBarLabel: '전체 공지',
          //   tabBarLabelStyle: {
          //     fontSize: 15,
          //     lineHeight: 21,
          //     fontFamily: 'Pretendard-Regular',
          //   },
          // }

          ({navigation}) => ({
            tabBarLabel: ({focused}) => (
              <SseRedDotType1
                // sseType1
                isSse={
                  (!!sseType1.type && !sseType1.read) ||
                  !!sseHistory?.find(v => v.type === 1)
                }
                position={'absolute'}
                top={'0px'}
                right={'-8px'}>
                <Titles focused={focused}>전체 공지</Titles>
              </SseRedDotType1>
            ),
            tabBarLabelStyle: {
              fontSize: 15,
              lineHeight: 21,
              fontFamily: 'Pretendard-Regular',
            },
          })
        }
      />
      <Tab.Screen
        name={SpotNoticePageName}
        component={SpotNotice}
        options={
          ({navigation}) => ({
            tabBarLabel: ({focused}) => (
              <SseRedDotType2
                // sseType2

                isSse={
                  (!!sseType2.type && !sseType2.read) ||
                  !!sseHistory?.find(v => v.type === 2)
                }
                position={'absolute'}
                top={'0px'}
                right={'-8px'}>
                <Titles focused={focused}>스팟 공지</Titles>
              </SseRedDotType2>
            ),
            tabBarLabelStyle: {
              fontSize: 15,
              lineHeight: 21,
              fontFamily: 'Pretendard-Regular',
            },
          })

          //   {
          //   tabBarLabel: '스팟 공지',
          //   tabBarLabelStyle: {
          //     fontSize: 15,
          //     lineHeight: 21,
          //     fontFamily: 'Pretendard-Regular',
          //   },
          // }
        }
      />
    </Tab.Navigator>
  );
};

export default Screen;

const Titles = styled(Typography).attrs({text: 'Button09SB'})`
  color: ${({theme}) => theme.colors.grey[2]};
  font-weight: ${({focused}) => {
    return focused ? '600' : '400';
  }};
`;

const SseRedDotType1 = styled(SseRedDot)``;
const SseRedDotType2 = styled(SseRedDot)``;
