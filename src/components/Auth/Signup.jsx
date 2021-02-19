import React, {useState, Fragment} from 'react'
import PropTypes from 'prop-types'
import {SignupUser} from '../../actions/auth';
import {connect} from 'react-redux';
import {Redirect, useHistory} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { GetCurrentUser } from './../../actions/profile';

const useStyles = makeStyles((theme) => ({
    box: {
        backgroundColor: 'white',
        marginTop: '80px',
        paddingTop: '0',
        borderRadius: '15px',
        border:'6px solid #0040AA'
    },
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    bottom: {
        paddingBottom: '20px'
    }
  }));

const Signup = ({ SignupUser, GetCurrentUser }) => {
    const classes = useStyles();

    const history = useHistory();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const { firstName, lastName, email, password } = formData;

    const onChange = function(e) {
        e.preventDefault();
        setFormData({...formData, [e.target.name]: e.target.value});
    };
    
    const onFormSubmit = function(e) {
        e.preventDefault();
        SignupUser(formData, history);
        GetCurrentUser();
        return <Redirect to='/' />
    };

    return (
        <Container component="main" maxWidth="xs" className={classes.box}>
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} noValidate onSubmit={e=> onFormSubmit(e)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField autoComplete="fname" name="firstName" variant="outlined" required fullWidth
                                id="firstName" label="First Name" autoFocus value={firstName} onChange={e=> onChange(e)}
                                />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField variant="outlined" required fullWidth id="lastName" label="Last Name"
                                name="lastName" autoComplete="lname" value={lastName} onChange={e=> onChange(e)}
                                />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField variant="outlined" required fullWidth id="email" label="Email Address"
                                name="email" autoComplete="email" value={email} onChange={e=> onChange(e)}
                                />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField variant="outlined" required fullWidth name="password" label="Password"
                                type="password" id="password" autoComplete="current-password" value={password}
                                onChange={e=> onChange(e)}
                                />
                        </Grid>

                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end" className={classes.bottom}>
                        <Grid item>
                            <Link to="login" variant="body2">
                            Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}

Signup.propTypes = {

};


export default connect(null, {SignupUser, GetCurrentUser})(Signup)
