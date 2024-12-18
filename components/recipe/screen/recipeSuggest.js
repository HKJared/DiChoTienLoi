import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text, FlatList,   RefreshControl } from "react-native";
import colorlibrary from "../../../assets/color/colorlibrary";
import RecipeItem from "../tab/RecipeItem";
import CategoryList from "../tab/CategoryLayout";




export default function RecipeSuggest({ 
                                        isSearch, 
                                        searchText, 
                                        categoriesData, 
                                        filteredRecipes, 
                                        handleCategorySelect, 
                                        navigation,
                                        loadAction,
                                      }) {
  
                                          
  const [refreshing, setRefreshing] = useState(false);                                       
  const [title, setTitle] = useState('Gợi ý');
  const [showCategoryTab, setShowCategoryTab] = useState(false); 
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 10; 
  
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
       loadAction();
       setRefreshing(false);
    }, 1000);
  };

  const totalPages = Math.ceil((filteredRecipes?.length || 0) / itemsPerPage);
  
  const currentRecipes = filteredRecipes?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  const handlePageSelect = (page) => {
    setCurrentPage(page);
  };

  const toggleCategoryTab = () => {
    setShowCategoryTab(!showCategoryTab);
  };

  useEffect(() => {
    if (isSearch) {
      setTitle(`Kết quả trả về cho từ khóa "${searchText || ''}"`);
    } else {
      setTitle('Gợi ý');
    }
  }, [searchText, isSearch]);


  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>{title}</Text>
        {isSearch ? (
          <TouchableOpacity onPress={toggleCategoryTab}>
            <Image
              style={styles.keyWordIcon}
              source={require('../../../assets/images/recipes/filter-circle-outline.png')}
            />
          </TouchableOpacity>
        ) : null}
      </View>

      {showCategoryTab && (
        <View style={styles.categoryTab}>
          <View style={styles.titleTab}>
            <Text style={styles.categoryTabText}>Danh mục món ăn</Text>
            <TouchableOpacity onPress={toggleCategoryTab}>
               <Image style= {styles.backIcon} source={require('../../../assets/images/recipes/chevron-forward.png')}/>
            </TouchableOpacity>
          
          </View>
           
          <CategoryList categoriesData ={categoriesData} layout="column" onSelectCategory={handleCategorySelect}/> 
        </View>
      )}

      <View style={styles.recipeItem}>
        <FlatList
          data={currentRecipes}
          renderItem={({ item }) =>  
          <TouchableOpacity
            onPress={() => {
              console.log('chuyển đên trang của:', item);
              navigation.navigate('Công thức nấu ăn', {item})}}
          >    
            <RecipeItem data={item} /> 
          </TouchableOpacity>}
          
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator= {false}

          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[colorlibrary["--color-blue-bg"]]} 
              title="Đang tải..." 
            />
          }

        />
      </View>



       <View style={styles.pagination}>
          {Array.from({ length: totalPages }, (_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handlePageSelect(index + 1)}
              style={[
                styles.pageButton,
                currentPage === index + 1 && styles.activePageButton,
              ]}
            >
              <Text
                style={[
                  styles.pageButtonText,
                  currentPage === index + 1 && styles.activePageButtonText,
                ]}
              >
                {index + 1}
              </Text>
            </TouchableOpacity>
          ))}
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
    flex: 1,
    height: "100%"
  },
  columnWrapper: {
    justifyContent: 'space-between'
  },
  listContainer: {
    paddingHorizontal: 0,
    gap: 20,
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

  pagination: {
    position: 'absolute',
    bottom: 15, 
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8, // Khoảng cách bên trong giữa các nút
    shadowOffset: { width: 0, height: 2 },
    borderRadius: 8, // Bo góc container
  },
  pageButton: {
    padding: 10, // Tăng kích thước nút
    marginHorizontal: 8, // Tăng khoảng cách giữa các nút
    borderRadius: 8, // Làm nút tròn
    backgroundColor: colorlibrary["--white-60"],
  },
  activePageButton: {
    backgroundColor: colorlibrary["--color-blue-bg"],
  },
  pageButtonText: {
    color: colorlibrary["--black-100"],
    fontSize: 16, // Tăng kích thước chữ
  },
  activePageButtonText: {
    color: colorlibrary["--white-100"],
    fontWeight: 'bold',
  },

});