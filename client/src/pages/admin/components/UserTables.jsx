import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@mui/material"
import { deleteProfile } from "../../../actions/users";
import { useDispatch } from "react-redux"

const rows = [];

export default function UserTable({ dt }) {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    const handleClickOpen = (userId) => {
        setSelectedUserId(userId);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedUserId(null);
    };

    const handleDelete = () => {
        dispatch(deleteProfile(selectedUserId));
        handleClose();
    };

    return (
        <TableContainer component={Paper} >
            <Table aria-label="simple table" stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="right">Email</TableCell>
                        <TableCell align="right">Password</TableCell>
                        <TableCell align="right">Admin</TableCell>
                        <TableCell align="right">tags</TableCell>
                        <TableCell align="right">joinedOn</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dt?.map((row) => (
                        <TableRow key={row?._id}>
                            {/* <TableCell component="th" scope="row">
                                {row?.name}
                            </TableCell> */}
                            <TableCell align="right">{row?.name}</TableCell>
                            <TableCell align="right">{row?.email}</TableCell>
                            <TableCell align="right">{row?.password}</TableCell>
                            <TableCell align="right">{row?.admin ? "Yes" : "No"}</TableCell>
                            <TableCell align="right">{row?.tags.join(", ")}</TableCell>
                            <TableCell align="right">{new Date(row?.joinedOn).toLocaleString()}</TableCell>
                            <TableCell align="right">
                            <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => handleClickOpen(row?._id)}
                                >
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}

                </TableBody>
            </Table>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>{"Delete User"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this user and all associated questions and answers?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </TableContainer>
    );
}
