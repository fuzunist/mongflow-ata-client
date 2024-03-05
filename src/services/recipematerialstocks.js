import axios from "axios";

export const addRecipeStockLogToDB = async (access_token, params) => {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_ENDPOINT}/stock/recipematerial/logs`,
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

export const getRecipeMaterialStocksFromDB = async (access_token) => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_ENDPOINT}/stock/recipematerial/stocks`,
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
      `${import.meta.env.VITE_API_ENDPOINT}/stock/recipematerial/${id}`,
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
      }/stock/recipematerial/stocks/${order_id}`,
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
      }/stock/recipematerial/stocks/production/${recipe_id}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    console.log(
      "Successfully updated updateRecipeMaterialStocksInProductionToDB Stocks:",
      data
    );

    return data;
  } catch (e) {
    console.log(e);
    return e.response.data;
  }
};

export const addRecipeMaterialLogToDB = async (access_token, params) => {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_ENDPOINT}/stock/recipematerial/logs`,
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
      `${import.meta.env.VITE_API_ENDPOINT}/stock/recipematerial/logs`,
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

//tarih aralığı olacak son bir ay default olacak
export const getRecipeMaterialStockLogsFromDB = async (
  access_token,
  params
) => {
  try {
    const { data } = await axios.get(
      `${
        import.meta.env.VITE_API_ENDPOINT
      }/stock/recipematerial/logs?startDate=${params.startDate}&endDate=${
        params.endDate
      }`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    console.log("getRecipeMaterialStockLogsFromDB", data);
    return data;
  } catch (e) {
    console.log(e);
    return e.response.data;
  }
};

export const editRecipeMaterialLogToDB = async (access_token, params, id) => {
  try {
    const { data } = await axios.patch(
      `${import.meta.env.VITE_API_ENDPOINT}/stock/recipematerial/logs/${id}`,
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

export const delRecipeMaterialLogFromDB = async (access_token, log_id) => {
  try {
    const { data } = await axios.delete(
      `${import.meta.env.VITE_API_ENDPOINT}/stock/recipematerial/logs/${log_id}`,
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
