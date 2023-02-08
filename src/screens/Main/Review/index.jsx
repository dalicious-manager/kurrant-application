import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useAtom} from 'jotai';
import React, {useLayoutEffect} from 'react';
import styled, {useTheme} from 'styled-components/native';
import useMypageReview from '../../../biz/useMypageReview/hook';
import {totalReviewWaitList} from '../../../biz/useReview/useReviewWait/store';
import {totalWrittenReview} from '../../../biz/useReview/useWrittenReview/store';

export const SCREEN_NAME = 'S_MAIN__REVIEW';
import Review, {
  PAGE_NAME as ReviewPageName,
} from '../../../pages/Main/MyPage/Review';
import WrittenReview, {
  PAGE_NAME as WrittenReviewPageName,
} from '../../../pages/Main/MyPage/WrittenReview';

const Tab = createMaterialTopTabNavigator();

const Screen = () => {
  const theme = useTheme();
  const [total, iAmNotUsingThis] = useAtom(totalReviewWaitList);

  const [totalWritten, AmNotUsingTHis] = useAtom(totalWrittenReview);

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
        name={ReviewPageName}
        component={Review}
        options={{
          tabBarLabel: `리뷰 작성(${total})`,
          tabBarLabelStyle: {
            fontSize: 15,
            lineHeight: 21,
            fontFamily: 'Pretendard-Regular',
          },
        }}
      />

      <Tab.Screen
        name={WrittenReviewPageName}
        component={WrittenReview}
        options={{
          tabBarLabel: `작성한 리뷰(${totalWritten})`,
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
