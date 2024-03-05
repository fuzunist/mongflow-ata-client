import axios from "axios";

export const addRawStockLogToDB = async (access_token, params) => {
  try {

    const { data } = await axios.post(
      `${import.meta.env.VITE_API_ENDPOINT}/stock/rawmaterial`,
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

export const getRawMaterialStocksFromDB = async (access_token, signal) => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_ENDPOINT}/stock/rawmaterial`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        signal: signal
      }
    );
    console.log("Successfully fetched RawMaterials:", data); // Log the fetched data

    return data;
  } catch (e) {
     console.log("error in raw material stocks")
    console.log(e);
    return e.response.data;
  }
};



export const editRawMaterialToDB = async (access_token, params, id) => {
  try {
    const { data } = await axios.put(
      `${import.meta.env.VITE_API_ENDPOINT}/stock/rawmaterial/${id}`,
      params,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    console.log("Successfully updated recipeRawMaterials:", data); // Log the fetched data

    return data;
  } catch (e) {
    console.log(e);
    return e.response.data;
  }
};

export const addRawMaterialLogToDB = async (access_token, params) => {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_ENDPOINT}/stock/rawmaterial/logs`,
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

export const getRawMaterialLogsFromDB = async (access_token) => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_ENDPOINT}/stock/rawmaterial/logs`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    console.log("Successfully fetched rawMaterials Logs:", data);

    return data;
  } catch (e) {
    console.log(e);
    return e.response.data;
  }
};

//tarih aralığı olacak son bir ay default olacak
export const getRawMaterialStockLogsFromDB = async (access_token, params) => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_ENDPOINT}/stock/rawmaterial/logs?startDate=${params.startDate}&endDate=${params.endDate}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

     console.log( "getRawMaterialStockLogsFromDB", data)
    return data;
  } catch (e) {
     console.log(e)
    return e.response.data;
  }
};

export const editRawMaterialLogToDB = async (access_token, params, id) => {
  try {
    const { data } = await axios.patch(
      `${import.meta.env.VITE_API_ENDPOINT}/stock/rawmaterial/logs/${id}`,
      params,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    console.log("Successfully updated rawMaterials logs:", data);

    return data;
  } catch (e) {
    console.log(e);
    return e.response.data;
  }
};

export const delRawMaterialLogFromDB = async (access_token, log_id) => {
  try {
      const { data } = await axios.delete(`${import.meta.env.VITE_API_ENDPOINT}/stock/rawmaterial/log/${log_id}`, {
          headers: {
              Authorization: `Bearer ${access_token}`
          }
      })
      return data
  } catch (e) {
      return e.response.data
  }
}