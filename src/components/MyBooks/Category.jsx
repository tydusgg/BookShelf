import React, {useState, Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { ToggleModal, ToggleEditCategory } from './../../actions/modals';
import {EditBookInfo} from '../../actions/books';
import Book from './Book';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import { GetBooks, DeleteCategory } from './../../actions/books';


const useCategoryStyles = makeStyles((theme) => ({
    category: {
        width: '100%',
        margin: '20px 20px 0 0 ',
        borderRadius: '15px',
    },
    button: {
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr 4fr',
    },
    empty:{
        backgroundColor: '#DFDFF8',
        height: '100%'
    },
    empty__opened: {
        borderRadius: '0 0 0 15px',
    },
    empty__closed: {
        borderRadius: '0 0 0 0'
    },
    categoryLabel: {
        height: '40px',
        border: 'none',
        textAlign: 'center',
        lineHeight: '40px',
        fontSize: '18px',
        color: 'white',
        '&:hover': {
            cursor: 'pointer'
        },
        '&:focus': {
            outline: 'none'
        }
    },
    categoryLabel__opened: {
        borderRadius: '15px 15px 0 0',
    },
    categoryLabel__closed: {
        borderRadius: '15px 15px 15px 15px'
    },
    newBookButton: {
        padding: '4px 8px',
        marginTop: '12px'
    },
    tableBox: {
        backgroundColor: 'white',
        borderRadius: '0 15px 15px 15px',
        padding: '10px',
        fontSize: '18px'
    },
    buttons: {
        display: 'grid',
        gridTemplateColumns: '180px 180px',
        gridGap: '8px'
    }
}))



const Category = ({category, ToggleModal, ToggleEditCategory, DeleteCategory, auth: {user}}) => {
    const classes = useCategoryStyles()

    const {books, info} = category;
    const {color, title, id} = info;

    const toggleModal = () => {
        ToggleEditCategory(category.info.id);
        ToggleModal('newBook');
    }

    const onDeleteCategory = (e) => {
        DeleteCategory(user.id, id);
    }

    const [isOpen, toggleCategory] = useState(books.length>0 ? true : false);

    return (
        <Box className={`${classes.category}`}>
            <div className={classes.button}>
                <button style={{backgroundColor: color}} className={`${classes.categoryLabel} ${isOpen ?
                    classes.categoryLabel__opened : classes.categoryLabel__closed}`} onClick={()=>
                    toggleCategory(!isOpen)}>{title}</button>
                <div style={isOpen ? {backgroundColor: color} : {}}>
                    <div className={`${classes.empty} ${isOpen ? classes.empty__opened : classes.empty__closed}`}></div>
                </div>
            </div>
            {isOpen &&
            <Box className={classes.tableBox} style={isOpen ? { border: `10px solid ${color}`} : {}}>
                <Box>
                    {books.length===0 &&
                    <Fragment>
                        <Typography>
                            Oops.. You don't have any books.
                        </Typography>
                    </Fragment>}
                    {books.length>0 &&
                    <Fragment>
                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Title</TableCell>
                                        <TableCell>Author</TableCell>
                                        <TableCell>Rating</TableCell>
                                        <TableCell>Summary</TableCell>
                                        <TableCell>Dashboard</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {books.map((book, index) => (
                                    <Book book={book} key={index} bookId={book.id} books={books} categoryId={id} userId={user.id} />
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Fragment>
                    }
                </Box>
                <Box className={classes.buttons}>
                    <Button className={classes.newBookButton} onClick={e=> toggleModal(e)}
                        variant="contained" color="primary">
                        <LibraryBooksIcon style={{margin: '0 4px', padding: '0 1px'}} />Add book</Button>
                    <Button className={classes.newBookButton} onClick={e=> onDeleteCategory(e)}
                        variant="outlined" color="primary">
                        <LibraryBooksIcon style={{margin: '0 4px', padding: '0 1px'}} />Delete category</Button>
                </Box>
            </Box>
            }
        </Box>
    )
}

Category.propTypes = {
    auth: PropTypes.object.isRequired,
    ToggleEditCategory: PropTypes.func.isRequired,
    ToggleModal: PropTypes.func.isRequired,

}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { ToggleModal, ToggleEditCategory, GetBooks, DeleteCategory})(Category)
