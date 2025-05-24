import Axios from 'axios'

// Read All ProductTypes
const getAllProductTypes = (params?: any) => {
    return Axios.get(`/productTypes/get`,{
        baseURL: import.meta.env.VITE_BAST_URL_API,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        params
    })
}

// Create ProductTypes
const createProductTypes = (data: any) => {
    return Axios.post(`/productTypes/create`, data , {
        baseURL: import.meta.env.VITE_BAST_URL_API,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
}

// Update ProductTypes
const updateProductTypes = (id: any, data: any) => {
    return Axios.put(`/productTypes/update/${id}`, data , {
        baseURL: import.meta.env.VITE_BAST_URL_API,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
}

// Delete ProductTypes
const deleteProductTypes = (id: any) => {
    return Axios.delete(`/productTypes/delete/${id}`,{
        baseURL: import.meta.env.VITE_BAST_URL_API,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
}

export default { getAllProductTypes, createProductTypes, updateProductTypes, deleteProductTypes }
