import { Reducer } from "redux";
import * as actions from "./userActions";


interface UserState{
    isLoggedin:boolean;
    userId:string;
    token:string;
    isAdmin:false;
}

interface LoginInterface{
    type:typeof actions.LOGIN_SUCCESS,
    payload:UserState,
}
const initialState:UserState={
    isLoggedin:false,
    userId:"",
    token:"",
    isAdmin:false,
}
interface LogoutInterface{
    type:typeof actions.LOGOUT_SUCCESS,
}
type UserAction=LoginInterface | LogoutInterface;
export const userReducer:Reducer<UserState,UserAction>=(state=initialState,action)=>{
    switch(action.type){
        case actions.LOGIN_SUCCESS:{
            const {token,userId,isAdmin}=action.payload;
            return {isLoggedin:true,token,userId,isAdmin}
        }
        case actions.LOGOUT_SUCCESS:
            return {isLoggedin:false,token:"",userId:"",isAdmin:false}
        default:
            return state;
    }
}