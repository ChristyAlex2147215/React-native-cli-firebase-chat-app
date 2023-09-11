import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Navigation from './navigation';
import {AuthProvider} from './android/app/src/context/authContext';

const App = () => {
  return <Navigation />;
};

export default App;

const styles = StyleSheet.create({});
