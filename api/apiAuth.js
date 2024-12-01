import { saveToken, removeToken } from "../services/storageService";

//ae dùng thì đổi sang cái localhost nhé
const API_BASE_URL = "http://192.168.1.169:4000/api";

export const apiRegister = async (username, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        account: { username, password },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Registration failed");
    }

    const data = await response.json();
    return data; // { message: "User registered successfully" }
  } catch (error) {
    console.error("Register error:", error);
    throw error;
  }
};

export const apiLogin = async (username, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        account: { username, password },
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Response Error Data:", errorData);
      throw new Error(errorData.message || "Login failed");
    }
    const data = await response.json();
    console.log("Login Successful:", data);
    await saveToken(data.jwt);
    return data;
  } catch (error) {
    console.error("Fetch Error Details:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await removeToken(); // Xóa token khỏi AsyncStorage
    return { message: "Logout successful" };
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};