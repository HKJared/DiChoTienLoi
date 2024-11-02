import { useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

interface CommodityProp {
  _soluong?: string;
  _donvi?: string;
  _tenthucpham?: string;
  _phanloai?: string;
  _noimua?: string;
  _diachi?: string;
}

const Commodity = ({ _soluong, _donvi, _tenthucpham, _phanloai, _noimua, _diachi}: CommodityProp) => {
  const [isActive, setIsActive] = useState(false);

  const handlePress = () => {
    setIsActive(!isActive); // Chuyển đổi trạng thái khi bấm
  };

  return (
    <TouchableOpacity
      style={[styles.commodity, isActive ? styles.active : styles.inactive]}
      onPress={handlePress}
    >
        <View style={styles.circle}>
            <Text style={styles.soluong}>
                {_soluong} {_donvi}
            </Text>
        </View>
        <View style={styles.thongtinchitiet}>
            <Text style={[styles.tenthucpham, styles.isChild]}>
                {_tenthucpham}
            </Text>
            <Text  style={[styles.phanloai, styles.isChild]}>
                {_phanloai}
            </Text>
            <Text style={ styles.isChild} numberOfLines={1}>
                <Text style={styles.noimua} numberOfLines={1}>
                    {_noimua}:
                </Text> {_diachi}
            </Text>
        </View>
        <View style={styles.icon_show}>
            <Text style={styles.show}>
                >
            </Text>
        </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  commodity: {
      width: 344,
      height: 107,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 2,
      padding: 8,
      flexDirection: 'row',
      },
  circle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginRight: 8,
  },
  thogntinchitiet:{
      width: 250,
      flexWrap: 'wrap',
      overflow: 'hidden',
  },
  soluong: {
      fontSize:16,
      },
  inactive: {
    backgroundColor: '#B8BFCC', // Nền trắng
  },
  active: {
    backgroundColor: '#00AF9B', // Nền xanh
  },
  isChild: {
      width: 250,
      overflow: 'hidden',
      },
  tenthucpham:{
      fontSize: 16,
      fontWeight: 'bold',
      lineHeight: 20,
      },
  phanloai: {
      color: '#626C7F'
      },
  noimua: {
      fontWeight: 'bold',
      },
});

export default Commodity;
