import type { ReactNode } from 'react'
import {Navigate} from 'react-router-dom'

const token = localStorage.getItem("token")

type ProtectedRouteProps = {
    redirectPath?: string,
    children: ReactNode
}

const ProtectedRoute = ({
    redirectPath = '/user/login',
    children
}: any) => {
    if(!token) {
        return <Navigate to={redirectPath} />
    }
    return children
}

export default ProtectedRoute