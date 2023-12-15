import axios from "axios";

export const addRecipeToDB = async (access_token, params) => {
  try {
    const { order_id, details, cost, recipe_id } = params;
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_ENDPOINT}/recipe`,
      {
        order_id,
        details,
        cost,
        recipe_id,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return data;
  } catch (e) {
    return e.response.data;
  }
};

export const getRecipesFromDB = async (access_token) => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_ENDPOINT}/recipe`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    console.log("Successfully fetched recipes:", data); // Log the fetched data

    return data;
  } catch (e) {
    console.log(e);
    return e.response.data;
  }
};

export const getRecipeDetailsFromDB = async (access_token, recipeId) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_ENDPOINT}/product/${recipeId}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    console.log("Axios Response:", response);
    return response.data;
  } catch (e) {
    return e.response.data;
  }
};

export const editRecipeToDB = async (access_token, params) => {
  const { details, cost, recipe_id } = params;
  try {
    const { data } = await axios.put(
      `${import.meta.env.VITE_API_ENDPOINT}/recipe/${recipe_id}`,
      {
        details,
        cost,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return data;
  } catch (e) {
    return e.response.data;
  }
};

export const delRecipeFromDB = async (access_token, recipeId) => {
  try {
    const { data } = await axios.delete(
      `${import.meta.env.VITE_API_ENDPOINT}/product/${recipeId}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return data;
  } catch (e) {
    return e.response.data;
  }
};


