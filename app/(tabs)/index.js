import 'react-native-gesture-handler'; // Đảm bảo import gesture-handler đúng cách nếu cần
import React from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import Final_screen from '../../components/recipe/screen/RecipeMain';
import Header from '../../components/recipe/screen/header';
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Final_screen/>

    </SafeAreaView>
  );
}
const styles = StyleSheet.create({

  container: {
<<<<<<< HEAD
    marginTop: 34,
    flex: 1, 
  },
=======
    flex: 1,
  },

>>>>>>> main
});
