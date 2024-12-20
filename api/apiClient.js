import { getToken } from "../services/storageService";
import BASE_HOST_URL from "./baseHostUrl";

export const apiClient = async (endpoint, method = "GET", body = null) => {
  try {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (method != "GET" && body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${BASE_HOST_URL}api${endpoint}`, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error in API Client:", error);
    throw error;
  }
};

export const apiClientWithToken = async ( endpoint, method = "GET", body = null ) => {
  const token = getToken();

  // if (!token) {
  //     showLoginSuggest();
  //     return
  // }

  try {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        authentication: token,
      },
    };
    if (method != "GET" && body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${BASE_HOST_URL}api${endpoint}`, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error in API Client:", error);
    throw error;
  }
};

export const apiUpload = async (formData) => {
  try {
    const token = getToken();

    // if (!token) {
    //     showLoginSuggest();
    //     return
    // }

    const response = await fetch(`${BASE_HOST_URL}api/user/upload`, {
      method: "POST",
      headers: {
        authentication: token,
      },
      body: formData,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error in API Upload:", error);
    throw error;
  }
};
