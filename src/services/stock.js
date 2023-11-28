import axios from 'axios'

export const getStocksFromDB = async (access_token) => {
    console.log('Fetching stocks for access_token:', access_token) // Log before API call

    try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/stock`, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })

        console.log('Successfully fetched stocks:', data) // Log the fetched data
        return data
    } catch (e) {
        return e.response.data
    }
}

export const updateStockToDB = async (access_token, stock_id, stock) => {
    console.log('Updating stock for stock ID:', stock_id) // Log before API call

    try {
        const { data } = await axios.put(
            `${import.meta.env.VITE_API_ENDPOINT}/stock/${stock_id}`,
            {
                stock
            },
            {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            }
        )

        console.log('Successfully updated stock:', data) // Log the response data
        return data
    } catch (e) {
        return e.response.data
    }
}

export const addStockToDB = async (access_token, product_id, attributes, date, stock) => {
    try {
        const { data } = await axios.post(
            `${import.meta.env.VITE_API_ENDPOINT}/stock`,
            {
                product_id,
                date,
                stock,
                attributes
            },
            {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            }
        )
        return data
    } catch (e) {
        return e.response.data
    }
}

export const delStockFromDB = async (access_token, stock_id) => {
    try {
        const { data } = await axios.delete(`${import.meta.env.VITE_API_ENDPOINT}/stock/${stock_id}`, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
        return data
    } catch (e) {
        return e.response.data
    }
}
