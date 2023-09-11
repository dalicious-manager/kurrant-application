import analytics from '@react-native-firebase/analytics';
import messaging from '@react-native-firebase/messaging';
import {NavigationContainer, useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useEffect} from 'react';
import {StatusBar, LogBox, Text, TextInput} from 'react-native';
import codePush from 'react-native-code-push';
import Config from 'react-native-config';
import {PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {QueryClient, QueryClientProvider} from 'react-query';
import {ThemeProvider} from 'styled-components';
import styled from 'styled-components/native';

import Screen from './screens';
import Theme from './theme';

LogBox.ignoreLogs(["exported from 'deprecated-react-native-prop-types'."]);
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;

const App = () => {
  const routeNameRef = React.useRef();
  const navigationRef = React.useRef();
  const queryClient = new QueryClient();

  useEffect(() => {
    async function requestUserPermission() {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
    }
    requestUserPermission();
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={Theme}>
        <PaperProvider>
          <SafeAreaProvider>
            <StatusBar />
            {Config.NODE_ENV === 'dev' && (
              <IsDevelop>개발서버 입니다.</IsDevelop>
            )}
            {Config.NODE_ENV === 'rel' && <IsDevelop>QA 서버입니다.</IsDevelop>}
            <NavigationContainer
              ref={navigationRef}
              onReady={() => {
                routeNameRef.current =
                  navigationRef.current.getCurrentRoute().name;
              }}
              onStateChange={async () => {
                const previousRouteName = routeNameRef.current;
                const currentRouteName =
                  navigationRef.current.getCurrentRoute().name;

                if (previousRouteName !== currentRouteName) {
                  await analytics().logScreenView({
                    screen_name: currentRouteName,
                    screen_class: currentRouteName,
                  });
                }
                routeNameRef.current = currentRouteName;
              }}>
              <Screen />
            </NavigationContainer>
          </SafeAreaProvider>
        </PaperProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default codePush(App);

const IsDevelop = styled.Text`
  position: absolute;
  background-color: #00000066;
  width: 100%;
  color: white;

  top: 0px;
  right: 0px;
  z-index: 1;
  text-align: center;
  align-items: center;
  justify-content: center;
`;

//                   _ooOoo_
//                  o8888888o
//                  88" . "88
//                  (| -_- |)
//                  O\  =  /O
//               ____/`---'\____
//             .'  \\|     |//  `.
//            /  \\|||  :  |||//  \
//           /  _||||| -:- |||||-  \
//           |   | \\\  -  /// |   |
//           | \_|  ''\---/''  |   |
//           \  .-\__  `-`  ___/-. /
//         ___`. .'  /--.--\  `. . __
//      ."" '<  `.___\_<|>_/___.'  >'"".
//     | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//     \  \ `-.   \_ __\ /__ _/   .-` /  /
//======`-.____`-.___\_____/___.-`____.-'======
//                   `=---='
//
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//          佛祖保佑           永无BUG
//         God Bless        Never Crash
