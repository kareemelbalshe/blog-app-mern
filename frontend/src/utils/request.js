import axios from 'axios'

const request = axios.create({
    baseURL: "https://blog-app-mern-taupe-seven.vercel.app/"
})


export default request
