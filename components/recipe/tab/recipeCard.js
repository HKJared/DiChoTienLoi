import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

import colorlibrary from './colorlibrary';
import Making from './Making';

export default function RecipeCard({ route }) {
  const { item } = route.params; 
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image
            source={typeof item.image_url === 'string' ? { uri: item.image_url } : item.image_url}
            style={styles.image}
          />
        </View>
       
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.category}>{item.category}</Text>
          </View>

          <Vote rateNumber={item.average_rate} viewNumber={`${item.total_views}k`} />

          <Text style={styles.description}>{item.description}</Text>

          <View style={styles.info}>
            <OverViewItem iconPath={require('../assets/infoTime.png')} info={item.time+' phút'} />
            <OverViewItem iconPath={require('../assets/infoNumperson.png')} info={item.serving+' người'} />
            <OverViewItem iconPath={require('../assets/infoCost.png')} info={item.cost_estimate+'đ'} />
            <OverViewItem iconPath={require('../assets/infoCalo.png')} info={item.kcal +' kcal'} />
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
          ingredients={item.ingredients}
      />

      <Making instructions={item.instructions}/>
    </ScrollView>
  );
}

function IngredientList({ ingredients }) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionTitle}>
        <Text style={styles.sectionText}>Nguyên liệu</Text>
        <Image style={styles.sectionIcon} source={require('../assets/caret-down.png')} />
      </View>

      <View style={styles.ingredientList}>
        {ingredients.map((ingredient, i) => (
          <MarketItem
            key={ingredient.marketplace_item_id}
            ingredientName={ingredient.name}
            ingredientWeight={ingredient.quantity}
          />
        ))}
      </View>
    </View>
  );
}

function MarketItem({ingredientWeight, ingredientName}) {
  return (
    <View style={styles.ingredient}>
        <Image style={styles.bagIcon} source={require('../assets/bag-check.png')}/>
        <Text style={styles.ingredientText}>{ingredientWeight}</Text>
        <Text style={styles.ingredientText}>{ingredientName}</Text>
  </View>
  );
}


function Vote({rateNumber, viewNumber}) {
  return (
    <View style={styles.vote}>
    <View style={styles.rate}>
        <Text style={styles.rateText}>{rateNumber}</Text>
        <Image style= {styles.starIcon} source={require('../assets/star.png')}/>
    </View>
    <Text style={styles.sepatate}>|</Text>
    <View style={styles.view}>
    <Text style={styles.rateText}>{viewNumber}</Text>
    <Image style={styles.ViewIcon} source={require('../assets/view.png')}/>
    </View>
  </View>
  );
}

function OverViewItem({iconPath, info}) {
  return (
    <View style={styles.infoItem}>
    <Image source={iconPath} style= {styles.infoIcon} />
    <Text style={styles.infoText}>{info}</Text>
  </View>

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

  vote: {
    flex:0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingHorizontal: 1,
  },


  rate: {
    flex: 0,
    flexDirection: 'row',
    alignItems:'center',
    gap: 4,
  },


  rateText:{
    fontSize: 16,
    fontFamily: 'Roboto',
    fontWeight:'400',

  },
  starIcon:{
    height: 16,
    width: 16
  },

  sepatate:{
    flex:0,
    width: 4,
    fontSize: 16,
    fontFamily:  'Roboto',
    fontWeight:'400',
    flex: 0
  },

  view: {
    flex:0,
    flexDirection: 'row',
    alignItems:'center',
    gap: 4,

  },

  viewText:{
    fontSize: 14,
    fontFamily: 'Roboto',
    fontWeight:'400',  
  },

  ViewIcon:{
    height: 14,
    width: 15
  },

  
  infoItem: {
    flex: 0,
    // width: 56,
    height: 56,
    flexDirection: 'column',
    justifyContent:'space-between',
    padding: 8,
    borderRadius: 6,
    backgroundColor: colorlibrary['--color-primary'],
    alignItems: 'center',
    elevation: 2,
    shadowColor: colorlibrary['--color-shawdow'],
  },
  infoIcon:{
    width: 40,
    height: 24,
  },

  infoText: {
    flex: 0,
    fontFamily: 'Roboto',
    fontSize: 10,
    fontWeight: 'semibold',
    color: colorlibrary['--white-100'],
    flexDirection:'row',
  },

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
