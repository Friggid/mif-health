import React from 'react';
import { Image, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { MonoText } from '../../components/StyledText';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.welcomeContainer}>
          <MonoText>First screen</MonoText>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  }
});
