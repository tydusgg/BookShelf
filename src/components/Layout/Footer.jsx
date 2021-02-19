import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { AppBar, Toolbar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    footer: {
        flexShrink: 0,
        textAlign: 'center',
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        height: '100px',
        margin: '0',
        padding: '0',
        verticalAlign: 'middle',
        maxWidth: '100vw',
        width: '100%',
        paddingTop: '30px'
    },
    text1: {
        color: 'white'
    },
    text2: {
        color: '#DFDFF8'
    }
  }));
const Footer = () => {
    const classes = useStyles();

    return (
        <Container className={classes.footer} maxWidth={false}>
            <Typography variant="body1" className={classes.text1}>BookShelf, with love of books. </Typography>
            <Typography variant="body2" className={classes.text2}>
                {'Copyright © '}
                <Link color="inherit" href="https://vk.com/tydusgg">
                    Nikolay Borzunov
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </Container>
    )
}

export default Footer
