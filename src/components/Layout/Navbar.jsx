import React, {Fragment, useEffect} from 'react';
import {connect} from 'react-redux';
import {makeStyles, Box, Link, Toolbar} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import firebase from 'firebase/app';
import { GetBooks } from './../../actions/books';


const useStyles = makeStyles((theme) => ({
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: theme.palette.primary.main,
        borderRadius: '0 0 15px 15px',
        margin: '0',
    },
    button: {
        '&:hover': {
            underline: 'none',
            textDecoration: 'none',
        },
        '& a': {
            fontSize: '18px',
            cursor: 'pointer',
            underline: 'none',
            margin: '0 6px',
            color: '#DFDFF8',
            textDecoration: 'none',
            '&:hover': {
                underline: 'none',
                color: 'white',
                textDecoration: 'none',
            },
        },
    },
    logoText: {
        textTransform: 'uppercase',
        fontSize: '22px'
    },
    logo: {
        fontSize: '22px'
    }
})
)
const Navbar = ({ auth: {isAuth, isLoading, user} }) => {
    const classes = useStyles();
    return (
        <Toolbar className={classes.navbar}>
            <Link className={classes.button + ' ' + classes.logoText}>
            <RouterLink to='/'>
                <ImportContactsIcon className={classes.logo} /> <span style={{paddingbottom: '2px'}}>BookShelf</span>
            </RouterLink>
            </Link>
            <Box>
                {!isAuth && (<Fragment>
                    <Link className={classes.button}>
                    <RouterLink to='/signup'>Signup</RouterLink>
                    </Link>
                    <Link className={classes.button}>
                    <RouterLink to='/login'>Login</RouterLink>
                    </Link>
                </Fragment>)}

                {isAuth && !isLoading && (<Fragment>
                    <Link className={classes.button}>
                    <RouterLink to='/sharedbooks'>Shared books</RouterLink>
                    </Link>
                    <Link className={classes.button}>
                    <RouterLink to='/mybooks'>My books</RouterLink>
                    </Link>
                    <Link className={classes.button}>
                    <RouterLink to='/profile'>Profile</RouterLink>
                    </Link>
                    <Link className={classes.button}>
                    <RouterLink to='/logout'>Logout</RouterLink>
                    </Link>
                </Fragment>)}
            </Box>
        </Toolbar>
    )
}
const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps, null)(Navbar)
