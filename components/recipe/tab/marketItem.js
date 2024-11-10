import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import colorlibrary from './colorlibrary';


export default function MarketItem({ingredientWeight, ingredientName}) {
  return (
    <View style={styles.ingredient}>
        <Image style={styles.bagIcon} source={require('../assets/bag-check.png')}/>
        <Text style={styles.ingredientText}>{ingredientWeight}</Text>
        <Text style={styles.ingredientText}>{ingredientName}</Text>
  </View>
  );
}

const styles = StyleSheet.create({
    
    ingredient:{
    flex: 0,
    flexDirection: 'row',
    justifyContent:'flex-start',
    alignItems:'center',
    gap:4,

   },
   ingredientText:{
    minWidth: 45,
    fontFamily:'Roboto',
    fontSize: 12,
    textAlign:'left',
    color: colorlibrary['--black-100'],

   },
   bagIcon:{
    width: 16,
    height: 16,
   }
    
});
