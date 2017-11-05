import React, { Component } from 'react';
import { Image, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';
import { BariolText } from '../../../components/StyledText';

export default class ExcerciseComponent extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    imageSource: PropTypes.number
  };

  render = () => {
    return (
      <View style={styles.stripsContainer}>
        <View style={styles.strip}>
          <View style={styles.imageContainer}>
            <Image
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain'
              }}
              source={this.props.imageSource}
            />
          </View>
          <View style={styles.textContainer}>
            <BariolText>{this.props.text}</BariolText>
          </View>
          <TouchableOpacity style={styles.iconContainer}>
            <Ionicons name="ios-arrow-forward" size={32} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
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
    flex: 0.6,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 15
  },
  iconContainer: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
