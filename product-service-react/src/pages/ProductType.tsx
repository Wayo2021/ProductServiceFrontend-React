import { PRODUCT_TYPE_TITLE, SYSTEM_NAME } from "../config/constants";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
} from "@mui/material";
import api from "../../services/productTypeAPI";
import { useState, useEffect } from "react";

const ProductType = () => {
    // Create state for products***************************************************
    const [productTypes, setProductTypes] = useState([]);

    // Read all products***************************************************
    const readAllProductTypes = () => {
        api.getAllProductTypes().then((response) => {
            // console.log("Res", response)
            setProductTypes(response.data);
        });
    };

    // initial load with useEffect***************************************************
    useEffect(() => {
        readAllProductTypes();
    }, []);

    //   console.log("productType", productTypes);

    const [open, setOpen] = useState(false);
    const [newProduct, setNewProduct] = useState({
        id: "",
        productTypeCode: "",
        productTypeName: "",
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewProduct({ ...newProduct, [event.target.name]: event.target.value });
    };

    const handleSave = () => {
        console.log("New product added:", newProduct);

        api.createProductTypes(newProduct).then((respProductType: any) => {

            console.log("THIS THIS RESPONSE PRODUCT TYPE==>> ", respProductType)
            if (respProductType.status === 200) {
                console.log("Add Product Type Success")
            }
        }).catch((error) => {
            console.log("Add Product Type ERROR ==>> ", error)
        })

        handleClose();
    };

    // Set title***************************************************
    document.title = PRODUCT_TYPE_TITLE + " | " + SYSTEM_NAME;

    return (
        <>
            <h1>Products Types</h1>
            <Box sx={styles.columnsContainer}>
                <TableContainer>

                    <Table>

                        <TableHead>
                            <TableRow>
                                <TableCell>No.</TableCell>
                                <TableCell>Product Type Code</TableCell>
                                <TableCell>Product Type Name</TableCell>
                                <TableCell>Action &nbsp;&nbsp; <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleOpen}
                                >
                                    Add
                                </Button></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {productTypes &&
                                Array.isArray(productTypes) &&
                                productTypes.map((productType: any, index: any) => (
                                    <TableRow key={index}>
                                        <TableCell>{productType.id}</TableCell>
                                        <TableCell>{productType.productTypeCode}</TableCell>
                                        <TableCell>{productType.productTypeName}</TableCell>
                                        {/* <TableCell>
                                                <img src={import.meta.env.VITE_BASE_IMAGE_URL+product.attributes.image.data[0].attributes.url} alt="" width={50} />
                                            </TableCell> */}
                                        <TableCell>
                                            <Button variant="contained" color="warning">
                                                Edit
                                            </Button>
                                            &nbsp;&nbsp;
                                            <Button variant="contained" color="error">
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogContent>
                    <TextField
                        label="No."
                        name="id"
                        fullWidth
                        margin="dense"
                        type="text"
                        onChange={handleChange}
                    />
                    <TextField
                        label="Product Type Code"
                        name="productTypeCode"
                        fullWidth
                        margin="dense"
                        type="text"
                        onChange={handleChange}
                    />
                    <TextField
                        label="Product Type Name"
                        name="productTypeName"
                        fullWidth
                        margin="dense"
                        type="text"
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ProductType;

const styles = {
    columnsContainer: {
        columns: "280px 1",
        maxWidth: 1400,
    },
};
