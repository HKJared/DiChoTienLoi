import { fetchPostData } from "@/utils/api";

export const getMarketCategories = async () => {
  try {
    const token = ""; // Thêm token nếu cần
    const headers = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    const result = await fetchPostData("/marketplace-categories", {
      headers: headers,
      method: "GET",
    });

    console.log("API response:", result);
    return result;
  } catch (error) {
    if (error.status) {
      // Lỗi có status code (HTTP error)
      console.error(
        "Lỗi từ server:",
        error.message || "Có lỗi xảy ra từ server!"
      );
    } else {
      // Lỗi không xác định (network hoặc cấu hình)
      console.error(
        "Lỗi mạng hoặc cấu hình API:",
        error.message || "Có lỗi xảy ra!"
      );
    }
    throw error; // Ném lỗi để xử lý phía trên nếu cần
  }
};
