import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Header from "../../components/Header";
import FamilyMain from "../../components/family/screen/FamilyMain";
import CreateGroupScreen from "../../components/family/screen/CreateGroup";
import FamilyGroups from "../../components/family/screen/FamilyGroups";
import { getToken } from "../../services/storageService"; // Hàm lấy token

export default function App() {
  const [isCreateGroup, setIsCreateGroup] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Trạng thái xác thực
  const [selectedGroup, setSelectedGroup] = useState(null); // Trạng thái nhóm được chọn

  // Kiểm tra token khi component được load
  useEffect(() => {
    const checkAuth = async () => {
      const token = await getToken();
      if (!token) {
        // Nếu không có token, bạn có thể hiển thị một trang đăng nhập hoặc điều hướng
        // Chuyển sang login page
      } else {
        setIsAuthenticated(true); // Nếu có token, người dùng đã đăng nhập
      }
    };

    checkAuth();
  }, []);

  const handleCreateGroup = () => {
    setIsCreateGroup(true); // Đổi màn hình sang CreateGroupScreen
  };

  const handleCancel = () => {
    setIsCreateGroup(false); // Quay lại FamilyMain
  };

  const handleGroupSelect = (groupId) => {
    setSelectedGroup(groupId); // Cập nhật nhóm được chọn
  };

  const handleBackToMain = () => {
    setSelectedGroup(null); // Đặt lại selectedGroup để quay về FamilyMain
  };

  if (!isAuthenticated) {
    return null; // Hoặc có thể hiển thị một loading spinner khi kiểm tra token
  }

  return (
    <View style={styles.container}>
      {selectedGroup ? (
        <FamilyGroups groupId={selectedGroup} onBack={handleBackToMain} />
      ) : isCreateGroup ? (
        <CreateGroupScreen
          onCreateGroup={handleCancel}
          setIsCreateGroup={setIsCreateGroup}
        />
      ) : (
        <FamilyMain
          onCreateGroup={handleCreateGroup}
          setIsCreateGroup={setIsCreateGroup}
          onGroupSelect={handleGroupSelect} // Truyền hàm chọn nhóm
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
});
