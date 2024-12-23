import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import { apiCreateFamilyGroup } from "../../../api/apiFamily";
import { apiGetUserByUsernameOrPhoneNumber } from "../../../api/apiUser";
import Header from "../../Header";
import BASE_HOST_URL from "../../../api/baseHostUrl";
export default function CreateGroup({ setIsCreateGroup }) {
  const router = useRouter();

  // Trạng thái lưu tên nhóm, thành viên và tìm kiếm
  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  const [searchText, setSearchText] = useState(""); // Lưu trữ từ khóa tìm kiếm
  const [searchResults, setSearchResults] = useState([]); // Lưu trữ kết quả tìm kiếm

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

  // Hàm tạo nhóm gia đình
  const handleCreateGroup = async () => {
    if (!groupName || members.length === 0) {
      alert("Vui lòng nhập tên nhóm và chọn ít nhất một thành viên.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const memberIds = members.map((member) => member.id); // Lấy IDs của thành viên
      await apiCreateFamilyGroup(groupName, memberIds); // Gọi API tạo nhóm
      alert("Nhóm đã được tạo thành công!");
      setIsCreateGroup(false); // Quay lại màn hình trước
    } catch (err) {
      setError("Không thể tạo nhóm, vui lòng thử lại.");
      console.error("Create Family Group error:", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Hàm xử lý tìm kiếm
  const handleSearch = async (text) => {
    setSearchText(text);
    if (text.length > 2) {
      try {
        const results = await apiGetUserByUsernameOrPhoneNumber(text);
        setSearchResults(results ? [results] : []);
      } catch (error) {
        console.error("Search failed", error);
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
    }
  };

  return (
    <>
      <Header title="Tạo nhóm mới" />
      <View style={styles.container}>
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
            value={searchText}
            onChangeText={handleSearch} // Cập nhật giá trị của từ khóa tìm kiếm
          />
          <View style={styles.divider} />
          <TouchableOpacity style={styles.searchIcon}>
            <Image
              source={require("../../recipe/assets/search-outline.png")} // Replace with your search icon path
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.searchResultsContainer}>
          {searchResults.length > 0 ? (
            searchResults.map((result) => (
              <View key={result.id} style={styles.searchResultItem}>
                <Image
                  source={{ uri: result.avatarUrl }}
                  style={styles.avatar}
                />
                <View style={styles.resultInfo}>
                  <Text style={styles.resultName}>{result.fullname}</Text>
                  <Text style={styles.resultUsername}>{result.username}</Text>
                </View>
                <TouchableOpacity onPress={() => handleAddMember(result)}>
                  <Text style={styles.addButton}>Thêm vào nhóm</Text>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text>No results found</Text>
          )}
        </View>

        {/* Hiển thị các thành viên đã chọn */}
        <Text style={styles.title}>Thành viên đã chọn</Text>
        <View style={styles.selectedMembersContainer}>
          {members.map((member) => (
            <View key={member.id} style={styles.tag}>
              <Image
                source={{ uri: member.avatarUrl }}
                style={styles.tagAvatar}
              />
              <Text style={styles.tagText}>{member.fullname}</Text>
              <TouchableOpacity onPress={() => handleRemoveMember(member.id)}>
                <Text style={styles.removeIconText}>Xóa</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Hiển thị lỗi nếu có */}
        {error && <Text style={styles.errorText}>{error}</Text>}

        {/* Nút tạo nhóm */}
        <View
          style={{ alignItems: "center", flex: 1, justifyContent: "flex-end" }}
        >
          <TouchableOpacity
            style={styles.createButton}
            onPress={handleCreateGroup}
            disabled={isLoading}
          >
            <Text style={styles.createButtonText}>
              {isLoading ? "Đang tạo..." : "Tạo nhóm"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingTop: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
    marginLeft: 10,
  },
  input: {
    width: "95%",
    height: 48,
    borderColor: "#D9D9D9",
    borderWidth: 1,
    paddingHorizontal: 12,
    borderRadius: 8,
    fontSize: 14,
    backgroundColor: "#FAFAFA",
    marginBottom: 20,
    alignSelf: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#D9D9D9",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#FAFAFA",
    height: 48,
    marginBottom: 20,
    width: "95%",
    alignSelf: "center",
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },
  searchIcon: {
    paddingHorizontal: 8,
  },
  divider: {
    width: 1,
    height: "70%",
    backgroundColor: "#E0E0E0",
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: "#888",
  },
  searchResultsContainer: {
    marginTop: 10,
  },
  searchResultItem: {
    padding: 10,
    borderBottomColor: "#E0E0E0",
    borderBottomWidth: 1,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  resultInfo: {
    flex: 1,
  },
  resultName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  resultUsername: {
    fontSize: 14,
    color: "#888",
  },
  addButton: {
    color: "#00AF9B",
    fontSize: 14,
    fontWeight: "600",
  },
  selectedMembersContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    marginBottom: 20,
    alignSelf: "center",
    width: "95%",
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E6F7F5",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  tagAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  tagText: {
    fontSize: 14,
    color: "#006D5B",
  },
  removeIconText: {
    color: "#FF5C5C",
    fontWeight: "bold",
    fontSize: 14,
  },
  createButton: {
    width: "60%",
    paddingVertical: 14,
    backgroundColor: "#00AF9B",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 20,
  },
  createButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    textAlign: "center",
  },
});
