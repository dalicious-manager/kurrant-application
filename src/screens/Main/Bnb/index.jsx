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
import {sseType3Atom} from '../../../utils/sse/sseLogics/store';

export const SCREEN_NAME = 'S_MAIN__BNB';

const BottomTab = createBottomTabNavigator();

const Screen = () => {
  const theme = useTheme();
  const [showDim, setShowDim] = useAtom(mainDimAtom);

  const [sseType3] = useAtom(sseType3Atom);

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
                  // 여기에 로직 여러개 들어감
                  //
                  isSse={!!sseType3.type && !sseType3.read}
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
