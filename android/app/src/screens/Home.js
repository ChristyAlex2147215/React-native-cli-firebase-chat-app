import React, {useContext, useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, Image, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {db} from '../config/Firebase';
import firestore from '@react-native-firebase/firestore'; // Import firestore correctly
import {AuthContext} from '../context/authContext';
// import { FontAwesome } from '@expo/vector-icons';
// import colors from '../colors';
// import { Entypo } from '@expo/vector-icons';
const Home = () => {
  const navigation = useNavigation();
  const [users, SetUsers] = useState({});
  const firestoreForDefaultApp = firestore();
  const [state, setState] = useContext(AuthContext);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const usersCollection = await firestoreForDefaultApp
          .collection('users')
          .get();

        // Extract user data from the collection
        const usersData = [];
        usersCollection.forEach(document => {
          usersData.push(document.data());
        });

        console.log('All users:', usersData);
        SetUsers(usersData);
        // You can now do something with the usersData array, such as displaying it in your app.
        return usersData;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchAllUsers();
  }, []);

  return (
    <View>
      <View style={{justifyContent: 'center', flexDirection: 'column'}}>
        {users[0]?.email?.map((item, index) => {
          console.log(item);
          console.log(state.user);
          if (item !== state.user) {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Chat', {
                    chatId: 'chatID1',
                    otherUser: users[0],
                  })
                }
                key={index}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  marginTop: 15,
                  backgroundColor: 'grey',
                }}>
                <Image
                  source={require('../image/jss.png')}
                  style={{
                    backgroundColor: 'white',
                    width: 50,
                    aspectRatio: 1,
                    borderRadius: 25,
                    borderColor: 'black',
                    borderWidth: 2,
                  }}
                />
                <Text
                  style={{
                    fontSize: 18,
                    textAlign: 'auto',
                    justifyContent: 'center',
                    alignSelf: 'center',
                  }}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          } else {
            return <></>;
          }
        })}
      </View>
      {/* fab */}
      {/* <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Chat')}
          style={styles.chatButton}>
          <Text
            style={{
              fontSize: 22,
              justifyContent: 'center',
              alignContent: 'center',
            }}>
            Encrypto
          </Text>
        </TouchableOpacity>
      </View> */}
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
