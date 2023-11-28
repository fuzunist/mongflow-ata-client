import axios from 'axios'
import XMLParser from 'react-xml-parser'

export const getTodayExchangeRates = async () => {
    try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/other/exchange-rates`)
        var xml = new XMLParser().parseFromString(data)
        return xml
    } catch (e) {
        return e.response.data
    }
}
