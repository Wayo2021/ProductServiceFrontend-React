import http from './configAxios'
import Axios from 'axios'

// Read All Products
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
const createProducts = (data: any) => {
    return Axios.post('/products/create', data , {
        baseURL: import.meta.env.VITE_BAST_URL_API,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
}


// Update Products
const updateProducts = (data: any) => {
    return Axios.post('/products/update', data , {
        baseURL: import.meta.env.VITE_BAST_URL_API,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
}


// Delete Products
const deleteProducts = (data: any) => {
    return Axios.post('/products/delete', data , {
        baseURL: import.meta.env.VITE_BAST_URL_API,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
}

export default { getAllProducts, createProducts }
