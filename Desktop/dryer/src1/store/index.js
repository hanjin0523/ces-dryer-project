import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { combineReducer } from "@reduxjs/toolkit";
import todos from "./todos";

const reducer = combineReducers({
    todos
})

const store = configureStore({
    reducer,
})

export default store;