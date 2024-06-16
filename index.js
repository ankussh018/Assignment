/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import firebaseConfig from './src/utils/firebaseConfig';

AppRegistry.registerComponent(appName, () => App);
