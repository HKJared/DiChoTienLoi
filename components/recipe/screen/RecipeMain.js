import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity, Alert} from "react-native";
import RecipeCategory from "./recipeCategory";
import RecipeSuggest from "./recipeSuggest";
import colorlibrary from "../../../assets/color/colorlibrary";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RecipeCard from "../tab/recipeCard";

import Header from "../../Header";
import { useNavigation } from '@react-navigation/native';
import CreateRecipe from "../tab/createRecipe";
import  UpdateRecipe from "../tab/UpdateRecipe";
import MyRecipe from './MyRecipe'

import { getToken, getRecipeCategories, getRecipe, searchRecipe } from "../../../api/apiRecipe";


const Stack = createStackNavigator(); 

export default function Final_screen(){

  return (

    <NavigationContainer>
        <Stack.Navigator
            screenOptions={({ route, navigation }) => ({
              header: () => <Header title={route.name} onBackPress={() => {navigation.goBack()}} />,
            })}
          >
            <Stack.Screen name="Nấu ăn" component={RecipeMain} />
            <Stack.Screen name="Công thức nấu ăn" component={RecipeCard} />
            <Stack.Screen name="Tạo công thức nấu ăn" component={CreateRecipe} />
            <Stack.Screen name="Công thức của tôi" component={MyRecipe} />
            <Stack.Screen name="Chỉnh sửa công thức" component={UpdateRecipe} />
        </Stack.Navigator>
    </NavigationContainer>
  
  );
}

function RecipeMain({navigation}) {

  const [isSearch, setIsSearch] = useState(false); 
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null); 
  const [filteredRecipes, setFilteredRecipes] = useState(null); 
  const [categoriesData, setCategoriesData] = useState(null)
  const [myInfo, setMyInfo] = useState()
  

  const handleCategorySelect = async (category) => {
    setSelectedCategory(category);
    const recipeFilterData = await getRecipe(category.id);
    setFilteredRecipes(recipeFilterData['recipes']);
  };

  const getFullData = async () => {
    try {
      const jwt = await getToken();
      if (!jwt) {
        console.error("Failed to get JWT");
        return;
      }
  
      console.log("Fetching categories...");
      const categoriesList = await getRecipeCategories(jwt);
  
      const recipesPromises = categoriesList.map(async (category) => {
        const categoryDetail = await getRecipe(category.id);
        if (categoryDetail.totalCount > 0) {
          category.active = true;
          return categoryDetail.recipes;
        } else {
          category.active = false;
          return [];
        }
      });
  
      const allRecipes = (await Promise.all(recipesPromises)).flat();
      setCategoriesData(categoriesList);
      console.log('categories list:', categoriesList)
      setFilteredRecipes(allRecipes);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    getFullData();
    const unsubscribe = navigation.addListener('focus', () => {
      getFullData();
    });

    return () => unsubscribe();
  }, [navigation]);


  useEffect(() => {
    const searchRecipes = async () => {
      if (isSearch && searchText.trim() !== "") {
        try {
          const recipeSearchData = await searchRecipe(searchText, 1, 20);
          setFilteredRecipes(recipeSearchData['recipes']); 
        } catch (error) {
          console.error("Error in:", error.message);
        }
      }
    };
    print('isSearch in useEffect:', isSearch, searchText)
    searchRecipes();
  }, [isSearch, searchText]);
  


  return (
      <View style={styles.container}>
          <PannelHeader setIsSearch={setIsSearch} setSearchText={setSearchText}/>
          <RecipeCategory 
          isSearch={isSearch} 
          categoriesData={categoriesData} 
          handleCategorySelect={handleCategorySelect} 
          />
          <RecipeSuggest 
          isSearch={isSearch} 
          searchText={searchText} 
          categoriesData={categoriesData} 
          filteredRecipes={filteredRecipes} 
          handleCategorySelect={handleCategorySelect}  
          navigation={navigation}/> 

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('Công thức của tôi', {categoriesData, myInfo})}
          >
            <View style={styles.addIconContainer}>
              <Text style={styles.addIcon}>+</Text>
            </View>
          </TouchableOpacity>
      </View>
  );
}

const PannelHeader = ({ setIsSearch, setSearchText, navigation }) => {
  const [headerVisible, setHeaderVisible] = useState(true);
  const [localSearchText, setLocalSearchText] = useState("");

  const search = () => {
    if (localSearchText.trim() !== "") {
      setHeaderVisible(false);  
      setIsSearch(true); 
      setSearchText(localSearchText); 
    } else {
      Alert.alert('Warning','Please type the keyword you want to search for!');
    }
  };

  return (
    <View style={styles.pannelHeader}>
      {headerVisible && (
        <View style={styles.header}>
          <View style={styles.header_text}>
            <Text style={styles.greeting}>Xin chào !</Text>
            <Text style={styles.subtitle}>Hôm nay bạn muốn ăn gì?</Text>
          </View>
          <Image 
            source={require('../../../assets/images/recipes/chef-hat_svgrepo.com.png')} 
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
            keyboardType="default" 
            autoCapitalize="none"   
            multiline={false}    
          />
          <View style={styles.searchContainer}>
            <TouchableOpacity  onPress={search}>
              <Image 
                style={styles.searchIcon}
                source={require('../../../assets/images/recipes/search-outline.png')}
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
      },
      addButton: {
        position: 'absolute',
        bottom: 32,
        right: 32,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: colorlibrary["--color-blue-bg"],
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: colorlibrary["--color-shawdow"],
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
      },
      addIconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      addIcon: {
        fontSize: 24,
        color: '#fff',
      },
 
});
