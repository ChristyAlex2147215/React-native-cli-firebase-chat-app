import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthContext, AuthProvider} from './android/app/src/context/authContext';
import NavComp from './android/app/src/components/nav/nav/NavComp';

const Stack = createNativeStackNavigator();

function Navigation() {
  // const [state, setState] = useContext(AuthContext); // Destructure the state directly
  // console.log(state);
  // const isAuthenticated = state && state.user !== null;
  // console.log('Authenticated =>', isAuthenticated);

  return (
    <NavigationContainer>
      <AuthProvider>
        <NavComp />
      </AuthProvider>
    </NavigationContainer>
  );
}

export default Navigation;
