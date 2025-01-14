import { createSlice } from '@reduxjs/toolkit'

const eventsSlice = createSlice({
    name: 'events',
    initialState: {
        events: []
    },
    reducers:{
        setEvents: (state, action) => {
            const { events
                } = action.payload;
            state.events = events
        },
        clearEvents: (state) => {
            state.events = []
        }
    }
})

export const { setEvents, clearEvents } = eventsSlice.actions;

export default eventsSlice.reducer;