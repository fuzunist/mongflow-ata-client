import axios from 'axios'

export const getCustomersFromDB = async (access_token) => {
    try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/customer`, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
        return data
    } catch (e) {
        return e.response.data
    }
}

export const addCustomerToDB = async (access_token, customername, companyname, email, phone, address) => {
    try {
        const { data } = await axios.post(
            `${import.meta.env.VITE_API_ENDPOINT}/customer`,
            {
                customername,
                companyname,
                email,
                phone,
                address
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

export const editCustomerToDB = async (access_token, customerid, customername, companyname, email, phone, address) => {
    try {
        const { data } = await axios.put(
            `${import.meta.env.VITE_API_ENDPOINT}/customer/${customerid}`,
            {
                customername,
                companyname,
                email,
                phone,
                address
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

export const delCustomerFromDB = async (access_token, customerid) => {
    try {
        const { data } = await axios.delete(`${import.meta.env.VITE_API_ENDPOINT}/customer/${customerid}`, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
        return data
    } catch (e) {
        return e.response.data
    }
}
