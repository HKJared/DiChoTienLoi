import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import colorlibrary from './colorlibrary';


export default function OverViewItem({iconPath, info}) {
  return (
    <View style={styles.infoItem}>
    <Image source={iconPath} style= {styles.infoIcon} />
    <Text style={styles.infoText}>{info}</Text>
  </View>

  );
}


const styles = StyleSheet.create({
  
      infoItem: {
        flex: 0,
        // width: 56,
        height: 56,
        flexDirection: 'column',
        justifyContent:'space-between',
        padding: 8,
        borderRadius: 6,
        backgroundColor: colorlibrary['--color-primary'],
        alignItems: 'center',
        elevation: 2,
        shadowColor: colorlibrary['--color-shawdow'],
      },
      infoIcon:{
        width: 40,
        height: 24,
      },

      infoText: {
        flex: 0,
        fontFamily: 'Roboto',
        fontSize: 10,
        fontWeight: 'semibold',
        color: colorlibrary['--white-100'],
        flexDirection:'row',
      },

      
    
});
