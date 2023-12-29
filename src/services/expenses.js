import axios from "axios";

const today = new Date();
const formattedDate = `01/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;

export const getExpensesFromDB = async (
  access_token,
  date = formattedDate
) => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_ENDPOINT}/expenses?date=${date}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    console.log("Successfully fetched  expenses:", data); // Log the fetched data
    return data;
  } catch (e) {
    console.log(e);
    return e.response.data;
  }
};

export const getExpensesClassesFromDB = async (access_token) => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_ENDPOINT}/expenses/class`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    console.log("Successfully fetched expenses classes:", data); // Log the fetched data
    return data;
  } catch (e) {
    console.log(e);
    return e.response.data;
  }
};

export const getExpensesItemsFromDB = async (access_token) => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_ENDPOINT}/expenses/items`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    console.log("Successfully fetched expenses items:", data); // Log the fetched data
    return data;
  } catch (e) {
    console.log(e);
    return e.response.data;
  }
};

export const addExpensesToDB = async (access_token, params) => {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_ENDPOINT}/expenses`,
      {
        ...params,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    console.log("addExpensesToDB: ", data);

    return data;
  } catch (e) {
    return e.response.data;
  }
};

export const addExpenseItemToDB = async (access_token, params) => {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_ENDPOINT}/expenses/item`,
      {
        ...params,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    console.log("addExpenseItemToDB: ", data);

    return data;
  } catch (e) {
    return e.response.data;
  }
};

export const updateExpensesToDB = async (access_token, params) => {
  try {
    const { data } = await axios.patch(
      `${import.meta.env.VITE_API_ENDPOINT}/expenses`,
      params,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    console.log("updateExpensesToDB: ", data);

    return data;
  } catch (e) {
    return e.response.data;
  }
};
