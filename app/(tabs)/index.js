import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
} from 'react-native';

const App = () => {
  const [data, setData] = useState(['Item 1', 'Item 2', 'Item 3']);
  const [refreshing, setRefreshing] = useState(false);

  // Hàm xử lý tải lại dữ liệu
  const onRefresh = () => {
    setRefreshing(true);

    // Giả lập tải dữ liệu mới sau 2 giây
    setTimeout(() => {
      setData((prevData) => [...prevData, `New Item ${prevData.length + 1}`]);
      setRefreshing(false);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>{item}</Text>
          </View>
        )}
        // Tích hợp tính năng pull-to-refresh
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#007BFF']} // Màu sắc khi đang refresh (cho Android)
            tintColor="#007BFF" // Màu sắc khi đang refresh (cho iOS)
            title="Đang tải..." // Văn bản hiển thị khi tải
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  text: {
    fontSize: 16,
  },
});

export default App;
