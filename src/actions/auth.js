import firebase from 'firebase/app';
import {USER_LOGGED, USER_LOGOUT, CLEAR_PROFILE, SET_ALERT, GET_PROFILE} from './types';

export const SignupUser = (formData, history) => dispatch => {
    const {name, surname, email, password} = formData;
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var user = userCredential.user;
            
            user.updateProfile({
                displayName: name + ' ' + surname,
                photoURL: 'https://lh3.googleusercontent.com/proxy/-EfjlhUFbAw0udK789Vn3CYkHs_e0SVlSLoM8QYdcOITWH7pCzj75OJM8BPoQiTaMhFS3BSJgkGjKRCIRVdfEwpSXWwmdKqnb06xG0R0EIoSgpABX4g'
            });
            dispatch({
                type: USER_LOGGED,
                payload: {id: user.id}
            });
            history.push('/');
            
        })
        .catch((err) => {
            dispatch({
                type: SET_ALERT,
                payload: {msg: err.message, status: 'error'}
            });
        });
}

export const LoginUser = (formData, history) => dispatch => {
    const {email, password} = formData;
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        let user = userCredential.user;
        dispatch({
            type: USER_LOGGED,
            payload: {id: user.uid}
        })

        var userData;

        firebase.firestore().collection('data').doc(user.uid).get()
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
            history.push('/');
        })
    })
    .catch((err) => {
        dispatch({
            type: SET_ALERT,
            payload: {msg: err.message, status: 'error'}
        });
    }); 
}
export const LogoutUser = history => dispatch => {
    firebase.auth().signOut()
    .then(() => {
    dispatch({
        type: USER_LOGOUT
    });
    dispatch({
        type: CLEAR_PROFILE
    })
      history.push('/');
    })
    .catch((err) => {
        dispatch({
            type: SET_ALERT,
            payload: {msg: err.message, status: 'error'}
        });
    }); 
}