import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator,  Modal, Button, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colorlibrary from '../../../assets/color/colorlibrary';
import Making from './Making';
import {getRcipeDetail, checkNetworkStatus, storeRecipeData, SAVE_RECIPE_KEY} from '../../../api/apiRecipe';

export default function RecipeCard({ route, navigation }) {

  const [item, setItem] = useState(null)
  const { item: item_param } = route.params; 
  const [isModalVisible, setModalVisible] = useState(false);

  const handleVote = (rating) => {
    Alert.alert('Thành công', `Bạn đã đánh giá ${rating} sao!`);
  };

  const handleSaveRecipe = async (key, item) => {
    try {
      await storeRecipeData(key, item);
      console.log('Item vừa thêm vào là:', item)
      Alert.alert('Thành công', 'Công thức đã được lưu thành công!');
    } catch (error) {
      console.error(error);
      Alert.alert('Lỗi', 'Đã xảy ra lỗi khi lưu công thức.');
    }
  };
  
  const fetchRecipeDetail = async () => {
    try {

      const isOnline = await checkNetworkStatus();
    
      if (isOnline){
        console.log("Fetching recipeDetail...");
        const { 'recipe': responseData } = await getRcipeDetail(item_param.id); 
        console.log('responseData:', responseData)
        setItem(responseData); 
      }
      else{
        console.log('item_param:', item_param)
        setItem(item_param);
      }

    } catch (error) {
      console.error("Error in:", error.message);
    }


  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchRecipeDetail();
    });
    return () => unsubscribe();
  }, [item_param]);


  if (!item) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colorlibrary['--color-blue-bg']} />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );  
  }

  return (
    <ScrollView style={styles.container}   showsVerticalScrollIndicator={false} >
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
            <Text style={styles.category}>{item.category_name}</Text>
          </View>

          <Vote rateNumber={item.total_saves} viewNumber={`${item.total_views}k`} />

          <Text style={styles.description}>{item.description}</Text>

          <View style={styles.info}>
            <OverViewItem iconPath={require('../../../assets/images/recipes/infoTime.png')} info={item.time+' phút'} />
            <OverViewItem iconPath={require('../../../assets/images/recipes/infoNumperson.png')} info={item.serving+' người'} />
            <OverViewItem 
              iconPath={require('../../../assets/images/recipes/infoCost.png')} 
              info={`${Number(item.cost_estimate).toLocaleString('vi-VN')}đ`} 
            />
            <OverViewItem iconPath={require('../../../assets/images/recipes/infoCalo.png')} info={item.kcal +' kcal'} />
          </View>

          <View style={styles.buttons}>
            <TouchableOpacity style={styles.buttonYellow}   onPress={() => setModalVisible(true)}>
              <Text style={styles.buttonText}>Đánh giá</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonGreen}  onPress={() => handleSaveRecipe(SAVE_RECIPE_KEY, item)}>
              <Text style={styles.buttonText}>Thêm vào kho công thức</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <IngredientList
          ingredients={item.ingredients}
      />

      <Making instructions={item.instructions}/>


      <RatingModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onVote={handleVote}
      />


    </ScrollView>
  );
}

function IngredientList({ ingredients }) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionTitle}>
        <Text style={styles.sectionText}>Nguyên liệu</Text>
        <Image style={styles.sectionIcon} source={require('../../../assets/images/recipes/caret-down.png')} />
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
        <Image style={styles.bagIcon} source={require('../../../assets/images/recipes/bag-check.png')}/>
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
        <Image style= {styles.starIcon} source={require('../../../assets/images/recipes/star.png')}/>
    </View>
    <Text style={styles.sepatate}>|</Text>
    <View style={styles.view}>
    <Text style={styles.rateText}>{viewNumber}</Text>
    <Image style={styles.ViewIcon} source={require('../../../assets/images/recipes/view.png')}/>
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



const StarRating = ({ maxStars = 5, onRatingChange }) => {
  const [rating, setRating] = useState(0);

  const handleStarPress = (index) => {
    setRating(index + 1);
    if (onRatingChange) {
      onRatingChange(index + 1);
    }
  };

  return (
    <View style={styles.starContainer}>
      {Array.from({ length: maxStars }, (_, index) => (
        <TouchableOpacity key={index} onPress={() => handleStarPress(index)}>
          <Icon
            name={index < rating ? 'star' : 'star-outline'}
            size={40}
            color={index < rating ? '#FFD700' : '#CCCCCC'}
            style={styles.vote_star}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const RatingModal = ({ visible, onClose, onVote }) => {
  const [selectedRating, setSelectedRating] = useState(0);

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Rate this item</Text>
          <StarRating onRatingChange={(rating) => setSelectedRating(rating)} />
          <View style={styles.buttom_container}>
            <Button
                title="Vote"
                onPress={() => {
                  onVote(selectedRating);
                  onClose();
              
                }}
                style={styles.voteButton}
              />
              <Button title="Cancel" onPress={onClose}   style={styles.voteButton} color={colorlibrary['--color-danger']}/>
          </View>
        </View>
      </View>
    </Modal>
  );
};


const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    flexDirection: 'column',  
    justifyContent: 'center', 
    alignItems: 'center',    
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: 'gray',
  },


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
    gap: 6,
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
    flex: 1,
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
   },



   buttom_container:{
    width: '100%',
    flexDirection : "row",
    justifyContent: 'center',
     gap: 20
   },
   voteButton: {
    backgroundColor: colorlibrary['--color-blue-bg'],
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  voteButtonText: {
    color: colorlibrary['--black-100'],
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colorlibrary['--color-default'],
  },
  modalContent: {
    width: '80%',
    padding: 20,
    flexDirection: 'col',
    gap: 20,
    backgroundColor: colorlibrary['--color-bg'],
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  vote_star: {
    marginHorizontal: 5,
  },

});
