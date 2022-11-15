import {Provider} from 'jotai';
import React, {useEffect} from 'react';
import {StatusBar, LogBox} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import {ThemeProvider} from 'styled-components';

import Screen from './screens';
import Theme from './theme';

LogBox.ignoreLogs(["exported from 'deprecated-react-native-prop-types'."]);

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider>
      <ThemeProvider theme={Theme}>
        <SafeAreaProvider>
          <StatusBar />
          <Screen />
        </SafeAreaProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
