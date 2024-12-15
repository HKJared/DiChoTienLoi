import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import colorlibrary from '../../../assets/color/colorlibrary';

export default function Making({ instructions }) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionTitle}>
        <Text style={styles.sectionText}>Cách làm</Text>
        <Image style={styles.sectionIcon} source={require('../../../assets/images/recipes/caret-down.png')} />
      </View>

      <View style={styles.stepList}>
        {instructions.map((instruction, index) => (
          <Step
            key={instruction.step} // Sử dụng `step` làm key vì đây là giá trị duy nhất
            name={`Bước ${instruction.step}: ${instruction.name}`}
            description={instruction.detail}
          />
        ))}
      </View>
    </View>
  );
}
  

function Step({name, description}){
    return(
      <View style={styles.step}>
        <View style={styles.stepName}>
            <Image style={styles.stepIcon} source={require('../../../assets/images/recipes/layers.png')} />
            <Text style={styles.stepTitle}>{name}</Text>
        </View>
            
        <Text style={styles.stepDescription}>
          {description}
        </Text>
      </View>
    );
  }
  

const styles = StyleSheet.create({
 
  section: {
    width: '100%',
    gap: 10,
    paddingHorizontal: 8,
    flexDirection: 'column',
    justifyContent:'flex-start',
    alignItems:'flex-start',
    marginBottom: 16,

  },


  sectionTitle: {
    flex:0,
    width: '100%',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  sectionText:{
    flex: 0,
    fontFamily:'Roboto',
    fontSize: 16,
    fontWeight: 'bold',
    color: colorlibrary['--black-100'],
    flexDirection: 'row',
   
  },
  sectionIcon:{
    width: 16,
    height: 16,
  },

  step: {
    flex:0,
    flexDirection:'column',
    gap: 6,
  },

  stepList:{
    flexDirection:'column',
    gap: 10,
    
  },
  stepName:{
    flex: 0,
    flexDirection:'row',
    gap:4,
    alignItems:'center',

  },

  stepTitle: {
    flex: 0,
    flexDirection: 'row',
    justifyContent:'flex-start',
    alignItems:'center',
    fontFamily:'Roboto',
    fontSize: 12,
    fontWeight: 'bold',
  },

  stepDescription: {
    flex: 0,
    paddingLeft: 8,
    flexDirection: 'row',
    justifyContent:'center',
    alignItems:'center',
    textAlign:'left',
    fontFamily:'Roboto',
    fontSize: 12,
    fontWeight: 'regular',
    color: colorlibrary['--black-100'],

    
  },
  stepIcon:{
    width: 16,
    height: 16,
  }

});
