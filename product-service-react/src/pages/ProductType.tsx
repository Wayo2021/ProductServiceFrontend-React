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
    // Create state for products
    const [productTypes, setProductTypes] = useState([]); //กำหนดค่าเริ่มต้น productTypes เป็น Array ว่าง เพื่อรอรับข้อมูลที่โหลดมาจาก API หรือแหล่งข้อมูลอื่น

    // [GET] Read all products #################----------------**************************
    const readAllProductTypes = () => {
        api.getAllProductTypes().then((response) => { //มันจะส่ง request ไปยัง API -> ดึงข้อมูล productType -> อัปเดต state productType
            setProductTypes(response.data);
        });
    };

    // initial load with useEffect [###React Hook]
    useEffect(() => { //จะทำงานเมื่อ component ถูก render
        readAllProductTypes();
    }, []); //[] กำหนดว่า useEffect() จะทำงาน ครั้งเดียว เมื่อ component ถูกโหลดครั้งแรก


    // [CREATE] #################----------------**************************
    const [open, setOpen] = useState(false);
    const [newProductType, setNewProductType] = useState({
        id: "",
        productTypeCode: "",
        productTypeName: "",
    });
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewProductType({ ...newProductType, [event.target.name]: event.target.value });
    };
    const handleSave = () => {
        api.createProductTypes(newProductType).then((respProductType: any) => {
            if (respProductType.status === 200) {
                handleOpenAlert("Add Product Type Success", "seccess")
                readAllProductTypes();
            }
        }).catch((error) => {
            handleOpenAlert("Add Product Type Failed", "error")
            console.log("Add Product Type ERROR ==>> ", error)
        })
        handleClose();
    };


    // [UPDATE] #################----------------**************************
    const [openUpdate, setOpenUpdate] = useState(false);
    const [selectProductType, setSelectProductType] = useState({
        id: "",
        productTypeCode: "",
        productTypeName: "",
    });
    const handleOpenUpdate = (productType: any) => {
        setSelectProductType(productType);
        setOpenUpdate(true)
    }
    const handleCloseUpdate = () => setOpenUpdate(false)
    const updateProductType = (id: any, updatedProductType: any) => {
        api.updateProductTypes(id, updatedProductType).then((respProductType: any) => {
            if (respProductType.status === 200) {
                handleOpenAlert("Update Product Type Success", "seccess");
                readAllProductTypes(); // รีโหลดข้อมูลใหม่
            }
        }).catch((error) => {
            handleOpenAlert("Update Product Type Failed", "error")
            console.log("Update Product Type ERROR ==>> ", error);
        });
        handleCloseUpdate();
    };


    // [DELETE] #################----------------**************************
    const [openDelete, setOpenDelete] = useState(false);
    const handleOpenDelete = (productType: any) => {
        setSelectProductType(productType);
        setOpenDelete(true)
    }
    const handleCloseDelete = () => setOpenDelete(false)
    const deleteProductType = (id: any) => {
        api.deleteProductTypes(id).then((respProductType: any) => {
            if (respProductType.status === 200) {
                handleOpenAlert("Delete Product Type Success", "seccess");
                setProductTypes(productTypes.filter((pt: { id: any }) => pt.id !== id)); // ลบข้อมูลออกจาก state
                readAllProductTypes();
            }
        }).catch((error) => {
            handleOpenAlert("Delete Product Type Failed", "error")
            console.log("Delete Product Type ERROR ==>> ", error);
        });
    };


    // [ALERT] #################----------------**************************
    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("seccess");
    const handleOpenAlert = (message: string, type: "seccess" | "error") => {
        setAlertMessage(message)
        setAlertType(type)
        setOpenAlert(true)
    }
    const handleCloseAlert = () => setOpenAlert(false)

    // Set title #################----------------**************************
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
                                <TableCell>Action &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <Button
                                    variant="contained"
                                    color="info"
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
                                            <Button variant="contained" color="warning" onClick={() => handleOpenUpdate(productType)}>
                                                Edit
                                            </Button>
                                            &nbsp;&nbsp;
                                            <Button variant="contained" color="error" onClick={() => handleOpenDelete(productType)}>
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>


            {/* // [DIALOG ADD]#################----------------************************** */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Product Type</DialogTitle>
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


            {/* // [DIALOG UPDATE]#################----------------************************** */}
            <Dialog open={openUpdate} onClose={handleCloseUpdate}>
                <DialogTitle>Edit Product Type</DialogTitle>
                <DialogContent>
                    <TextField
                        label="No."
                        name="id"
                        fullWidth
                        margin="dense"
                        type="text"
                        value={selectProductType.id}
                        onChange={(event) => setSelectProductType({ ...selectProductType, id: event.target.value })}
                    />
                    <TextField
                        label="Product Type Code"
                        name="productTypeCode"
                        fullWidth
                        margin="dense"
                        type="text"
                        value={selectProductType.productTypeCode}
                        onChange={(event) => setSelectProductType({ ...selectProductType, productTypeCode: event.target.value })}
                    />
                    <TextField
                        label="Product Type Name"
                        name="productTypeName"
                        fullWidth
                        margin="dense"
                        type="text"
                        value={selectProductType.productTypeName}
                        onChange={(event) => setSelectProductType({ ...selectProductType, productTypeName: event.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseUpdate} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={() => updateProductType(selectProductType.id, selectProductType)} color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>


            {/* // [DIALOG DELETE]#################----------------************************** */}
            <Dialog open={openDelete} onClose={handleCloseDelete}>
                <DialogTitle>Delete Product Type</DialogTitle>
                <DialogContent>
                    <p><strong>ID:</strong> {selectProductType.id} </p>
                    <p><strong>Product Type Code:</strong> {selectProductType.productTypeCode} </p>
                    <p><strong>Product Type Name:</strong> {selectProductType.productTypeName} </p>
                    <p style={{color: "red"}}> Are you sure you want to delete this product type?</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDelete} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={() => {deleteProductType(selectProductType.id); handleCloseDelete();}} color="error">
                        Confirm Delete
                    </Button>
                </DialogActions>
            </Dialog>


            {/* // [DIALOG ALERT]#################----------------************************** */}
            <Dialog open={openAlert} onClose={handleCloseAlert} >
                <DialogTitle>{alertType === "seccess" ? "Success" : "Error"}</DialogTitle>
                <DialogContent>
                    <p style={{color: alertType === "seccess" ? "green" : "red"}}> {alertMessage} </p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAlert} color="primary">OK</Button>
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
