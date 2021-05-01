import {combineReducers} from 'redux';
import authReducer from './authReducer';
import dashboardFilterReducer from './dashboardFilterReducer';
import errorReducer from './errorReducer';
import notificationReducer from './notificationReducer';
import questionDetailReducer from './questionDetailReducer';
import questionPostsReducer from './questionPostsReducer';
import toAnswerReducer from './toAnswerReducer';
import userInfoReducer from './userInfoReducer';

const rootReducer = combineReducers({
    auth : authReducer,
    questions : questionPostsReducer,
    toAnswer : toAnswerReducer,
    filter : dashboardFilterReducer,
    questionDetails : questionDetailReducer,
    user : userInfoReducer,
    error : errorReducer,
    notification : notificationReducer
});

export default rootReducer;
