import React from 'react'
import { createSlice } from '@reduxjs/toolkit'

export const graphSlice = createSlice({
    name: "graphHelp",
    initialState: {
        r: 0,
        dots: []
    },
    reducers: {
        setR: (state, action) => {
            state.r = action.payload;
        }
    },
    setDots: (state, action) => {
        state.dots = action.payload;
    }
}

)
export const { setR,setDots } = graphSlice.actions;

export const changeRgraph = (state) => state.r;
export const showDotsGraph = (state) => state.dots;
export default graphSlice.reducer;