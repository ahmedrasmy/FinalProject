import {combineReducers} from "redux";
import userReducerth from "./userReducer";
import postReducer from "./PostReducer";
import LikeReducer from "./LikeReducer";
import commentReducer from "./commentReducer";
import shareReducer from "./ShareReducer";

export default combineReducers({
    UserReducer: userReducerth,
    PostReducer: postReducer,
    likereducer: LikeReducer,
    commentreducer: commentReducer,
    sharereducer:shareReducer
})