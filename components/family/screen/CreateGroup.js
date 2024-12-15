import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import headerStyle from "../style/headerStyle";
import { useRouter } from "expo-router";

export default function CreateGroup({ setIsCreateGroup }) {
  const router = useRouter();

  // Trạng thái lưu tên nhóm, thành viên và tìm kiếm
  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Dữ liệu giả lập thành viên để tìm kiếm
  const allMembers = [
    { id: "1", name: "H.K.Jared" },
    { id: "2", name: "K.Anh.Tu" },
    { id: "3", name: "D.Nhat.Ky" },
    { id: "4", name: "C.Tuan.Anh" },
  ];

  // Hàm xử lý thêm thành viên vào nhóm
  const handleAddMember = (member) => {
    if (!members.some((m) => m.id === member.id)) {
      setMembers([...members, member]);
    }
  };

  // Hàm xử lý xóa thành viên khỏi nhóm
  const handleRemoveMember = (memberId) => {
    setMembers(members.filter((m) => m.id !== memberId));
  };

  // Lọc thành viên dựa trên từ khóa tìm kiếm
  const filteredMembers = allMembers.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Hàm quay lại màn hình trước
  const handleBack = () => {
    setIsCreateGroup(false);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={headerStyle.containerHeader}>
        <TouchableOpacity
          style={headerStyle.containerLogo}
          onPress={handleBack}
        >
          <Image
            source={require("@/assets/images/shopping/left-2_svgrepo.png")}
            style={headerStyle.iconHeader}
          />
        </TouchableOpacity>
        <View style={headerStyle.containerTrangChu}>
          <Text style={headerStyle.textTrangChu}>Tạo nhóm gia đình</Text>
        </View>
        <View style={headerStyle.containerNotificationSetting}>
          <Image
            source={require("@/assets/images/header/header-item.png")}
            style={headerStyle.icon}
          />
          <Image
            source={require("@/assets/images/header/gear-settings_svgrepo.png")}
            style={headerStyle.icon}
          />
        </View>
      </View>

      <View style={styles.body}>
        {/* Nhập tên nhóm */}
        <Text style={styles.title}>Tên nhóm</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập tên nhóm gia đình"
          value={groupName}
          onChangeText={setGroupName}
        />

        {/* Tìm kiếm thành viên */}
        <Text style={styles.title}>Thành viên gia đình</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Tên tài khoản, Tên người dùng, Số điện thoại"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <View style={styles.divider} />
          <TouchableOpacity style={styles.searchIcon}>
            <Image
              source={require("../../recipe/assets/search-outline.png")} // Replace with your search icon path
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>

        {/* Hiển thị danh sách thành viên khi có kết quả tìm kiếm */}
        {searchQuery.length > 0 && filteredMembers.length > 0 && (
          <FlatList
            data={filteredMembers}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.memberItem}
                onPress={() => handleAddMember(item)}
              >
                <Text>{item.name}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />
        )}

        {/* Hiển thị thành viên đã chọn */}
        {members.length > 0 && (
          <View style={styles.selectedMembersContainer}>
            {members.map((member) => (
              <View key={member.id} style={styles.tag}>
                <Text style={styles.tagText}>{member.name}</Text>
                <TouchableOpacity
                  style={styles.removeIcon}
                  onPress={() => handleRemoveMember(member.id)}
                >
                  <Text style={styles.removeIconText}>X</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* Nút tạo nhóm */}
        <View
          style={{ alignItems: "center", flex: 1, justifyContent: "flex-end" }}
        >
          <TouchableOpacity
            style={styles.createButton}
            onPress={() => alert("Nhóm đã được tạo!")}
          >
            <Text style={styles.createButtonText}>Tạo nhóm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    width: 388,
    height: 354,
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    position: "absolute",
    top: "31%",
    left: "50%",
    transform: [{ translateX: -194 }, { translateY: -177 }], // Dịch chuyển để khung nằm đúng tâm
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  title: {
    fontWeight: 500,
    fontSize: 14,
    lineHeight: 17,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginTop: 10,
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  searchInput: {
    flex: 1,
    height: 50,
  },
  searchIcon: {
    marginLeft: 10,
  },
  divider: {
    width: 1, // Chiều rộng của thanh dọc
    height: 40, // Chiều cao của thanh dọc
    backgroundColor: "#CCC", // Màu sắc của thanh dọc
  },
  icon: {
    width: 24,
    height: 24,
  },
  selectedMembersContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 10,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E0E0E0",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 5,
    marginBottom: 5,
  },
  tagText: {
    fontSize: 14,
    color: "#333",
  },
  removeIcon: {
    marginLeft: 5,
  },
  removeIconText: {
    color: "#888",
    fontWeight: "bold",
  },
  memberItem: {
    padding: 10,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },
  createButton: {
    width: 140,
    marginTop: 20,
    padding: 14,
    backgroundColor: "#00AF9B",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
  },
  createButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
