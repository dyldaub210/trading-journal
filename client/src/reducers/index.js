import { combineReducers } from 'redux';
import alertMessage from './AlertMessage';
import register from './Register';
import load from './Load';
import login from './Login';
import dashboard from './Dashboard';
import calculator from './Calculator';
import transaction from './Transaction';

export default combineReducers({
    alertMessage,
    register,
    load,
    login,
    dashboard,
    calculator,
    transaction
});