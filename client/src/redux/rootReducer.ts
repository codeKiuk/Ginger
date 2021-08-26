import { combineReducers } from '@reduxjs/toolkit'
import loginReducer from '@redux/modules/auth/login'
import logoutReducer from '@redux/modules/auth/logout'
import authReducer from '@redux/modules/auth/auth'
import registerReducer from '@redux/modules/auth/register'
import contentMenuReducer from '@redux/modules/commons/contentMenu'
import createContentModalReducer from '@redux/modules/home/createContentModal'
import contentsReducer from '@redux/modules/home/contents'
import commentsReducer from '@redux/modules/home/comments'
import myContentsReducer from '@redux/modules/myPage/myContents'
import myCommentsReducer from '@redux/modules/myPage/myComments'


const rootReducer = combineReducers({
    login: loginReducer,
    logout: logoutReducer,
    auth: authReducer,
    register: registerReducer,
    contents: contentsReducer,
    comments: commentsReducer,
    myContents: myContentsReducer,
    myComments: myCommentsReducer,
    contentMenu: contentMenuReducer,
    createContentModal: createContentModalReducer,
})


export default rootReducer