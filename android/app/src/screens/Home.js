import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, Image, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { db } from '../config/Firebase';
// import { FontAwesome } from '@expo/vector-icons';
// import colors from '../colors';
// import { Entypo } from '@expo/vector-icons';
const Home = () => {
  const navigation = useNavigation();
  const [users, SetUsers] = useState({});

  useEffect(() => {
  
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Chat')}
        style={styles.chatButton}>
        {/* <Entypo name="chat" size={24} color={colors.lightGray} /> */}
        <Text
          style={{
            fontSize: 22,
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          Encrypto
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: '#fff',
  },
  chatButton: {
    backgroundColor: 'yellow',
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.9,
    shadowRadius: 8,
    marginRight: 20,
    marginBottom: 50,
  },
});
