import rootSlice from "./rootSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";


const reducer = combineReducers ({
    root: rootSlice,
});

const store = configureStore ({
    reducer,
});

export default store;
