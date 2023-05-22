import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {useAtom} from 'jotai';
import React, {useEffect, useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import styled, {useTheme} from 'styled-components/native';

import {
  modalStatusAtom,
  totalReviewWaitListAtom,
} from '../../../biz/useReview/useReviewWait/store';
import {totalWrittenReview} from '../../../biz/useReview/useWrittenReview/store';
import BackArrow from '../../../assets/icons/MealDetail/backArrow.svg';
import Popup from '../../../pages/Main/MyPage/Review/Popup';
import BackButton from '../../../components/BackButton';
export const SCREEN_NAME = 'S_MAIN__REVIEW';
import Review, {
  PAGE_NAME as ReviewPageName,
} from '../../../pages/Main/MyPage/Review';
import WrittenReview, {
  PAGE_NAME as WrittenReviewPageName,
} from '../../../pages/Main/MyPage/WrittenReview';
import {useNavigation} from '@react-navigation/native';
import {useLayoutEffect} from 'react';
import {PAGE_NAME as MoreMainPageName} from '../../../pages/Main/Bnb/More/Main';

import Typography from '~components/Typography';

const Tab = createMaterialTopTabNavigator();

const Screen = ({route}) => {
  const point = route?.params?.from;
  const pointId = route?.params?.id;
  const [popupShow, setPopupShow] = useAtom(modalStatusAtom);
  const navigation = useNavigation();
  const theme = useTheme();
  const [total, iAmNotUsingThis] = useAtom(totalReviewWaitListAtom);
  console.log(route, 'etestsets');
  const [totalWritten, AmNotUsingTHis] = useAtom(totalWrittenReview);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () =>
        point !== 'home' ? (
          <BackButton margin={[10, 0]} />
        ) : (
          <Pressable
            onPress={() => navigation.navigate(MoreMainPageName)}
            style={{
              marginLeft: 3,
              width: 30,
              height: 30,
              justifyContent: 'center',
            }}>
            <BackArrow color={'#343337'} />
          </Pressable>
        ),
    });
  }, []);

  return (
    <>
      {popupShow && <Popup setPopupShow={setPopupShow} />}
      <Tab.Navigator
        initialRouteName={point === 'point' && WrittenReviewPageName}
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
          name={ReviewPageName}
          component={Review}
          options={({navigation}) => ({
            tabBarLabel: ({focused}) => (
              <Titles focused={focused}>
                리뷰 작성({total > 10 ? `9+` : total}){' '}
              </Titles>
            ),
            tabBarLabelStyle: {
              fontSize: 15,
              lineHeight: 21,
              fontFamily: 'Pretendard-Regular',
            },
          })}
        />
        <Tab.Screen
          initialParams={{id: pointId}}
          name={WrittenReviewPageName}
          component={WrittenReview}
          options={({navigation}) => ({
            tabBarLabel: ({focused}) => (
              <Titles focused={focused}>
                작성한 리뷰({totalWritten >= 10 ? `9+` : totalWritten})
              </Titles>
            ),
            tabBarLabelStyle: {
              fontSize: 15,
              lineHeight: 21,
              fontFamily: 'Pretendard-Regular',
            },
          })}
        />
      </Tab.Navigator>
    </>
  );
};

export default Screen;

const Titles = styled(Typography).attrs({text: 'Button09SB'})`
  color: ${({theme}) => theme.colors.grey[2]};
  font-weight: ${({focused}) => {
    return focused ? '600' : '400';
  }};
`;
