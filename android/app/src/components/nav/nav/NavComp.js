import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../../../screens/Login';
import Signup from '../../../screens/Signup';
import Home from '../../../screens/Home';
import HeaderTabs from '../HeaderTabs';
import {AuthContext, AuthProvider} from '../../../context/authContext';
import Chat from '../../../screens/Chat';

const Stack = createNativeStackNavigator();

function NavComp() {
  const [state, setState] = useContext(AuthContext); // Destructure the state directly
  console.log(state);
  const isAuthenticated = state && state.user !== null;
  console.log('Authenticated =>', isAuthenticated);

  if (isAuthenticated) {
    return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Home page',
            headerBackTitle: 'Go Back',
            headerRight: () => <HeaderTabs />,
          }}
        />
        {/* <Stack.Screen name="Login" component={Login} /> */}
        {/* <Stack.Screen name="SignUp" component={Signup} /> */}
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={Signup} />
      </Stack.Navigator>
    );
  }
}

export default NavComp;
