import firebase from 'firebase/app';
import {GET_PROFILE, SET_ALERT, USER_LOGOUT, CLEAR_PROFILE} from './types';

// Get current user
export const GetCurrentUser = () => dispatch => {
    let user = firebase.auth().currentUser;
    if(user ===null) {
        dispatch({
            type: SET_ALERT,
            payload: {msg: 'You are not logged', status: 'error'}
        })
    } else {
        let userData;
        firebase.firestore().collection('data').doc(`${user.uid}`).get()
        .then((doc) => {
            if (doc.exists) {
                userData = doc.data()
            }
            else{
                firebase.firestore().collection('data').doc(`${user.uid}`).set({
                    length: 0
                })
                userData = {length: 0}
            }
            dispatch({
                type: GET_PROFILE,
                payload: {id: user.uid, name: user.displayName, email: user.email, photoURL: user.photoURL, categoriesLength: userData.length}
            })
        })
    }
}

// Delete Profile
export const DeleteProfile = (id, history) => dispatch => {
    var user = firebase.auth().currentUser;

    if(id === user.uid){
        user.delete().then(function() {
            dispatch({
                type: USER_LOGOUT
            });
            dispatch({
                type: CLEAR_PROFILE
            })
    
            window.alert('Profile has been deleted');
    
            history.push('/');
        }).catch(function(err) {
            dispatch({
                type: SET_ALERT,
                payload: {msg: err.message, status: 'error'}
            })
            history.push('/login');
        });
    } else {
        dispatch({
            type: SET_ALERT,
            payload: {msg: 'You are not authenticated', status: 'error'}
        })
        history.push('/login');
    }
    
}

export const EditProfile = (formData) => dispatch => {
    user.updateProfile({
        displayName: "Jane Q. User",
        photoURL: "https://example.com/jane-q-user/profile.jpg"
      }).then(function() {
        // Update successful.
      }).catch(function(error) {
        // An error happened.
      });
    let user = firebase.auth().currentUser;

    if(user ===null) {
        dispatch({
            type: SET_ALERT,
            payload: {msg: 'You are not logged', status: 'error'}
        })
    } else {
        dispatch({
            type: GET_PROFILE,
            payload: {id: user.uid, name: user.displayName, email: user.email, photoURL: user.photoURL}
        })
    }
}