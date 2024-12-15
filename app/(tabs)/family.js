import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import FamilyMain from "../../components/family/screen/FamilyMain";
import CreateGroup from "../../components/family/screen/CreateGroup";

export default function App() {
  const [isCreateGroup, setIsCreateGroup] = useState(false);

  const handleCreateGroup = () => {
    setIsCreateGroup(true); // Đổi màn hình sang CreateGroup
  };
  return (
    <View style={styles.container}>
      {isCreateGroup ? (
        <CreateGroup setIsCreateGroup={setIsCreateGroup} /> // Hiển thị CreateGroup nếu isCreateGroup là true
      ) : (
        <FamilyMain onCreateGroup={handleCreateGroup} /> // Hiển thị FamilyMain với onCreateGroup là hàm chuyển màn hình
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
