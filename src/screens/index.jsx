import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Main from './Main';
const Root = createNativeStackNavigator();

const Screen = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Root.Navigator>
          <Root.Group screenOptions={{ headerShown: false }}>
            <Root.Screen name="ROOT" component={Main} style={styles.rootView} />
          </Root.Group>
        </Root.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
  },
});

export default Screen;
