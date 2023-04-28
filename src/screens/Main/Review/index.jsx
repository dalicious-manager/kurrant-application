import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {useAtom} from 'jotai';
import React from 'react';
import {Pressable, View} from 'react-native';
import styled, {useTheme} from 'styled-components/native';
import useMypageReview from '../../../biz/useMypageReview/hook';
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
import {
  useNavigation,
  useNavigationState,
  useRoute,
} from '@react-navigation/native';
import {useLayoutEffect} from 'react';
import {PAGE_NAME as MoreMainPageName} from '../../../pages/Main/Bnb/More/Main';
import {
  isReviewFocusedAtom,
  isWrittenReviewFocusedAtom,
} from '../../../pages/Main/MyPage/Review/store';

// import {useRoute} from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

const Screen = ({route}) => {
  const point = route?.params?.from;
  const pointId = route?.params?.id;
  const [popupShow, setPopupShow] = useAtom(modalStatusAtom);
  const navigation = useNavigation();
  const theme = useTheme();
  const [total, iAmNotUsingThis] = useAtom(totalReviewWaitListAtom);

  const [isReveiwFocused, setIsReviewFocused] = useAtom(isReviewFocusedAtom);
  const [isWrittenReveiwFocused, setWrittenIsReviewFocused] = useAtom(
    isWrittenReviewFocusedAtom,
  );

  // const {name} = useRoute();
  // console.log('네임 ');
  // console.log(name);
  // const {index, routeNames} = useNavigationState(state => state);

  // console.log('index' + index);
  // console.log('index' + index);
  // console.log('라우트 이름');
  // console.log(routeNames[index]);

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
        {/* <Tab.Navigator
        screenOptions={({ route }) => ({
        
        
        })}
      > */}

        <Tab.Screen
          name={ReviewPageName}
          component={Review}
          options={{
            tabBarLabel: `리뷰 작성(${total > 10 ? `9+` : total})`,
            tabBarLabelStyle: {
              fontSize: 15,
              lineHeight: 21,
              fontFamily: 'Pretendard-Regular',
              fontWeight: `${isReveiwFocused ? '700' : '400'}`,
            },
          }}
        />

        <Tab.Screen
          initialParams={{id: pointId}}
          name={WrittenReviewPageName}
          component={WrittenReview}
          options={{
            tabBarLabel: `작성한 리뷰(${
              totalWritten > 10 ? `9+` : totalWritten
            })`,
            tabBarLabelStyle: {
              fontSize: 15,
              lineHeight: 21,
              fontFamily: 'Pretendard-Regular',
              fontWeight: `${isWrittenReveiwFocused ? '700' : '400'}`,
            },
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default Screen;
