import Axios from 'axios'

// Register function

// Login function
const authLogin = (data: any) => {
    return Axios.post('/auth/login', data , {
        baseURL: import.meta.env.VITE_BAST_URL_API,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
}

// Logout function


export default { authLogin }