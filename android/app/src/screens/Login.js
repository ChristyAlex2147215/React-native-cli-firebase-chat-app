import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {AuthContext} from '../context/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore'; // Import firestore correctly
import {db} from '../config/Firebase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [state, setState] = useContext(AuthContext);
  const firestoreForDefaultApp = firestore();
  console.log('Default app =>', firestoreForDefaultApp);

  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      console.log(`Username: ${email}`);
      console.log(`Password: ${password}`);

      const login = await auth().signInWithEmailAndPassword(email, password);
      console.log('User signed in with username and password');
      setState({user: email});
      await AsyncStorage.setItem('@auth', JSON.stringify({user: email}));

      // Add a new document with a generated id.
      try {
        await firestoreForDefaultApp
          .collection('users')
          .doc('users')
          .update({
            email: firestore.FieldValue.arrayUnion({
              email,
              lastOpen: new Date(),
            }),
          });
      } catch (firestoreError) {
        console.error('Error adding document to Firestore:', firestoreError);
      }

      console.log('Login successful');
      navigation.navigate('Home');
    } catch (error) {
      if (
        error.code === 'auth/user-not-found' ||
        error.code === 'auth/wrong-password'
      ) {
        Alert.alert('Login Failed', 'Invalid email or password');
      } else if (error.code === 'auth/operation-not-allowed') {
        Alert.alert('Login Failed', 'Email/password login is not enabled');
        console.log('Enable email/password sign-in in your Firebase console.');
      } else {
        Alert.alert('Login Failed', 'An error occurred during login');
      }

      console.error('Error during login:', error);
    }
  };

  const navigateSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <View style={{flexDirection: 'row', marginTop: 20}}>
        <Text>Don't have an Account? </Text>
        <Text style={styles.link} onPress={navigateSignUp}>
          SignUp
        </Text>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  link: {
    color: 'blue',
    fontSize: 16,
    marginHorizontal: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    margin: 10,
    padding: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});
