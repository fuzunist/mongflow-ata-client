import axios from 'axios'

export const getProductionsFromDB = async (access_token) => {
    console.log('Fetching productions for access_token:', access_token) // Log before API call

    try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/production`, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })

        console.log('Successfully fetched productions:', data) // Log the fetched data
        return data
    } catch (e) {
        return e.response.data
    }
}

export const updateProductionToDB = async (access_token, production_id, production) => {
    console.log('Updating production for production ID:', production_id) // Log before API call

    try {
        const { data } = await axios.put(
            `${import.meta.env.VITE_API_ENDPOINT}/production/${production_id}`,
            {
                production
            },
            {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            }
        )

        console.log('Successfully updated production:', data) // Log the response data
        return data
    } catch (e) {
        return e.response.data
    }
}

export const addProductionToDB = async (access_token, product_id, attributes, date, production) => {
    try {
        const { data } = await axios.post(
            `${import.meta.env.VITE_API_ENDPOINT}/production`,
            {
                product_id,
                date,
                production,
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

export const delProductionFromDB = async (access_token, production_id) => {
    try {
        const { data } = await axios.delete(`${import.meta.env.VITE_API_ENDPOINT}/production/${production_id}`, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
        return data
    } catch (e) {
        return e.response.data
    }
}
