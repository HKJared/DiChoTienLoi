import React, { useState } from "react";
import { StyleSheet, FlatList, View, TouchableOpacity, ImageBackground, Text } from "react-native";
import colorlibrary from './colorlibrary';


export default function CategoryList({ categories, layout, onSelectCategory }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => onSelectCategory(item)}>
      <Category 
        id={item.id}
        name={item.name} 
        image_url={item.image_url}
        active={item.active} 
      />
    </TouchableOpacity>
  );

  let numColumns = 1;
  let isHorizontal = false;
  let columnWrapperStyle = undefined; 

  if (layout === "list") {
    isHorizontal = true;
  } else if (layout === "grid") {
    numColumns = 3;
    columnWrapperStyle = styles.columnWrapper; 
  } else if ((layout === "column")) {
    numColumns = 2; 
    columnWrapperStyle = styles.columnWrapper; 
  }

  const ItemSeparator = () => <View style={styles.separator} />;

  return (
    <FlatList
      data={categories}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      numColumns={numColumns}
      contentContainerStyle={styles.category_list_container}
      horizontal={isHorizontal}
      ItemSeparatorComponent={ItemSeparator}
      key={numColumns.toString()}
      columnWrapperStyle={columnWrapperStyle}
    />
  );
}

function Category({id, name, image_url, active }) {
  return (
    <View style={styles.category_container}>
      <ImageBackground 
        source={{ uri: image_url }} 
        style={styles.background}
      >
        {!active &&  <View 
          style={[
            styles.overlay, 
            { backgroundColor: active ? colorlibrary["--color-active"] : colorlibrary["--color-default"] }
          ]}
        />}
        <Text style={styles.text}>{name}</Text>
      </ImageBackground>
    </View>
  );
}


const styles = StyleSheet.create({
  category_list_container: {
    paddingVertical: 0,
  },
 
  separator:{
    width: 10,
    height: 10
  },

  columnWrapper: {
    justifyContent: 'space-between',
    alignItems: 'center', 
  },


  category_container: {
    width: 116,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colorlibrary["--color-default"],
  },
  text: {
    fontFamily: 'Roboto',
    fontSize: 13,
    color: colorlibrary["--white-100"],
    fontWeight: '500', // medium
  },

});
