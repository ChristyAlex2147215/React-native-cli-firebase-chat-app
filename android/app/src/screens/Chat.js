import React, {useState, useEffect, useContext} from 'react';
import {View, FlatList, Text, TextInput, Button} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../context/authContext';

function Chat({route}) {
  const {chatId, otherUser} = route.params;
  console.log(chatId);
  console.log(otherUser);
  const [messages, setMessages] = useState([]);
  const user = auth().currentUser;
  const firestoreForDefaultApp = firestore();
  const [state, setState] = useContext(AuthContext);

  useEffect(() => {
    const chatRef = firestoreForDefaultApp
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .limit(20);

    const unsubscribe = chatRef.onSnapshot(querySnapshot => {
      const messagesData = querySnapshot.docs.map(doc => {
        const data = doc.data();
        const firebaseMessage = {
          ...data,
          createdAt: data.createdAt.toDate(),
        };
        return firebaseMessage;
      });
      setMessages(messagesData);
    });

    return () => unsubscribe();
  }, [chatId]);

  const renderMessage = ({item}) => {
    const isSent = item.sender === state.user;
    return (
      <View
        style={{
          alignSelf: isSent ? 'flex-end' : 'flex-start',
          backgroundColor: isSent ? 'lightblue' : 'lightgray',
          borderRadius: 5,
          margin: 5,
          padding: 10,
        }}>
        <Text>{item.text}</Text>
      </View>
    );
  };

  const onSend = (newMessages = []) => {
    const message = newMessages[0];
    firestoreForDefaultApp
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .add({
        text: message.text,
        sender: state.user,
        createdAt: new Date(),
      });
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={messages}
        keyExtractor={item => item._id}
        renderItem={renderMessage}
        inverted
      />
      <GiftedChat
        onSend={newMessages => onSend(newMessages)}
        user={{_id: state.user}}
      />
    </View>
  );
}

export default Chat;
