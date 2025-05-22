import http from './configAxios'
import Axios from 'axios'
// Read All Products
// const getAllProducts = () => {
//     return http.get('/products')
// }

const getAllProducts = (params?: any) => {
    return Axios.get('/products/get',{
        baseURL: import.meta.env.VITE_BAST_URL_API,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        params
    })
}

// Create Products
// Update Products
// Delete Products

export default { getAllProducts }
