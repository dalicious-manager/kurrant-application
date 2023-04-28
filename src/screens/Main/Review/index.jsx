import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {useAtom} from 'jotai';
import React, {useEffect, useState} from 'react';
import {Pressable, Text, View} from 'react-native';
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
  useIsFocused,
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
import Typography from '~components/Typography';

// import {useRoute} from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

const Screen = ({route}) => {
  const point = route?.params?.from;
  const pointId = route?.params?.id;
  const [popupShow, setPopupShow] = useAtom(modalStatusAtom);
  const navigation = useNavigation();
  const theme = useTheme();
  const [total, iAmNotUsingThis] = useAtom(totalReviewWaitListAtom);

  // const [isReveiwFocused, setIsReviewFocused] = useAtom(isReviewFocusedAtom);
  // const [isWrittenReveiwFocused, setWrittenIsReviewFocused] = useAtom(
  //   isWrittenReviewFocusedAtom,
  // );

  // const yo1 = navigation.getState();
  // const yo2 = navigation.getParent();

  // console.log('로로로ㅗㄹ');
  // console.log(yo1);
  // console.log('로로로ㅗㄹ2');
  // console.log(yo2);

  // const {name} = useRoute();
  // console.log('네임 ');
  // console.log(name);
  // const state = useNavigationState(state => state);

  // console.log(state);

  // console.log('index' + index);
  // console.log('index' + index);
  // console.log('라우트 이름');
  // console.log(routeNames[index]);

  // const index = useNavigationState(state => state.index);

  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const unsubscribe = navigation.addListener('state', e => {
      // Get the index of the currently active tab

      console.log('난 살아있다 ');
      console.log(e);

      const tabIndex = e.data.state.index;

      // const tabName = e.data.state.routes[tabIndex].name;

      // Update the state with the name of the currently active tab
      setActiveTab(tabIndex);
    });

    // Unsubscribe from the event when the component unmounts
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    console.log('엑티브탭');
    console.log(activeTab);
  }, [activeTab]);

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

              // fontWeight: `${isReveiwFocused ? '600' : '400'}`,
              // fontWeight: `${navigation === 0 ? '700' : '400'}`,
            },
          })}
        />
        <Tab.Screen
          initialParams={{id: pointId}}
          name={WrittenReviewPageName}
          component={WrittenReview}
          options={({navigation}) => ({
            tabBarLabel: `작성한 리뷰(${
              totalWritten > 10 ? `9+` : totalWritten
            })`,
            tabBarLabelStyle: {
              fontSize: 15,
              lineHeight: 21,
              fontFamily: 'Pretendard-Regular',
              // fontWeight: `${navigation.getState.index === 1 ? '700' : '400'}`,
            },
          })}
        />

        {/* <Tab.Screen
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
              fontWeight: `${isWrittenReveiwFocused ? '600' : '400'}`,
            },
          }}
        /> */}
      </Tab.Navigator>
    </>
  );
};

export default Screen;

const TitlesView = styled.View`
  /* width: 60px; */
  border: 1px solid black;
  display: flex;
  align-items: center;
  width: 40px;
`;

const Titles = styled(Typography).attrs({text: 'Button09SB'})`
  /* margin-right: 4px; */
  color: ${({theme}) => theme.colors.grey[2]};
  font-weight: ${({focused}) => {
    // console.log('포커스된건가?');
    // console.log(focused);
    return focused ? '600' : '400';
  }};
`;
