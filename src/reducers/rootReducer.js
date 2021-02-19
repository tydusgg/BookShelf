import { combineReducers } from 'redux';


import auth from './auth';
import profile from './profile';
import books from './books';
import modals from './modals';

export default combineReducers({
    auth,
    profile,
    books,
    modals
})