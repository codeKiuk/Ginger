import { combineReducers } from '@reduxjs/toolkit'
import loginReducer from '@redux/modules/auth/login'
import logoutReducer from '@redux/modules/auth/logout'
import authReducer from '@redux/modules/auth/auth'
import registerReducer from '@redux/modules/auth/register'
import contentMenuReducer from '@redux/modules/commons/contentMenu'
import createContentModalReducer from '@redux/modules/modal/createContentModal'
import contentsReducer from '@redux/modules/contents/contents'
import commentsReducer from '@redux/modules/comments/comments'
import myContentsReducer from '@redux/modules/contents/myContents'
import myCommentsReducer from '@redux/modules/comments/myComments'
import updateContentModalReducer from '@redux/modules/modal/updateContentModal'
import paginationReducer from '@redux/modules/commons/pagination'

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
    updateContentModal: updateContentModalReducer,
    pagination: paginationReducer,
})


export default rootReducer