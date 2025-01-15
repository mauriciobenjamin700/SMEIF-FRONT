import { createSlice } from '@reduxjs/toolkit'

const studentsSlice = createSlice({
    name: 'students',
    initialState: {
        students: []
    },
    reducers:{
        setStudents: (state, action) => {
            const { 
                students    
            } = action.payload;
            state.students = students
        },
        clearStudents: (state) => {
            state.students = []
        }
    }
})

export const { setStudents, clearStudents } = studentsSlice.actions;

export default studentsSlice.reducer;