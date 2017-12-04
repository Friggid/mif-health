import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import { BariolText } from '../../components/StyledText';

const { width } = Dimensions.get('window');

export default class Login extends Component {
  render() {
    return (
      <View style={styles.screen}>
        <Image source={require('./assets/bggg.jpg')} style={styles.backgroundImage} blurRadius={2}>
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
