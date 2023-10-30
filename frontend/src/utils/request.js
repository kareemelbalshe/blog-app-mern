import axios from 'axios'

const request = axios.create({
    baseURL: "https://blog-app-mern-iw0g.onrender.com"
})

export default request
