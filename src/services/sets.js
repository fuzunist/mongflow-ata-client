import axios from 'axios'

export const addSetToDB = async (access_token, set_name, products) => {
    try {
        const { data } = await axios.post(
            `${import.meta.env.VITE_API_ENDPOINT}/set`,
            {
                set_name,
                products
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

export const getSetsFromDB = async (access_token) => {
    try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/set`, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
        return data
    } catch (e) {
        return e.response.data
    }
}

export const editSetToDB = async (access_token, set_id, set_name, products) => {
    try {
        const { data } = await axios.put(
            `${import.meta.env.VITE_API_ENDPOINT}/set/${set_id}`,
            {
                set_name,
                products
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

export const delSetFromDB = async (access_token, set_id) => {
    try {
        const { data } = await axios.delete(`${import.meta.env.VITE_API_ENDPOINT}/set/${set_id}`, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
        return data
    } catch (e) {
        return e.response.data
    }
}
