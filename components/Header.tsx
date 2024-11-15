import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const Header = ({ title }) => {

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity >
        <Icon name="chevron-back" size={28} color="#0057a3" />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>{title}</Text>

      <View style={styles.rightIconsContainer}>
        <TouchableOpacity style={styles.headerNoti}>
          <Icon name="notifications-outline" size={28} color="#0057a3" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerSet}>
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
    position : 'absolute',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0057a3',
    left: 0,
    right:0,
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