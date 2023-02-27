import messaging from '@react-native-firebase/messaging';
import {NavigationContainer, useFocusEffect} from '@react-navigation/native';
import analytics from '@react-native-firebase/analytics';
import React, {useCallback, useEffect} from 'react';
import {StatusBar, LogBox, Text, TextInput} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import {ThemeProvider} from 'styled-components';
import codePush from 'react-native-code-push';
import Screen from './screens';
import Theme from './theme';
import Config from 'react-native-config';
import styled from 'styled-components/native';
LogBox.ignoreLogs(["exported from 'deprecated-react-native-prop-types'."]);
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;
const App = () => {
  const routeNameRef = React.useRef();
  const navigationRef = React.useRef();

  useEffect(() => {
    SplashScreen.hide();
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
    <ThemeProvider theme={Theme}>
      <SafeAreaProvider>
        <StatusBar />
        {Config.NODE_ENV === 'dev' && <IsDevelop>개발서버 입니다.</IsDevelop>}
        <NavigationContainer
          ref={navigationRef}
          onReady={() => {
            routeNameRef.current = navigationRef.current.getCurrentRoute().name;
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
    </ThemeProvider>
  );
};
export default codePush(App);

const IsDevelop = styled.Text`
  width: 100%;
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
