import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import RecipeMain from '../../components/recipe/screen/RecipeMain';



const infoOverView = ['22 phút','3-4 người', '80.000đ', '15 cal'];

export default function App() {
  return (
    <View style={styles.container}>
        <RecipeMain/>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});