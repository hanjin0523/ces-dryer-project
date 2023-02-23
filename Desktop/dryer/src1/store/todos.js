import { createSlice } from "@reduxjs/toolkit";


const controlNumSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: 10,
    },
    reducers: {
        plusNum: (state, action) => {
            state.todos += 2;
        },
        minusNum: (state, action) => {
            state.todos -= 2;
        },
        updateNum: (state, actions) => {
            state.todos = actions.payload;
        },
    },
});
export const { plusNum, minusNum, updateNum } = controlNumSlice.actions
export default controlNumSlice.reducer
