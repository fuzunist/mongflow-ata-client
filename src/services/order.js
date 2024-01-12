import axios from "axios";

export const getOrdersFromDB = async (access_token) => {
  console.log("Fetching orders for access_token:", access_token); // Log before API call

  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_ENDPOINT}/order`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    console.log("Successfully fetched orders:", data); // Log the fetched data
    return data;
  } catch (e) {
    return e.response.data;
  }
};

export const updateStatusInDB = async (access_token, order_id, status) => {
  console.log("Updating status for order ID:", order_id); // Log before API call

  try {
    const { data } = await axios.patch(
      `${import.meta.env.VITE_API_ENDPOINT}/order/${order_id}/change-status`,
      {
        status,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    console.log("Successfully updated status:", data); // Log the response data
    return data;
  } catch (e) {
    return e.response.data;
  }
};

export const updateOrderStatusInDB = async (
  access_token,
  order_id,
  products,
  order_status,
  stock_diff,
  product_attributes
) => {
  console.log("Updating order status for order ID:", order_id); // Log before API call

  try {
    const { data } = await axios.put(
      `${import.meta.env.VITE_API_ENDPOINT}/order/${order_id}`,
      {
        products,
        order_status,
        stock_diff,
        product_attributes,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    console.log("Successfully updated order status:", data); // Log the response data
    return data;
  } catch (e) {
    return e.response.data;
  }
};

export const updateOrderStatusSetInDB = async (
  access_token,
  order_id,
  sets,
  order_status,
  stockDiffs,
  attributes
) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_ENDPOINT}/order/${order_id}/set`,
      {
        sets,
        order_status,
        stockDiffs,
        attributes,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return response.data;
  } catch (e) {
    console.error("Error:", e);
    console.error("Error response:", e.response);
    console.error("Error status:", e.response?.status);
    console.error("Error data:", e.response?.data);

    return e.response?.data;
  }
};

export const addOrderToDB = async (
  access_token,
  customer_id,
  currency_code,
  order_status,
  order_date,
  order_number,
  products,
  sets,
  subtotal,
  tax_rate,
  total_with_tax,
  exchange_rate
) => {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_ENDPOINT}/order`,
      {
        customer_id,
        currency_code,
        order_status,
        order_date,
        order_number,
        products,
        sets,
        subtotal,
        tax_rate,
        total_with_tax,
        exchange_rate,
        total_cost: 0,
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

export const updateSomeOrderInDB = async (access_token, order_id, params) => {
  try {
    console.log("order şd in services", order_id);
    const { data } = await axios.patch(
      `${import.meta.env.VITE_API_ENDPOINT}/order/patch/${order_id}`,
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
  }
};

export const updateOrderInDB = async (
  access_token,
  order_id,
  customerid,
  currency_code,
  products,
  sets,
  subtotal,
  total_with_tax,
  order_status
) => {
  try {
    const { data } = await axios.patch(
      `${import.meta.env.VITE_API_ENDPOINT}/order/${order_id}`,
      {
        customerid,
        currency_code,
        products,
        sets,
        subtotal,
        total_with_tax,
        order_status,
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

export const delOrderFromDB = async (access_token, order_id) => {
  try {
    const { data } = await axios.delete(
      `${import.meta.env.VITE_API_ENDPOINT}/order/${order_id}`,
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

export const createOrderNumberInDB = async (access_token) => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_ENDPOINT}/order/order-number`,
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

export const delOrderNumberFromDB = async (access_token, counter) => {
  try {
    const { data } = await axios.delete(
      `${import.meta.env.VITE_API_ENDPOINT}/order/${counter}/order-number`,
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
