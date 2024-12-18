import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import colorlibrary from '../../../assets/color/colorlibrary';

const RecipeItem = ({ data }) => {

  const {  
    id,
    name,
    image_url,
    time,
    serving,
    total_views,
    total_saves,
    user_fullname 

  } = data;

  return (
    <View style={styles.container}>
      <Image source={{ uri: image_url }} style={styles.image} />
      <View style={styles.detail}>
        <View style={styles.name}>
          <Text style={styles.text}>{name}</Text>
        </View>

        <View style={styles.info}>
          <View style={styles.userName}>
            <Image source={require('../../../assets/images/recipes/person-circle-outline.png')} style={styles.icon} />
            <Text style={styles.infoText}>{user_fullname}</Text>
          </View>
          
          <View style={styles.frame1}>
            <View style={styles.time_step}>
              <Image source={require('../../../assets/images/recipes/time-outline.png')} style={styles.icon} />
              <Text style={styles.infoText}>{time}</Text>
            </View>

            <View style={styles.time_step}>
              <Image source={require('../../../assets/images/recipes/albums-outline.png')} style={styles.icon} />
              <Text style={styles.infoText}>{serving}</Text>
            </View>
          </View>
        </View>

        <View style={styles.vote}>
          <View style={styles.totalRate}>
            <Text style={styles.rate}>{total_saves}</Text>
            <Image style={styles.star} source={require('../../../assets/images/recipes/star.png')} />
          </View>

          <Text style={styles.separate}>|</Text>

          <View style={styles.totalView}>
            <Text style={styles.view}>{total_views}</Text>
            <Image style={styles.eyes} source={require('../../../assets/images/recipes/view.png')} />
          </View>
        </View>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 200,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 16,
  },
  image: {
    width: '100%',
    height: 131,
    borderRadius: 16,
    backgroundColor: 'transparent',
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    elevation: 5,
  },
  detail: {
    width: 188,
    height: 66,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 4,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  name: {
    height: 28,
    width: 180,
    paddingHorizontal: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  text: {
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
  },
  info: {
    height: 16,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    gap: 10,
  },
  userName: {
    width: '45%',
    height: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: colorlibrary['--color-bg2'],
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  frame1: {
    width: '50%',
    height: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: colorlibrary['--color-bg2'],
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    
  },
  time_step: {
    height: 8,
    flexDirection: 'row',
    alignItems: 'center',

    gap: 2,
  },
  icon: {
    width: 8,
    height: 8,
    backgroundColor: 'transparent',
  },
  infoText: {
    color: colorlibrary['--color-infotext'],
    fontFamily: 'Roboto',
    fontSize: 8,
    lineHeight: 8,
    letterSpacing: 0,
    fontWeight: '400',
  },
  vote: {
    width: 85,
    height: 16,  
    flexDirection: 'row',
    paddingHorizontal: 1,
    alignItems: 'center',
    justifyContent: 'flex-start', 
    gap: 4,
  },
  totalRate: {
    height: 16, 
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 4,
  },
  rate: {
    fontFamily: 'Roboto',
    fontSize: 10,
    fontWeight: '400',
    color: colorlibrary['--black-100'],
    letterSpacing: 0,
  },
  star: {
    width: 12,
    height: 12,
  },
  separate: {
    width: 3,
    height: 14,
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: 'regular',
    lineHeight: 14, 
    textAlign: 'center',
  },
  totalView: {
    width: 39,
    height: 14, 
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 4,
  },
  view: {
    fontFamily: 'Roboto',
    fontSize: 10,
    fontWeight: '400',
    color: colorlibrary['--black-100'],
    letterSpacing: 0,
  },
  eyes: {
    width: 12,
    height: 12,
  },
});

export default RecipeItem;
