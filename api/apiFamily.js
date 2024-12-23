import { getToken } from "../services/storageService";
import BASE_HOST_URL from "./baseHostUrl";

// Helper function to get headers with token
const getHeaders = async () => {
  const token = await getToken();
  if (!token) throw new Error("Authentication token is missing");
  return {
    "Content-Type": "application/json",
    authentication: token,
  };
};

// Create Family Group
export const apiCreateFamilyGroup = async (name, memberIds) => {
  try {
    const headers = await getHeaders();
    const response = await fetch(`${BASE_HOST_URL}api/user/family-group`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        name,
        member_ids: memberIds,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create family group");
    }

    return await response.json();
  } catch (error) {
    console.error("Create Family Group error:", error.message);
    throw error;
  }
};

// Get Family Groups
export const apiGetFamilyGroups = async () => {
  try {
    const headers = await getHeaders();
    const response = await fetch(`${BASE_HOST_URL}api/user/family-groups`, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch family groups");
    }

    return await response.json();
  } catch (error) {
    console.error("Get Family Groups error:", error.message);
    throw error;
  }
};

// Get Family Group by ID
export const apiGetFamilyGroup = async (id) => {
  try {
    const headers = await getHeaders();
    const response = await fetch(
      `${BASE_HOST_URL}api/user/family-group?id=${id}`,
      {
        method: "GET",
        headers,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch family group");
    }

    return await response.json();
  } catch (error) {
    console.error("Get Family Group error:", error.message);
    throw error;
  }
};

// Update Family Group
export const apiUpdateFamilyGroup = async (groupId, name, memberIds) => {
  try {
    const headers = await getHeaders();
    const response = await fetch(
      `${BASE_HOST_URL}api/user/family-group/${groupId}`,
      {
        method: "PUT",
        headers,
        body: JSON.stringify({
          name,
          member_ids: memberIds,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update family group");
    }

    return await response.json();
  } catch (error) {
    console.error("Update Family Group error:", error.message);
    throw error;
  }
};

// Delete Family Group
export const apiDeleteFamilyGroup = async (groupId) => {
  try {
    const headers = await getHeaders();
    const response = await fetch(`${BASE_HOST_URL}api/user/family-group`, {
      method: "DELETE",
      headers: {
        ...headers,
        "Content-Type": "application/json", // Đảm bảo Content-Type
      },
      body: JSON.stringify({
        family_group_id: groupId, // Gửi groupId
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete family group");
    }

    return await response.json(); // Trả về dữ liệu JSON
  } catch (error) {
    console.error("Delete Family Group error:", error.message);
    throw error;
  }
};

// Add Member to Family Group
export const apiAddMemberToFamilyGroup = async (groupId, memberId) => {
  try {
    const headers = await getHeaders();
    const response = await fetch(`${BASE_HOST_URL}api/user/family-members`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        family_group_id: groupId,
        member_ids: memberId,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Failed to add member to family group"
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Add Member to Family Group error:", error.message);
    throw error;
  }
};

// Remove Member from Family Group
export const apiRemoveMemberFromFamilyGroup = async (groupId, memberId) => {
  try {
    const headers = await getHeaders();
    const response = await fetch(`${BASE_HOST_URL}api/user/family-member`, {
      method: "DELETE",
      headers,
      body: JSON.stringify({
        family_group_id: groupId,
        member_id: memberId,
      }),
    });

    // Kiểm tra trạng thái phản hồi
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Failed to remove member from family group"
      );
    }

    // Trả về phản hồi thành công
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Remove Member from Family Group error:", error.message);
    throw error;
  }
};
