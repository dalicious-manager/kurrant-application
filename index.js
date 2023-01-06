import 'react-native-gesture-handler';

import { AppRegistry, LogBox } from 'react-native';

import { name as appName } from './app.json';
import App from './src';

AppRegistry.registerComponent(appName, () => App);

LogBox.ignoreLogs(['Did not receive response to shouldStartLoad in time, defaulting to YES']);
