import { getToken } from "../services/storageService";
import BASE_HOST_URL from "./baseHostUrl";

// Hàm gọi API lấy thông tin người dùng
export const apiGetUserInfo = async () => {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error("No token found. Please log in again.");
    }

    const response = await fetch(`${BASE_HOST_URL}api/user/info`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authentication: token,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch user info");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
};

// Hàm đổi mật khẩu
export const apiChangePassword = async (oldPassword, newPassword) => {
  try {
    const token = await getToken();
    const response = await fetch(`${BASE_HOST_URL}/api/change-password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authentication: token,
      },
      body: JSON.stringify({
        old_password: oldPassword,
        new_password: newPassword,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to change password");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Change Password Error:", error);
    throw error;
  }
};

// Hàm thay đổi ảnh đại diện
export const apiChangeAvatar = async (avatarUrl) => {
  try {
    const token = await getToken();
    const response = await fetch(`${BASE_HOST_URL}api/change-avatar`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authentication: token,
      },
      body: JSON.stringify({
        avatar_url: avatarUrl,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to change avatar");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Change Avatar Error:", error);
    throw error;
  }
};

// Hàm cập nhật thông tin người dùng
export const apiUpdateUserInfo = async (userInfo) => {
  try {
    const token = await getToken();
    const response = await fetch(`${BASE_HOST_URL}api/update-info`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authentication: token,
      },
      body: JSON.stringify(userInfo),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update user info");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Update User Info Error:", error);
    throw error;
  }
};

// Hàm upload tệp
export const apiUploadFile = async (formData) => {
  try {
    const token = await getToken();
    const response = await fetch(`${BASE_HOST_URL}/upload`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        authentication: token,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to upload file");
    }

    const data = await response.json();
    return data; // Trả về key (URL) của ảnh
  } catch (error) {
    console.error("Upload File Error:", error);
    throw error;
  }
};
