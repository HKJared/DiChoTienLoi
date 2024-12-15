import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { apiLogin } from "../api/apiAuth";

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Email và mật khẩu không được để trống.");
      return;
    }

    setLoading(true);
    try {
      const response = await apiLogin(email, password);
      Alert.alert("Success", response.message); // "Đăng nhập thành công"
      console.log("JWT Token:", response.jwt);

      // Chuyển sang màn hình chính (Tabs)
      router.replace("/"); // Chuyển hướng đến layout chính
    } catch (error) {
      Alert.alert("Error", error.message || "Đăng nhập thất bại.");
    } finally {
      setLoading(false);
    }
  };

  const navigateToRegister = () => {
    // Chuyển hướng đến màn hình đăng ký
    router.push("register");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Screen</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button
        title={loading ? "Logging in..." : "Login"}
        onPress={handleLogin}
        disabled={loading}
      />

      {/* Chuyển hướng sang màn hình đăng ký */}
      <TouchableOpacity
        onPress={navigateToRegister}
        style={styles.registerLink}
      >
        <Text style={styles.registerText}>Chưa có tài khoản? Đăng ký ngay</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  registerLink: {
    marginTop: 15,
  },
  registerText: {
    color: "#007bff",
    fontSize: 16,
  },
});
