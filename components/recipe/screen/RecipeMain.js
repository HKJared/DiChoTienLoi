import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity, Alert} from "react-native";
import RecipeCategory from "./recipeCategory";
import RecipeSuggest from "./recipeSuggest";
import colorlibrary from "../../../assets/color/colorlibrary";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RecipeCard from "../tab/recipeCard";
import Header from "../../Header";
import CreateRecipe from "../tab/createRecipe";
import  UpdateRecipe from "../tab/UpdateRecipe";
import MyRecipe from './MyRecipe'
import NetInfo from '@react-native-community/netinfo';
import SaveRecipe from './SaveRecipe'


import {getRecipeCategories, 
        getRecipe, 
        searchRecipe, 
        checkNetworkStatus,
        SAVE_RECIPE_KEY,
        CATEGORIES_KEY,
        getLocalData,
        storeData,
        getMarketplaceitem,
        MARKETITEM_KEY

        } from "../../../api/apiRecipe";



const Stack = createStackNavigator(); 

export default function Final_screen(){

  return (

    <NavigationContainer>
        <Stack.Navigator
            screenOptions={({ route, navigation }) => ({
              header: () => <Header title={route.name}  
              onBackPress={navigation.canGoBack() ? navigation.goBack : undefined} />,

             
            })}
          >
            <Stack.Screen name="Nấu ăn" component={RecipeMain} />
            <Stack.Screen name="Công thức nấu ăn" component={RecipeCard} />
            <Stack.Screen name="Tạo công thức nấu ăn" component={CreateRecipe} />
            <Stack.Screen name="Công thức của tôi" component={MyRecipe} />
            <Stack.Screen name="Chỉnh sửa công thức" component={UpdateRecipe} />
            <Stack.Screen name="Công thức đã lưu" component={SaveRecipe} />
        </Stack.Navigator>
    </NavigationContainer>
  
  );
}

function RecipeMain({navigation}) {
  const [isSearch, setIsSearch] = useState(false); 
  const [searchText, setSearchText] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState(null); 
  const [categoriesData, setCategoriesData] = useState(null)
  const [myInfo, setMyInfo] = useState()
  const [networkStatus, setNetworkStatus] = useState(true)


  const handleCategorySelect = async (category) => {
    const isOnline = await checkNetworkStatus();
    if (isOnline) {
      const recipeFilterData = await getRecipe(category.id);
      setFilteredRecipes(recipeFilterData['recipes']);
    }
    else{
        Alert.alert('Thông báo', 'Vui lòng kết nối internet!')
    }
 
  };


  const getFullData = async () => {
    try {
      console.log("Fetching data...");
      
      let categoriesList;
      let allRecipes;
      let marketplaceItem;
  
      const isOnline = await checkNetworkStatus();
    
      if (isOnline) {
        console.log("Fetching categories from API...");

        categoriesList = await getRecipeCategories();
        
        if (categoriesList){
          await storeData(CATEGORIES_KEY, categoriesList);
        }

        marketplaceItem = await getMarketplaceitem();
        
        if(marketplaceItem){
          await storeData(MARKETITEM_KEY, marketplaceItem['items']);
        }

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

        allRecipes = (await Promise.all(recipesPromises)).flat();

      } else {
        allRecipes = await getLocalData(SAVE_RECIPE_KEY);
        categoriesList = await getLocalData(CATEGORIES_KEY)
      }

      // Cập nhật state
      setCategoriesData(categoriesList);
      setFilteredRecipes(allRecipes);
      
      console.log("Data loaded successfully.");
  
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setNetworkStatus(state.isConnected);
    });

    return () => unsubscribe();
  }, []);


  useEffect(() => {
    getFullData();
    const unsubscribe = navigation.addListener('focus', () => {
      getFullData();
    });
    return () => unsubscribe();
  }, [navigation, networkStatus]);


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
          navigation={navigation}
          loadAction = {getFullData}
          /> 
     
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

const PannelHeader = ({ setIsSearch, setSearchText}) => {
  const [headerVisible, setHeaderVisible] = useState(true);
  const [localSearchText, setLocalSearchText] = useState("");

  const search = () => {
    if (localSearchText.trim() !== "") {
      setHeaderVisible(false);  
      setIsSearch(true); 
      setSearchText(localSearchText); 
    } else {
      Alert.alert('Cảnh báo','Hãy tìm kiếm bằng từ khóa!');
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