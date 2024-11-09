import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';



export default function Vote({rateNumber, viewNumber}) {
  return (
    <View style={styles.vote}>
    <View style={styles.rate}>
        <Text style={styles.rateText}>{rateNumber}</Text>
        <Image style= {styles.starIcon} source={require('../assets/star.png')}/>
    </View>
    <Text style={styles.sepatate}>|</Text>
    <View style={styles.view}>
    <Text style={styles.rateText}>{viewNumber}</Text>
    <Image style={styles.ViewIcon} source={require('../assets/view.png')}/>
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
    vote: {
        flex:0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        paddingHorizontal: 1,
      },
    
    
      rate: {
        flex: 0,
        flexDirection: 'row',
        alignItems:'center',
        gap: 4,
      },
    
    
      rateText:{
        fontSize: 16,
        fontFamily: 'Roboto',
        fontWeight:'400',
    
      },
      starIcon:{
        height: 16,
        width: 16
      },
    
      sepatate:{
        flex:0,
        width: 4,
        fontSize: 16,
        fontFamily:  'Roboto',
        fontWeight:'400',
        flex: 0
      },
    
      view: {
        flex:0,
        flexDirection: 'row',
        alignItems:'center',
        gap: 4,
    
      },
    
      viewText:{
        fontSize: 14,
        fontFamily: 'Roboto',
        fontWeight:'400',  
      },
    
      ViewIcon:{
        height: 14,
        width: 15
      },
    
    
});
