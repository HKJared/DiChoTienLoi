import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = process.env.BASE_URL;

export const fetchPostData = async (endpoint, options = {}) => {
  try {
    // Lấy token từ AsyncStorage
    const token = await AsyncStorage.getItem("authToken");

    // Cập nhật headers
    const headers = {
      "Content-Type": "application/json",
      ...options.headers, // Bao gồm các headers khác từ options nếu có
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`; // Thêm Authorization header
    }

    // Xây dựng URL đầy đủ
    const url = `${API_BASE_URL}${endpoint}`;

    // Gửi yêu cầu fetch
    const response = await fetch(url, {
      method: options.method || "GET",
      headers: headers,
      body: options.body ? JSON.stringify(options.body) : null,
    });

    // Xử lý lỗi nếu response không thành công
    if (!response.ok) {
      const errorBody = await response.json();
      throw {
        message: errorBody.error?.message || "Có lỗi xảy ra!",
        status: response.status,
      };
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};
