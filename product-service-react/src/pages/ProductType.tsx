import { PRODUCT_TYPE_TITLE, SYSTEM_NAME } from "../config/constants"
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import api from "../../services/productTypeAPI"
import { useState, useEffect } from "react"

const ProductType = () => {

    // Create state for products
    const [productTypes, setProductTypes] = useState([])

    // Read all products
    const readAllProductTypes = () => {
        api.getAllProductTypes().then(response => {
            // console.log("Res", response)
            setProductTypes(response.data)
        })
    }

    // initial load with useEffect
    useEffect(() => {
        readAllProductTypes()
    }, [])

    console.log("productType" ,productTypes)

    // Set title
    document.title =  PRODUCT_TYPE_TITLE + ' | ' + SYSTEM_NAME

    return (
        <>
            <h1>Products</h1>
            <Box sx={styles.columnsContainer}>
                   <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Product Type Code</TableCell>
                                    <TableCell>Product Type Name</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                { 
                                    productTypes && Array.isArray(productTypes) && productTypes.map((productType: any, index: any) => (
                                        <TableRow key={index}>
                                            <TableCell>{productType.productTypeCode}</TableCell>
                                            <TableCell>{productType.productTypeName}</TableCell>
                                            {/* <TableCell>
                                                <img src={import.meta.env.VITE_BASE_IMAGE_URL+product.attributes.image.data[0].attributes.url} alt="" width={50} />
                                            </TableCell> */}
                                            <TableCell>
                                                <Button variant="contained" color="warning">Edit</Button>&nbsp;&nbsp;
                                                <Button variant="contained" color="error">Delete</Button>
                                            </TableCell>
                                        </TableRow>
                                    )) 
                                }
                            </TableBody>
                        </Table>
                   </TableContainer>
                </Box>
        </>
    )
}

export default ProductType

const styles = {
    columnsContainer: {
        columns: '280px 1',
        maxWidth: 1400
    },
}