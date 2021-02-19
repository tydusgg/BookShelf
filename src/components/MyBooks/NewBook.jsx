import React, {useState} from 'react';

import { connect } from 'react-redux';
import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import { GetBooks } from '../../actions/books';
import { Avatar, CssBaseline, FormControl, Modal, TextField, Select, MenuItem } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import AddIcon from '@material-ui/icons/Add';
import { ToggleModal } from '../../actions/modals';
import {AddNewBook} from '../../actions/books';

const useStyles = makeStyles((theme) => ({
    main: {
        width: '100%',
        minHeight: '70vh',
        marginTop: '20px',
        marginBottom: '20px',
        padding: '20px',
        backgroundColor: '#DFDFF8',
        borderRadius: '15px',
        border:'6px solid #0040AA'
    },
    formControl: {
        width: '100%',
        minWidth: '260px'
    },
    new: {
        backgroundColor: 'red'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
        marginLeft: '0'
    },
    labelWrapper: {
        display: 'flex',
        
    },
    field: {
        margin: '10px 0'
    },
    label: {
        minWidth: '120px',
        margin: theme.spacing(1),
        lineHeight: '40px'
    },
    modal: {
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -60%)',

        padding: '20px',
        backgroundColor: '#DFDFF8',
        borderRadius: '15px',
        border:'6px solid #0040AA',
        '&:focus': {
            outline: 'none'
        }
    },
    submit: {
        marginTop: '20px',
        marginBottom: '10px',
        lineHeight: '30px'
    }
}))

const NewBook = ({modals: {newBook, categoryInEdit}, books: {booksList}, auth: {user}, AddNewBook, GetBooks, ToggleModal}) => {
    const classes = useStyles();

    const isModalOpen = newBook;

    const [formData, setFormData] = useState({
        title: '',
        author: ''
    });

    const {title, author} = formData;

    const toggleModal = () => {
        setFormData({});
        ToggleModal('newBook');
    };


    const onAddBook = (e) => {
        e.preventDefault();
        AddNewBook(user.id, categoryInEdit, booksList, formData );
        GetBooks(user.id);
        toggleModal();
    };

    const onChange = e => {
        e.preventDefault();
        setFormData({...formData, [e.target.name]: e.target.value });
    }

    return (
        <Modal open={isModalOpen} onClose={toggleModal}>
            <Box className={classes.modal}>
                <CssBaseline />
                <div className={classes.paper}>
                    <Box className={classes.labelWrapper}>
                        <Avatar className={classes.avatar}>
                            <AddBoxIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5" className={classes.label}>
                            Add new book...
                        </Typography>
                    </Box>
                    <form className={classes.form} noValidate onSubmit={e=> onAddBook(e)}>
                        <TextField variant="outlined" className={classes.field} fullWidth label="Book Title"
                            name="title" autoComplete='off' autoFocus value={title} onChange={e=> onChange(e)}
                            />
                            <TextField variant="outlined" className={classes.field} fullWidth id="author" label="Author"
                                name="author" autoComplete='off' value={author} onChange={e=> onChange(e)}
                                />

                                <Button type="submit" fullWidth variant="contained" color="primary"
                                    className={classes.submit}>
                                    <AddIcon />Add New Book
                                </Button>
                    </form>
                </div>
            </Box>
        </Modal>
    )
}

const mapStateToProps = state => ({
    modals: state.modals,
    books: state.books,
    auth: state.auth,
    books: state.books
})
export default connect(mapStateToProps, {ToggleModal, GetBooks, AddNewBook })(NewBook)



