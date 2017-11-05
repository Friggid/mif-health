import React from 'react';
import { Image, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import moment from 'moment';
import CalendarStrip from 'react-native-calendar-strip';

import ExcerciseComponent from './ExcerciseComponent';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    let a = [];
    for (let i = 0; i < 10; i++) {
      a.push(
        <ExcerciseComponent
          text={'Run on treadmill for 30min. and then shit your pants. Slowly.'}
          imageSource={require('../assets/1.png')}
        />
      );
    }

    return (
      <View style={styles.container}>
        <View>
          <CalendarStrip
            style={{ height: 70 }}
            calendarAnimation={{ type: 'sequence', duration: 30 }}
            calendarHeaderStyle={{ color: 'white' }}
            calendarColor={'skyblue'}
            dateNumberStyle={{ color: 'white' }}
            dateNameStyle={{ color: 'white' }}
            highlightDateNumberStyle={{ color: 'white' }}
            highlightDateNameStyle={{ color: 'white' }}
            disabledDateNameStyle={{ color: 'black' }}
            disabledDateNumberStyle={{ color: 'black' }}
            maxDayComponentSize={43}
            iconContainer={{ flex: 0.1 }}
            daySelectionAnimation={{
              type: 'border',
              duration: 200,
              borderWidth: 1,
              borderHighlightColor: 'white'
            }}
          />
        </View>
        <View style={{ flexDirection: 'column' }}>{a}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  stripsContainer: {
    paddingBottom: 5,
    flexDirection: 'column'
  },
  strip: {
    minHeight: 50,
    backgroundColor: 'gray',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  imageContainer: {
    flex: 0.2
  },
  textContainer: {
    flex: 0.7,
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconContainer: {
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
