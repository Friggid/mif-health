import React, { Component } from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import * as firebase from 'firebase';
import Expo, { AuthSession } from 'expo';

import { Button } from 'react-native-elements';

const { width } = Dimensions.get('window');

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

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '', loading: false, userInfo: null };
  }

  async logInFb() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('1511284772288109', {
      permissions: ['public_profile', 'email'],
      behavior: 'native'
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

  render() {
    return (
      <View style={styles.screen}>
        <Image source={require('./assets/bg.jpg')} style={styles.backgroundImage} blurRadius={2}>
          <View style={styles.loginForm}>
            <View style={styles.title}>
              <Image source={require('./assets/logo.png')} style={styles.titleLogo} />
            </View>
            <View style={styles.fbContainer}>
              <Button
                small
                iconLeft
                buttonStyle={{
                  alignSelf: 'center',
                  backgroundColor: '#3b5998',
                  width
                }}
                icon={{
                  name: 'logo-facebook',
                  type: 'ionicon',
                  color: 'white',
                  size: 25
                }}
                fontWeight={'500'}
                fontSize={20}
                title="Continue with Facebook"
                onPress={this.logInFb.bind(this)}
              />
            </View>
          </View>
        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  loginForm: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    flex: 0.8,
    justifyContent: 'center'
  },
  titleLogo: {
    flex: 1,
    width,
    resizeMode: 'center'
  },
  fbContainer: {
    flex: 0.2,
    justifyContent: 'center'
  },
  text: {
    textAlign: 'center',
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  }
});
