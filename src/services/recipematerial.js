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
    console.log('Successfully fetched recipeMaterials:', data) // Log the fetched data

      return data;
    } catch (e) {
       console.log(e)
      return e.response.data;
    }
  };