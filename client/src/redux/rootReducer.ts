import { combineReducers } from '@reduxjs/toolkit'
import loginReducer from '@redux/modules/auth/login'
import logoutReducer from '@redux/modules/auth/logout'
import authReducer from '@redux/modules/auth/auth'
import registerReducer from '@redux/modules/auth/register';
import contentsMenuReducer from './modules/commons/contentsMenu';

const rootReducer = combineReducers({
    login: loginReducer,
    logout: logoutReducer,
    auth: authReducer,
    register: registerReducer,
    contentsMenu: contentsMenuReducer,
})


export default rootReducer