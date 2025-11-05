import Axios from 'axios'

// Read All Products
const getAllProduct = (params?: any) => {
    return Axios.get('/products/get',{
        baseURL: import.meta.env.VITE_BAST_URL_API,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        params
    })
}

// Read Product Type By Code
const getProductTypeByCode = (productCode: any) => {
    return Axios.get(`/products/get/queryProductTypeByProductCode?productCode=${productCode}`,{
        baseURL: import.meta.env.VITE_BAST_URL_API,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
}

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

// Create Products
const createProduct = (data: any) => {
    return Axios.post('/products/create', data , {
        baseURL: import.meta.env.VITE_BAST_URL_API,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
}


// Update Products
const updateProducts = (id: any, data: any) => {
    return Axios.put(`/products/update/${id}`, data , {
        baseURL: import.meta.env.VITE_BAST_URL_API,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
}


// Delete Products
const deleteProduct = (id: any) => {
    return Axios.delete(`/products/delete/${id}` , {
        baseURL: import.meta.env.VITE_BAST_URL_API,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
}

export default { getAllProduct, getProductTypeByCode, getAllProductTypes, createProduct, updateProducts, deleteProduct }
