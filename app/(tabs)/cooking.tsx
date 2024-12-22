import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, View ,Button, TouchableOpacity, Text } from 'react-native';
import Header from "@/components/Header";
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import { useNavigation } from '@react-navigation/native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function TabCookingScreen() {
    const navigation = useNavigation();

    const navigateToFridgeManagement = () => {
        navigation.navigate('FridgeManagement');
    };
  return (

    <View >
        <Header title='Nấu ăn' />
    </View>

  );
}

const styles = StyleSheet.create({
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
    buttonsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop: 130,
    },
    button: {
      height: 100,
      width: '80%',
      backgroundColor: '#e8effd',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 10,
      borderColor: '#888',
      borderWidth: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 5,
    },
    buttonText: {
      fontSize: 22,
      color: '#0057a3',
    },
});
