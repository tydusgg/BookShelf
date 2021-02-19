import {GET_PROFILE, CLEAR_PROFILE} from '../actions/types';



const initialState = {
    user: {
        id: null,
        name: '',
        email: '',
        photoURL: '',
        categoriesLength: null
    },
    isLoading: true
}

export default function (state = initialState, action) {
    const {type, payload} = action;
    
    switch(type){
        case GET_PROFILE:
            return { user: payload, isLoading: false };
        case CLEAR_PROFILE:
            return { user: null, isLoading: false };
        default:
            return state;
    }
}