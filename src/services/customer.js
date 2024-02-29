import axios from "axios";

export const getCustomersFromDB = async (access_token) => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_ENDPOINT}/customer`,
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

export const addCustomerToDB = async (access_token, params) => {
  console.log("params:", params);
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_ENDPOINT}/customer`,
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

export const editCustomerToDB = async (access_token, customerid, params) => {
  try {
    const { data } = await axios.put(
      `${import.meta.env.VITE_API_ENDPOINT}/customer/${customerid}`,
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

export const delCustomerFromDB = async (access_token, customerid) => {
  try {
    const { data } = await axios.delete(
      `${import.meta.env.VITE_API_ENDPOINT}/customer/${customerid}`,
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

export const getContactsFromDB = async (access_token, params) => {
  try {
    //params is a startDate and endDate
   console.log("params of getContactsFromDB", params)
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_ENDPOINT}/customer/contact?startDate=${params.startDate}&endDate=${params.endDate}`,

      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    console.log("getContactsFromDB", data);

    return data;
  } catch (e) {
    return e.response.data;
  }
};

export const addContactToDB = async (access_token, params) => {
  console.log("* params:", params, "* access_token:", access_token);
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_ENDPOINT}/customer/contact`,
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

export const editContactToDB = async (access_token, id, params) => {
   console.log("params editContactToDB", params)
  try {
    const { data } = await axios.put(
      `${import.meta.env.VITE_API_ENDPOINT}/customer/contact/${id}`,
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

export const delContactFromDB = async (access_token, id) => {
  try {
    const { data } = await axios.delete(
      `${import.meta.env.VITE_API_ENDPOINT}/customer/contact/${id}`,
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
