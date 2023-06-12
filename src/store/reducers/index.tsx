import { combineReducers } from "redux";
import { cartReducer } from "./cartReducers";
import { userReducer } from "./userReducer";

const rootReducer=combineReducers({
    cart:cartReducer,
    user:userReducer,
})

export type RootState=ReturnType<typeof rootReducer>;
export default rootReducer;