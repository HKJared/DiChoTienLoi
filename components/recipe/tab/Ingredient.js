import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import MarketItem from './marketItem';
import colorlibrary from './colorlibrary';

export default function IngredientList({ num_ingredient, ingredientWeights, ingredientNames }) {
  return (
    
    <View style={styles.section}>
    <View style={styles.sectionTitle}>
      <Text style={styles.sectionText}>Nguyên liệu</Text>
      <Image style={styles.sectionIcon} source={require('../assets/caret-down.png')}></Image>
    </View> 

    <View style={styles.ingredientList}>
      {Array.from({ length: num_ingredient }).map((_, i) => (
        <MarketItem key={i} ingredientName={ingredientNames[i]} ingredientWeight={ingredientWeights[i]} />
      ))}
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ingredientList: {
    flex: 0,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 4,
  },
  section: {
    width: '100%',
    gap: 10,
    paddingHorizontal: 8,
    flexDirection: 'column',
    justifyContent:'flex-start',
    alignItems:'flex-start',
    marginBottom: 16,

  },


  sectionTitle: {
    flex:0,
    width: '100%',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  sectionText:{
    flex: 0,
    fontFamily:'Roboto',
    fontSize: 16,
    fontWeight: 'bold',
    color: colorlibrary['--black-100'],
    flexDirection: 'row',
   
  },
  sectionIcon:{
    width: 16,
    height: 16,
  },

});
