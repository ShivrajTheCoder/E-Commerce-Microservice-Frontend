import { Reducer } from "redux";
import * as actions from "./userActions";


interface UserState{
    isLoggedin:boolean;
    userId:string;
    token:string;
}

interface LoginInterface{
    type:typeof actions.LOGIN_SUCCESS,
    payload:UserState,
}
const initialState:UserState={
    isLoggedin:false,
    userId:"",
    token:""
}
interface LogoutInterface{
    type:typeof actions.LOGOUT_SUCCESS,
}
type UserAction=LoginInterface | LogoutInterface;
export const userReducer:Reducer<UserState,UserAction>=(state=initialState,action)=>{
    switch(action.type){
        case actions.LOGIN_SUCCESS:{
            const {token,userId}=action.payload;
            return {isLoggedin:true,token,userId}
        }
        case actions.LOGOUT_SUCCESS:
            return {isLoggedin:false,token:"",userId:""}
        default:
            return state;
    }
}