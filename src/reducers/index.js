import { combineReducers } from 'redux';
import { actions } from '../actionCreators';
import { connectRouter } from 'connected-react-router';

export const initialState = {
    isSigningIn: false,
    userInfo: null
};

const isSigningInReducer = (state = false, action) => {
    switch (action.type) {
        case actions.LOGIN_REQUESTED:
            return true;
        case actions.LOGIN_SUCCEEDED:
        case actions.LOGIN_FAILED:
            return false;
        default:
            return state;
    }
}

const userReducer = (state = null, action) => {
    switch (action.type) {
        case actions.LOGIN_SUCCEEDED:
            return action.payload || null;
        default:
            return state;
    }
}

export default (history) => combineReducers({
    router: connectRouter(history),
    isSigningIn: isSigningInReducer,
    userInfo: userReducer
});