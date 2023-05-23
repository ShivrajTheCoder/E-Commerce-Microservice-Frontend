import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";



const cart=configureStore({
    reducer:rootReducer,
})

export default cart;