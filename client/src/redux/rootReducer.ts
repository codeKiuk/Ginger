import { combineReducers } from '@reduxjs/toolkit'
import loginReducer from '@redux/modules/login'
import authReducer from '@redux/modules/auth'
import registerReducer from '@redux/modules/register';

const rootReducer = combineReducers({
    login: loginReducer,
    auth: authReducer,
    register: registerReducer,
})


export default rootReducer