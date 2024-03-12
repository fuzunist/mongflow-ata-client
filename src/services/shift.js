import axios from "axios";


export const addShiftToDB = async (access_token, params) => {
  
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_ENDPOINT}/shift/add`,
      params,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
     console.log("add shift to db data res:", data )
    return data;
  } catch (e) {
     console.log(e)
    return e.response.data;
  }
};


export const getDayShiftsForOrderFromDB = async (access_token, signal, date) => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_ENDPOINT}/shift/ordershifts?date=${date}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        signal: signal

      }
    );
     console.log("fetchedddd getDayShiftsForOrderFromDB ", data)
    return data;
  } catch (e) {
    return e.response.data;
  }
};
export const getDayShiftsForProcessFromDB = async (access_token, signal, date) => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_ENDPOINT}/shift/processshifts?date=${date}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        signal: signal

      }
    );
     console.log("fetchedddd getDayShiftsForProcessFromDB ", data)
    return data;
  } catch (e) {
    return e.response.data;
  }
};


export const getShiftsForOrderFromDB = async (access_token) => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_ENDPOINT}/shift`,
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

export const addShiftsForOrderToDB = async (access_token, params) => {
  console.log("params:", params);
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_ENDPOINT}/shift`,
      params,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return data;
  } catch (e) {
    console.log(e);
    return e.response.data;
  }
};

export const editShiftsForOrderToDB = async (access_token, shiftid, params) => {
  try {
    const { data } = await axios.put(
      `${import.meta.env.VITE_API_ENDPOINT}/shift/${shiftid}`,
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

export const delShiftsForOrderFromDB = async (access_token, shiftid) => {
  try {
    const { data } = await axios.delete(
      `${import.meta.env.VITE_API_ENDPOINT}/shift/${shiftid}`,
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


export const getShiftsForProcessFromDB = async (access_token) => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_ENDPOINT}/shift/process`,
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

export const addShiftsForProcessToDB = async (access_token, params) => {
  console.log("Starting addShiftsForProcessToDB with params:", params);
  // Ensure the API endpoint is logged for troubleshooting without exposing sensitive data
  const apiEndpoint = `${import.meta.env.VITE_API_ENDPOINT}/shift/process`;
  console.log("API Endpoint:", apiEndpoint);

  try {
    console.log("Attempting to post data to the server...");
    const { data } = await axios.post(apiEndpoint, params, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    console.log("Data successfully posted to the server, response data:", data);
    return data;
  } catch (e) {
    console.error("Error occurred during the API call.");
    if (e.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Error response data:", e.response.data);
      console.error("Error response status:", e.response.status);
      console.error("Error response headers:", e.response.headers);
    } else if (e.request) {
      // The request was made but no response was received
      console.error("No response was received for the request.");
      console.error("Request made was:", e.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error message:", e.message);
    }
    console.error("Config of the request that failed:", e.config);
    return e.response ? e.response.data : { message: "An unexpected error occurred" };
  }
};

export const editShiftsForProcessToDB = async (access_token, shiftid, params) => {
  try {
    const { data } = await axios.put(
      `${import.meta.env.VITE_API_ENDPOINT}/shift/process/${shiftid}`,
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

export const delShiftsForProcessFromDB = async (access_token, shiftid) => {
  try {
    const { data } = await axios.delete(
      `${import.meta.env.VITE_API_ENDPOINT}/shift/process/${shiftid}`,
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

