import messaging from '@react-native-firebase/messaging';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {StatusBar, LogBox, Text,TextInput} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import {ThemeProvider} from 'styled-components';
import codePush from "react-native-code-push";
import Screen from './screens';
import Theme from './theme';
LogBox.ignoreLogs(["exported from 'deprecated-react-native-prop-types'."]);
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling=false; 
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling=false; 
const App = () => {
  
  useEffect(()=>{
    
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
  },[])
  return (
      <ThemeProvider theme={Theme}>
        <SafeAreaProvider>
          <StatusBar />
          <NavigationContainer>
          <Screen />
          </NavigationContainer>
        </SafeAreaProvider>
      </ThemeProvider>
  );
};
export default codePush(App);


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