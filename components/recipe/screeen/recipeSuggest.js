import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text, FlatList, SafeAreaView } from "react-native";
import colorlibrary from "../tab/colorlibrary";
import RecipeItem from "../tab/RecipeItem";
import { recipeData, categoriesData } from "../tab/testData";
import CategoryList from "../tab/CategoryLayout";  // Giả sử CategoryList là component hiển thị các categories

export default function RecipeSuggest({ isSearch, searchText }) {
  const [title, setTitle] = useState('Gợi ý');
  const [showCategoryTab, setShowCategoryTab] = useState(false); // Trạng thái hiển thị tab categories

  const toggleCategoryTab = () => {
    setShowCategoryTab(!showCategoryTab);
  };

  useEffect(() => {
    if (isSearch) {
      setTitle(`Kết quả trả về cho từ khóa "${searchText || ''}"`);
    } else {
      setTitle('Gợi ý');
    }
  }, [isSearch]);

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>{title}</Text>
        {isSearch ? (
          <TouchableOpacity onPress={toggleCategoryTab}>
            <Image
              style={styles.keyWordIcon}
              source={require('../assets/filter-circle-outline.png')}
            />
          </TouchableOpacity>
        ) : null}
      </View>

      {showCategoryTab && (
        <View style={styles.categoryTab}>
          <View style={styles.titleTab}>
            <Text style={styles.categoryTabText}>Danh mục món ăn</Text>
            <TouchableOpacity onPress={toggleCategoryTab}>
               <Image style= {styles.backIcon} source={require('../assets/chevron-forward.png')}/>
            </TouchableOpacity>
          
          </View>
           
          <CategoryList categories={categoriesData} layout="column" /> 
        </View>
      )}

      <SafeAreaView style={styles.recipeItem}>
        <FlatList
          data={recipeData}
          renderItem={({ item }) => <RecipeItem data={item} />}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.listContainer}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: 10,
    backgroundColor: colorlibrary["--white-100"]
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
    flex: 0,
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
  }

  
});
