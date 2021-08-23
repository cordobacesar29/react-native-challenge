import React from 'react';
import {StatusBar,View, Image, Text, StyleSheet, Dimensions, Animated, TouchableHighlight} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import CarouselItem from './CarouselItem';

import { dummyData, bgs } from '../data/Data';
import { styles } from './style';

const {width, height} = Dimensions.get('window');
const data = dummyData;

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

const PrevItem = () => {
}

const NextItem = () => {
  
}

const Carousel = ({data}) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  if(data && data.length){
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <Backdrop scrollX={scrollX}/>
        <Square scrollX={scrollX}/>
        <Animated.FlatList 
          data={data}
          keyExtractor={ item => item.key}
          horizontal
          scrollEventThrottle={32}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX} } }],
            {useNativeDriver: false} 
          )}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          renderItem={({item})=>{
            return (
              <CarouselItem item={item}/>
            );
          }}
        />
        <View style={styles.viewButtom}>
          <AntDesign
            name="caretleft"
            size={30}
            color="white"
            onPress={ () => console.log('Prev')  }
          />
          <AntDesign
            name="caretright"
            size={30}
            color="white"
            onPress={ () => console.log('Next')  }
          />
        </View>
        <Indicator scrollX={scrollX}/>
      </View>
    );
  }

  console.log('Please provide Images')
  return null
}

export default Carousel;