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
  const [to, setTo] = useState('');
  const [roomId, SetRoomId] = useState();

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

  const updateLastSeen = async email => {
    const usersRef = firestoreForDefaultApp.collection('users').doc('users');

    // Fetch the current data
    const doc = await usersRef.get();

    if (doc.exists) {
      const userData = doc.data();

      // Find the index of the element with the matching email
      const emailIndex = userData.email.findIndex(item => item.email === email);

      if (emailIndex !== -1) {
        // Update the lastOpen field for the matching element
        userData.email[emailIndex].lastOpen = new Date();

        // Update the document with the modified data
        await usersRef.update({
          email: userData.email,
        });

        console.log('lastOpen updated successfully.');
      } else {
        console.log('Email not found in the array.');
      }
    } else {
      console.log('Document does not exist.');
    }
  };

  const setRoom = async to => {
    await updateLastSeen(to);
    let roomId;

    if (to === 'Group Chat') {
      roomId = 'chatID4';
    } else {
      const usersSet = new Set([state.user, to]);

      if (
        usersSet.has('christy@gmail.com') &&
        usersSet.has('christyalexgamer@gmail.com')
      ) {
        roomId = 'chatID1';
      } else if (
        usersSet.has('christy@gmail.com') &&
        usersSet.has('christyalexe@gmail.com')
      ) {
        roomId = 'chatID2';
      } else if (
        usersSet.has('christyalexgamer@gmail.com') &&
        usersSet.has('christyalexe@gmail.com')
      ) {
        roomId = 'chatID3';
      }
    }
    console.log('ROOM ID is =>', roomId);
    navigation.navigate('Chat', {
      chatId: roomId,
      otherUser: users[0],
    });
  };

  return (
    // <View>
    //   <View style={{justifyContent: 'center', flexDirection: 'column'}}>
    //     {users?.email?.map((item, index) => {
    //       console.log(item);
    //       console.log(state.user);
    //       if (item !== state.user) {
    //         return (
    //           <TouchableOpacity
    //             onPress={item => setRoom(item)}
    //             key={index}
    //             style={{
    //               flexDirection: 'row',
    //               justifyContent: 'space-evenly',
    //               marginTop: 15,
    //               backgroundColor: 'grey',
    //             }}>
    //             <Image
    //               source={require('../image/jss.png')}
    //               style={{
    //                 backgroundColor: 'white',
    //                 width: 50,
    //                 aspectRatio: 1,
    //                 borderRadius: 25,
    //                 borderColor: 'black',
    //                 borderWidth: 2,
    //               }}
    //             />
    //             <Text
    //               style={{
    //                 fontSize: 18,
    //                 textAlign: 'auto',
    //                 justifyContent: 'center',
    //                 alignSelf: 'center',
    //               }}>
    //               {item.email}
    //             </Text>
    //           </TouchableOpacity>
    //         );
    //       } else {
    //         return <></>;
    //       }
    //     })}
    //   </View>
    //   {/* fab */}
    //   {/* <View style={styles.container}>
    //     <TouchableOpacity
    //       onPress={() => navigation.navigate('Chat')}
    //       style={styles.chatButton}>
    //       <Text
    //         style={{
    //           fontSize: 22,
    //           justifyContent: 'center',
    //           alignContent: 'center',
    //         }}>
    //         Encrypto
    //       </Text>
    //     </TouchableOpacity>
    //   </View> */}
    // </View>
    <View>
      <View style={{justifyContent: 'center', flexDirection: 'column'}}>
        {/* Sort the users array by lastOpen timestamps in descending order */}
        {users[0]?.email
          .sort((a, b) => b.lastOpen.seconds - a.lastOpen.seconds)
          .map((user, index) => {
            console.log(index, user);
            if (user.email !== state.user) {
              return (
                <TouchableOpacity
                  onPress={() => setRoom(user.email)} // Pass the email here
                  key={index}
                  style={{
                    flexDirection: 'row',
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
                      marginHorizontal:10
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 18,
                      textAlign: 'auto',
                      justifyContent: 'center',
                      alignSelf: 'center',
                      marginLeft:40
                    }}>
                    {user.email}
                  </Text>
                </TouchableOpacity>
              );
            } else {
              return <></>;
            }
          })}
      </View>
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
