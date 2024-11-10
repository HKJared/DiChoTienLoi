import React, { useState } from "react";
import { StyleSheet, FlatList, View, TouchableOpacity } from "react-native";
import Category from "./Category"; 

export default function CategoryList({ categories, layout }) {
  const [selectedCategory, setSelectedCategory] = useState(categories);

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      onPress={() => getItem(item)} 
    >
      <Category 
        id={item.id}
        text={item.text} 
        imageSource={item.imageSource} 
        active={item.active} 
      />
    </TouchableOpacity>
  );

  const getItem = (item) => {
    alert('Item id: ' + item.id + " Item name: " + item.text);
  } 

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
      data={selectedCategory}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      numColumns={numColumns}
      contentContainerStyle={styles.container}
      horizontal={isHorizontal}
      ItemSeparatorComponent={ItemSeparator}
      key={numColumns.toString()}
      columnWrapperStyle= {columnWrapperStyle}
    />
  );
}

const styles = StyleSheet.create({
  container: {
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
});
