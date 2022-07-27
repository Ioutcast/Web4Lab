import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import rReducer from './graphSlice';
export default configureStore({
    reducer:{
        user:userReducer,
        r:rReducer,
    },
});