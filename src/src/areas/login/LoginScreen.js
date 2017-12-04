import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Alert,
  ActivityIndicator
} from 'react-native';
import * as firebase from 'firebase';
import Expo, { AuthSession } from 'expo';
import { StackNavigator } from 'react-navigation';
import { FormLabel, FormInput, Button } from 'react-native-elements';

import MainTabNavigator from '../../navigation/MainTabNavigator';


// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyB5BjfgXJmHXyk6ZPCsajtXxAOjj0K3mJg',
  authDomain: 'mif-health.firebaseapp.com',
  databaseURL: 'https://mif-health.firebaseio.com',
  projectId: 'mif-health',
  storageBucket: 'mif-health.appspot.com',
  messagingSenderId: '342939282652'
};
firebase.initializeApp(firebaseConfig);

const DismissKeyboard = require('dismissKeyboard');

export default class login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '', loading: false, userInfo: null };
  }

  // componentDidMount() {
  // 	if(this.state.userInfo)
  // 		this.logInFb();
  // }

  storeData(userId, data) {
    console.log('UserId', userId);
    console.log('Data', data);

    firebase
      .database()
      .ref('users/' + userId)
      .set({
        userId,
        data
      });
  }

  async logInFb() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('1511284772288109', {
      permissions: ['public_profile', 'email'],
      behavior: 'web'
    });
    console.log('type, token', type, token);
    if (type === 'success') {
      this.setState({ error: '', loading: true });

      // Get the user's name using Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}&fields=id,name,picture.type(large)`
      );
      const userInfo = await response.json();
      this.setState({ userInfo });

      this.storeData(userInfo.id, userInfo);

      console.log('USERINFO', this.state.userInfo);

      // Build Firebase credential with the Facebook access token.
      const credential = firebase.auth.FacebookAuthProvider.credential(token);

      // Sign in with credential from the Facebook user.
      firebase
        .auth()
        .signInWithCredential(credential)
        .then(() => {
          this.setState({ error: '', loading: false });
          this.props.navigation.navigate('Home');
        })
        .catch(error => {
          console.log('error', error);
          this.setState({ error: 'Facebook authentication failed', loading: false });
        });
    }
  }

  onLoginPress() {
    this.setState({ error: '', loading: true });

    const { email, password } = this.state;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ error: '', loading: false });
        this.props.navigation.navigate('Home');
      })
      .catch(() => {
        this.setState({ error: 'Email/password is incorrect!', loading: false });
      });
  }

  onSignUpPress() {
    this.setState({ error: '', loading: true });

    const { email, password } = this.state;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ error: '', loading: false });
        this.props.navigation.navigate('Home');
      })
      .catch(() => {
        this.setState({ error: 'Email/password is incorrect!', loading: false });
      });
  }

  renderButton() {
    return (
      <View>
        <View style={styles.buttonContainer}>
          <View style={styles.buttonLeft}>
            <Button
              buttonStyle={{ borderRadius: 5, backgroundColor: '#778899' }}
              onPress={this.onLoginPress.bind(this)}
              icon={{ name: 'login-variant', type: 'material-community', color: 'white' }}
              title="Sign In"
            />
          </View>
          <View style={styles.buttonRight}>
            <Button
              buttonStyle={{ borderRadius: 5, backgroundColor: '#778899' }}
              onPress={this.onSignUpPress.bind(this)}
              icon={{ name: 'user-circle-o', type: 'font-awesome', color: 'white' }}
              title="Sign Up"
            />
          </View>
        </View>
        <View style={{ paddingLeft: 5, paddingRight: 5, paddingTop: 20 }}>
          {this.state.userInfo ? null : (
            <Button
              small
              iconLeft
              onPress={this.logInFb.bind(this)}
              buttonStyle={{ borderRadius: 5, backgroundColor: '#3b5998' }}
              icon={{ name: 'logo-facebook', type: 'ionicon', color: 'white' }}
              title="Login with Facebook"
            />
          )}
        </View>
      </View>
    );
  }

  _renderUserInfo = () => {
    return (
      <View style={{ alignItems: 'center', backgroundColor: 'red' }}>
        <Image
          source={{ uri: this.state.userInfo.picture.data.url }}
          style={{ width: 120, height: 120, borderRadius: 50 }}
        />
        <Text style={{ fontSize: 20 }}>{this.state.userInfo.name}</Text>
        <Text>ID: {this.state.userInfo.id}</Text>
      </View>
    );
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="small" animating={this.state.loading} />
        </View>
      );
    } else {
      return (
        <TouchableWithoutFeedback
          onPress={() => {
            DismissKeyboard();
          }}>
          <View style={styles.container}>
            <View style={styles.imageContainer}>
              <Image
                style={{ width: 100, height: 100 }}
                source={require('../../assets/images/icon.png')}
              />
            </View>
            <View style={{ paddingTop: 10, paddingLeft: 20, paddingRight: 20 }}>
              <Text>Email</Text>
              <View style={styles.textInput}>
                <TextInput
                  style={{ paddingLeft: 10 }}
                  underlineColorAndroid="rgba(0,0,0,0)"
                  keyboardType={'email-address'}
                  autoCorrect={false}
                  placeholder={'email@email.com'}
                  value={this.props.email}
                  onChangeText={email => this.setState({ email })}
                />
              </View>
            </View>
            <View style={{ paddingTop: 10, paddingLeft: 20, paddingRight: 20 }}>
              <Text>Password</Text>
              <View style={styles.textInput}>
                <TextInput
                  style={{ paddingLeft: 10 }}
                  underlineColorAndroid="rgba(0,0,0,0)"
                  autoCorrect={false}
                  placeholder={'password'}
                  value={this.props.password}
                  onChangeText={password => this.setState({ password })}
                  secureTextEntry
                />
              </View>
            </View>
            <View>
              <Text>{this.state.error}</Text>
              {this.renderButton()}
            </View>
          </View>
        </TouchableWithoutFeedback>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10
  },
  buttonLeft: {
    flex: 0.5,
    paddingLeft: 5
  },
  buttonRight: {
    flex: 0.5,
    paddingRight: 5
  },
  textInput: {
    borderWidth: 0.8,
    borderRadius: 5,
    borderColor: 'gray'
  }
});
