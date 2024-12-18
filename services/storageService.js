import AsyncStorage from "@react-native-async-storage/async-storage";

// Lưu token vào AsyncStorage
export const saveToken = async (token) => {
  try {
    if (token) {
      await AsyncStorage.setItem("authToken", token);
    } else {
      console.warn("No token to save");
    }
  } catch (error) {
    console.error("Error saving token:", error);
  }
};


// Lấy token từ AsyncStorage
export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("authToken");
    if (token) {
      return token;
    }
    return null;
  } catch (error) {
    console.error("Error fetching token:", error);
    return null;
  }
};

// Xóa token khỏi AsyncStorage
export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem("authToken");
  } catch (error) {
    console.error("Error removing token:", error);
  }
};
