import http from './configAxios'
import Axios from 'axios'

// Read All ProductTypes
// const getAllProductTypes = () => {
//     return http.get('/productTypes/get')
// }

const getAllProductTypes = (params?: any) => {
    return Axios.get('/productTypes/get',{
        baseURL: import.meta.env.VITE_BAST_URL_API,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        params
    })
}

// Create ProductTypes
// Update ProductTypes
// Delete ProductTypes

export default { getAllProductTypes }
