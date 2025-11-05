import { PRODUCT_TITLE, SYSTEM_NAME } from "../config/constants";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  MenuItem,
} from "@mui/material";
import api from "../../services/productAPI";
import { useState, useEffect } from "react";
import type { SelectChangeEvent } from "@mui/material";

const Product = () => {
  // #--- Create state for products
  const [products, setProducts] = useState([]);
  const [productTypeOptions, setProductTypeOptions] = useState<
    {
      id: string;
      productTypeCode: string;
      productTypeName: string;
    }[]
  >([]);
  const [newProduct, setNewProduct] = useState({
    id: "",
    productName: "",
    productPrice: "",
    productCode: "",
    productTypeCode: "",
    // productType_id: "",
  });
  const [open, setOpen] = useState(false);
  //
  //
  //
  //
  //
  //
  // [Get] Read all products ################# ---------------:>
  const readAllProducts = () => {
    api.getAllProduct().then((response) => {
      setProducts(response.data);
    });
  };
  // [Get] Read all products ################# ---------------:>
  const readAllProductTypes = () => {
    api.getAllProductTypes().then((response) => {
      //มันจะส่ง request ไปยัง API -> ดึงข้อมูล productType -> อัปเดต state productType
      setProductTypeOptions(response.data);
      // setProductTypes(response.data);
    });
  };
  //
  //
  //
  //
  //
  //
  // #--- initial load with useEffect
  useEffect(() => {
    readAllProducts();
    readAllProductTypes();

    if (open) {
      fetchLastProductCode();
    }
  }, [open, readAllProducts, readAllProductTypes]);

  //
  //
  //
  //
  //
  //
  // [CREATE] ################# ---------------:>
  const fetchLastProductCode = async () => {
    try {
      const response = await api.getAllProduct();
    const products = response.data;

    if (products.length === 0) {
      // ถ้ายังไม่มีสินค้าเลย
      setNewProduct((prev) => ({
        ...prev,
        productCode: "PD01",
      }));
      return;
    }

    const lastProduct = products[products.length - 1];
    const lastCode = lastProduct.productCode;
    const nextCode = generateNextProductCode(lastCode);

    setNewProduct((prev) => ({
      ...prev,
      productCode: nextCode,
      }));
    } catch (error) {
      console.error("Error fetching last product code:", error);
    }
  };

  const generateNextProductCode = (code = "PD00") => {
  const prefix = code.slice(0, 2); // "PD"
  const number = parseInt(code.slice(2), 10); // 00
  const nextNumber = number + 1;
  return `${prefix}${nextNumber.toString().padStart(2, "0")}`; // "PD01"
};

  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewProduct({ ...newProduct, [event.target.name]: event.target.value });
  };
  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSelectChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setNewProduct((prev) => ({
      ...prev,
      [name as string]: value,
    }));
  };
  const handleSave = () => {
    const { productName, productPrice, productCode, productTypeCode } =
      newProduct;

    const payload = {
      product: {
        productName,
        productPrice: parseFloat(productPrice),
        productCode,
        productTypeCode,
      },
    };
    api
      .createProduct(payload)
      .then((respProduct: any) => {
        if (respProduct.status === 200) {
          handleOpenAlert("Add Product Success", "seccess");
          readAllProducts();
        }
      })
      .catch((error) => {
        handleOpenAlert("Add Product Type Failed", "error");
        console.log("Add Product Type ERROR ==>> ", error);
      });
    handleClose();
  };
  //
  //
  //
  //
  //
  //
  // [UPDATE] ################# ---------------:>
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectProduct, setSelectProduct] = useState({
    id: "",
    productCode: "",
    productPrice: "",
    productName: "",
    ProductTypeId: "",
    productType: {
      id: "",
      productTypeName: "",
    },
  });
  const handleOpenUpdate = (product: any) => {
    setSelectProduct(product);
    setOpenUpdate(true);
  };
  const handleCloseUpdate = () => setOpenUpdate(false);
  const updateProduct = (id: any) => {
    const payload = {
      // requestParam: {
      product: {
        productCode: selectProduct.productCode,
        productName: selectProduct.productName,
        productPrice: selectProduct.productPrice,
      },
      productType: {
        id: selectProduct.productType?.id,
        productTypeName: selectProduct.productType?.productTypeName,
      },
      // },
    };
    console.log("Sending payload:", payload);
    api
      .updateProducts(id, payload)
      .then((respProduct: any) => {
        if (respProduct.status === 200) {
          handleOpenAlert("Update Product Success", "seccess");
          readAllProducts(); // รีโหลดข้อมูลใหม่
        }
      })
      .catch((error) => {
        handleOpenAlert("Update Product Failed", "error");
        console.log("Update Product Type ERROR ==>> ", error);
      });
    handleCloseUpdate();
  };
  //
  //
  //
  //
  //
  //
  // [DELETE] ################# ---------------:>
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = (product: any) => {
    setSelectProduct(product);
    setOpenDelete(true);
  };
  const handleCloseDelete = () => setOpenDelete(false);
  const deleteProduct = (id: any) => {
    api
      .deleteProduct(id)
      .then((respProduct: any) => {
        if (respProduct.status === 200) {
          handleOpenAlert("Delete Product Success", "seccess");
          setProducts(products.filter((pt: { id: any }) => pt.id !== id)); // ลบข้อมูลออกจาก state
          readAllProducts();
        }
      })
      .catch((error) => {
        handleOpenAlert("Delete Product Failed", "error");
        console.log("Delete Product ERROR ==>> ", error);
      });
  };
  //
  //
  //
  //
  //
  //
  // [ALERT] ################# ---------------:>
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("seccess");
  const handleOpenAlert = (message: string, type: "seccess" | "error") => {
    setAlertMessage(message);
    setAlertType(type);
    setOpenAlert(true);
  };
  const handleCloseAlert = () => setOpenAlert(false);
  //
  //
  //
  //
  //
  //

  // Set title
  document.title = PRODUCT_TITLE + " | " + SYSTEM_NAME;

  return (
    <>
      <h1>Products</h1>
      <Box sx={styles.columnsContainer}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell> Code</TableCell>
                <TableCell> Product Type</TableCell>
                <TableCell> Name</TableCell>
                <TableCell> Price</TableCell>
                {/* <TableCell>Image</TableCell> */}
                <TableCell>
                  Action &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                  <Button variant="contained" color="info" onClick={handleOpen}>
                    Add
                  </Button>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products &&
                Array.isArray(products) &&
                products.map((product: any, index: any) => {
                  // const productType = productTypes.find(
                  //     (type: any) => type.id === product.productTypeId
                  // );

                  return (
                    <TableRow key={index}>
                      <TableCell>{product.productCode}</TableCell>
                      <TableCell>
                        {product.productType.productTypeName || "-"}
                      </TableCell>
                      <TableCell>{product.productName}</TableCell>
                      <TableCell>{product.productPrice}</TableCell>
                      {/* <TableCell>
                                                <img src={import.meta.env.VITE_BASE_IMAGE_URL+product.attributes.image.data[0].attributes.url} alt="" width={50} />
                                            </TableCell> */}
                      <TableCell>
                        <Button
                          variant="contained"
                          color="warning"
                          onClick={() => handleOpenUpdate(product)}
                        >
                          Edit
                        </Button>
                        &nbsp;&nbsp;
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleOpenDelete(product)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/* // [DIALOG ADD]#################----------------************************** */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent>
          <TextField
            label="Product Name"
            name="productName"
            fullWidth
            margin="dense"
            type="text"
            onChange={handleChange}
          />
          <TextField
            label="Product Price"
            name="productPrice"
            fullWidth
            margin="dense"
            type="text"
            onChange={handleChange}
          />
          <TextField
            label="Product Code"
            name="productCode"
            fullWidth
            margin="dense"
            type="text"
            value={newProduct.productCode}
            InputProps={{
              readOnly: true,
            }}
            // onChange={handleTextFieldChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>ประเภทสินค้า</InputLabel>
            <Select
              name="productTypeCode"
              value={newProduct.productTypeCode}
              onChange={handleSelectChange}
            >
              <MenuItem value="">
                <em>กรุณาเลือกประเภทสินค้า</em>
              </MenuItem>
              {productTypeOptions.map((type) => (
                <MenuItem
                  key={type.productTypeCode}
                  value={type.productTypeCode}
                >
                  {type.productTypeName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="warning">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/* // [DIALOG UPDATE]#################----------------************************** */}
      <Dialog open={openUpdate} onClose={handleCloseUpdate}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          {/* <TextField
                        label="No."
                        name="id"
                        fullWidth
                        margin="dense"
                        type="text"
                        value={selectProduct.id}
                        onChange={(event) => setSelectProduct({ ...selectProduct, id: event.target.value })}
                    /> */}
          <TextField
            label="Product Code"
            name="productCode"
            fullWidth
            margin="dense"
            type="text"
            value={selectProduct.productCode}
            onChange={(event) =>
              setSelectProduct({
                ...selectProduct,
                productCode: event.target.value,
              })
            }
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            label="Product Type"
            name="productType"
            fullWidth
            margin="dense"
            type="text"
            value={selectProduct.productType?.productTypeName}
            inputProps={{ readOnly: true }}
          />

          {/* <FormControl fullWidth margin="dense">
                        <InputLabel>Product Type</InputLabel>
                        <Select
                            name="productTypeId"
                            value={selectProduct.productType?.id || ""}
                            onChange={(event) => {
                                const selectedType = productTypeOptions.find(
                                    (type: any) => type.id === event.target.value
                                );
                                setSelectProduct({
                                    ...selectProduct,
                                    productType: selectedType ?? { id: "", productTypeName: "" },
                                });
                            }}
                        >
                            {productTypeOptions.map((type: any) => (
                                <MenuItem key={type.id} value={type.id}>
                                    {type.productTypeName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl> */}

          <TextField
            label="Product Name"
            name="productName"
            fullWidth
            margin="dense"
            type="text"
            value={selectProduct.productName}
            onChange={(event) =>
              setSelectProduct({
                ...selectProduct,
                productName: event.target.value,
              })
            }
          />
          <TextField
            label="Product Price"
            name="productPrice"
            fullWidth
            margin="dense"
            type="text"
            value={selectProduct.productPrice}
            onChange={(event) =>
              setSelectProduct({
                ...selectProduct,
                productPrice: event.target.value,
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdate} color="warning">
            Cancel
          </Button>
          <Button
            onClick={() => updateProduct(selectProduct.id)}
            color="primary"
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/* // [DIALOG DELETE]#################----------------************************** */}
      <Dialog open={openDelete} onClose={handleCloseDelete}>
        <DialogTitle>Delete Product</DialogTitle>
        <DialogContent>
          <p>
            <strong>ID:</strong> {selectProduct.id}{" "}
          </p>
          <p>
            <strong>Product Code:</strong> {selectProduct.productCode}{" "}
          </p>
          <p>
            <strong>Product Name:</strong> {selectProduct.productName}{" "}
          </p>
          <p>
            <strong>Product Price:</strong> {selectProduct.productPrice}{" "}
          </p>
          <p style={{ color: "red" }}>
            {" "}
            Are you sure you want to delete this product?
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete} color="warning">
            Cancel
          </Button>
          <Button
            onClick={() => {
              deleteProduct(selectProduct.id);
              handleCloseDelete();
            }}
            color="error"
          >
            Confirm Delete
          </Button>
        </DialogActions>
      </Dialog>
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/* // [DIALOG ALERT]#################----------------************************** */}
      <Dialog open={openAlert} onClose={handleCloseAlert}>
        <DialogTitle>
          {alertType === "seccess" ? "Success" : "Error"}
        </DialogTitle>
        <DialogContent>
          <p style={{ color: alertType === "seccess" ? "green" : "red" }}>
            {" "}
            {alertMessage}{" "}
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAlert} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Product;

const styles = {
  columnsContainer: {
    columns: "280px 1",
    maxWidth: 1400,
  },
};
