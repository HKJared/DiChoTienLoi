import axios from "axios";
// const axios = require('axios');
const base_url = 'http://192.168.1.104:3000/api'
const username = 'ky1234';
const password = 'ky1234';

const getToken = async () => {

  try {
    const response = await axios.post(base_url + "/login", {
      account: { username, password }
    }, {
      headers: { "Content-Type": "application/json" }
    });

    const { jwt } = response.data;
    console.log("Login successful! JWT:", jwt);

    return jwt;
  } catch (error) {
    console.error("Error logging in:", error);
    return null;
  }
};


const getInfoData = async (jwt) => {
  try {
    const response = await axios.get(base_url + "/user/info", {   
      headers: {
        "Content-Type": "application/json",
        "authentication": jwt,
      },
    });

    if (response.data && response.data.user) {
      return response.data.user;
    } else {
      console.error("No user data found in response");
      return null; 
    }
  } catch (error) {
    console.error("Error getting user info:", error);
    return null;
  }
};

const getRecipeCategories = async (jwt) => {
  try {
    const response = await axios.get(base_url+ "/user/recipe-categories", {
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
      const response = await axios.get(`${base_url}/recipes?category_id=${category_id}`, {
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
    const response = await axios.get(`${base_url}/recipes?keyword=${keyword}&page=${page}&itemsPerPage=${itemsPerPage}`, {
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



const getRcipeDetail = async (jwt, recipe_id) => {
  try {
    const response = await axios.get(`${base_url}/user/recipe?recipe_id=${recipe_id}`, {
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


const updatedData = async (jwt, recipe_id, newData) => {

  try {
    const response = await axios.put(
      `${base_url}/user/recipe`,
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


const CreateRecipeDetail = async (jwt, newRecipe) => {

  try {
    const response = await axios.post(
      `${base_url}/user/recipe`,
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
      `${base_url}/marketplace-items`,
  
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('Success', response.data.message);
    return response.data;

  } catch (error) {
    console.log('Error', 'Failed to get marketplace item', error);
    return false;
  }
};


const deleteRecipe = async (jwt, recipeId) =>{
  try {
    const response = await axios.delete(
      `${base_url}/user/recipe`,
  
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



// (async () => {
//   const jwt = await getToken();
//   const recipeDetail = await getMarketplaceitem();
//   console.log('marketplaceitem', recipeDetail)
// })();

export {getToken, getRecipeCategories, getRecipe, getRcipeDetail, searchRecipe, updatedData, CreateRecipeDetail, getMarketplaceitem, deleteRecipe} 