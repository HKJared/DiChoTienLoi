import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import Header from "../../Header";
import { apiGetFamilyGroup } from "../../../api/apiFamily";
import BASE_HOST_URL from "../../../api/baseHostUrl";

const FamilyGroups = ({ groupId }) => {
  const [groupMembers, setGroupMembers] = useState([]); // Mảng thành viên nhóm
  const [selectedDate, setSelectedDate] = useState("09");
  const [groupName, setGroupName] = useState(""); // Lưu tên nhóm

  const dates = ["06", "07", "08", "09", "10", "11", "06"];

  // Lấy thông tin nhóm khi component được mount
  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const data = await apiGetFamilyGroup(groupId); // Gọi API lấy thông tin nhóm
        console.log(data);
        setGroupMembers(data.family_group.members || []); // Giả sử API trả về dữ liệu với thuộc tính "members"
        setGroupName(data.family_group.name); // Cập nhật tên nhóm
      } catch (error) {
        console.error("Error fetching group data:", error.message);
      }
    };

    fetchGroupData();
  }, [groupId]);

  console.log(groupMembers);

  const handleRemoveMember = (id) => {
    setGroupMembers((prev) => prev.filter((member) => member.id !== id));
  };

  return (
    <>
      <Header title={groupName || "Nhóm của bạn"} />{" "}
      {/* Hiển thị tên nhóm hoặc "Nhóm của bạn" */}
      <ScrollView style={styles.container}>
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
                    source={{
                      uri: item.avatar || "https://via.placeholder.com/40",
                    }} // Sử dụng ảnh đại diện nếu có
                  />
                  <View>
                    <Text style={styles.memberName}>{item.fullname}</Text>
                    <Text style={styles.memberUsername}>{item.email}</Text>
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
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    padding: 10,
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
