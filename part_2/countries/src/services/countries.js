import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const find = (name) => {
    return axios
        .get(`${baseUrl}/all`)
        .then(response =>
            response.data.filter(country => country.name.common.toLowerCase().includes(name.toLowerCase()))
        )
}

const findOne = (name) => {
    return axios
        .get(`${baseUrl}/name/${name}`)
        .then(response => response.data)
}

export default {find, findOne}