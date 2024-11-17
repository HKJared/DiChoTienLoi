import { useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

interface DayCalendarDotProp {
  number?: string; // Số hiển thị bên trong hình tròn
}

const DayCalendarDot = ({ number }: DayCalendarDotProp) => {
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
        <View style={[styles.dot, isActive ? styles.dotActive : styles.dotInactive]} />
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
    position: 'relative',
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
    color: '#222630', // Chữ màu khi không được chọn
  },
  textActive: {
    color: 'white', // Chữ trắng khi được chọn
  },
  numberContainer: {
    alignItems: 'center', // Căn giữa chữ số
    justifyContent: 'center', // Căn giữa theo chiều dọc
  },
  dot: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2, // Tạo hình tròn cho dấu chấm
    bottom: 6, // Khoảng cách giữa chữ số và dấu chấm
  },
  dotInactive: {
    backgroundColor: '#5285BE', // Màu của dấu chấm khi không được chọn
  },
  dotActive: {
    backgroundColor: 'white', // Màu của dấu chấm khi được chọn
  },
});

export default DayCalendarDot;
