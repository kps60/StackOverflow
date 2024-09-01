import React, { useState } from "react";
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
    DialogTitle,
    IconButton,
} from "@mui/material"
import Typography from '@mui/material/Typography'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';

import { deleteAdminQuestion } from "../../../actions/question";
import { useDispatch } from "react-redux"

export default function QuestionsTable({ dt }) {
    // const d = [{
    //     "_id": "66c60de36553880f55634b02",
    //     "questionTitle": "Raspberry is used for what?",
    //     "questionBody": "Is it used for development of ssystem softwar for devices?\n",
    //     "questionTags": ["its", "a", "language"],
    //     "noOfAnswers": { "$numberInt": "2" },
    //     "upVote": ["63c38e69109869bef2d9d5ae", "66b45fd950fbd6cfc2ef171b"],
    //     "downVote": [],
    //     "userPosted": "krish",
    //     "userId": "63c38e69109869bef2d9d5ae",
    //     "askedOn": "2024-06-29T07:42:36.763+00:00",
    //     "answer": [{
    //         "answerBody": "Its a  programming language used for the development  of operating systems for mobiles or any small devices",
    //         "userAnswered": "SHOBHA Y",
    //         "userId": "667fbc083e7ea418f5ecc128",
    //         "answeredOn": "2024-06-29T07:50:14.458+00:00",
    //         "_id": "667fbcb63e7ea418f5ecc131"
    //     }]
    // }]

    const dispatch = useDispatch();
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [opend,setOpend]=useState(false)

    const handleClickOpen = (userId) => {
        setSelectedUserId(userId);
        setOpend(true);
    };

    const handleClose = () => {
        setOpend(false);
        setSelectedUserId(null);
    };
    const handleDelete = () => {
        dispatch(deleteAdminQuestion(selectedUserId));
        handleClose();
    };
    
    function Row(props) {
        const { row } = props;
        const [open, setOpen] = React.useState(false);
        
        return (
            <React.Fragment>
                <TableRow key={row?._id} sx={{ '& > *': { borderBottom: 'unset' } }}>
                    {/* <TableCell component="th" scope="row">
                    {row?.name}
                </TableCell> */}
                    <TableCell>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell align="right" component="th" scope="row">{row?.userPosted}</TableCell>
                    <TableCell align="right">{row?.userId}</TableCell>
                    <TableCell align="right">{row?.questionTitle}</TableCell>
                    <TableCell align="right">{row?.questionBody}</TableCell>
                    <TableCell align="right">{row?.questionTags.join(", ")}</TableCell>
                    <TableCell align="right">{row?.noOfAnswers}</TableCell>
                    <TableCell align="right">{new Date(row?.askedOn).toLocaleString()}</TableCell>
                    <TableCell align="right">{row?.upVote - row?.downVote === 0 ? 0 : row?.upVote - row?.downVote}</TableCell>
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
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                                <Typography variant="h6" gutterBottom component="div">
                                    {row?.answer?.length} Answer
                                </Typography>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>userAnswered</TableCell>
                                            <TableCell>userId</TableCell>
                                            <TableCell align="right">answerBody</TableCell>
                                            <TableCell align="right">answeredOn</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {row?.answer?.map((historyRow) => (
                                            <TableRow key={historyRow._id}>
                                                <TableCell component="th" scope="row">
                                                    {historyRow?.userAnswered}
                                                </TableCell>
                                                <TableCell>{historyRow?.userId}</TableCell>
                                                <TableCell align="right">{historyRow?.answerBody}</TableCell>
                                                <TableCell align="right">
                                                    {new Date(historyRow?.answeredOn).toLocaleString()}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        )
    }
    return (
        <TableContainer component={Paper} >
            <Table aria-label="collapsible table" stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell align="right">userPosted</TableCell>
                        <TableCell align="right">userId</TableCell>
                        <TableCell align="right">questionTitle</TableCell>
                        <TableCell align="right">questionBody</TableCell>
                        <TableCell align="right">questionTags</TableCell>
                        <TableCell align="right">noOfAnswers</TableCell>
                        <TableCell align="right">askedOn</TableCell>
                        <TableCell align="right">Votes</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        dt.map(q => (
                            <Row row={q} />
                        ))
                    }
                </TableBody>
            </Table>
            <Dialog
                open={opend}
                onClose={handleClose}
            >
                <DialogTitle>{"Delete Question"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this questions and answers?
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
