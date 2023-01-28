import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import styled, {useTheme} from 'styled-components/native';

import ActiveCator from '~assets/icons/TabBarIcon/activeCator.svg';
import ActiveHome from '~assets/icons/TabBarIcon/activeHome.svg';
import ActiveMarket from '~assets/icons/TabBarIcon/activeMarket.svg';
import ActiveMeal from '~assets/icons/TabBarIcon/activeMeal.svg';
import ActiveMore from '~assets/icons/TabBarIcon/activeMore.svg';
import Cator from '~assets/icons/TabBarIcon/inactiveCator.svg';
import Home from '~assets/icons/TabBarIcon/inactiveHome.svg';
import Market from '~assets/icons/TabBarIcon/inactiveMarket.svg';
import Meal from '~assets/icons/TabBarIcon/inactiveMeal.svg';
import More from '~assets/icons/TabBarIcon/inactiveMore.svg';
import Cs from '~assets/icons/Home/cs.svg';
import BackButton from '../../../components/BackButton';

// import BackButton from '../../../components/BackButton';
import CatorMainPage, {
  PAGE_NAME as CatorMainPageName,
} from '../../../pages/Main/Bnb/Cator/Main';
import HomeMainPage, {
  PAGE_NAME as HomeMainPageName,
} from '../../../pages/Main/Bnb/Home/Main';
import MarketMainPage, {
  PAGE_NAME as MarketMainPageName,
} from '../../../pages/Main/Bnb/Market/Main';
import MealMainPage, {
  PAGE_NAME as MealMainPageName,
} from '../../../pages/Main/Bnb/Meal/Main';
import MoreMainPage, {
  PAGE_NAME as MoreMainPageName,
} from '../../../pages/Main/Bnb/More/Main';

// import BackButton from '../../../components/BackButton';

export const SCREEN_NAME = 'S_MAIN__BNB';

const BottomTab = createBottomTabNavigator();

const Screen = () => {
  const theme = useTheme();

  return (
    <BottomTab.Navigator
      initialRouteName={HomeMainPageName}
      screenOptions={{
        tabBarActiveTintColor: theme.colors.grey[3],
        //tabBarActiveBackgroundColor: theme.colors.neutral[0],
        tabBarInactiveTintColor: theme.colors.grey[5],
        //tabBarInactiveBackgroundColor: theme.colors.neutral[0],
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
      <BottomTab.Screen
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
      />
      <BottomTab.Screen
        name={MoreMainPageName}
        component={MoreMainPage}
        options={{
          title: '마이페이지',
          headerShown: false,
          // headerTransparent:true,
          tabBarIcon: ({focused}) => (
            <TabBarIconWrap>
              {focused ? <ActiveMore /> : <More />}
            </TabBarIconWrap>
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

const TabBarIconWrap = styled.View`
  justify-content: center;
  align-items: center;
`;

// const TabBarIcon = styled.Image`
//   transform: scale(0.85);
// `;

export default Screen;
