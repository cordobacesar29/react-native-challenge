import React from 'react';
import  {StatusBar,View, Image, Text, StyleSheet, Dimensions,FlatList, Animated} from 'react-native';
import { dummyData, bgs } from '../data/Data';

const {width, height} = Dimensions.get('window');
const data = dummyData;

const Indicator = ({scrollX}) => {
  return (
    <View style={{ position: 'absolute', bottom: 100, flexDirection:'row'}}>
      {data.map((_, i) => {
        return(
          <View
            key={`indicator-${i}`}
            style={{
              height: 10,
              width: 10,
              borderRadius: 5,
              backgroundColor: '#333',
              margin:10
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

const Carousel = ({data}) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  if(data && data.length){
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <Backdrop scrollX={scrollX}/>
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
              <View style={styles.viewData}>
                <View style={styles.viewImage}>
                  <Image source ={{uri: item.image} } style={styles.image}/>
                </View>
                <View>
                  <Text style={styles.textTitle}>{item.title}</Text>
                  <Text style={styles.textDescription}>{item.description}</Text>
                </View>
              </View>
            );
          }}
        />
        <Indicator scrollX={scrollX}/>
      </View>
    );
  }

  console.log('Please provide Images')
  return null
}

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewData: {
    width, 
    alignItems: 'center', 
    padding: 20,
  },
  viewImage:{
    flex: .7,
    justifyContent: 'center'
  },
  image: {
    width: width / 2,
    height: height / 2,
    resizeMode: 'contain'
  },
  textTitle: {
    color: 'white',
    fontWeight: '800',
    fontSize: 28,
    marginBottom: 10,
  },
  textDescription: {
    color: 'white',
    fontWeight: '300',

  }
})

export default Carousel;