import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  TextInput,
} from "react-native";
import Header from "../../Header";
import {
  apiGetFamilyGroup,
  apiRemoveMemberFromFamilyGroup,
  apiAddMemberToFamilyGroup,
  apiDeleteFamilyGroup,
} from "../../../api/apiFamily";
import {
  apiGetUserInfo,
  apiGetUserByUsernameOrPhoneNumber,
} from "../../../api/apiUser";
import BASE_HOST_URL from "../../../api/baseHostUrl";

const FamilyGroups = ({ groupId, onBack }) => {
  const [groupMembers, setGroupMembers] = useState([]); // Mảng thành viên nhóm
  const [selectedDate, setSelectedDate] = useState("09");
  const [groupName, setGroupName] = useState(""); // Lưu tên nhóm
  const [user, setUser] = useState(null);
  const [isLeader, setIsLeader] = useState(false);

  const [searchText, setSearchText] = useState(""); // Lưu trữ từ khóa tìm kiếm
  const [searchResults, setSearchResults] = useState([]); // Lưu trữ kết quả tìm kiếm

  const [isSearching, setIsSearching] = useState(false);

  const [isListExpanded, setIsListExpanded] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userData = await apiGetUserInfo();
        setUser(userData.user);
      } catch (error) {
        console.error("Error fetching user info:", error);
        Alert.alert("Error", "Failed to fetch user information.");
      }
    };

    fetchUserInfo();
  }, []);

  const dates = ["06", "07", "08", "09", "10", "11", "06"];

  useEffect(() => {
    const fetchGroupData = async () => {
      if (!user) return; // Ensure `user` is available
      try {
        const data = await apiGetFamilyGroup(groupId);
        setGroupMembers(data.family_group.members || []); // Cập nhật lại danh sách thành viên
        setGroupName(data.family_group.name);
        setIsLeader(data.family_group.group_leader === user.id);
      } catch (error) {
        console.error("Error fetching group data:", error.message);
      }
    };

    fetchGroupData();
  }, [user, groupId]); // Add `user` as a dependency

  const handleRemoveMember = async (memberId) => {
    try {
      const response = await apiRemoveMemberFromFamilyGroup(groupId, memberId);
      if (response.message === "Xóa thành công.") {
        setGroupMembers((prevState) => {
          const newMembers = prevState.filter(
            (members) => members.user_id !== memberId
          );
          return newMembers;
        });

        Alert.alert("Thành công!", "Đã xóa người dùng ra nhóm của bạn.");
      } else {
        Alert.alert("Error", "Failed to remove member.");
      }
    } catch (error) {
      console.error("Remove Member error:", error.message);
      Alert.alert("Error", "An error occurred while removing the member.");
    }
  };

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

  const handleAddMember = async (memberId) => {
    if (!memberId) {
      Alert.alert("Error", "Vui lòng chọn thành viên để thêm.");
      return;
    }

    try {
      // Kiểm tra xem thành viên đã có trong nhóm chưa
      const isMemberExist = groupMembers.some(
        (member) => member.user_id === memberId
      );
      if (isMemberExist) {
        Alert.alert("Error", "Thành viên này đã có trong nhóm.");
        return;
      }

      // Tìm kiếm thành viên trong searchResults bằng memberId
      const newMember = searchResults.find((result) => result.id === memberId);
      if (newMember) {
        // Thêm thành viên vào groupMembers ngay lập tức với đầy đủ thông tin
        setGroupMembers((prevState) => [
          ...prevState,
          {
            user_id: newMember.id,
            fullname: newMember.fullname,
            email: newMember.email, // Hoặc thêm các trường khác nếu cần
          },
        ]);
        Alert.alert("Success", "Thêm thành viên thành công.");
      } else {
        Alert.alert("Error", "Không tìm thấy thông tin thành viên.");
      }

      // Gửi yêu cầu API để thêm thành viên vào nhóm
      const response = await apiAddMemberToFamilyGroup(groupId, [memberId]);
      if (response && response.message === "Thêm thành công.") {
        console.log("Member added successfully");
      } else {
        Alert.alert("Error", "Không thể thêm thành viên.");
      }
    } catch (error) {
      console.error("Add Member error:", error.message);
      Alert.alert("Error", "Đã xảy ra lỗi khi thêm thành viên.");
    }
  };

  const toggleSearch = () => {
    setIsSearching(!isSearching); // Toggle trạng thái hiển thị tìm kiếm
  };

  //hàm xóa nhóm
  const handleDeleteGroup = async () => {
    try {
      const response = await apiDeleteFamilyGroup(groupId); // Gọi API xóa nhóm
      if (response.message === "Xóa nhóm gia đình thành công.") {
        Alert.alert("Thành công!", "Nhóm đã bị xóa!");
        onBack(); // Quay lại màn hình trước đó
      } else {
        Alert.alert("Error", "Không thể xóa nhóm.");
      }
    } catch (error) {
      console.error("Delete Group error:", error.message);
      Alert.alert("Error", "Đã xảy ra lỗi khi xóa nhóm.");
    }
  };

  return (
    <>
      <Header
        title={`${
          isLeader ? "Nhóm của bạn" : "Nhóm bạn tham gia"
        }: ${groupName}`}
      />
      <ScrollView style={styles.container}>
        <TouchableOpacity onPress={onBack} style={styles.button}>
          <View style={styles.backButtonContainer}>
            <Text style={styles.backArrow}>&#8592;</Text>
            <Text style={styles.buttonText}>Tất cả các nhóm</Text>
          </View>
        </TouchableOpacity>
        {/* Group Members */}
        <View style={styles.section}>
          {/* Button to toggle member list */}
          <TouchableOpacity onPress={() => setIsListExpanded(!isListExpanded)}>
            <Text style={styles.sectionTitle}>Thành viên nhóm</Text>
          </TouchableOpacity>

          {/* Display group members */}
          {isListExpanded && (
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
                  {item.user_id === user?.id ? (
                    <Text style={styles.selfText}>Bạn</Text> // Hiển thị chữ "Bạn"
                  ) : (
                    isLeader && (
                      <TouchableOpacity
                        onPress={() => handleRemoveMember(item.user_id)}
                      >
                        <Text style={styles.removeText}>Xóa khỏi nhóm</Text>
                      </TouchableOpacity>
                    )
                  )}
                </View>
              )}
            />
          )}
        </View>

        {/* Add new member */}
        {/* Button to trigger search */}
        {isListExpanded && isLeader && (
          <View style={styles.addMemberContainer}>
            <TouchableOpacity
              onPress={toggleSearch}
              style={styles.addMemberButton}
            >
              <Text style={styles.addMemberButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Add new member - Display only when `isSearching` is true */}
        {isSearching && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Thêm thành viên vào nhóm</Text>
            <TextInput
              style={styles.input}
              placeholder="Tên tài khoản, Tên người dùng, Số điện thoại"
              value={searchText}
              onChangeText={handleSearch} // Cập nhật giá trị của từ khóa tìm kiếm
            />

            {/* Display search results */}
            {searchResults.length > 0 && (
              <FlatList
                data={searchResults}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.searchResultItem}
                    onPress={() => handleAddMember(item.id)}
                  >
                    <Text style={styles.searchResultText}>{item.fullname}</Text>
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
        )}

        {/* Recipe Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Công thức nấu ăn</Text>
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

        {isLeader && (
          <View style={styles.footerButtonsContainer}>
            <TouchableOpacity
              style={[styles.footerButton, styles.updateButton]}
              onPress={() => {
                Alert.alert(
                  "Cập nhật nhóm",
                  "Chức năng cập nhật nhóm được thực hiện ở đây."
                );
              }}
            >
              <Text style={styles.footerButtonText}>Cập nhật nhóm</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.footerButton, styles.deleteButton]}
              onPress={() => {
                Alert.alert(
                  "Xác nhận",
                  "Bạn có chắc chắn muốn xóa nhóm này?",
                  [
                    { text: "Hủy", style: "cancel" },
                    {
                      text: "Xóa",
                      onPress: handleDeleteGroup,
                    },
                  ],
                  { cancelable: true }
                );
              }}
            >
              <Text style={styles.footerButtonText}>Xóa nhóm</Text>
            </TouchableOpacity>
          </View>
        )}
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
  selfText: {
    color: "#007bff",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
    alignSelf: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
  searchResultItem: {
    padding: 10,
    backgroundColor: "#f1f1f1",
    marginBottom: 5,
    borderRadius: 5,
  },
  searchResultText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  addMemberContainer: {
    marginTop: -10,
    marginBottom: 10,
  },
  addMemberButton: {
    width: 24,
    height: 24,
    borderRadius: 25,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
  },
  addMemberButtonText: {
    fontSize: 14,
    color: "#fff",
  },
  button: {
    marginBottom: 12,
    marginLeft: -5,
  },
  backButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  backArrow: {
    fontSize: 16,
    fontWeight: "Bold",
    marginRight: 2,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  footerButtonsContainer: {
    flexDirection: "column",
    marginVertical: 20,
    paddingHorizontal: 10,
    width: "50%",
    alignSelf: "center",
  },
  footerButton: {
    paddingVertical: 8,
    marginVertical: 4,
    borderRadius: 4,
    alignItems: "center",
  },
  updateButton: {
    backgroundColor: "#007bff",
  },
  deleteButton: {
    backgroundColor: "#ff4d4d",
  },
  footerButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default FamilyGroups;
