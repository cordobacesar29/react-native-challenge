import React from 'react';
import { Animated, Dimensions } from 'react-native';

const {width, height} = Dimensions.get('window');
const Square = ({scrollX}) => {
  const YOLO = Animated.modulo(
    Animated.divide(
      Animated.modulo(scrollX, width),
      new Animated.Value(width)
  ), 1);

  const rotate = YOLO.interpolate({
    inputRange: [0, .5, 1],
    outputRange: [ '35deg', '0deg', '35deg'],
  })

  const translateX = YOLO.interpolate({
    inputRange: [0, .5, 1],
    outputRange: [ 0, - height , 0],
  })

  return (
    <Animated.View 
      style={{
        width: height,
        height: height,
        backgroundColor: '#fff',
        borderRadius: 86,
        position: 'absolute',
        top: -height * 0.7,
        left: -height * 0.3,
        transform: [
          {
            rotate,
          },
          {
            translateX,
          }
        ]
      }}
    />
  )
}

export default Square;