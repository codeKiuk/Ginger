import { combineReducers } from '@reduxjs/toolkit'
import loginReducer from '@redux/modules/auth/login'
import logoutReducer from '@redux/modules/auth/logout'
import authReducer from '@redux/modules/auth/auth'
import registerReducer from '@redux/modules/auth/register'
import contentMenuReducer from '@redux/modules/commons/contentMenu'
import groupContentReducer from '@redux/modules/home/groupContent'
import clubContentReducer from '@redux/modules/home/clubContent'
import groupCommentReducer from '@redux/modules/home/groupComment'
import clubCommentReducer from '@redux/modules/home/clubComment'
import createContentReducer from '@redux/modules/home/createContent'


const rootReducer = combineReducers({
    login: loginReducer,
    logout: logoutReducer,
    auth: authReducer,
    register: registerReducer,
    contentMenu: contentMenuReducer,
    groupContent: groupContentReducer,
    clubContent: clubContentReducer,
    groupComment: groupCommentReducer,
    clubComment: clubCommentReducer,
    createContent: createContentReducer,
})


export default rootReducer