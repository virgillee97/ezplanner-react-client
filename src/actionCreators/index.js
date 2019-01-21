import firebase from '../services/firebase'
import actions from '../actions'

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

        dispatch({
            type: actions.LOGIN_FAILED
        });
    }
}

export const loginSuccessfulActionCreator = payload => ({
    type: actions.LOGIN_SUCCEEDED,
    payload
})