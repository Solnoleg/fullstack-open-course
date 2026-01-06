import axios from 'axios'

const baseURL = 'https://api.openweathermap.org/data/3.0/onecall'
const apiKey = import.meta.env.VITE_API_KEY

const weatherByGeo = (geo) => {
    return axios.get(baseURL, {
        params: {
            lat: geo[0],
            lon: geo[1],
            exclude: 'ourly,daily',
            units: 'metric',
            appid: apiKey
        }
    })
        .then(res => res.data)
}

export default {weatherByGeo}