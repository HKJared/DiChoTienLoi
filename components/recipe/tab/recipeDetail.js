import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

import colorlibrary from './colorlibrary';
import Vote from './Vote';
import IngredientList from './Ingredient';
import OverViewItem from './overView';
import Making from './Making';




export default function RecipeCard({
  dishName,
  dishImage,
  dishCategory,
  star,
  view,
  dishDescription,
  ingredients,
  weights,
  stepNames,
  stepDescriptions,
  infoOverView
}) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image
            source={typeof dishImage === 'string' ? { uri: dishImage } : dishImage}
            style={styles.image}
          />
        </View>
       
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>{dishName}</Text>
            <Text style={styles.category}>{dishCategory}</Text>
          </View>

          <Vote rateNumber={star} viewNumber={`${view}k`} />

          <Text style={styles.description}>{dishDescription}</Text>

          <View style={styles.info}>
            <OverViewItem iconPath={require('../assets/infoTime.png')} info={infoOverView[0]} />
            <OverViewItem iconPath={require('../assets/infoNumperson.png')} info={infoOverView[1]} />
            <OverViewItem iconPath={require('../assets/infoCost.png')} info={infoOverView[2]} />
            <OverViewItem iconPath={require('../assets/infoCalo.png')} info={infoOverView[3]} />
          </View>

          <View style={styles.buttons}>
            <TouchableOpacity style={styles.buttonYellow}>
              <Text style={styles.buttonText}>Đánh giá</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonGreen}>
              <Text style={styles.buttonText}>Thêm vào kho công thức</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <IngredientList
        num_ingredient={ingredients.length}
        ingredientNames={ingredients}
        ingredientWeights={weights}
      />

      <Making stepNames={stepNames} descriptions={stepDescriptions} />
    </ScrollView>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 16,
    flexDirection:'column',
    backgroundColor: colorlibrary['--color-bg'],
  },

  card: {
    width: '100%',
    flexDirection:'column',
    gap: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginBottom: 16,
  },

  imageContainer:{
    width: '100%',
    height: 232,
    flexDirection: 'row',

  },
  image: {
    width: "100%",
    height: 271,
    borderRadius: 24,
    flexDirection:'column',
    gap: 10, 

  },
  content: {
    width: '87%',
    // height: 202,
    
    padding: 12,
    gap: 8,
    borderRadius: 12,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection:'column',
    elevation: 2,
    shadowColor:  colorlibrary['--color-shawdow'],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    backgroundColor:colorlibrary['--white-100'],

  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  title: {
    flex:0,
    fontSize: 18,
    fontWeight: 'bold',
    verticalAlign: 'bottom',
  },
  category: {
    flex: 0,
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight:'400',
    color: colorlibrary['--black-60'],
  },

  description: {
    flex: 0,
    fontFamily:'Roboto',
    fontSize: 10,
    fontWeight: '400',
    color: colorlibrary['--black-100'],
    flexDirection: 'row',


  },
  info: {
    width: '100%',
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  
  buttons: {
    flex:0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 10,
  },

  buttonYellow: {
    flex: 0,
    paddingHorizontal: 6,
    paddingVertical: 4,
    backgroundColor: colorlibrary['--color-warning'],
    borderRadius: 2,
  },
  buttonGreen: {
    flex: 0,
    paddingHorizontal: 6,
    paddingVertical: 4,
    backgroundColor: colorlibrary['--color-success'],
    borderRadius: 2,

  },
  buttonText: {
    flex: 0,
    fontFamily:'Roboto',
    fontSize: 12,
    fontWeight: 'bold',
    color: colorlibrary['--white-100'],
    flexDirection: 'row',
  },

});
