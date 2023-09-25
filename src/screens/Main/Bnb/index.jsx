import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useRoute} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React, {useEffect} from 'react';
import styled, {useTheme} from 'styled-components/native';
import ActiveHome from '~assets/icons/TabBarIcon/activeHome.svg';
import ActiveMeal from '~assets/icons/TabBarIcon/activeMeal.svg';
import ActiveMore from '~assets/icons/TabBarIcon/activeMore.svg';
import Home from '~assets/icons/TabBarIcon/inactiveHome.svg';
import Meal from '~assets/icons/TabBarIcon/inactiveMeal.svg';
import More from '~assets/icons/TabBarIcon/inactiveMore.svg';

// import BackButton from '../../../components/BackButton';
import HomeMainPage, {
  PAGE_NAME as HomeMainPageName,
} from '../../../pages/Main/Bnb/Home/Main';
import MealMainPage, {
  PAGE_NAME as MealMainPageName,
} from '../../../pages/Main/Bnb/Meal/Main';
import MoreMainPage, {
  PAGE_NAME as MoreMainPageName,
} from '../../../pages/Main/Bnb/More/Main';
import MainDim from '../../../pages/Spots/spotGuide/MainDim';
import {mainDimAtom} from '../../../utils/store';
import SseRedDot from '../../../utils/sse/SseService/SseRedDot/SseRedDot';
import {
  sseType1Atom,
  sseType2Atom,
  sseType3Atom,
  sseType8Atom,
} from '../../../utils/sse/sseLogics/store';
import useSse from '../../../utils/sse/sseLogics/useSse';
import {totalReviewWaitListAtom} from '../../../biz/useReview/useReviewWait/store';

export const SCREEN_NAME = 'S_MAIN__BNB';

const BottomTab = createBottomTabNavigator();

const Screen = () => {
  const theme = useTheme();
  const [showDim, setShowDim] = useAtom(mainDimAtom);

  const [total] = useAtom(totalReviewWaitListAtom);

  const {sseHistory, sseHistoryRefetch} = useSse();

  // sseType1, sseType2, sseType3, sseType8

  const [sseType3] = useAtom(sseType3Atom);
  const [sseType1] = useAtom(sseType1Atom);
  const [sseType2] = useAtom(sseType2Atom);
  const [sseType8] = useAtom(sseType8Atom);

  return (
    <React.Fragment>
      {showDim && <MainDim />}
      <BottomTab.Navigator
        // initialRouteName={HomeMainPageName}
        screenOptions={{
          tabBarActiveTintColor: theme.colors.grey[3],

          tabBarInactiveTintColor: theme.colors.grey[5],
        }}>
        <BottomTab.Screen
          name={HomeMainPageName}
          component={HomeMainPage}
          options={{
            title: '홈',
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <TabBarIconWrap>
                {focused ? <ActiveHome /> : <Home />}
              </TabBarIconWrap>
            ),
          }}
        />
        <BottomTab.Screen
          name={MealMainPageName}
          component={MealMainPage}
          options={{
            title: '식사',
            headerTitle: '식사일정',
            headerShown: true,
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
              lineHeight: 22,
            },
            // headerLeft: () => <BackButton margin={[24,24]}/>,
            tabBarIcon: ({focused}) => (
              <TabBarIconWrap>
                {focused ? <ActiveMeal /> : <Meal />}
              </TabBarIconWrap>
            ),
          }}
        />
        {/* <BottomTab.Screen
        name={CatorMainPageName}
        component={CatorMainPage}
        options={{
          title: '케이터링',
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <TabBarIconWrap>
              {focused ? <ActiveCator /> : <Cator />}
            </TabBarIconWrap>
          ),
          // tabBarShowLabel: true,
          // headerTitleAlign: 'center',
          // headerTitleStyle: {
          //   fontFamily: 'Pretendard-SemiBold',
          //   fontSize: 14,
          //   lineHeight: 22,
          //   // marginRight: 60,
          // },
          // headerRight: () => <Cs />,
        }}
      />
      <BottomTab.Screen
        name={MarketMainPageName}
        component={MarketMainPage}
        options={{
          title: '마켓',
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <TabBarIconWrap>
              {focused ? <ActiveMarket /> : <Market />}
            </TabBarIconWrap>
          ),
        }}
      /> */}
        <BottomTab.Screen
          name={MoreMainPageName}
          component={MoreMainPage}
          options={{
            title: '마이페이지',
            headerShown: false,
            // headerTransparent:true,
            tabBarIcon: ({focused}) => (
              <TabBarIconWrap>
                <SseRedDotMyPage
                  isSse={
                    // // 리뷰 sseType3
                    (!!sseType3.type && !sseType3.read) ||
                    !!sseHistory?.find(v => v.type === 3) ||
                    // // 사장님 댓글 sseType8
                    (!!sseType8.type && !sseType8.read) ||
                    !!sseHistory?.find(v => v.type === 8) ||
                    // // 전체공지 & 스팟공지 sseType1, sseType2
                    (!!sseType1.type && !sseType1.read) ||
                    !!sseHistory?.find(v => v.type === 1) ||
                    (!!sseType2.type && !sseType2.read) ||
                    !!sseHistory?.find(v => v.type === 2)
                  }
                  position="absolute"
                  right="-6px"
                  top="-3px">
                  {focused ? <ActiveMore /> : <More />}
                </SseRedDotMyPage>
              </TabBarIconWrap>
            ),
          }}
        />
      </BottomTab.Navigator>
    </React.Fragment>
  );
};

const TabBarIconWrap = styled.View`
  justify-content: center;
  align-items: center;
`;

// const TabBarIcon = styled.Image`
//   transform: scale(0.85);
// `;

const SseRedDotMyPage = styled(SseRedDot)``;

export default Screen;
