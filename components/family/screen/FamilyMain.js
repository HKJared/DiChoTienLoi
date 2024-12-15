import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import headerStyle from "../style/headerStyle";
import { useRouter } from "expo-router";

export default function FamilyMain({ onCreateGroup }) {
  const userGroups = [
    { id: "1", name: "Gia đình HKJ", members: "K.A.Tu, D.Nhat.Ky, C.Tuan.Anh" },
    { id: "2", name: "Gia đình HKJ", members: "K.A.Tu, D.Nhat.Ky, C.Tuan.Anh" },
  ];

  const joinedGroups = [
    {
      id: "3",
      name: "Gia đình HKJ",
      members: "H.K.J, K.A.Tu, D.Nhat.Ky, C.Tuan.Anh",
    },
    {
      id: "4",
      name: "Gia đình HKJ",
      members: "H.K.J, K.A.Tu, D.Nhat.Ky, C.Tuan.Anh",
    },
    {
      id: "5",
      name: "Gia đình HKJ",
      members: "H.K.J, K.A.Tu, D.Nhat.Ky, C.Tuan.Anh",
    },
  ];

  const renderGroupItem = ({ item }) => (
    <View style={styles.groupItem}>
      <Image
        source={require("../assets/group-family.jpeg")}
        style={styles.groupIcon}
      />
      <View>
        <Text style={styles.groupName}>{item.name}</Text>
        <Text style={styles.groupMembers}>{item.members}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={headerStyle.containerHeader}>
        <TouchableOpacity>
          <Text style={headerStyle.textTrangChu}>Logo</Text>
        </TouchableOpacity>
        <View style={headerStyle.containerTrangChu}>
          <Text style={headerStyle.textTrangChu}>Nhóm gia đình</Text>
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

      {/* Body */}
      <View style={styles.body}>
        <Text style={styles.sectionTitle}>Nhóm của bạn</Text>
        <FlatList
          data={userGroups}
          renderItem={renderGroupItem}
          keyExtractor={(item) => item.id}
          style={styles.groupList}
        />

        <Text style={styles.sectionTitle}>Nhóm bạn tham gia</Text>
        <FlatList
          data={joinedGroups}
          renderItem={renderGroupItem}
          keyExtractor={(item) => item.id}
          style={styles.groupList}
        />

        {/* Create Group Section */}
        {userGroups.length === 0 && (
          <View style={styles.noGroupContainer}>
            <Image
              source={require("../assets/group-family.jpeg")} // Update image path
              style={styles.noGroupImage}
            />
            <Text style={styles.noGroupText}>
              Bạn chưa có nhóm gia đình nào!
            </Text>
            <TouchableOpacity
              style={styles.createGroupButton}
              onPress={onCreateGroup} // Call onCreateGroup function when button is pressed
            >
              <Text style={styles.createGroupButtonText}>Tạo mới</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#F5F5F5",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
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
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    backgroundColor: "#F5F5F5",
  },
});
