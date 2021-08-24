import React from 'react';
import { Animated, View, Dimensions } from 'react-native';

import { dummyData } from '../data/Data';
const data = dummyData;

const {width, height} = Dimensions.get('window');

const Indicator = ({scrollX}) => {
  return (
    <View style={{ position: 'absolute', bottom: 100, flexDirection:'row'}}>
      {data.map((_, i) => {
        const inputRange = [ (i- 1) * width, i * width, (i+1) * width ];
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.8, 1.4, 0.8],
          extrapolate: 'clamp',
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.6, 0.9, 0.6],
          extrapolate: 'clamp',
        });
        return(
          <Animated.View
            key={`indicator-${i}`}
            style={{
              height: 10,
              width: 10,
              borderRadius: 5,
              backgroundColor: '#fff',
              opacity,
              margin:10,
              transform: [
                {
                  scale,
                }
              ]
            }}
          />
        )
      })}
    </View>
  );
};

export default Indicator;