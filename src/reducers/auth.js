import {USER_LOGGED, USER_LOGOUT} from '../actions/types';



const initialState = {
    user: {},
    isAuth: false,
    isLoading: true
}

export default function (state = initialState, action) {
    const {type, payload} = action;
    
    switch(type){
        case USER_LOGGED:
            return { user: payload, isAuth: true, isLoading: false};
        case USER_LOGOUT:
            return {user: null, isAuth: false, isLoading: false };
        default:
            return state;
    }
}