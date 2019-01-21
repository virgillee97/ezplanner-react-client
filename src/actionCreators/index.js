import firebase from '../services/firebase';
import actions from '../actions';

export const loginActionCreator = (email, password) => async (dispatch) => {
    dispatch({
        type: actions.LOGIN_REQUESTED
    });

    try {
        await firebase.auth().signInWithEmailAndPassword(email, password);

        const userInfo = firebase.auth().currentUser;

        dispatch({
            type: actions.LOGIN_SUCCEEDED,
            payload: userInfo
        });
    } catch (error) {
        console.log(`ERROR LOGGING IN: ${error.code} - ${error.message}`);
        // TODO: Change payload from the mesage we get from firebase to a custom message based on error code
        // Firebase message gives users more information then is needed
        dispatch({
            type: actions.LOGIN_FAILED,
            payload:error.message
        });
    }
}

export const registerActionCreator = (email, password) => async (dispatch) =>{
    dispatch({
        type:actions.REGISTER_REQUESTED
    });
    try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);

        dispatch({
            type: actions.REGISTER_SUCCEEDED
        });
    } catch (error) {
        console.log(`ERROR REGISTERING: ${error.code} - ${error.message}`);
        dispatch({
            type: actions.REGISTER_FAILED
        });
    }
}

export const logoutActionCreator = () => async (dispatch) =>{
    dispatch({
        type:actions.LOGOUT_REQUESTED
    });
    try {
        await firebase.auth().signOut();
        dispatch({
            type: actions.LOGOUT_SUCCEEDED
        });
    } catch (error) {
        console.log(`ERROR LOGGING OUT: ${error.code} - ${error.message}`);
        dispatch({
            type: actions.LOGOUT_FAILED
        });
    }
}

export const loginSuccessfulActionCreator = payload => ({
    type: actions.LOGIN_SUCCEEDED,
    payload
})
