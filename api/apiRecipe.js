import axios from "axios";
import { getToken } from "../services/storageService";
import BASE_HOST_URL from "./baseHostUrl";


// const getToken = async () => {

//   try {
//     const response = await axios.post(BASE_HOST_URL + "/login", {
//       account: { username, password }
//     }, {
//       headers: { "Content-Type": "application/json" }
//     });

//     const { jwt } = response.data;
//     console.log("Login successful! JWT:", jwt);

//     return jwt;
//   } catch (error) {
//     console.error("Error logging in:", error);
//     return null;
//   }
// };


const getRecipeCategories = async (jwt) => {
  try {
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



const getRcipeDetail = async (jwt, recipe_id) => {
  try {
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


const updatedData = async (jwt, recipe_id, newData) => {

  try {
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


const CreateRecipeDetail = async (jwt, newRecipe) => {

  try {
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



(async () => {
  const jwt = await getToken();
  const recipeCategoryData = await getRecipeCategories(jwt);
  console.log('recipeCategoryData', recipeCategoryData)
})();


export {getToken, getRecipeCategories, getRecipe, getRcipeDetail, searchRecipe, updatedData, CreateRecipeDetail, getMarketplaceitem, deleteRecipe} 