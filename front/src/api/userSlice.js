import React from 'react'
import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice ({
   name:"login",
    initialState:{
        user:"null",
        token: localStorage.getItem('token') || "",
    },
    reducers:{
        login: (state,action)=>{
            state.user=action.payload; 
        },
        logout: (state)=>{
            state.user=null;
            state.token = null;
            localStorage.removeItem('token');
        },
    }
});

export const {login,logout} = userSlice.actions;

export const selectUser= (state) => state.token;
export const selectUserUserT = (state) => state.user.user.accessToken;
export default userSlice.reducer;