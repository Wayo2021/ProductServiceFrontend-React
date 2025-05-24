// import { Button, Stack } from '@mui/material'
// import { Delete, Send, Photo} from '@mui/icons-material'
import { DASHBOARD_PATH, PRODUCT_PATH, REPORT_PATH, SETTING_PATH, PRODUCT_TYPE_PATH, USER_PATH } from "./config/constants"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import AuthLayout from "./layouts/AuthLayout"
import Login from "./pages/Login"
import BackendLayout from "./layouts/BackendLayout"
import Dashboard from "./pages/Dashboard"
import Product from "./pages/Product"
import Report from "./pages/Report"
import Setting from "./pages/Setting" 
import ProductType from "./pages/ProductType"
import ProtectedRoute from "./router/ProtectedRoute"
import User from "./pages/User"



function App() {

  // return (
  //   <>
  //     <h1>MUI Button</h1>
  //     <Stack spacing={2} direction="row">
  //     <Button variant='text'>Text</Button>
  //     <Button variant='contained'>Text</Button>
  //     <Button variant='outlined'>Text</Button>
  //     </Stack>

  //     <h3>MUI Button with Icon</h3>
  //       <Stack direction="row" spacing={2}>
  //         <Button variant="text" startIcon={<Delete />}>Delete</Button>
  //         <Button variant="contained" startIcon={<Send />}>Send</Button>
  //         <Button variant="outlined" startIcon={<Photo />}>Photo</Button>
  //       </Stack>
  //   </>
  // )

return (
  <BrowserRouter>
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/user/login" element={<Login />} />
      </Route>
      
      <Route element={<ProtectedRoute><BackendLayout /></ProtectedRoute>} >
        <Route path={DASHBOARD_PATH} element={<Dashboard />} />
        <Route path={USER_PATH} element={<User />} />
        <Route path={PRODUCT_PATH} element={<Product />} />
        <Route path={PRODUCT_TYPE_PATH} element={<ProductType />} />
        <Route path={REPORT_PATH} element={<Report />} />
        <Route path={SETTING_PATH } element={<Setting />} />
      </Route>
      
    </Routes>
  </BrowserRouter>
)


}

export default App
