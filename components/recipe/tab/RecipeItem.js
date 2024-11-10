import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const RecipeItem = ({ data }) => {
  // Truy cập vào các thuộc tính của data
  const { imageSource, name, userName, time, steps, rating, views } = data;

  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.image} />
      <View style={styles.detail}>
        <View style={styles.name}>
          <Text style={styles.text}>{name}</Text>
        </View>

        <View style={styles.info}>
          <View style={styles.userName}>
            <Image source={require('../assets/person-circle-outline.png')} style={styles.icon} />
            <Text style={styles.infoText}>{userName}</Text>
          </View>
          <View style={styles.frame1}>
            <View style={styles.time_step}>
              <Image source={require('../assets/time-outline.png')} style={styles.icon} />
              <Text style={styles.infoText}>{time}</Text>
            </View>

            <View style={styles.time_step}>
              <Image source={require('../assets/albums-outline.png')} style={styles.icon} />
              <Text style={styles.infoText}>{steps}</Text>
            </View>
          </View>
        </View>

        <View style={styles.vote}>
          <View style={styles.totalRate}>
            <Text style={styles.rate}>{rating}</Text>
            <Image style={styles.star} source={require('../assets/star.png')} />
          </View>

          <Text style={styles.separate}>|</Text>

          <View style={styles.totalView}>
            <Text style={styles.view}>{views}</Text>
            <Image style={styles.eyes} source={require('../assets/view.png')} />
          </View>
        </View>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    width: 175,
    height: 201,
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
    width: 180,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
    gap: 10,
  },
  userName: {
    width: 64,
    height: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: '#E6E7EA',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  frame1: {
    width: 100,
    height: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: '#E6E7EA',
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
    color: '#4C5467',
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
    fontSize: 12,
    fontWeight: '400',
    color: '#000000',
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
    color: '#000000',
    letterSpacing: 0,
  },
  eyes: {
    width: 10,
    height: 10,
  },
});

export default RecipeItem;
