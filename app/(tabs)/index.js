import '../../gesture-handler';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import RecipeMain from '../../components/recipe/screen/RecipeMain';

export default function App() {
  return (
    <View style={styles.container}>
     <RecipeMain/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
