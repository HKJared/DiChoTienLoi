import 'react-native-gesture-handler'; // Đảm bảo import gesture-handler đúng cách nếu cần
import React from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import Final_screen from '../../components/recipe/screen/RecipeMain';
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Final_screen/>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({

  container: {
    marginTop: 34,
    flex: 1, 
  }
});
