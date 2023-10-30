import axios from 'axios'

const request = axios.create({
    baseURL: "http://localhost:5005"
})

export default request