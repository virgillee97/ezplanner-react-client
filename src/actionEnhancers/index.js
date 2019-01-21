import { actions } from '../actionCreators';
import { push } from 'connected-react-router';

export const authActionEnhancer = store => next => action => {
    switch (action.type) {
        case actions.LOGIN_SUCCEEDED:
            next(action);
            break;
        default:
            next(action);
            break;
    }
}