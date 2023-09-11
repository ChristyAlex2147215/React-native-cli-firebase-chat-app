import React, {useState, useEffect, createContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [state, setState] = useState({user: null}); // Initialize user as an empty object
  const navigation = useNavigation();

  useEffect(() => {
    const loadFromAsyncStorage = async () => {
      try {
        const data = await AsyncStorage.getItem('@auth');
        const processed_data = JSON.parse(data);
        if (processed_data && processed_data.user !== null) {
          // Check if processed_data and processed_data.user are truthy
          console.log(
            'user data fetched from async storage is =>',
            JSON.stringify(processed_data.user),
          );
          setState({
            ...state,
            user: processed_data.user,
          });
        } else {
          navigation.navigate('Login');
        }
      } catch (error) {
        console.error('Error loading data from AsyncStorage:', error);
      }
    };
    loadFromAsyncStorage();
  }, []);

  return (
    <AuthContext.Provider value={[state, setState]}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthContext, AuthProvider};
