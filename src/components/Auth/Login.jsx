import React, {useState, Fragment} from 'react'
import PropTypes from 'prop-types'
import {LoginUser} from '../../actions/auth';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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
        marginTop: theme.spacing(1),
    },
    submit: {
        
        margin: theme.spacing(3, 0, 2),
    },
    bottom: {
        paddingBottom: '20px'
    }
  }));

const Login = ({ LoginUser }) => {
    const history = useHistory();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = function(e) {
        e.preventDefault();
        setFormData({...formData, [e.target.name]: e.target.value});
    };
    
    const onFormSubmit = function(e) {
        e.preventDefault();
        LoginUser(formData, history);
    };
    const classes = useStyles();
    return (
        <Container component="main" maxWidth="xs" className={classes.box}>
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate onSubmit={e=> onFormSubmit(e)}>
                    <TextField variant="outlined" margin="normal" required fullWidth id="email" label="Email Address"
                        name="email" autoComplete="email" autoFocus value={email} name='email' onChange={e=>
                        onChange(e)}
                        />
                        <TextField variant="outlined" margin="normal" required fullWidth name="password"
                            label="Password" type="password" id="password" autoComplete="current-password"
                            value={password} onChange={e=> onChange(e)}
                            />
                            <FormControlLabel control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                            />
                            <Button type="submit" fullWidth variant="contained" color="primary"
                                className={classes.submit}>
                                Sign In
                            </Button>
                            <Grid container className={classes.bottom}>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                    Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                </form>
            </div>
        </Container>
    )
}

Login.propTypes = {
    LoginUser: PropTypes.func.isRequired,
};


export default connect(null, {LoginUser})(Login)
