import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";

const FamilyGroups = () => {
  const [groupMembers, setGroupMembers] = useState([
    { id: "1", name: "Vũ Tiến Quyền", username: "quyen.vt" },
    { id: "2", name: "Vũ Tiến Quyền", username: "quyen.vt" },
    { id: "3", name: "Vũ Tiến Quyền", username: "quyen.vt" },
    { id: "4", name: "Vũ Tiến Quyền", username: "quyen.vt" },
  ]);
  const [selectedDate, setSelectedDate] = useState("09");

  const dates = ["06", "07", "08", "09", "10", "11", "06"];

  const handleRemoveMember = (id) => {
    setGroupMembers((prev) => prev.filter((member) => member.id !== id));
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.icon}>⬅</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Nhóm của bạn: Gia đình HKJ</Text>
        <View style={styles.icons}>
          <Text style={styles.icon}>🔔</Text>
          <Text style={styles.icon}>⚙️</Text>
        </View>
      </View>

      {/* Group Members */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Thành viên nhóm</Text>
        <FlatList
          data={groupMembers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.memberRow}>
              <View style={styles.memberInfo}>
                <Image
                  style={styles.avatar}
                  source={{ uri: "https://via.placeholder.com/40" }}
                />
                <View>
                  <Text style={styles.memberName}>{item.name}</Text>
                  <Text style={styles.memberUsername}>{item.username}</Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => handleRemoveMember(item.id)}>
                <Text style={styles.removeText}>Xóa khỏi nhóm</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

      {/* Recipe Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Công thức nấu ăn</Text>
        {/* Có thể thêm logic mở rộng / thu gọn ở đây */}
      </View>

      {/* Shopping Schedule */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Lịch đi chợ</Text>
        <View style={styles.dateContainer}>
          {dates.map((date, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dateItem,
                selectedDate === date && styles.selectedDate,
              ]}
              onPress={() => setSelectedDate(date)}
            >
              <Text style={styles.dateText}>{date}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.shoppingList}>
          <Text style={styles.emptyText}>Chưa có danh sách mua sắm</Text>
          <TouchableOpacity style={styles.suggestButton}>
            <Text style={styles.suggestButtonText}>Đề xuất</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  icons: {
    flexDirection: "row",
  },
  icon: {
    fontSize: 20,
    marginHorizontal: 5,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  memberRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  memberInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: "#ccc",
  },
  memberName: {
    fontWeight: "bold",
  },
  memberUsername: {
    color: "#888",
  },
  removeText: {
    color: "red",
    fontWeight: "bold",
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  dateItem: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#eee",
    alignItems: "center",
  },
  selectedDate: {
    backgroundColor: "#007bff",
  },
  dateText: {
    color: "#fff",
  },
  shoppingList: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
  },
  emptyText: {
    color: "#888",
    marginBottom: 10,
  },
  suggestButton: {
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
  },
  suggestButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default FamilyGroups;
