import axios from "axios";

export const addSecondQualityProductLogToDB = async (access_token, params) => {
  try {

    const { data } = await axios.post(
      `${import.meta.env.VITE_API_ENDPOINT}/stock/secondqualityproduct/log`,
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

export const getSecondQualityProductStocksFromDB = async (access_token, signal) => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_ENDPOINT}/stock/secondqualityproduct`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        signal: signal
      }
    );
    console.log("Successfully fetched getSecondQualityProductStocksFromDB:", data); // Log the fetched data

    return data;
  } catch (e) {
     console.log("error in raw material stocks")
    console.log(e);
    return e.response.data;
  }
};



export const editSecondQualityProductToDB = async (access_token, params, id) => {
  try {
    const { data } = await axios.put(
      `${import.meta.env.VITE_API_ENDPOINT}/stock/secondqualityproduct/${id}`,
      params,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    console.log("Successfully updated editSecondQualityProductToDB:", data); // Log the fetched data

    return data;
  } catch (e) {
    console.log(e);
    return e.response.data;
  }
};


export const getAllSecondQualityProductLogsFromDB = async (access_token) => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_ENDPOINT}/stock/secondqualityproduct/logs`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    console.log("Successfully fetched getAllSecondQualityProductLogsFromDB Logs:", data);

    return data;
  } catch (e) {
    console.log(e);
    return e.response.data;
  }
};

//tarih aralığı olacak son bir ay default olacak
export const getSecondQualityProductLogsFromDB = async (access_token, params) => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_ENDPOINT}/stock/secondqualityproduct/logs?startDate=${params.startDate}&endDate=${params.endDate}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

     console.log( "Successfully fetched getRangeSecondQualityProductLogsFromDB", data)
    return data;
  } catch (e) {
     console.log(e)
    return e.response.data;
  }
};

export const editSecondQualityProductLogToDB = async (access_token, params, id) => {
  try {
    const { data } = await axios.patch(
      `${import.meta.env.VITE_API_ENDPOINT}/stock/secondqualityproduct/logs/${id}`,
      params,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    console.log("Successfully updated editSecondQualityProductLogToDB logs:", data);

    return data;
  } catch (e) {
    console.log(e);
    return e.response.data;
  }
};
