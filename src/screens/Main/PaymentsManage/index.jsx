import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import styled, { useTheme } from "styled-components/native";


import SelectedDefaultCard, 
{ PAGE_NAME as SelectedDefaultCardPageName } 
from '~pages/Main/MyPage/PersonalInfo/pages/PaymentManage/SelectedDefaultCard';
import EveryCard, 
{ PAGE_NAME as EveryCardPageName } 
from '~pages/Main/MyPage/PersonalInfo/pages/PaymentManage/EveryCard';

export const SCREEN_NAME = 'S_MAIN__PAYMENTS_MANAGE';

const Tab = createMaterialTopTabNavigator();

const Screen = () => {
  const theme = useTheme();
  
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle:{backgroundColor:theme.colors.grey[1],height:2},
        tabBarActiveTintColor: theme.colors.grey[2],
        tabBarInactiveTintColor:theme.colors.grey[2],
        tabBarStyle: { backgroundColor: '#ffffff', },

      }}
    >
      <Tab.Screen 
        name={SelectedDefaultCardPageName}
        component={SelectedDefaultCard}
        options={{ tabBarLabel: '대표카드' ,tabBarLabelStyle:{fontSize:15,lineHeight:21,fontFamily:'Pretendard-Regular',}}}
      />
      <Tab.Screen 
        name={EveryCardPageName}
        component={EveryCard}
        options={{ tabBarLabel: '전체카드'  ,tabBarLabelStyle:{fontSize:15,lineHeight:21,fontFamily:'Pretendard-Regular',}}}
      />
    </Tab.Navigator>
  )
};



export default Screen;