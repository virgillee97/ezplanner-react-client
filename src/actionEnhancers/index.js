import { actions } from '../actionCreators';
import { push } from 'connected-react-router';

export const routeActionEnhancer = store => next => action => {
    switch (action.type) {
        case actions.LOGIN_SUCCEEDED:
            store.dispatch(push('/dashboard'));
            next(action);
            break;
        default:
            next(action);
            break;
    }
}