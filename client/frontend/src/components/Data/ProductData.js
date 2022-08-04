import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const ProductData = () => {
  const [productList, setProductList] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [image, setImage] = useState(null);
  const [storeId, setStoreId] = useState("");
  const [openEdit, setOpenEdit] = React.useState(false);
  const handleEditOpen = () => setOpenEdit(true);
  const handleEditClose = () => setOpenEdit(false);
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [openhandle, setOpenHandle] = React.useState(false);
  const handlePopupOpen = () => setOpenHandle(true);
  const handlePopupClose = () => setOpenHandle(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const fetchHandler = useCallback(() => {
    axios.get("http://localhost:5000/api/products").then((res) => {
      setProductList(res.data);
    });
  }, []);

  useEffect(() => {
    fetchHandler();
  }, [fetchHandler]);

  const addProduct = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", name);
    data.append("description", description);
    data.append("price", price);
    data.append("categoryId", categoryId);
    data.append("image", image);
    console.log(image);
    axios.post("http://localhost:5000/api/products", data);
    handleClose();
    fetchHandler();
  };
  const deleteProduct = (id) => {
    axios.delete(`http://localhost:5000/api/products/${id}`);
    console.log("ID", id);
    handlePopupClose();
    fetchHandler();
  };

  const updateProduct = () => {
    axios.put(`http://localhost:5000/api/products/${storeId}`, {
      name: name,
      price: price,
      description: description,
      categoryId: categoryId,
      image: image,
    });
    handleEditClose();
    fetchHandler();
  };

  return (
    <div style={{ marginLeft: "30px" }}>
      <Button onClick={handleOpen} variant="contained">
        Product
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <form encType="multipart/form-data" onSubmit={addProduct}>
          <Box sx={style}>
            <h3 style={{ textAlign: "center", marginTop: "4px" }}>
              Add Product
            </h3>
            <label>ProductName:</label>
            <input type="text" onChange={(e) => setName(e.target.value)} />
            <br />
            <label>CategoryID:</label>
            <input
              type="text"
              onChange={(e) => setCategoryId(e.target.value)}
            />
            <br />
            <label>Price:</label>
            <input type="number" onChange={(e) => setPrice(e.target.value)} />
            <br />
            <label>Description:</label>
            <input
              type="text"
              onChange={(e) => setDescription(e.target.value)}
            />
            <br />
            <br />
            <label>Images:</label>
            <input
              type="file"
              name="image"
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
            />
            <div>
              <Button
                onClick={() => {}}
                type="submit"
                variant="contained"
                style={{ margin: "8px" }}
              >
                ADD Product
              </Button>
              <Button onClick={handleClose} variant="contained">
                Close
              </Button>
            </div>
          </Box>
        </form>
      </Modal>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productList.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <h3>{row.name}</h3>
                  <p>{row.description}</p>
                  <h3> {row.price}</h3>
                  {/* {console.log(row.images)} */}
                  <img
                    src={`http://localhost:5000/${row.images}`}
                    name="image"
                    alt="..."
                    height="100px"
                    width="100px"
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  <Button
                    onClick={() => {
                      handleEditOpen();
                      setStoreId(row._id);
                    }}
                    variant="contained"
                    style={{ marginRight: "5px" }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => deleteProduct(row._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={openEdit}
        onClose={handleEditClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={style}>
          <h3 style={{ textAlign: "center", marginTop: "4px" }}>
            Update Product
          </h3>
          <label>ProductName:</label>
          <input type="text" onChange={(e) => setName(e.target.value)} />
          <br />
          <label>CategoryID:</label>
          <input type="text" onChange={(e) => setCategoryId(e.target.value)} />
          <br />
          <label>Price:</label>
          <input
            type="number
          "
            onChange={(e) => setPrice(e.target.value)}
          />
          <br />
          <label>Description:</label>
          <input type="text" onChange={(e) => setDescription(e.target.value)} />
          <br />
          <div>
            {" "}
            <Button
              onClick={updateProduct}
              variant="contained"
              style={{ margin: "8px" }}
            >
              {" "}
              Update Product
            </Button>
            <Button onClick={handleEditClose} variant="contained">
              Close
            </Button>
          </div>
        </Box>
      </Modal>

      <Dialog
        fullScreen={fullScreen}
        open={openhandle}
        onClose={handlePopupClose}
      >
        <DialogContent>
          <DialogContentText>
            <b>Do you really want to delete this category</b>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            autoFocus
            onClick={() => deleteProduct(handlePopupOpen)}
          >
            ok
          </Button>
          <Button variant="contained" onClick={handlePopupClose} autoFocus>
            cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
