import 'react-native-gesture-handler';

import { AppRegistry, LogBox } from 'react-native';

import { name as appName } from './app.json';
import App from './src';

AppRegistry.registerComponent(appName, () => App);

LogBox.ignoreLogs(['Did not receive response to shouldStartLoad in time, defaulting to YES']);
<<<<<<< Updated upstream
=======
LogBox.ignoreLogs(['Dynamically changing headerShown in modals will result in remounting the screen and losing all local state. See options for the screen P_LOGIN__MODAL__MAIN_EMAIL_LOGIN']);
>>>>>>> Stashed changes
