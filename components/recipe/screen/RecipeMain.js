import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity} from "react-native";
import RecipeCategory from "./recipeCategory";
import RecipeSuggest from "./recipeSuggest";
import colorlibrary from "../tab/colorlibrary";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RecipeCard from "../tab/recipeCard";
import { login, getRecipeCategories } from "./get_data";

import recipeItemData from '../../../assets/data/recipe_items.json'
import categoriesData from "../../../assets/data/recipe_categories.json";



const updateCategoryActivity = (categories, recipes) => {
  return categories.map(category => {
  
    const hasRecipes = recipes.some(recipe => recipe.category_id === category.id);
    return {
      ...category,
      active: hasRecipes 
    };
  });
};


const Stack = createStackNavigator();


export default function Final_screen(){
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Nấu ăn" component={RecipeMain} />
        <Stack.Screen name="Công thức nấu ăn" component={RecipeCard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


function RecipeMain({navigation}) {

  const [isSearch, setIsSearch] = useState(false); 
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null); // Lưu trữ category đã chọn
  const [filteredRecipes, setFilteredRecipes] = useState(recipeItemData); 
  
  useEffect(() => {
    const test_fn = async () => {
      try {
        const username = "ky1234"; 
        const password = "ky1234";
  
        console.log("Logging in...");
        const jwt = await login(username, password);
  
        console.log("Fetching categories...");
        const cateData = await getRecipeCategories(jwt);
  
        console.log("Categories data:", cateData);
      } catch (error) {
        console.error("Error in test_fn:", error.message);
      }
    };
    test_fn();
  }, []);
  

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    const filtered = recipeItemData.filter(item => item.category_id === category.id);
    setFilteredRecipes(filtered);
  };

  const updatedCategoriesData = updateCategoryActivity(categoriesData, recipeItemData);

  return (

      <View style={styles.container}>
          <PannelHeader setIsSearch={setIsSearch} setSearchText={setSearchText} />
          <RecipeCategory isSearch={isSearch} categoriesData={updatedCategoriesData} handleCategorySelect={handleCategorySelect} />
          <RecipeSuggest isSearch={isSearch} searchText={searchText} categoriesData={updatedCategoriesData} filteredRecipes={filteredRecipes} handleCategorySelect={handleCategorySelect}  navigation={navigation}/> 
      </View>
  );
}

const PannelHeader = ({ setIsSearch, setSearchText }) => {
  const [headerVisible, setHeaderVisible] = useState(true);
  const [localSearchText, setLocalSearchText] = useState("");

  const search = () => {
      if (localSearchText.trim() !== "") { 
          setHeaderVisible(false); 
          setIsSearch(true);  
          setSearchText(localSearchText); 
      }
      else {
        alert('Please type the keyword you want to search for !');
      }
  };

  return (
      <View style={styles.pannelHeader}>
          {headerVisible && (
              <View style={styles.header}>
                  <View style={styles.header_text}>
                      <Text style={styles.greeting}>Xin chào, Tú!</Text>
                      <Text style={styles.subtitle}>Hôm nay bạn muốn ăn gì?</Text>
                  </View>
                  <Image 
                      source={require('../assets/chef-hat_svgrepo.com.png')} 
                      style={styles.chef_icon}
                  />
              </View>
          )}

          <View style={styles.inputContainer}>
              <View style={styles.boxInput}>
                  <TextInput 
                      style={styles.input}
                      placeholderTextColor={colorlibrary['--white-60']}
                      placeholder="Tên món ăn"
                      value={localSearchText} 
                      onChangeText={setLocalSearchText} 
                  />
                  <View style={styles.searchContainer}>
                      <TouchableOpacity onPress={search}>
                          <Image 
                              style={styles.searchIcon}
                              source={require('../assets/search-outline.png')}
                          />
                      </TouchableOpacity>
                  </View>
              </View>
          </View>
      </View>
  );
};



const styles = StyleSheet.create({
    container: {
        // flex: 0,
        flex:1,
        width: '100%',
        flexDirection:'column',
        justifyContent:'center',
        justifyContent:'flex-start',
        paddingVertical: 24,
        paddingHorizontal: 12,
        gap: 16,
        backgroundColor:colorlibrary["--color-bg"]
    },



    pannelHeader: {
        flex: 0,
        width: '100%',
        backgroundColor: colorlibrary['--white-100'],
        borderRadius: 8,
        flexDirection:'column',
        justifyContent:'flex-start',
        alignItems: 'flex-start',
        elevation: 4,
        shadowColor: 'black',
     
       
      },
      header: {
        flex: 0,
        width: '100%',
        padding: 10,
        gap: 10,
        flexDirection: 'row',
        justifyContent:'flex-start',
        alignItems: 'center',
    
      },
    
      header_text:{
        flex: 0,
        width: '72.68%',
        gap: 10,
        flexDirection: 'column',
        justifyContent:'flex-start',
      
      },
      greeting: {
        flex: 0,
        fontFamily:'Roboto',
        fontSize: 24,
        fontWeight:'bold',
       color: colorlibrary['--color-blue-bg'],
       textAlign:'left'
      },
      subtitle: {
        flex: 0,
        fontFamily:'Roboto',
        fontSize: 18,
        fontWeight:'bold',
       color: colorlibrary['--color-blue-bg'],
       textAlign:'left'
      },
      chef_icon:{
        width: 76,
        height: 76,
      },
    
    
    
      inputContainer: {
        flex:0,
        width: '100%',
        flexDirection: 'column',
        justifyContent:'flex-start',
        alignItems:'flex-start',
        padding: 10,
      
      },
    
      boxInput:{
        flex:0,
        width: '100%',
        flexDirection:'row',
        borderRadius: 4,
        alignItems:'center',
        justifyContent:'flex-start',
        borderWidth: 1,
        borderColor: colorlibrary['--color-primary'],
    
    
      },
      input: {
        flex: 0,
        width: '89.13%',
        height: 40,
        flexDirection:'column',
        alignItems:'center',
        backgroundColor:colorlibrary['--wwhite-60'],
        borderRadius: 4,
        paddingHorizontal: 12,
        paddingVertical: 10,
      },
    
      searchContainer:{
        flex: 0,
        height: 32,
        width: '10.87%',
        flexDirection:'column',
        justifyContent: 'center',
        alignItems:'center',
        borderLeftWidth: 1,
        borderLeftColor: colorlibrary['--white-60'],
    
      },
      searchIcon: {
        width: 26,
        height: 26,
      }
 
});
