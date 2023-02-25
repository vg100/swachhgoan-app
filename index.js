/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
global.ErrorUtils.setGlobalHandler(error => {
    console.log('Global Error：');
    console.log(error.name, error.message, [{text: 'OK'}]);
  }, true);
AppRegistry.registerComponent(appName, () => App);
