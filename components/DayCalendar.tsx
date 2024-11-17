import { useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

interface DayCalendarProp {
  number?: string; // Số hiển thị bên trong hình tròn
}

const DayCalendar = ({ number }: DayCalendarProp) => {
  const [isActive, setIsActive] = useState(false);

  const handlePress = () => {
    setIsActive(!isActive); // Chuyển đổi trạng thái khi bấm
  };

  return (
    <TouchableOpacity
      style={[styles.circle, isActive ? styles.active : styles.inactive]}
      onPress={handlePress}
    >
      <Text style={[styles.text, isActive ? styles.textActive : styles.textInactive]}>
        {number}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2, // Độ dày của viền
    borderColor: '#E6E7EA', // Màu sắc của viền
  },
  inactive: {
    backgroundColor: 'white', // Nền trắng
  },
  active: {
    backgroundColor: '#5285BE', // Nền xanh
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  textInactive: {
    color: '#222630', // Chữ xanh khi không được chọn
  },
  textActive: {
    color: 'white', // Chữ trắng khi được chọn
  },
});

export default DayCalendar;
