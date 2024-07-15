import axios from 'axios'

const request = axios.create({
    baseURL: "https://blog-app-mern-fprg.onrender.com"
})
//https://blog-app-mern-fprg.onrender.com

export default request