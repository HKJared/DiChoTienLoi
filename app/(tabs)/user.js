import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import ProfileScreen from "../../components/user/screen/ProfileScreen";
import { getToken } from "../../services/storageService"; // Lấy token từ AsyncStorage
import Header from "../../components/Header";

export default function TabUserScreen() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(null); // Sử dụng trạng thái null khi đang kiểm tra token

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await getToken();
      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        router.replace("login"); // Nếu không có token, điều hướng về màn hình login
      }
    };

    checkLoginStatus();
  }, []);

  if (isLoggedIn === null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Checking login status...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isLoggedIn ? (
        <>
          <Header title="Trang cá nhân" />
          <ProfileScreen />
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
