import React, { useState } from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import colorlibrary from "../../../assets/color/colorlibrary";
import CategoryList from "../tab/CategoryLayout";


function Menu({ onSelect, selected }) {
  return (
    <View style={styles.MenuContainer}>
      <TouchableOpacity 
        style={[styles.list, selected === 'list' && styles.selected]}
        onPress={() => onSelect('list')}
      >
        <View>
          <Image
            source={require('../../../assets/images/recipes/list.png')}
            style={styles.icon}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.gridOutline, selected === 'grid' && styles.selected]}
        onPress={() => onSelect('grid')}
      >
        <View>
          <Image
            source={require('../../../assets/images/recipes/grid-outline.png')}
            style={styles.icon}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default function RecipeCategory({isSearch,  categoriesData, handleCategorySelect }) {
  const [selectedLayout, setSelectedLayout] = useState('list'); 

  const handleLayoutChange = (layout) => {
    setSelectedLayout(layout);  
  };

  return (
    !isSearch && ( // Điều kiện isSearch được kiểm tra tại đây
      <View style={styles.RecipeCategorycontainer}>
        <View style={styles.action}>
          <Menu onSelect={handleLayoutChange} selected={selectedLayout} />
        </View>
        <View style={styles.category}>
          <CategoryList categoriesData={categoriesData} layout={selectedLayout} onSelectCategory={handleCategorySelect} />
        </View>
      </View>
    )
  );
}



const styles = StyleSheet.create({
  RecipeCategorycontainer: {
        flex: 0,
        flexDirection:'column',
        width: '100%',
        gap: 10,

    },
    action:{
        flex: 0,
        flexDirection:'row',
        justifyContent: 'flex-end',

    },
    category:{
        flex:0,
    },
    MenuContainer: {
      width: 60,
      height: 20, 
      borderRadius: 10,
      shadowColor: colorlibrary["--color-shawdow"], 
      shadowOffset: { width: 5, height: 5 }, 
      elevation: 10,
      backgroundColor: 'transparent', 
      justifyContent: 'space-around',
      alignItems: 'center',
      flexDirection: 'row',
  },
  list: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colorlibrary["--color-bg"],
      width: '50%',
      height: '100%',
      borderTopLeftRadius: 10, 
      borderBottomLeftRadius: 10,
  },
  gridOutline: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colorlibrary["--color-bg"], 
      width: '50%', 
      height: '100%', 
      borderTopRightRadius: 10, 
      borderBottomRightRadius: 10,
  },
  selected: {
      backgroundColor: colorlibrary["--white-100"], 
  },
  icon: {
      height: 10, 
      width: 10,
  }
});
