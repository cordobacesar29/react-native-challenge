import React from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from './style';

const CarouselItem = ({item}) => {
  return (
    <View style={styles.viewData}>
      <View style={styles.viewImage}>
        <Image source ={{uri: item.image} } style={styles.image}/>
      </View>
      <View style={styles.viewText}>
        <Text style={styles.textTitle}>{item.title}</Text>
        <Text style={styles.textDescription}>{item.description}</Text>
      </View>
    </View>
  )
}

export default CarouselItem;