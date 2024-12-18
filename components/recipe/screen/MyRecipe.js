import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text, FlatList, Alert } from "react-native";
import colorlibrary from "../../../assets/color/colorlibrary";
import RecipeItem from "../tab/RecipeItem";
import { useIsFocused } from '@react-navigation/native';  
import AsyncStorage from '@react-native-async-storage/async-storage';
import {deleteRecipe, MY_RECIPE_KEY, getLocalData, checkNetworkStatus} from '../../../api/apiRecipe'


export default function MyRecipe({ route,  navigation }) {
                                       
  const [title, setTitle] = useState('Danh sách công thức');
  const [MyRecipeData, setMyRecipeData] = useState(); 
  const {categoriesData: categoriesData} = route.params

  const isFocused = useIsFocused(); 

  useEffect(() => {
    const fetchData = async () => {
      const data = await getLocalData(MY_RECIPE_KEY);
      setMyRecipeData(data); 

    };
    if (isFocused) {
      fetchData();  
    }

  }, [isFocused]); 

  
  const onDeleteRecipe = async (key, item) => {
    const id = item.id
    const isOnline = await checkNetworkStatus();
    if(! isOnline) {
      Alert.alert('Thông báo', 'Vui lòng kết nối internet!');
      return;
    }

    try { 
      const response = await deleteRecipe(id);
      
      if (!response){
        return;
      }
      

      const storedData = await AsyncStorage.getItem(key);
      let parsedData = storedData ? JSON.parse(storedData) : [];
  
      const updatedData = parsedData.filter(item => item.id !== id);
      await AsyncStorage.setItem(key, JSON.stringify(updatedData));
  
      setMyRecipeData(updatedData);
      
      Alert.alert('Sucessfully', `Đã xóa công thức ${item.name}`);
      
    } catch (error) {
      console.error('Lỗi khi xóa dữ liệu:', error);
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>{title}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Tạo công thức nấu ăn', {categoriesData})}>
            {/* <Image
              style={styles.keyWordIcon}
              source={require('../assets/filter-circle-outline.png')}
            /> */}
            <Text style={styles.iconText}>✍️</Text>
          </TouchableOpacity>
      </View>

      <View style={styles.recipeItem}>
      <FlatList
        data={MyRecipeData}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <RecipeItem data={item} />
            <View style={styles.overlay}>
              <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Chỉnh sửa công thức', {item, categoriesData})}>
                <Text style={styles.iconText}>✏️</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton} onPress={() => onDeleteRecipe(MY_RECIPE_KEY, item)}>
                <Text style={styles.iconText}>🗑️</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: "100%",
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: 10,
    padding: 12, 
    backgroundColor: colorlibrary["--color-bg"]
  },
  title: {
    flex: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    padding: 8,
    borderRadius: 8,
    elevation: 1,
    shadowColor: colorlibrary["--color-shawdow"],
    backgroundColor: colorlibrary["--white-100"]
  },
  titleText: {
    fontSize: 14,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: colorlibrary["--color-blue-bg"],
    textAlign: 'left',
  },
  recipeItem: {
    flex: 1,
    height: "100%"
  },
  columnWrapper: {
    justifyContent: 'space-between'
  },
  listContainer: {
    paddingHorizontal: 0,
    gap: 10,
  },
  keyWordIcon: {
    width: 18,
    height: 18,
  },


  categoryTab: {
    flex: 0,
    width: 274,
    position: 'absolute',
    top: 50,  
    right: 0,
    flexDirection:'column',
    justifyContent: 'flex-start',
    backgroundColor: colorlibrary['--white-100'],
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius:16,
    gap: 16,
    shadowColor: colorlibrary["--color-shawdow"],
    elevation: 10,
    zIndex: 100,
  },

  categoryTabText:{
    flex: 0,
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: 'medium',
    
  },

  titleTab:{
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',

  },

  backIcon:{
    width: 20,
    height: 20,
    borderRadius: 4,
    backgroundColor:colorlibrary["--white-90"]
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colorlibrary["--color-default"],
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row', // Hiển thị hai nút cạnh nhau
    zIndex: 1,
    borderRadius: 16,
    paddingBottom: 10,

  
  },
  iconButton: {
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: colorlibrary["--white-100"],
    borderRadius: 50,
  },
  iconText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colorlibrary["--black-100"],
  },

  itemContainer: {
    position: 'relative',
    flex: 0,
    paddingBottom: 10
  },



});
