import React from 'react';
import { StatusBar,View, Animated, TouchableOpacity, Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import CarouselItem from './CarouselItem';
import Indicator from './Indicator';
import Backdrop from './Backdrop';
import Square from './Square';

import { styles } from './style';

const {width} =Dimensions.get('window');

const Carousel = ({data}) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [index, setIndex] = React.useState(0);
  console.log(index);
  const ref = React.useRef();

  if(data && data.length){

    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <Backdrop scrollX={scrollX}/>
        <Square scrollX={scrollX}/>
        <Animated.FlatList 
          ref={ref}
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
          onMomentumScrollEnd={e=>{
            setIndex(Math.floor(e.nativeEvent.contentOffset.x / width))
          }}
        />
        <Animated.View style={styles.viewButtom}>
          <TouchableOpacity
            disabled={index === 0 }
            style={{opacity: index === 0 ? 0.2 : 1 }}
            onPress={()=>{
              ref?.current?.scrollToOffset({
                offset: (index - 1) * width,
                animated: true,
              });
            }}
          >
            <AntDesign
              name="caretleft"
              size={30}
              color="white"
            />
          </TouchableOpacity>
          <TouchableOpacity
            disabled={ index === data.length - 1}
            style={{opacity: index === data.length - 1 ? 0.2 : 1 }}
            onPress={()=>{
              ref?.current?.scrollToOffset({
                offset: (index + 1) * width,
                animated: true,
              });
            }}
          >
            <AntDesign
              name="caretright"
              size={30}
              color="white"
            />
          </TouchableOpacity>
        </Animated.View>
        <Indicator scrollX={scrollX}/>
      </View>
    );
  }

  console.log('Please provide Images')
  return null
}

export default Carousel;