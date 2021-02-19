import {TOGGLE_MODAL, TOGGLE_EDIT_CATEGORY} from './types';

export const ToggleModal = modal => dispatch => (
    dispatch({
        type: TOGGLE_MODAL,
        payload: modal
    })
)

export const ToggleEditCategory = id => dispatch => {
    dispatch({
        type: TOGGLE_EDIT_CATEGORY,
        payload: id
    })
}   
