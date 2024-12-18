import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Positions } from 'react-native-calendars/src/expandableCalendar';
// import Icon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Ionicons'

const Header = ({ title, onBackPress }: { title: string; onBackPress: () => void }) => {

  return (
    <View style={styles.headerContainer}>
      {onBackPress ? (
        <TouchableOpacity onPress={onBackPress} >
          <Icon name="chevron-back" size={28} color="#0057a3" />
        </TouchableOpacity>
      ) : (
        <View/>
      )}

      <Text style={styles.headerTitle}>{title}</Text>

      <View style={styles.rightIconsContainer}>
        <TouchableOpacity style={styles.headerNoti}>
          <Icon name="notifications-outline" size={28} color="#0057a3" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="settings-outline" size={28} color="#0057a3" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    position: 'relative',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
     borderBottomColor: '#ddd',
  },
  headerTitle: {
    position: 'absolute',
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0057a3',
    left: 50, 
    right: 50, 
  },
  rightIconsContainer: {
      flexDirection: 'row', // Đặt các nút ở cạnh phải theo hàng ngang
      alignItems: 'center', // Căn giữa các nút
    },
  headerNoti: {
      marginRight: 10, // Khoảng cách giữa các nút
  },
});

export default Header