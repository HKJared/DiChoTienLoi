import axios from "axios";
import { getToken } from "../services/storageService";
import BASE_HOST_URL from "./baseHostUrl";
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getRecipeCategories = async () => {
  try {

    const jwt = await getToken();
          if (!jwt) {
            console.error("Failed to get JWT");
            return;
          }

    const response = await axios.get(BASE_HOST_URL+ "api/user/recipe-categories", {
      headers: {
        "Content-Type": "application/json",
        "authentication": jwt,
      },
    });

    return response.data['categories']; 
  } catch (error) {
    console.error('Error fetching recipe categories:', error);
    return null;
  }
};


const getRecipe = async (category_id) => {
    try {
      const response = await axios.get(`${BASE_HOST_URL}api/recipes?category_id=${category_id}`, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.data;
  
    } catch (error) {
      console.error('Error fetching recipe item :', error);
      return null;
    }
};

const searchRecipe = async (keyword, page, itemsPerPage) => {
  try {
    const response = await axios.get(`${BASE_HOST_URL}api/recipes?keyword=${keyword}&page=${page}&itemsPerPage=${itemsPerPage}`, {
      headers: {
          "Content-Type": "application/json",
      },
  });
  return response.data;

  } catch (error) {
    console.error('Error fetching recipe item :', error);
    return null;
  }
};



const getRcipeDetail = async (recipe_id) => {
  try {
    const jwt = await getToken();
          if (!jwt) {
            console.error("Failed to get JWT");
            return;
          }

    const response = await axios.get(`${BASE_HOST_URL}api/user/recipe?recipe_id=${recipe_id}`, {
      headers: {
        "Content-Type": "application/json",
        "authentication": jwt,
      },
    });

    return response.data; 
  } catch (error) {
    console.error('Error fetching recipe detail:', error);
    return null;
  }
  
}


const updatedData = async (recipe_id, newData) => {

  try {
    const jwt = await getToken();
          if (!jwt) {
            console.error("Failed to get JWT");
            return;
          }

    const response = await axios.put(
      `${BASE_HOST_URL}api/user/recipe`,
      {
        recipe_id: recipe_id,
        newData,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          authentication: jwt,
        },
      }
    );
    console.log('Success', response.data.message);
   
    return response;

  } catch (error) {
    console.log('Error', 'Failed to update recipe', error);
    return false;
  }
};


const CreateRecipeDetail = async (newRecipe) => {

  try {
    const jwt = await getToken();
          if (!jwt) {
            console.error("Failed to get JWT");
            return;
          }

    const response = await axios.post(
      `${BASE_HOST_URL}api/user/recipe`,
      {
        recipe:  newRecipe,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          authentication: jwt,
        },
      }
    );
    console.log('Success', response.data.message);
    return response;

  } catch (error) {
    console.log('Error', 'Failed to create recipe', error);
    return false;
  }
};


const getMarketplaceitem = async () =>{
  try {
    const response = await axios.get(
      `${BASE_HOST_URL}api/marketplace-items`,
  
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;

  } catch (error) {
    console.log('Error', 'Failed to get marketplace item', error);
    return false;
  }
};


const deleteRecipe = async (recipeId) =>{
  try {
    const jwt = await getToken();
          if (!jwt) {
            console.error("Failed to get JWT");
            return;
          }

    const response = await axios.delete(
      `${BASE_HOST_URL}api/user/recipe`,
  
      {
        headers: {
          'Content-Type': 'application/json',
          'authentication': jwt, 
        },
        data: {
          recipe_id: recipeId, 
        }
      }
    );
    console.log('Success', response.data.message);
    return true
    
  } catch (error) {
    console.error('Lỗi khi xóa công thức:', error.response?.data || error.message);
    return false;
  }
};


async function GetPageItem(page = 1, itemsPerPage = 10) {
  try {
    const response = await axios.get(`${BASE_HOST_URL}api/recipes`, {
      params: {
        page: page,
        itemsPerPage: itemsPerPage,
      },
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
}


// ########################## Local Storage ##############################

// check network
const checkNetworkStatus = async () => {
  const state = await NetInfo.fetch();
  return state.isConnected;
};


// get data
const getLocalData = async (key) => {
  try {
    const storedData = await AsyncStorage.getItem(key);
    const parsedData = storedData ? JSON.parse(storedData) : [];
    console.log('Local data:', parsedData);
    return parsedData;
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu:', error);
    return [];
  }
};


const storeData = async (key, categoriesData) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(categoriesData));
    console.log('Đã lưu dữ liệu vào local');
  } catch (error) {
    console.error('Lỗi khi lưu dữ liệu vào AsyncStorage:', error);
  }
};



const storeRecipeData = async (key, newRecipe) => {
  try {
    const storedData = await AsyncStorage.getItem(key);
    let parsedData = [];

    if (storedData) {
      parsedData = JSON.parse(storedData); 
    }

    const isDuplicate = parsedData.some((recipe) => recipe.id === newRecipe.id);
    if (isDuplicate) {
      return;  
    }

    parsedData.push(newRecipe);
    
    await AsyncStorage.setItem(key, JSON.stringify(parsedData));

    console.log('newRecipe:', parsedData);
  } catch (error) {
    console.error('Lỗi khi lưu dữ liệu:', error);
  }
};



const viewAllLocalData = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys(); 
    const stores = await AsyncStorage.multiGet(keys);
    const allData = stores.map(([key, value]) => ({ key, value: JSON.parse(value) }));
    console.log('All AsyncStorage Data:', allData);
  } catch (error) {
    console.error('Error fetching AsyncStorage data:', error);
  }
};


const CATEGORIES_KEY = 'CategoriesData'
const SAVE_RECIPE_KEY = 'SaveRecipeData';
const MY_RECIPE_KEY = 'MyRecipeData';
const MARKETITEM_KEY = 'MarketItemData'

export {CATEGORIES_KEY,SAVE_RECIPE_KEY,MY_RECIPE_KEY,MARKETITEM_KEY,
        viewAllLocalData,
        getLocalData,
        storeData,    
        checkNetworkStatus, 
        getRecipeCategories, 
        getRecipe, 
        getRcipeDetail, 
        searchRecipe, 
        updatedData, 
        CreateRecipeDetail, 
        getMarketplaceitem, 
        deleteRecipe,
        storeRecipeData,
        GetPageItem
        
      } 