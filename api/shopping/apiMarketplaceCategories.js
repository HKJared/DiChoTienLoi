// import { getToken } from "../services/storageService";
// const API_BASE_URL = process.env.BASE_URL;
const API_BASE_URL = "http://192.168.1.17:8888/api";
export const getMarketCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/marketplace-categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      //   body: JSON.stringify({
      //     account: { username, password },
      //   }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Response Error Data:", errorData);
      throw new Error(errorData.message || "Get market categories failed");
    }
    const data = await response.json();
    console.log("Get market categories Successful:", data);
    await saveToken(data.jwt);
    return data;
  } catch (error) {
    console.error("Fetch Error Details:", error);
    throw error;
  }
};
