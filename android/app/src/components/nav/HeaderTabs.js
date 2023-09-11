import React, {useState, useContext} from 'react';
import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import {AuthContext, AuthProvider} from '../../context/authContext';
// import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import AsyncStorage from '@react-native-async-storage/async-storage';

// export const signout = async () => {
//   const [state, setState] = useContext(AuthContext);
//   console.log('See ya, Signing out');
//   setState({user: null});
//   await AsyncStorage.removeItem('@auth');
// };

const HeaderTabs = () => {
  const [state, setState] = useContext(AuthContext);

  const signout = async () => {
    setState({user: null});
    await AsyncStorage.removeItem('@auth');
  };

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={signout}>
        {/* <FontAwesome5Icon name="sign-out-alt" size={25} /> */}
        <Text>S-out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HeaderTabs;
