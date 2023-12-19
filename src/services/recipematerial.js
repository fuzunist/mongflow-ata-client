import axios from "axios";

export const getRecipeMaterialsFromDB = async (access_token) => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_ENDPOINT}/recipe/materials`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    console.log("Successfully fetched recipeMaterials:", data); // Log the fetched data

    return data;
  } catch (e) {
    console.log(e);
    return e.response.data;
  }
};

export const editMaterialsToDB = async (access_token, params) => {
  try {
    const { data } = await axios.put(
      `${import.meta.env.VITE_API_ENDPOINT}/recipe/materials/all`,
      { ...params },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    console.log("Successfully updated recipeMaterials:", data); // Log the fetched data

    return data;
  } catch (e) {
    console.log(e);
    return e.response.data;
  }
};
