import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import {StyleSheet, View} from 'react-native';

import {LogoImage} from '../../../../assets';
import Image from '../../../../components/Image';
import Wrapper from '../../../../components/Wrapper';
import TabBar from './_components/TabBar';
import LoginCorperationModal, {
  PAGE_NAME as LoginCorperationModalPageName,
} from './LoginCorperation';
import LoginPersonModal, {
  PAGE_NAME as LoginPersonModalPageName,
} from './LoginPerson';
export const PAGE_NAME = 'P_LOGIN__MODAL__MAIN_LOGIN';

const TabRoot = createMaterialTopTabNavigator();

const Pages = ({navigation}) => {
  const sceneStyles = {backgroundColor: '#fff'};
  return (
    <Wrapper styles={styles.container}>
      <View style={styles.headerContainer}>
        <Image imagePath={LogoImage} scale={0.5} />
      </View>
      <TabRoot.Navigator tabBar={TabBar} sceneContainerStyle={sceneStyles}>
        <TabRoot.Screen
          name={LoginPersonModalPageName}
          component={LoginPersonModal}
          options={{
            title: '개인회원',
          }}
        />
        <TabRoot.Screen
          name={LoginCorperationModalPageName}
          component={LoginCorperationModal}
          options={{
            title: '법인회원',
          }}
        />
      </TabRoot.Navigator>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    backgroundColor: '#fff',
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
  },
  headerTitle: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  tabTitleContainer: {
    width: '100%',
    maxWidth: 52,
    height: 28,
  },
});

export default Pages;
