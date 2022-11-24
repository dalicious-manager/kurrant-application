import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Octicons from 'react-native-vector-icons/Octicons';
import styled, { useTheme } from "styled-components/native";

import ExchangeMainPage, { PAGE_NAME as ExchangeMainPageName } from '../../../pages/Main/Bnb/Exchange/Main';
import IndexCardMainPage, { PAGE_NAME as IndexCardMainPageName } from '../../../pages/Main/Bnb/IndexCard/Main';
import InformationMainPage, { PAGE_NAME as InformationMainPageName } from '../../../pages/Main/Bnb/Information/Main';
import InvestmentMainPage, { PAGE_NAME as InvestmentMainPageName } from '../../../pages/Main/Bnb/Investment/Main';
import StatementMainPage, { PAGE_NAME as StatementMainPageName } from '../../../pages/Main/Bnb/Statement/Main';

export const SCREEN_NAME = 'S_MAIN__BNB';

const BottomTab = createBottomTabNavigator();

const ActiveExchangeIcon = require('../../../assets/images/TabBarIcon/activeExchange.png');
const ActiveIndexIcon = require('../../../assets/images/TabBarIcon/activeIndex.png');
const ActiveInformationIcon = require('../../../assets/images/TabBarIcon/activeInformation.png');
const ActiveStatementIcon = require('../../../assets/images/TabBarIcon/activeStatement.png');
const ExchangeIcon = require('../../../assets/images/TabBarIcon/inactiveExchange.png');
const IndexIcon = require('../../../assets/images/TabBarIcon/inactiveIndex.png');
const InformationIcon = require('../../../assets/images/TabBarIcon/inactiveInformation.png');
const StatementIcon = require('../../../assets/images/TabBarIcon/inactiveStatement.png');

const Screen = () => {
  const theme = useTheme();

  return (
    <BottomTab.Navigator
      initialRouteName={ExchangeMainPageName}
      screenOptions={{
        tabBarActiveTintColor: theme.colors.purple[500],
        tabBarActiveBackgroundColor: theme.colors.neutral[0],
        tabBarInactiveTintColor: theme.colors.neutral[300],
        tabBarInactiveBackgroundColor: theme.colors.neutral[0],
      }}
    >
      <BottomTab.Screen
        name={ExchangeMainPageName}
        component={ExchangeMainPage}
        options={{
          title: '거래소',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIconWrap>
              {color === theme.colors.purple[500] ? (
                <TabBarIcon source={ActiveExchangeIcon} />
              ) : (
                <TabBarIcon source={ExchangeIcon} />
              )}
            </TabBarIconWrap>
          )
        }}
      />
      <BottomTab.Screen
        name={InvestmentMainPageName}
        component={InvestmentMainPage}
        options={{
          title: '투자내역',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIconWrap>
              {color === theme.colors.purple[500] ? (
                <Octicons name={'stack'} size={20} color={theme.colors.purple[500]} />
              ) : (
                <Octicons name={'stack'} size={20} color={theme.colors.neutral[300]} />
              )}
            </TabBarIconWrap>
          )
        }}
      />
      <BottomTab.Screen
        name={StatementMainPageName}
        component={StatementMainPage}
        options={{
          title: '입출금',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIconWrap>
              {color === theme.colors.purple[500] ? (
                <TabBarIcon source={ActiveStatementIcon} />
              ) : (
                <TabBarIcon source={StatementIcon} />
              )}
            </TabBarIconWrap>
          )
        }}
      />
      <BottomTab.Screen
        name={IndexCardMainPageName}
        component={IndexCardMainPage}
        options={{
          title: '인덱스',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIconWrap>
              {color === theme.colors.purple[500] ? (
                <TabBarIcon source={ActiveIndexIcon} />
              ) : (
                <TabBarIcon source={IndexIcon} />
              )}
            </TabBarIconWrap>
          )
        }}
      />
      <BottomTab.Screen
        name={InformationMainPageName}
        component={InformationMainPage}
        options={{
          title: '내정보',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIconWrap>
              {color === theme.colors.purple[500] ? (
                <TabBarIcon source={ActiveInformationIcon} />
              ) : (
                <TabBarIcon source={InformationIcon} />
              )}
            </TabBarIconWrap>
          )
        }}
      />
    </BottomTab.Navigator>
  )
};

const TabBarIconWrap = styled.View`
  justify-content: center;
  align-items: center;
`;

const TabBarIcon = styled.Image`
  transform: scale(0.85);
`;

export default Screen;