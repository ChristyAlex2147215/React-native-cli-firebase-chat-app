/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {app, db, analytics} from './android/app/src/config/Firebase';

// await db.collection('cities').doc('new-city-id').set({data: 'data'});
AppRegistry.registerComponent(appName, () => App);
