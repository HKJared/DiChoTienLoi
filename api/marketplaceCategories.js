import BASE_HOST_URL from "./baseHostUrl";

// Hàm gọi API lấy thông tin người dùng
export const getMarketCategories = async () => {
  try {
    const response = await fetch(`${BASE_HOST_URL}api/marketplace-categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch market categories");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching market categories:", error);
    throw error;
  }
};
export const getMarketItems = async () => {
  try {
    const response = await fetch(`${BASE_HOST_URL}api/marketplace-items`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch market item");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching market item:", error);
    throw error;
  }
};
