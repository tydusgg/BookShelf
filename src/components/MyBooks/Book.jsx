import React, {useState, Fragment} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {  Button, makeStyles, Box, TextField, MenuItem } from '@material-ui/core';
import {Rating} from '@material-ui/lab';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import {EditBookInfo} from '../../actions/books';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ReplyAllIcon from '@material-ui/icons/ReplyAll';
import CheckIcon from '@material-ui/icons/Check';
import { DeleteBook, GetBooks } from './../../actions/books';

const useStyles = makeStyles((theme) => ({
    book: {
        width: '100%',
        '& div': {
            fontSize: '15px'
        },
        '& td': {
            padding: '12px 8px'
        }
    },
    statusBox: {
        maxWidth: '87px'
    },
    status: {
        maxWidth: '87px',
        width: '100%'
    },
    titleBox: {
        maxWidth: '213px'
    },
    title: {
        maxWidth: '200px',
        width: '100%',
        "&&&:before": {
            borderBottom: "none"
            },
            "&&:after": {
            borderBottom: "none"
            }
    },
    authorBox: {
        maxWidth: '213px'
    },
    author: {
        maxWidth: '213px',
        width: '100%',
    },
    ratingBox: {
        maxWidth: '76px'
    },
    rating: {
        width: '100%',
    },
    summaryBox: {
        maxWidth: '420px',

    },
    summary: {
        maxWidth: '400px',
        width: '100%'
    },
    dashboardBox: {
        maxWidth: '87px'
    },
    dashboard: {
        maxWidth: '87px',
        width: '100%',
        display: 'flex'
    },
    button: {
        display: 'inline-block',
        padding:'2px 8px',
        margin: '0 2px',
        lineHeight: '15px',
        minHeight: 0,
        minWidth: 0,
        '&:hover': {
            opacity: '0.9',
        }
    }

}))

const Book = ({book, books, categoryId, userId, EditBookInfo, DeleteBook, bookId}) => {
    const classes = useStyles();

    const [formData, setFormData] = useState({
        status: book.status,
        title: book.title,
        author: book.author,
        rating: book.rating,
        summary: book.summary
    });

    const {status, title, author, rating, summary} = formData;

    const onChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
        let editedBook = book;
        editedBook[e.target.name] = e.target.value
        EditBookInfo(userId, categoryId, bookId, books, editedBook)
        
    }

    const onDeleteBook = (e) => {
        GetBooks(userId);
        console.log(bookId)
        DeleteBook(userId, categoryId, bookId, books);
    }

    return (
        <TableRow className={classes.book} style={{ verticalAlign: 'top' }}>
            <TableCell className={classes.statusBox}>
                <TextField value={status} onChange={e=> onChange(e)} name='status' className={classes.status} select>
                    <MenuItem value={0}>Later</MenuItem>
                    <MenuItem value={1}>Reading</MenuItem>
                    <MenuItem value={2}>Done</MenuItem>
                </TextField>
            </TableCell>

            <TableCell className={classes.titleBox}>
                <TextField className={classes.title} value={title} name='title' multiline rowsMax={2}
                    placeholder='Don`t leave an empty field!' onChange={e=> onChange(e)} />
            </TableCell>

            <TableCell className={classes.authorBox}>
                <TextField className={classes.author} value={author} name='author' multiline rowsMax={2}
                    placeholder='Don`t leave an empty field!' onChange={e=> onChange(e)} />
            </TableCell>

            <TableCell className={classes.ratingBox}>
                <Box borderColor="transparent" className={classes.rating}>
                    <Rating value={Number.parseInt(rating)} name='rating' size='small' onChange={e=>onChange(e)}/>
                </Box>
            </TableCell>
            <TableCell className={classes.summaryBox}>
                <TextField className={classes.summary} multiline placeholder={'Edit summary..'} name='summary'
                    value={summary} onChange={e=> onChange(e)} />
            </TableCell>
            <TableCell className={classes.dashboardBox}>
                <Box className={classes.dashboard}>
                    <Button className={`${classes.button}`}>
                        <ReplyAllIcon /></Button>
                    <Button className={`${classes.button}`} onClick={e => onDeleteBook(e)}>
                        <DeleteForeverIcon /></Button>
                </Box>
            </TableCell>
        </TableRow>
    )
}

export default connect(null, {EditBookInfo, DeleteBook, GetBooks})(Book)
