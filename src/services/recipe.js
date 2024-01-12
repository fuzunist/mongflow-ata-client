import axios from "axios";

export const addRecipeToDB = async (access_token, params) => {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_ENDPOINT}/recipe`,
      params,
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

export const editRecipeToDB = async (access_token, params) => {
  try {
    const { data } = await axios.put(
      `${import.meta.env.VITE_API_ENDPOINT}/recipe/${params.recipe_id}`,
      params,
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
      `${import.meta.env.VITE_API_ENDPOINT}/recipe/${recipeId}`,
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



export const addSpecialRecipeToDB = async (access_token, params) => {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_ENDPOINT}/recipe/special`,
      params,
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

export const getSpecialRecipesFromDB = async (access_token) => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_ENDPOINT}/recipe/special`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    console.log("Successfully fetched special recipes:", data); // Log the fetched data

    return data;
  } catch (e) {
    console.log(e);
    return e.response.data;
  }
};



export const delSpecialRecipeFromDB = async (access_token, recipeId) => {
  try {
    const { data } = await axios.delete(
      `${import.meta.env.VITE_API_ENDPOINT}/recipe/special/${recipeId}`,
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
