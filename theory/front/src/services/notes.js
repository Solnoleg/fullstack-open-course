import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/notes'

const getAll = () => {
    const fakeNote = {
        id: "13",
        content: "THIS IS A FAKE NOTE",
        important: false
    }
    return axios.get(baseUrl).then(response => response.data.concat(fakeNote))
}

const create = newObject => {
    return axios.post(baseUrl, newObject).then(response => response.data)
}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject).then(response => response.data)
}

export default {getAll, create, update}