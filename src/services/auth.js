import axios from 'axios'

export const verify = async (access_token) => {
    try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/user`, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
        return data
    } catch (e) {
        return e.response.data
    }
}

export const getUsersFromDB = async (access_token) => {
    try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/user/all`, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
        return data
    } catch (e) {
        return e.response.data
    }
}

export const login = async (Username, Password) => {
    try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/user/login`, { Username, Password })
        return data
    } catch (e) {
        return e.response.data
    }
}

export const register = async (Username, Email, Password, UserType) => {
    try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/user`, { Username, Email, Password, UserType })
        return data
    } catch (e) {
        return e.response.data
    }
}

export const resetPassword = async (resetToken, newPassword) => {
    try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/user/reset-password`, { resetToken, newPassword })
        return data
    } catch (e) {
        return e.response.data
    }
}

export const forgetPassword = async (Email) => {
    try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/request-password-reset`, { Email })
        return data
    } catch (e) {
        return e.response.data
    }
}

export const changeInformationsFromDB = async (access_token, fullname, email, company_name, phone) => {
    try {
        const { data } = await axios.put(
            `${import.meta.env.VITE_API_ENDPOINT}/user`,
            { email, company_name, phone, fullname },
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

export const changePhotoFromDB = async (access_token, photo) => {
    try {
        const { data } = await axios.put(
            `${import.meta.env.VITE_API_ENDPOINT}/user/photo`,
            { photo },
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

export const changePasswordFromDB = async (access_token, oldPassword, newPassword, newPasswordAgain) => {
    try {
        const { data } = await axios.put(
            `${import.meta.env.VITE_API_ENDPOINT}/user/change-password`,
            { oldPassword, newPassword, newPasswordAgain },
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

export const changeUserTypeFromDB = async (access_token, userid, usertype) => {
    try {
        const { data } = await axios.put(
            `${import.meta.env.VITE_API_ENDPOINT}/user/change-usertype/${userid}`,
            { usertype },
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
