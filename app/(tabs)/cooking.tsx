import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, View, SafeAreaView } from 'react-native';
import Header from "@/components/Header";
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Final_screen from '../../components/recipe/screen/RecipeMain';


export default function TabCookingScreen() {
  return (
    <SafeAreaView style={styles.container}>
    <Final_screen/>
   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1, 
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
