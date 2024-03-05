import axios from "axios";

export const addProductStockLogToDB = async (access_token, params) => {
  try {

    const { data } = await axios.post(
      `${import.meta.env.VITE_API_ENDPOINT}/stock/lastproduct`,
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


//tarih aralığı olacak son bir ay default olacak
export const getProductStockLogsFromDB = async (access_token, params) => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_ENDPOINT}/stock/lastproduct/logs?startDate=${params.startDate}&endDate=${params.endDate}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
 console.log("Successfully fetched getProductStockLogsFromDB", data)
    return data;
  } catch (e) {
    return e.response.data;
  }
};

// export const getProductStockWarehouse = async (access_token) => {
//   try {

//     const { data } = await axios.get(
//       `${import.meta.env.VITE_API_ENDPOINT}/stock/lastproduct/warehouse`,
//       {
//         headers: {
//           Authorization: `Bearer ${access_token}`,
//         },
//       }
//     );

//     return data;
//   } catch (e) {
//     return e.response.data;
//   }
// };

export const getLastProductStocksFromDB = async (access_token) => {
  try {

    const { data } = await axios.get(
      `${import.meta.env.VITE_API_ENDPOINT}/stock/lastproduct/stocks`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

 console.log("Successfully fetched getProductStocks", data)

    return data;
  } catch (e) {
     console.log("erorr in getProductStocks ", e)
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


export const delLastProductLogFromDB = async (access_token, log_id) => {
  try {
      const { data } = await axios.delete(`${import.meta.env.VITE_API_ENDPOINT}/stock/lastproduct/${log_id}`, {
          headers: {
              Authorization: `Bearer ${access_token}`
          }
      })
      return data
  } catch (e) {
      return e.response.data
  }
}