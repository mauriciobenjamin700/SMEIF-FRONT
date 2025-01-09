import { createSlice } from "@reduxjs/toolkit";

const headerSlice = createSlice({
    name: 'header',
    initialState:{
        headerImage: true,
        headerTitle: ""
    },
    reducers: {
        setImage: (state, action) => {
            const { headerImage } = action.payload;
            state.headerImage = headerImage
        },
        setTitle: (state, action) => {
            const { headerTitle } = action.payload;
            state.headerTitle = headerTitle
        }
    }
})

export const { setImage, setTitle } = headerSlice.actions;

export default headerSlice.reducer;