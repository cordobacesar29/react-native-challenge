import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';

const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create( {
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
    justifyContent: 'space-around',
  },
  viewImage:{
    flex: .4,
    justifyContent: 'center'
  },
  viewButtom: {
    flex:1,
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems:'center',
    width: width - 32,
    position: 'absolute',
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
    marginTop: 20,
    textAlign: 'center'
  },
  textDescription: {
    color: 'white',
    fontWeight: '300',
    textAlign: 'center',
  },
  viewText: {
    marginBottom: 20,
  }
});