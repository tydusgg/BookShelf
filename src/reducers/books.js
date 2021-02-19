import {GET_BOOKS, ADD_CATEGORY, ADD_BOOK, DELETE_CATEGORY, DELETE_BOOK, CLEAR_BOOKS} from '../actions/types';



const initialState = {
    booksList: null,
    isLoading: true
}

export default function (state = initialState, action) {
    const {type, payload} = action;
    
    switch(type){
        case GET_BOOKS:
            return { booksList: payload, isLoading: false };
        case ADD_CATEGORY:
            return { booksList: payload, isLoading: false };
        case DELETE_CATEGORY:
            return { booksList: payload, isLoading: false };
        case ADD_BOOK:
            return { booksList: payload, isLoading: false };
        case DELETE_BOOK:
            return { booksList: payload, isLoading: false };
        case CLEAR_BOOKS:
            return { booksList: null, isLoading: false };
        default:
            return state;
    }
}