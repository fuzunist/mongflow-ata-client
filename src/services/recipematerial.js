import axios from "axios";

export const addRecipeMaterialToDB = async (access_token, params) => {
  try {
    const { material } = params;
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_ENDPOINT}/recipe/materials`,
      {
        material,
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
    console.log("Successfully fetched recipeMaterials:", data);

    return data;
  } catch (e) {
    console.log(e);
    return e.response.data;
  }
};

export const editRecipeMaterialToDB = async (access_token, params, id) => {
  try {
    const { data } = await axios.put(
      `${import.meta.env.VITE_API_ENDPOINT}/recipe/materials/${id}`,
      params,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    console.log("Successfully updated recipeMaterials:", data);

    return data;
  } catch (e) {
    console.log(e);
    return e.response.data;
  }
};

export const updateRecipeMaterialStocksToDB = async (
  access_token,
  order_id
) => {
  try {
    const { data } = await axios.put(
      `${
        import.meta.env.VITE_API_ENDPOINT
      }/recipe/materials/stocks/${order_id}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    console.log("Successfully updated recipeMaterials Stocks:", data);

    return data;
  } catch (e) {
    console.log(e);
    return e.response.data;
  }
};


export const updateRecipeMaterialStocksInProductionToDB = async (
  access_token,
  recipe_id
) => {
  try {
    const { data } = await axios.put(
      `${
        import.meta.env.VITE_API_ENDPOINT
      }/recipe/materials/stocks/production/${recipe_id}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    console.log("Successfully updated updateRecipeMaterialStocksInProductionToDB Stocks:", data);

    return data;
  } catch (e) {
    console.log(e);
    return e.response.data;
  }
};

export const addRecipeMaterialLogToDB = async (access_token, params) => {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_ENDPOINT}/recipe/materials/logs`,
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

export const getRecipeMaterialLogsFromDB = async (access_token) => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_ENDPOINT}/recipe/materials/logs`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    console.log("Successfully fetched recipeMaterials Logs:", data);

    return data;
  } catch (e) {
    console.log(e);
    return e.response.data;
  }
};

export const editRecipeMaterialLogToDB = async (access_token, params, id) => {
  try {
    const { data } = await axios.patch(
      `${import.meta.env.VITE_API_ENDPOINT}/recipe/materials/logs/${id}`,
      params,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    console.log("Successfully updated recipeMaterials logs:", data);

    return data;
  } catch (e) {
    console.log(e);
    return e.response.data;
  }
};
