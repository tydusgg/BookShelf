import React, {useEffect } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import {Box, Button, Container} from '@material-ui/core';
import Category from './Category';
import { GetBooks } from '../../actions/books';
import { makeStyles } from '@material-ui/core'
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import { ToggleModal } from './../../actions/modals';
import NewCategoryModal from './NewCategory';
import NewBook from './NewBook';
import firebase from 'firebase/app';
import { GetCurrentUser } from './../../actions/profile';

const useStyles = makeStyles((theme) => ({
    main: {
        width: '100%',
        minHeight: '70vh',
        marginTop: '20px',
        marginBottom: '20px',
        padding: '20px',
        backgroundColor: '#DFDFF8',
        borderRadius: '15px',
        border:`6px solid ${theme.palette.primary.main}`
    },
    formControl: {
        width: '100%',
        minWidth: '260px'
    },
    new: {

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

const MyBooks = ({auth: {user, isAuth}, books: {isLoading, booksList}, modals: {newBook}, GetBooks, GetCurrentUser, ToggleModal}) => {
    const classes = useStyles();


    const toggleModal = (e) => {
        ToggleModal('newCategory');
    };

    useEffect(() => {
        if(user.id) {
            const unsubscribe = firebase.firestore().collection('data').doc(`${user.id}`).collection('library')
                .onSnapshot(snapshot => {
                    GetBooks(user.id)
                    GetCurrentUser()
                })
            return () => {
                unsubscribe()
            }
        }

      }, [firebase])

    return (
        <Container className={classes.main}>
            <Box>
                <Button className={`${classes.new}`} onClick={e => toggleModal(e)} variant="outlined" color="primary"><LibraryAddIcon style={{margin: '0 4px', padding: '1px'}}/>New category</Button>
            </Box>
            <NewCategoryModal />
        {isAuth && !isLoading && booksList && (
            <Box>
                {
                booksList.filter(category => category.info.id !== 0).map((category, index) => <Category category={category} key={index}/>  )}
                <NewBook />
            </Box>
        )}
        {!isAuth && !isLoading && (
            <Redirect to='/login'></Redirect>
        )}
        </Container>
    )
}

MyBooks.propTypes = {
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    books: state.books,
    modals: state.modals
})
export default connect(mapStateToProps, {GetBooks, ToggleModal, GetCurrentUser})(MyBooks)
