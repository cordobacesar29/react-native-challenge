import React from 'react';
import { Animated, StyleSheet, Dimensions } from 'react-native';

import { bgs } from '../data/Data';

const {width} = Dimensions.get('window');

const Backdrop = ({scrollX}) => {
  const backgroundColor = scrollX.interpolate({
    inputRange: bgs.map((_, i) => i * width),
    outputRange: bgs.map((bg) => bg),
  })
  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        {
          backgroundColor,
        },
      ]}
    />
  );
};

export default Backdrop;