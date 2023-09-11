/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {app, db, analytics} from './path/to/your/firebaseConfigFile';

AppRegistry.registerComponent(appName, () => App);
