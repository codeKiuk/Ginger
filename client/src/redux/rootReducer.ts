import { combineReducers } from '@reduxjs/toolkit'
import loginReducer from '@redux/modules/login'
import authReducer from '@redux/modules/auth'

const rootReducer = combineReducers({
    login: loginReducer,
    auth: authReducer,
})


export default rootReducer