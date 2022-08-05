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

export const CategoryData = () => {
  const [category, setCategory] = useState("");
  const [storeId, setStoreId] = useState("");
  const [catList, setCatList] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openhandle, setOpenHandle] = React.useState(false);
  const handlePopupOpen = () => setOpenHandle(true);
  const handlePopupClose = () => setOpenHandle(false);

  const [openEdit, setOpenEdit] = React.useState(false);
  const handleEditOpen = () => setOpenEdit(true);
  const handleEditClose = () => setOpenEdit(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const fetchHandler = useCallback(() => {
    axios.get("http://localhost:5000/api/categories").then((res) => {
      setCatList(res.data);
    });
  }, []);

  useEffect(() => {
    fetchHandler();
  });

  const addCategory = () => {
    axios.post("http://localhost:5000/api/categories", {
      name: category,
    });
    handleClose();
    fetchHandler();
  };
  const deleteCategory = (id) => {
    axios.delete(`http://localhost:5000/api/categories/${id}`);
    console.log("ID", id);
    handlePopupClose();
    fetchHandler();
  };
  const updateCategory = () => {
    axios.put(`http://localhost:5000/api/categories/${storeId}`, {
      name: category,
    });
    handleEditClose();
    fetchHandler();
  };
  return (
    <div style={{ marginLeft: "30px" }}>
      <Button onClick={handleOpen} variant="contained">
        Add Category
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={style}>
          <h3 style={{ textAlign: "center", marginTop: "4px" }}>
            Add Category
          </h3>
          <label>CategoryName:</label>
          <input type="text" onChange={(e) => setCategory(e.target.value)} />
          <br />
          <br />
          <div>
            <Button
              onClick={addCategory}
              variant="contained"
              style={{ margin: "8px" }}
            >
              {" "}
              ADD Category
            </Button>
            <Button onClick={handleClose} variant="contained">
              Close
            </Button>
          </div>
        </Box>
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
            {catList.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
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
                    onClick={() => deleteCategory(row._id)}
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
            Update Category
          </h3>
          <label>CategoryName:</label>
          <input type="text" onChange={(e) => setCategory(e.target.value)} />
          <br />
          <br />
          <div>
            {" "}
            <Button
              onClick={updateCategory}
              variant="contained"
              style={{ margin: "8px" }}
            >
              {" "}
              Update Category
            </Button>
            <Button onClick={handleEditClose} variant="contained">
              Close
            </Button>
          </div>
        </Box>
      </Modal>

      {/* confirmation DialogBox for deletetion  */}
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
            onClick={() => deleteCategory(handlePopupOpen)}
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
