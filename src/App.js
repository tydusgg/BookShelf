import {Provider} from 'react-redux';
import store from './store.js';
import {Switch, Route, BrowserRouter} from 'react-router-dom';

import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import Logout from './components/Auth/Logout';
import Navbar from './components/Layout/Navbar';
import Profile from './components/Profile/Profile';
import MyBooks from './components/MyBooks/MyBooks';
import Footer from './components/Layout/Footer';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import {Container, ThemeProvider} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import bg from './Background.jpg';
import theme from './utils.js/theme';
import firebaseConfig from './utils.js/firebaseConfig.js';


firebase.initializeApp(firebaseConfig)

const useStyles = makeStyles((theme) => ({
  app: {
    backgroundImage: `url(${bg})`,
    backgroundSize: 'cover',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '100vw',
    width: '100%',
    minHeight: '100vh',
    fontFamily: 'Roboto, sans-serif',
    padding: '0'
  },
  bg: {
    
  },
  main: {
    minHeight: '90vh'
  }

}));

function App() {
  const classes = useStyles();

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Container className={classes.app} maxWidth={false}>
            <Container className={classes.main} fixed>
              <Navbar/>
              <Switch>
                <Route path='/signup' component={Signup} />
                <Route path='/login' component={Login} />
                <Route path='/logout' component={Logout} />
                <Route path='/profile' component={Profile} />
                <Route path='/mybooks' component={MyBooks} />
              </Switch>
            </Container>
            <Footer />
          </Container>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>

  );
}

export default App;
