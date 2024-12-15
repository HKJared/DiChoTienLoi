import React, { useState, useEffect } from "react";
import * as Updates from "expo-updates";
import * as ImagePicker from "expo-image-picker";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  Modal,
} from "react-native";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import {
  apiChangeAvatar,
  apiChangePassword,
  apiGetUserInfo,
  apiUpdateUserInfo,
  apiUploadFile,
} from "../../../api/apiUser";
import { logout } from "../../../api/apiAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [gender, setGender] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userData = await apiGetUserInfo();
        setUser(userData.user);

        if (userData.user.gender) {
          setGender(userData.user.gender);
        }

        if (userData.user.date_of_birth) {
          setDateOfBirth(new Date(userData.user.date_of_birth));
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
        Alert.alert("Error", "Failed to fetch user information.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      Alert.alert("Logged Out", "You have been logged out successfully.");
      await Updates.reloadAsync();
    } catch (error) {
      Alert.alert("Error", "Logout failed. Please try again.");
    }
  };

  const handleEdit = (field, value) => {
    setUser((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await apiUpdateUserInfo({ ...user, gender, date_of_birth: dateOfBirth });
      Alert.alert("Success", "Your profile information has been updated!");
    } catch (error) {
      Alert.alert("Error", "Failed to update user information.");
    }
  };

  const handlePickAvatar = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        "Permission Denied",
        "You need to enable permission to access photos."
      );
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!pickerResult.canceled) {
      const selectedAsset = pickerResult.assets[0];

      const formData = new FormData();
      formData.append("files[]", {
        uri: selectedAsset.uri,
        name: selectedAsset.uri.split("/").pop(),
        type: selectedAsset.type,
      });
      formData.append("keys[]", "avatar");

      try {
        const uploadData = await apiUploadFile(formData);

        if (!uploadData || !uploadData.avatar) {
          throw new Error("Failed to upload avatar image.");
        }

        const avatarUrl = uploadData.avatar;

        await apiChangeAvatar(avatarUrl);

        setUser((prevState) => {
          return {
            ...prevState,
            avatar_url: avatarUrl,
          };
        });

        await AsyncStorage.setItem(
          "user",
          JSON.stringify({ ...user, avatar_url: avatarUrl })
        );

        Alert.alert("Success", "Avatar has been updated!");
      } catch (error) {
        console.error("Error updating avatar:", error);
        Alert.alert("Error", "Failed to update avatar.");
      }
    }
  };

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword) {
      Alert.alert("Error", "Please fill in both old and new passwords.");
      return;
    }

    try {
      await apiChangePassword(oldPassword, newPassword);
      Alert.alert("Success", "Password has been updated!");
      setOldPassword("");
      setNewPassword("");
      setShowModal(false);
    } catch (error) {
      Alert.alert("Error", "Failed to change password.");
    }
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    setDateOfBirth(selectedDate || dateOfBirth);
  };

  const [avatarUri, setAvatarUri] = useState(
    user?.avatar_url
      ? `http://192.168.1.10:4000/public${user.avatar_url}`
      : null
  );

  const handleImageError = () => {
    setAvatarUri(require("../assets/null-avt.jpg"));
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <Text>No user data available</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Avatar */}
      <TouchableOpacity onPress={handlePickAvatar}>
        <Image
          source={
            avatarUri ? { uri: avatarUri } : require("../assets/null-avt.jpg")
          }
          style={styles.avatar}
          onError={handleImageError}
        />
      </TouchableOpacity>
      <Text style={styles.changeAvatarText}>Tap avatar to change</Text>

      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        value={user.username}
        onChangeText={(text) => handleEdit("username", text)}
      />

      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        value={user.fullname}
        onChangeText={(text) => handleEdit("fullname", text)}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={user.email || ""}
        onChangeText={(text) => handleEdit("email", text)}
        keyboardType="email-address"
      />

      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.input}
        value={user.phone_number || ""}
        onChangeText={(text) => handleEdit("phone_number", text)}
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Last Activity</Text>
      <Text style={styles.value}>{user.last_activity}</Text>

      {/* Gender Radio Buttons */}
      <Text style={styles.label}>Gender</Text>
      <View style={styles.genderContainer}>
        <TouchableOpacity
          style={[styles.radioButton, gender === "Nam" && styles.selectedRadio]}
          onPress={() => setGender("Nam")}
        />
        <Text style={styles.genderLabel}>Nam</Text>

        <TouchableOpacity
          style={[styles.radioButton, gender === "Nữ" && styles.selectedRadio]}
          onPress={() => setGender("Nữ")}
        />
        <Text style={styles.genderLabel}>Nữ</Text>

        <TouchableOpacity
          style={[
            styles.radioButton,
            gender === "Khác" && styles.selectedRadio,
          ]}
          onPress={() => setGender("Khác")}
        />
        <Text style={styles.genderLabel}>Khác</Text>
      </View>

      {/* Date of Birth */}
      <Text style={styles.label}>Date of Birth</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <Text style={styles.input}>
          {dateOfBirth
            ? dateOfBirth.toLocaleDateString()
            : "Chưa chọn ngày sinh"}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <RNDateTimePicker
          value={dateOfBirth || new Date()}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}

      <Text style={styles.label}>Role</Text>
      <Text style={styles.value}>{user.role_name}</Text>

      {/* Change Password Button */}
      <Text style={styles.label}></Text>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Cập nhật thông tin</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => setShowModal(true)}
      >
        <Text style={styles.saveButtonText}>Đổi mật khẩu</Text>
      </TouchableOpacity>

      {/* Modal to change password */}
      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Đổi mật khẩu</Text>

            <TextInput
              style={styles.input}
              placeholder="Old Password"
              value={oldPassword}
              onChangeText={setOldPassword}
              secureTextEntry
            />
            <TextInput
              style={styles.input}
              placeholder="New Password"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
            />

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleChangePassword}
            >
              <Text style={styles.saveButtonText}>Đổi mật khẩu</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.cancelButtonText}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Đăng xuất</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "center",
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#cbd5e0",
  },
  changeAvatarText: {
    textAlign: "center",
    color: "#4a5568",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    color: "#4a5568",
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    width: "85%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  cancelButton: {
    backgroundColor: "#e53e3e",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
    marginTop: 12,
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "#38a169",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#e53e3e",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  genderContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#4a5568",
    marginRight: 10,
  },
  selectedRadio: {
    backgroundColor: "#4caf50",
  },
  genderLabel: {
    fontSize: 16,
    marginRight: 20,
  },
});
