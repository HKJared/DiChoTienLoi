import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import { apiGetFamilyGroups } from "../../../api/apiFamily";
import { apiGetUserInfo } from "../../../api/apiUser";
import Header from "../../Header";

export default function FamilyMain({ setIsCreateGroup, onGroupSelect }) {
  const [userGroups, setUserGroups] = useState([]); // Nhóm người dùng là trưởng nhóm
  const [joinedGroups, setJoinedGroups] = useState([]); // Nhóm người dùng là thành viên
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [user, setUser] = useState(null);

  // Lấy thông tin người dùng
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

  // Fetch family groups và phân loại nhóm dựa trên group_leader
  const fetchFamilyGroups = async () => {
    try {
      setLoading(true);
      setError(null);
      const groups = await apiGetFamilyGroups(); // Gọi API để lấy danh sách nhóm

      // Kiểm tra nếu dữ liệu có cấu trúc hợp lệ
      if (groups.familiesAsLeader && groups.familiesAsMember) {
        // Lọc nhóm theo thông tin người dùng
        const userGroups = groups.familiesAsLeader.filter(
          (group) => group.group_leader === user.id
        ); // Nhóm người dùng làm trưởng nhóm
        const joinedGroups = groups.familiesAsMember.filter(
          (group) => group.group_leader !== user.id
        ); // Nhóm mà người dùng tham gia (không phải trưởng nhóm)

        setUserGroups(userGroups);
        setJoinedGroups(joinedGroups);
      } else {
        throw new Error("Dữ liệu nhóm không hợp lệ");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchFamilyGroups();
    }
  }, [user]);

  const renderGroupItem = ({ item }) => (
    <TouchableOpacity
      style={styles.groupItem}
      onPress={() => onGroupSelect(item.id)} // Khi nhấn vào nhóm
    >
      <Image
        source={require("../assets/group-family.jpeg")}
        style={styles.groupIcon}
      />
      <View>
        <Text style={styles.groupName}>{item.name}</Text>
        <Text style={styles.groupMembers}>{item.members}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00AF9B" />
        <Text>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Lỗi: {error}</Text>
        <TouchableOpacity
          onPress={fetchFamilyGroups}
          style={styles.retryButton}
        >
          <Text style={styles.retryButtonText}>Thử lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const showNoGroupMessage =
    userGroups.length === 0 && joinedGroups.length === 0;

  return (
    <>
      <Header title="Nhóm gia đình" />
      <View style={styles.container}>
        <View style={styles.body}>
          {!showNoGroupMessage && (
            <>
              {/* Nhóm của bạn (trưởng nhóm) */}
              <View>
                <Text style={styles.sectionTitle}>Nhóm của bạn</Text>
                {userGroups.length > 0 && (
                  <FlatList
                    data={userGroups}
                    renderItem={renderGroupItem}
                    keyExtractor={(item) => item.id}
                    style={styles.groupList}
                  />
                )}
                <TouchableOpacity
                  style={styles.createGroupButton1}
                  onPress={() => setIsCreateGroup(true)}
                >
                  <Text style={styles.createGroupButtonText1}>+</Text>
                </TouchableOpacity>
              </View>

              {/* Nhóm bạn tham gia (thành viên) */}
              <View>
                <Text style={styles.sectionTitle}>Nhóm bạn tham gia</Text>
                {joinedGroups.length > 0 && (
                  <FlatList
                    data={joinedGroups}
                    renderItem={renderGroupItem}
                    keyExtractor={(item) => item.id}
                    style={styles.groupList}
                  />
                )}
              </View>
            </>
          )}

          {showNoGroupMessage && (
            <View style={styles.noGroupContainer}>
              <Image
                source={require("../assets/group-family.jpeg")}
                style={styles.noGroupImage}
              />
              <Text style={styles.noGroupText}>
                Bạn chưa có nhóm gia đình nào!
              </Text>
              <TouchableOpacity
                style={styles.createGroupButton}
                onPress={() => setIsCreateGroup(true)}
              >
                <Text style={styles.createGroupButtonText}>Tạo mới</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  retryButton: {
    backgroundColor: "#00AF9B",
    padding: 10,
    borderRadius: 4,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 8,
  },
  body: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  groupList: {
    marginBottom: 16,
  },
  groupItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#F8F8F8",
    borderRadius: 8,
    marginBottom: 8,
  },
  groupIcon: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  groupName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  groupMembers: {
    fontSize: 12,
    color: "#777",
  },
  noGroupContainer: {
    alignItems: "center",
    flex: 1,
  },
  noGroupImage: {
    width: 220,
    height: 220,
    marginBottom: 10,
    marginTop: 30,
  },
  noGroupText: {
    fontSize: 18,
    color: "#3D6A9F",
    marginBottom: 10,
    fontWeight: "400",
  },
  createGroupButton: {
    backgroundColor: "#00AF9B",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 4,
    marginTop: 5,
  },
  createGroupButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  createGroupButton1: {
    backgroundColor: "#00AF9B", // Màu nền xanh
    width: 24, // Chiều rộng của nút
    height: 24, // Chiều cao của nút
    borderRadius: 24, // Tạo nút tròn
    justifyContent: "center", // Căn giữa nội dung theo chiều dọc
    alignItems: "center", // Căn giữa nội dung theo chiều ngang
  },

  createGroupButtonText1: {
    color: "#fff", // Màu chữ trắng
    fontSize: 18, // Cỡ chữ lớn để dễ nhìn dấu cộng
    fontWeight: "bold", // Đậm để nổi bật
  },
});
