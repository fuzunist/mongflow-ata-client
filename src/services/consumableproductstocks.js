import axios from "axios";

export const addConsumableProductLogToDB = async (access_token, params) => {
  try {

    const { data } = await axios.post(
      `${import.meta.env.VITE_API_ENDPOINT}/stock/consumable/log`,
      params,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
 console.log( "consumaable log added to db", data)
    return data;
  } catch (e) {
    return e.response.data;
  }
};

export const getConsumableProductStocksFromDB = async (access_token, signal) => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_ENDPOINT}/stock/consumable`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        signal: signal
      }
    );
    console.log("Successfully fetched getConsumableProductStocksFromDB:", data); // Log the fetched data

    return data;
  } catch (e) {
     console.log("error in getConsumableProductStocksFromDB")
    console.log(e);
    return e.response.data;
  }
};



export const editConsumableProductToDB = async (access_token, params, id) => {
  try {
    const { data } = await axios.put(
      `${import.meta.env.VITE_API_ENDPOINT}/stock/consumable/${id}`,
      params,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    console.log("Successfully updated consumable:", data); // Log the fetched data

    return data;
  } catch (e) {
    console.log(e);
    return e.response.data;
  }
};


export const getAllConsumableProductLogsFromDB = async (access_token) => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_ENDPOINT}/stock/consumable/logs`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    console.log("Successfully fetched getAllConsumableProductLogsFromDB Logs:", data);

    return data;
  } catch (e) {
    console.log(e);
    return e.response.data;
  }
};

//tarih aralığı olacak son bir ay default olacak
export const getConsumableProductLogsFromDB = async (access_token, params) => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_ENDPOINT}/stock/consumable/logs?startDate=${params.startDate}&endDate=${params.endDate}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

     console.log( "Successfully fetched getRangeConsumableProductLogsFromDB", data)
    return data;
  } catch (e) {
     console.log(e)
    return e.response.data;
  }
};

export const editConsumableProductLogToDB = async (access_token, params, id) => {
  try {
    const { data } = await axios.patch(
      `${import.meta.env.VITE_API_ENDPOINT}/stock/consumable/logs/${id}`,
      params,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    console.log("Successfully updated consumable log:", data);

    return data;
  } catch (e) {
    console.log(e);
    return e.response.data;
  }
};


export const delConsumableProductLogFromDB = async (access_token, log_id) => {
  try {
      const { data } = await axios.delete(`${import.meta.env.VITE_API_ENDPOINT}/stock/consumable/log/${log_id}`, {
          headers: {
              Authorization: `Bearer ${access_token}`
          }
      })
      return data
  } catch (e) {
      return e.response.data
  }
}