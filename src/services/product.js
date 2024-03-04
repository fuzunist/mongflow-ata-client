import axios from "axios";

export const addProductToDB = async (access_token, params) => {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_ENDPOINT}/product`,
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

export const getProductsFromDB = async (access_token) => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_ENDPOINT}/product`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    console.log("successful fetched products", data);
    return data;
  } catch (e) {
    return e.response.data;
  }
};

export const getProductDetailsFromDB = async (access_token, productId) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_ENDPOINT}/product/${productId}`,
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

export const editProductToDB = async (access_token, product_id, params) => {
  try {
    const { data } = await axios.put(
      `${import.meta.env.VITE_API_ENDPOINT}/product/${product_id}`,
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

export const delProductFromDB = async (access_token, product_id) => {
  try {
    const { data } = await axios.delete(
      `${import.meta.env.VITE_API_ENDPOINT}/product/${product_id}`,
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
