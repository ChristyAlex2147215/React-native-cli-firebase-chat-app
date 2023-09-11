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
// import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
// import {app, analytics, db} from '../config/Firebase';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [state, setState] = useContext(AuthContext);
  const navigation = useNavigation();

  const emailChange = text => {
    setEmail(text);
  };

  const passwordChange = text => {
    setPassword(text);
  };

  const confirmChangePassword = text => {
    setConfirmPassword(text);
  };

  const navigateLogin = () => {
    navigation.navigate('Login');
  };

  const handleSignup = async () => {
    // You can implement your signup logic here
    console.log('email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmpassword);

    if (email.trim() !== '' && password === confirmpassword) {
      const makeuser = await auth()
        .createUserWithEmailAndPassword(email, password)
        .then(async () => {
          console.log('User account created & signed in!');
          setState({user: email});
          console.log(makeuser);
          await AsyncStorage.setItem('@auth', JSON.stringify({user: email}));
          navigation.navigate('Home');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
            Alert.alert('SignUp failed', 'Email already in use');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
            Alert.alert('SignUp failed', 'Invalid Email');
          }

          console.error(error);
        });
    } else {
      console.log("Invalid Email or passwords dosen't match");
      // Handle validation errors or display messages to the user
    }
  };

  return (
    <View style={styles.container}>
      <Text>Signup</Text>
      <TextInput
        style={styles.input}
        placeholder="email"
        onChangeText={text => emailChange(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={text => passwordChange(text)}
        value={password}
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        onChangeText={text => confirmChangePassword(text)}
        value={confirmpassword}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Signup</Text>
      </TouchableOpacity>
      <View style={{flexDirection: 'row', marginVertical: 15}}>
        <Text>Have an Account ?</Text>
        <Text style={styles.login} onPress={navigateLogin}>
          Login
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  login: {
    fontSize: 16,
    marginHorizontal: 10,
    color: 'blue',
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
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default Signup;
