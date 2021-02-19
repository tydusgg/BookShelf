import { TOGGLE_MODAL, TOGGLE_EDIT_CATEGORY } from '../actions/types';

const initialState = {
    newCategory: false,
    newBook: false,
    categoryInEdit: null
};

export default function( state = initialState, action) {
    const { type, payload } = action;
    switch(type){
        case TOGGLE_MODAL:
            return {...state, [payload]: !state[payload]};
        case TOGGLE_EDIT_CATEGORY:
            return {...state, categoryInEdit: payload };
        default:
            return state;
    }
}